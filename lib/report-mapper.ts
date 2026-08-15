import {
  DISPLAY_LIMITS,
  enforceStage2Limits,
  parseMissingLines,
  trimDisplayField,
} from "@/lib/report-limits";
import type { ReportData } from "@/lib/report-preview-data";

export type Stage2ReportJson = {
  creator_identity_title?: string;
  goal_line?: string;
  niche_explanation?: string;
  why_fits_bullets?: string[];
  why_fits_paragraph?: string;
  strengths_list?: string[];
  strengths_summary?: string;
  blockers_list?: string[];
  blockers_summary?: string;
  next_move_bullets?: string[];
  missing_paragraph?: string;
  gameplan_transition_line?: string;
  cta_button_text?: string;
};

export type StoredReportJson = {
  stage1?: Record<string, unknown>;
  stage2: Stage2ReportJson;
  generated_at: string;
};

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown, length: number, fallback = ""): string[] {
  if (!Array.isArray(value)) {
    return Array.from({ length }, () => fallback);
  }

  const items = value.filter((item): item is string => typeof item === "string");
  while (items.length < length) {
    items.push(fallback);
  }

  return items.slice(0, length);
}

export function mapSubmissionToReportData(
  submission: {
    name: string;
    age: number | string | null;
    location: string | null;
    profile_image_reference: string | null;
  },
  reportJson: StoredReportJson,
): ReportData {
  const stage2 = enforceStage2Limits(reportJson.stage2);
  const profileFile = submission.profile_image_reference || "avatar_male_01.svg";
  const profileImage = profileFile.startsWith("/")
    ? profileFile
    : profileFile.startsWith("http")
      ? profileFile
      : `/avatars/${profileFile}`;

  const [gameplanCopyLine1, gameplanCopyLine2, gameplanCopyLine3] =
    parseMissingLines(asString(stage2.missing_paragraph));

  return {
    name: trimDisplayField(submission.name || "Creator", DISPLAY_LIMITS.name),
    age: submission.age ?? "",
    location: trimDisplayField(
      submission.location || "",
      DISPLAY_LIMITS.location,
    ),
    goal: asString(stage2.goal_line, "I want to build something meaningful online."),
    creatorIdentity: asString(stage2.creator_identity_title, "Creator"),
    profileImage,
    identityDescription: asString(stage2.niche_explanation),
    whyItFits: asStringArray(stage2.why_fits_bullets, 5),
    whyItFitsDescription: asString(stage2.why_fits_paragraph),
    strengths: asStringArray(stage2.strengths_list, 3),
    strengthsDescription: asString(stage2.strengths_summary),
    blockers: asStringArray(stage2.blockers_list, 3),
    blockersDescription: asString(stage2.blockers_summary),
    nextMoves: asStringArray(stage2.next_move_bullets, 6),
    gameplanCopyLine1,
    gameplanCopyLine2,
    gameplanCopyLine3,
  };
}
