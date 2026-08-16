import { readFileSync } from "fs";
import path from "path";
import { runPromptToJson } from "@/lib/llm";
import {
  enforceStage2Limits,
  findCopyShapeViolations,
  findFormEchoViolations,
  findIncompleteSentenceViolations,
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
- Help them see the first piece of content they would make. Use first_content_picture from CONTEXT.
- If writing_inputs are thin or empty, do not invent a life story. Be honest that this part is still open, then show the way forward. Never scold. Never say they didn't share enough.
- If a slot is too long, rewrite shorter and complete — do not cut mid-thought. A finished short sentence beats a broken long one.
- Compact rules are for LIST LINES only (why_fits_bullets 1-4, strengths_list, blockers_list, next_move_bullets): one line, no extra clause, drop "personal" next to you/your, use & instead of and if tight.
- Paragraphs (niche_explanation, why_fits_paragraph, summaries, missing_paragraph, goal_line) have room. Keep them personal and full. you/your/personal are fine there.
- If a slot is too short, add a true detail from CONTEXT (topic, format, platform, first_piece) until it fills the frame. Do not pad with empty phrases.
- Every paragraph and every list line must finish as a complete pointer. Start and end the thought.
- why_fits_paragraph must open with "It fits you because" or "This direction fits you because".
- missing_paragraph: one continuous paragraph, no newline characters. 18-32 words AND 110-175 characters. End by handing off to GAMEPLAN (they still need a system that turns the first post into the week).
- why_fits_bullets: return all 5 items if listed. Items 1-4: 4-8 words AND 22-45 characters. Item 5: 8-14 words AND 48-85 characters. Pointer style. One line.
- strengths_list / blockers_list: return all 3 items if listed. Each 4-8 words AND 22-45 characters. Pointer style. One line.
- next_move_bullets: return all 6 items if listed. Each 4-8 words AND 22-45 characters. Item 6 is "That's your first week. Done." Never "stop there."
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
  stage1: Record<string, unknown>,
) {
  const fields = [...new Set(violations.map((item) => fieldNameFromPath(item.path)))];
  const context = JSON.stringify(
    {
      writing_inputs: stage1.writing_inputs ?? null,
      first_content_picture: stage1.first_content_picture ?? null,
      creative_direction: stage1.creative_direction ?? null,
    },
    null,
    2,
  );

  const fieldBlock = fields
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

  return `CONTEXT:\n${context}\n\n${fieldBlock}`;
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
    const value = patch[key];
    if (typeof value === "string") {
      Object.assign(next, { [key]: value });
    }
  }

  for (const key of arrayKeys) {
    const value = patch[key];
    if (Array.isArray(value)) {
      Object.assign(next, { [key]: value as string[] });
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

export async function generateReportForSubmission(
  submissionId: string,
  options?: { force?: boolean },
) {
  const submission = await getSubmissionForGeneration(submissionId);
  if (!submission) {
    throw new Error("Submission not found or not paid");
  }

  if (
    !options?.force &&
    submission.report_status === "ready" &&
    submission.report_json
  ) {
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
    const incompleteIssues = findIncompleteSentenceViolations(stage2);
    const shapeIssues = findCopyShapeViolations(stage2);
    const issues = [
      ...overflows,
      ...voiceIssues,
      ...echoIssues,
      ...incompleteIssues,
      ...shapeIssues,
    ];
    if (issues.length > 0) {
      const retry = await runPromptToJson(
        STAGE2_RETRY_PROMPT,
        buildRetryUserPrompt(issues, stage2, stage1),
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
