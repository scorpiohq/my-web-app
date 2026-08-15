import type { Stage2ReportJson } from "@/lib/report-mapper";

export type SlotLimit = {
  maxWords: number;
  maxChars: number;
  minWords?: number;
  minChars?: number;
};

export const STAGE2_LIMITS = {
  creator_identity_title: { maxWords: 4, maxChars: 30, minWords: 2, minChars: 12 },
  goal_line: { maxWords: 20, maxChars: 100, minWords: 12, minChars: 55 },
  niche_explanation: { maxWords: 42, maxChars: 250, minWords: 28, minChars: 170 },
  why_fits_bullet_short: { maxWords: 8, maxChars: 45, minWords: 5, minChars: 30 },
  why_fits_bullet_long: { maxWords: 15, maxChars: 90, minWords: 10, minChars: 62 },
  why_fits_paragraph: { maxWords: 42, maxChars: 250, minWords: 28, minChars: 170 },
  list_item: { maxWords: 8, maxChars: 45, minWords: 5, minChars: 30 },
  box_summary: { maxWords: 40, maxChars: 240, minWords: 26, minChars: 160 },
  next_move_item: { maxWords: 8, maxChars: 45, minWords: 5, minChars: 28 },
  missing_line: { maxWords: 10, maxChars: 52, minWords: 6, minChars: 34 },
} as const;

export const DISPLAY_LIMITS = {
  name: { maxWords: 6, maxChars: 28 },
  location: { maxWords: 6, maxChars: 32 },
} as const;

export type Stage2Violation = {
  path: string;
  value: string;
  limit?: SlotLimit;
  reason?: string;
};

export function countWords(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function exceedsLimit(text: string, limit: SlotLimit) {
  return countWords(text) > limit.maxWords || text.length > limit.maxChars;
}

export function isUnderfilled(text: string, limit: SlotLimit) {
  const trimmed = text.trim();
  if (!trimmed) return true;
  if (limit.minWords != null && countWords(trimmed) < limit.minWords) return true;
  if (limit.minChars != null && trimmed.length < limit.minChars) return true;
  return false;
}

function lengthIssue(text: string, limit: SlotLimit) {
  if (exceedsLimit(text, limit)) {
    return `too long — max ${limit.maxWords} words AND ${limit.maxChars} characters`;
  }
  if (isUnderfilled(text, limit)) {
    const minWords = limit.minWords ?? 0;
    const minChars = limit.minChars ?? 0;
    return `too short for the frame — write at least ${minWords} words AND ${minChars} characters, and stay under ${limit.maxWords} words / ${limit.maxChars} characters`;
  }
  return null;
}

export function trimToLimit(text: string, limit: SlotLimit) {
  let next = text.trim().replace(/\s+/g, " ");
  if (!next) return "";

  const words = next.split(" ");
  if (words.length > limit.maxWords) {
    next = words.slice(0, limit.maxWords).join(" ");
  }

  if (next.length > limit.maxChars) {
    next = next.slice(0, limit.maxChars).trim();
    const lastSpace = next.lastIndexOf(" ");
    if (lastSpace > 12) {
      next = next.slice(0, lastSpace).trim();
    }
  }

  return next;
}

export function parseMissingLines(missingParagraph: string): [string, string, string] {
  const raw = missingParagraph.replace(/\r\n/g, "\n").trim();
  if (!raw) {
    return ["", "", ""];
  }

  const fromNewlines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (fromNewlines.length >= 3) {
    return [fromNewlines[0], fromNewlines[1], fromNewlines[2]];
  }

  if (fromNewlines.length === 2) {
    return [fromNewlines[0], fromNewlines[1], ""];
  }

  const words = raw.split(/\s+/);
  if (words.length <= 10) {
    return [raw, "", ""];
  }

  const third = Math.ceil(words.length / 3);
  return [
    words.slice(0, third).join(" "),
    words.slice(third, third * 2).join(" "),
    words.slice(third * 2).join(" "),
  ];
}

function collectArrayViolations(
  values: unknown,
  expectedLength: number,
  getLimit: (index: number) => SlotLimit,
  prefix: string,
  violations: Stage2Violation[],
) {
  if (!Array.isArray(values)) return;

  values.slice(0, expectedLength).forEach((item, index) => {
    if (typeof item !== "string") return;
    const limit = getLimit(index);
    const reason = lengthIssue(item, limit);
    if (reason) {
      violations.push({ path: `${prefix}[${index}]`, value: item, limit, reason });
    }
  });
}

export function findStage2Violations(stage2: Stage2ReportJson): Stage2Violation[] {
  const violations: Stage2Violation[] = [];

  const strings: Array<[keyof Stage2ReportJson, SlotLimit]> = [
    ["creator_identity_title", STAGE2_LIMITS.creator_identity_title],
    ["goal_line", STAGE2_LIMITS.goal_line],
    ["niche_explanation", STAGE2_LIMITS.niche_explanation],
    ["why_fits_paragraph", STAGE2_LIMITS.why_fits_paragraph],
    ["strengths_summary", STAGE2_LIMITS.box_summary],
    ["blockers_summary", STAGE2_LIMITS.box_summary],
  ];

  for (const [key, limit] of strings) {
    const value = stage2[key];
    if (typeof value !== "string") continue;
    const reason = lengthIssue(value, limit);
    if (reason) {
      violations.push({ path: key, value, limit, reason });
    }
  }

  collectArrayViolations(
    stage2.why_fits_bullets,
    5,
    (index) =>
      index === 4
        ? STAGE2_LIMITS.why_fits_bullet_long
        : STAGE2_LIMITS.why_fits_bullet_short,
    "why_fits_bullets",
    violations,
  );
  collectArrayViolations(
    stage2.strengths_list,
    3,
    () => STAGE2_LIMITS.list_item,
    "strengths_list",
    violations,
  );
  collectArrayViolations(
    stage2.blockers_list,
    3,
    () => STAGE2_LIMITS.list_item,
    "blockers_list",
    violations,
  );
  collectArrayViolations(
    stage2.next_move_bullets,
    6,
    () => STAGE2_LIMITS.next_move_item,
    "next_move_bullets",
    violations,
  );

  parseMissingLines(stage2.missing_paragraph || "").forEach((line, index) => {
    const reason = lengthIssue(line, STAGE2_LIMITS.missing_line);
    if (reason) {
      violations.push({
        path: `missing_paragraph[${index}]`,
        value: line,
        limit: STAGE2_LIMITS.missing_line,
        reason,
      });
    }
  });

  return violations;
}

const THIRD_PERSON_RE = /\b(he|she|him|his|her|hers|himself|herself)\b/i;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readerNamePattern(personName: string) {
  const trimmed = personName.trim();
  const parts = trimmed.split(/\s+/).filter((part) => part.length >= 3);
  if (!trimmed || parts.length === 0) return null;

  const variants = new Set<string>([trimmed, parts[0]]);
  return new RegExp(
    `\\b(${[...variants].map(escapeRegExp).join("|")})(?:['’]s)?\\b`,
    "i",
  );
}

function voiceProblem(text: string, nameRe: RegExp | null) {
  if (nameRe?.test(text)) {
    return "uses the reader's name — rewrite as you/your";
  }
  if (THIRD_PERSON_RE.test(text)) {
    return "uses he/she/his/her — rewrite as you/your";
  }
  return null;
}

function collectStage2Slots(stage2: Stage2ReportJson) {
  const slots: Array<{ path: string; value: string }> = [];
  const stringKeys: Array<keyof Stage2ReportJson> = [
    "creator_identity_title",
    "goal_line",
    "niche_explanation",
    "why_fits_paragraph",
    "strengths_summary",
    "blockers_summary",
    "missing_paragraph",
  ];

  for (const key of stringKeys) {
    const value = stage2[key];
    if (typeof value === "string" && value.trim()) {
      slots.push({ path: key, value });
    }
  }

  const arrays: Array<[keyof Stage2ReportJson, number]> = [
    ["why_fits_bullets", 5],
    ["strengths_list", 3],
    ["blockers_list", 3],
    ["next_move_bullets", 6],
  ];

  for (const [key, length] of arrays) {
    const values = stage2[key];
    if (!Array.isArray(values)) continue;
    values.slice(0, length).forEach((item, index) => {
      if (typeof item === "string" && item.trim()) {
        slots.push({ path: `${key}[${index}]`, value: item });
      }
    });
  }

  return slots;
}

export function findVoiceViolations(
  stage2: Stage2ReportJson,
  personName: string,
): Stage2Violation[] {
  const nameRe = readerNamePattern(personName);
  const violations: Stage2Violation[] = [];

  for (const slot of collectStage2Slots(stage2)) {
    const reason = voiceProblem(slot.value, nameRe);
    if (reason) {
      violations.push({ path: slot.path, value: slot.value, reason });
    }
  }

  return violations;
}

const ECHO_SKIP_PATHS = new Set(["creator_identity_title", "goal_line"]);
const PLATFORM_ANSWER_RE = /^(instagram|youtube|tiktok|threads\s*\/\s*x|threads|x)$/i;
const ECHO_WRAPPERS = new Set([
  "a",
  "about",
  "already",
  "an",
  "and",
  "can",
  "daily",
  "dedicate",
  "dedicated",
  "excited",
  "for",
  "have",
  "in",
  "interest",
  "invest",
  "of",
  "on",
  "or",
  "plan",
  "planning",
  "plans",
  "strong",
  "the",
  "to",
  "willing",
  "you",
  "your",
  "youre",
]);

function normalizeForEcho(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s$]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function flattenFormAnswers(answers: Record<string, unknown>) {
  const out: string[] = [];

  for (const [key, value] of Object.entries(answers)) {
    if (key === "name" || key === "email") continue;
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (typeof item !== "string") continue;
      const text = item.trim();
      if (!text || text.includes("@") || text.length > 90) continue;
      out.push(text);
    }
  }

  return out;
}

function echoPhrases(answer: string) {
  const normalized = normalizeForEcho(answer);
  const parts = normalized
    .split(/\s+(?:and|&)\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const phrases = new Set<string>();

  if (normalized.length >= 8) phrases.add(normalized);
  for (const part of parts) {
    if (part.length >= 10 || /\$|\d/.test(part)) {
      phrases.add(part);
    }
  }

  return [...phrases];
}

function isMostlyFormEcho(slot: string, phrase: string) {
  if (slot === phrase) return true;
  const longer = slot.length >= phrase.length ? slot : phrase;
  const shorter = slot.length >= phrase.length ? phrase : slot;
  if (shorter.length < 8 || !longer.includes(shorter)) return false;

  const leftover = longer
    .replace(shorter, " ")
    .replace(/\s+/g, " ")
    .trim();
  const meaningful = leftover
    .split(" ")
    .filter((word) => word && !ECHO_WRAPPERS.has(word));

  return meaningful.length <= 2;
}

export function findFormEchoViolations(
  stage2: Stage2ReportJson,
  answers: Record<string, unknown>,
): Stage2Violation[] {
  const formAnswers = flattenFormAnswers(answers);
  if (formAnswers.length === 0) return [];

  const violations: Stage2Violation[] = [];

  for (const slot of collectStage2Slots(stage2)) {
    const pathName = slot.path.replace(/\[\d+\]$/, "");
    if (ECHO_SKIP_PATHS.has(pathName)) continue;

    const normalizedSlot = normalizeForEcho(slot.value);
    if (!normalizedSlot) continue;

    for (const answer of formAnswers) {
      if (slot.path.startsWith("next_move") && PLATFORM_ANSWER_RE.test(answer)) {
        continue;
      }

      const matched = echoPhrases(answer).some((phrase) =>
        isMostlyFormEcho(normalizedSlot, phrase),
      );
      if (matched) {
        violations.push({
          path: slot.path,
          value: slot.value,
          reason: `restates a form answer ("${answer}") instead of interpreting what it means for them`,
        });
        break;
      }
    }
  }

  return violations;
}

function trimArray(
  values: unknown,
  expectedLength: number,
  getLimit: (index: number) => SlotLimit,
) {
  if (!Array.isArray(values)) {
    return Array.from({ length: expectedLength }, () => "");
  }

  return Array.from({ length: expectedLength }, (_, index) => {
    const item = values[index];
    return typeof item === "string" ? trimToLimit(item, getLimit(index)) : "";
  });
}

export function enforceStage2Limits(stage2: Stage2ReportJson): Stage2ReportJson {
  const missingLines = parseMissingLines(stage2.missing_paragraph || "").map(
    (line) => trimToLimit(line, STAGE2_LIMITS.missing_line),
  );

  return {
    ...stage2,
    creator_identity_title: trimToLimit(
      stage2.creator_identity_title || "",
      STAGE2_LIMITS.creator_identity_title,
    ),
    goal_line: trimToLimit(stage2.goal_line || "", STAGE2_LIMITS.goal_line),
    niche_explanation: trimToLimit(
      stage2.niche_explanation || "",
      STAGE2_LIMITS.niche_explanation,
    ),
    why_fits_bullets: trimArray(stage2.why_fits_bullets, 5, (index) =>
      index === 4
        ? STAGE2_LIMITS.why_fits_bullet_long
        : STAGE2_LIMITS.why_fits_bullet_short,
    ),
    why_fits_paragraph: trimToLimit(
      stage2.why_fits_paragraph || "",
      STAGE2_LIMITS.why_fits_paragraph,
    ),
    strengths_list: trimArray(stage2.strengths_list, 3, () => STAGE2_LIMITS.list_item),
    strengths_summary: trimToLimit(
      stage2.strengths_summary || "",
      STAGE2_LIMITS.box_summary,
    ),
    blockers_list: trimArray(stage2.blockers_list, 3, () => STAGE2_LIMITS.list_item),
    blockers_summary: trimToLimit(
      stage2.blockers_summary || "",
      STAGE2_LIMITS.box_summary,
    ),
    next_move_bullets: trimArray(
      stage2.next_move_bullets,
      6,
      () => STAGE2_LIMITS.next_move_item,
    ),
    missing_paragraph: missingLines.join("\n"),
    gameplan_transition_line: "",
    cta_button_text: "",
  };
}

export function trimDisplayField(
  value: string,
  limit: SlotLimit = DISPLAY_LIMITS.name,
) {
  return trimToLimit(value, limit);
}
