import { readFileSync } from "fs";
import path from "path";
import { runPromptToJson } from "@/lib/llm";
import type { StoredReportJson } from "@/lib/report-mapper";
import {
  getSubmissionForGeneration,
  saveGeneratedReport,
  setReportStatus,
} from "@/lib/submissions";

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
  profile_image_type: string | null;
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
        type: submission.profile_image_type || "avatar",
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
    const stage2 = (await runPromptToJson(
      stage2Prompt,
      JSON.stringify(stage1, null, 2),
    )) as StoredReportJson["stage2"];

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
