import { supabaseAdmin } from "@/lib/supabase-admin";
import type { StoredReportJson } from "@/lib/report-mapper";

export type ReportStatus = "pending" | "generating" | "ready" | "failed";

const avatarsByGender: Record<string, string[]> = {
  male: [
    "avatar_male_01.svg",
    "avatar_male_02.svg",
    "avatar_male_03.svg",
    "avatar_male_04.svg",
    "avatar_male_05.svg",
  ],
  female: [
    "avatar_female_01.svg",
    "avatar_female_02.svg",
    "avatar_female_03.svg",
    "avatar_female_04.svg",
    "avatar_female_05.svg",
  ],
};

export type SubmissionPayload = {
  name: string;
  email: string;
  age: number;
  location: string;
  gender: string | null;
  answers: Record<string, unknown>;
};

function pickAvatar(gender: string | null) {
  const key = (gender || "").toLowerCase();
  const list = avatarsByGender[key] || avatarsByGender.male;
  return list[Math.floor(Math.random() * list.length)];
}

export async function createPendingSubmission(payload: SubmissionPayload) {
  const finalImageReference = pickAvatar(payload.gender);

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .insert([
      {
        name: payload.name,
        email: payload.email,
        age: payload.age,
        location: payload.location,
        gender: payload.gender,
        answers: payload.answers,
        profile_image_reference: finalImageReference,
        payment_status: "pending",
        report_status: "pending",
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return String(data.id);
}

export async function markSubmissionPaid(submissionId: string) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .update({
      payment_status: "paid",
      report_status: "pending",
    })
    .eq("id", submissionId)
    .eq("payment_status", "pending");

  if (error) {
    throw new Error(error.message);
  }
}

export async function setReportStatus(
  submissionId: string,
  reportStatus: ReportStatus,
) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .update({ report_status: reportStatus })
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function saveGeneratedReport(
  submissionId: string,
  reportJson: StoredReportJson,
) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .update({
      report_json: reportJson,
      report_status: "ready",
    })
    .eq("id", submissionId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getSubmissionForGeneration(submissionId: string) {
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(
      "id, name, email, age, location, gender, answers, profile_image_reference, payment_status, report_status, report_json",
    )
    .eq("id", submissionId)
    .eq("payment_status", "paid")
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    answers: (data.answers || {}) as Record<string, unknown>,
    report_json: data.report_json as StoredReportJson | null,
  };
}

export async function getSubmissionReportStatus(submissionId: string) {
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select("id, payment_status, report_status")
    .eq("id", submissionId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as {
    id: string;
    payment_status: string;
    report_status: ReportStatus;
  };
}

export async function getSubmissionForReportPage(submissionId: string) {
  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select(
      "id, name, age, location, profile_image_reference, payment_status, report_status, report_json",
    )
    .eq("id", submissionId)
    .eq("payment_status", "paid")
    .single();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    report_json: data.report_json as StoredReportJson | null,
  };
}

export type SubmissionReview = {
  rating: number;
  comment: string;
  submitted_at: string;
};

export async function saveSubmissionReview(
  submissionId: string,
  review: Pick<SubmissionReview, "rating" | "comment">,
) {
  const payload: SubmissionReview = {
    rating: review.rating,
    comment: review.comment,
    submitted_at: new Date().toISOString(),
  };

  const { data: submission, error: loadError } = await supabaseAdmin
    .from("submissions")
    .select("id, payment_status, review")
    .eq("id", submissionId)
    .maybeSingle();

  if (loadError) {
    throw new Error(loadError.message);
  }

  if (!submission || submission.payment_status !== "paid") {
    throw new Error("Report not found");
  }

  const existing = submission.review as SubmissionReview | null;
  if (
    existing &&
    typeof existing === "object" &&
    typeof existing.rating === "number"
  ) {
    const alreadySubmitted = new Error("Review already submitted");
    alreadySubmitted.name = "ReviewAlreadySubmitted";
    throw alreadySubmitted;
  }

  const { error: saveError } = await supabaseAdmin
    .from("submissions")
    .update({ review: payload })
    .eq("id", submissionId)
    .eq("payment_status", "paid");

  if (saveError) {
    throw new Error(saveError.message);
  }
}

export function getAppBaseUrl(request?: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (configuredUrl) {
    const normalized = configuredUrl.replace(/\/$/, "");
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
      return normalized;
    }
    return `https://${normalized}`;
  }

  if (request) {
    const host =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "https";

    if (host) {
      return `${protocol}://${host}`;
    }

    return new URL(request.url).origin;
  }

  return "http://127.0.0.1:3000";
}

export async function enqueueReportGeneration(
  submissionId: string,
  request?: Request,
) {
  const baseUrl = getAppBaseUrl(request);
  const secret = process.env.INTERNAL_API_SECRET;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
  }

  const response = await fetch(`${baseUrl}/api/generate-report`, {
    method: "POST",
    headers,
    body: JSON.stringify({ submissionId }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      `Failed to enqueue report generation (${response.status}): ${message}`,
    );
  }
}

export async function triggerReportGeneration(submissionId: string) {
  const baseUrl = getAppBaseUrl();
  const secret = process.env.INTERNAL_API_SECRET;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (secret) {
    headers.Authorization = `Bearer ${secret}`;
  }

  void fetch(`${baseUrl}/api/generate-report`, {
    method: "POST",
    headers,
    body: JSON.stringify({ submissionId }),
  }).catch((error) => {
    console.error("Fire-and-forget report generation failed:", error);
  });
}
