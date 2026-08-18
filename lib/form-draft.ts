const FORM_DRAFT_KEY = "blueprint-form-draft-v1";

export type FormDraft = {
  step: number;
  responses: Record<string, string | string[]>;
};

export function readFormDraft(): FormDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(FORM_DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FormDraft;
    if (
      !parsed ||
      typeof parsed.step !== "number" ||
      !parsed.responses ||
      typeof parsed.responses !== "object"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeFormDraft(draft: FormDraft) {
  try {
    window.localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function clearFormDraft() {
  try {
    window.localStorage.removeItem(FORM_DRAFT_KEY);
  } catch {
    // Ignore.
  }
}
