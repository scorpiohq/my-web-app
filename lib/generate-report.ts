import { readFileSync } from "fs";
import path from "path";
import { runPromptToJson } from "@/lib/llm";
import {
  enforceStage2Limits,
  findFormEchoViolations,
  findStage2Violations,
  findVoiceViolations,
  type Stage2Violation,
} from "@/lib/report-limits";
import type { Stage2ReportJson, StoredReportJson } from "@/lib/report-mapper";
import {
  getSubmissionForGeneration,
  saveGeneratedReport,
  setReportStatus,
} from "@/lib/submissions";

const STAGE2_RETRY_PROMPT = `You are fixing Stage 2 report slots that failed a quality check.

Rewrite ONLY the fields listed below. Keep every specific detail. Follow the reason on each field.

Rules:
- Speak to the reader as you/your. Never use their name. Never use he/she/him/his/her/hers.
- goal_line stays first person ("I want to...").
- Never paste a form answer. Interpret what it means. Wrong: "Willing to invest $300-500." Right: "You'll fund tools instead of waiting."
- If a slot is too long, rewrite shorter and complete — do not cut mid-thought.
- If a slot is too short, add interpreted meaning from the same facts until it fills the frame. Do not pad with empty phrases.
- missing_paragraph: exactly 3 lines separated by newline characters (\\n). Each line 6-10 words AND 34-52 characters.
- why_fits_bullets: return all 5 items if this field is listed. Items 1-4: 5-8 words AND 30-45 characters. Item 5: 10-15 words AND 62-90 characters.
- strengths_list / blockers_list: return all 3 items if listed. Each 5-8 words AND 30-45 characters.
- next_move_bullets: return all 6 items if listed. Each 5-8 words AND 28-45 characters.
- Paragraphs and box summaries should land near their character ceiling, not leave empty space.
- Do not include gameplan_transition_line or cta_button_text.

Return JSON with only the rewritten keys.`;

function fieldNameFromPath(pathName: string) {
  if (pathName.startsWith("missing_paragraph")) return "missing_paragraph";
  return pathName.replace(/\[\d+\]$/, "");
}

function buildRetryUserPrompt(
  violations: Stage2Violation[],
  stage2: Stage2ReportJson,
) {
  const fields = [...new Set(violations.map((item) => fieldNameFromPath(item.path)))];

  return fields
    .map((field) => {
      const related = violations.filter(
        (item) => fieldNameFromPath(item.path) === field,
      );
      const current =
        field === "missing_paragraph"
          ? stage2.missing_paragraph
          : stage2[field as keyof Stage2ReportJson];
      const limits = related
        .map((item) => {
          const parts = [item.path];
          if (item.reason) parts.push(item.reason);
          if (item.limit) {
            const min =
              item.limit.minWords != null
                ? `${item.limit.minWords}-${item.limit.maxWords} words AND ${item.limit.minChars}-${item.limit.maxChars} characters`
                : `max ${item.limit.maxWords} words AND ${item.limit.maxChars} characters`;
            parts.push(min);
          }
          return parts.join(" — ");
        })
        .join("\n");

      return `FIELD: ${field}\nLIMITS:\n${limits}\nCURRENT:\n${JSON.stringify(current, null, 2)}`;
    })
    .join("\n\n");
}

function mergeStage2Retry(
  stage2: Stage2ReportJson,
  patch: Record<string, unknown>,
): Stage2ReportJson {
  const next = { ...stage2 };
  const stringKeys: Array<keyof Stage2ReportJson> = [
    "creator_identity_title",
    "goal_line",
    "niche_explanation",
    "why_fits_paragraph",
    "strengths_summary",
    "blockers_summary",
    "missing_paragraph",
  ];
  const arrayKeys: Array<keyof Stage2ReportJson> = [
    "why_fits_bullets",
    "strengths_list",
    "blockers_list",
    "next_move_bullets",
  ];

  for (const key of stringKeys) {
    if (typeof patch[key] === "string") {
      next[key] = patch[key];
    }
  }

  for (const key of arrayKeys) {
    if (Array.isArray(patch[key])) {
      next[key] = patch[key] as string[];
    }
  }

  return next;
}

function loadPrompt(fileName: string) {
  return readFileSync(
    path.join(process.cwd(), "lib", "prompts", fileName),
    "utf8",
  );
}

function buildStage1Input(submission: {
  name: string;
  email: string;
  age: number | null;
  location: string | null;
  gender: string | null;
  profile_image_reference: string | null;
  answers: Record<string, unknown>;
}) {
  return JSON.stringify(
    {
      name: submission.name,
      email: submission.email,
      age: submission.age,
      location: submission.location,
      gender: submission.gender,
      profile_image: {
        type: "avatar",
        reference: submission.profile_image_reference,
      },
      answers: submission.answers,
    },
    null,
    2,
  );
}

export async function generateReportForSubmission(submissionId: string) {
  const submission = await getSubmissionForGeneration(submissionId);
  if (!submission) {
    throw new Error("Submission not found or not paid");
  }

  if (submission.report_status === "ready" && submission.report_json) {
    return submission.report_json as StoredReportJson;
  }

  await setReportStatus(submissionId, "generating");

  try {
    const stage1Prompt = loadPrompt("stage1.md");
    const stage1Input = buildStage1Input(submission);
    const stage1 = await runPromptToJson(stage1Prompt, stage1Input);

    const stage2Prompt = loadPrompt("stage2.md");
    let stage2 = (await runPromptToJson(
      stage2Prompt,
      JSON.stringify(stage1, null, 2),
    )) as Stage2ReportJson;

    const overflows = findStage2Violations(stage2);
    const voiceIssues = findVoiceViolations(stage2, submission.name);
    const echoIssues = findFormEchoViolations(stage2, submission.answers);
    const issues = [...overflows, ...voiceIssues, ...echoIssues];
    if (issues.length > 0) {
      const retry = await runPromptToJson(
        STAGE2_RETRY_PROMPT,
        buildRetryUserPrompt(issues, stage2),
      );
      stage2 = mergeStage2Retry(stage2, retry);
    }

    stage2 = enforceStage2Limits(stage2);

    const reportJson: StoredReportJson = {
      stage1,
      stage2,
      generated_at: new Date().toISOString(),
    };

    await saveGeneratedReport(submissionId, reportJson);
    return reportJson;
  } catch (error) {
    await setReportStatus(submissionId, "failed");
    throw error;
  }
}
