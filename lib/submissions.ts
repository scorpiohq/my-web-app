import { supabaseAdmin } from "@/lib/supabase-admin";

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
  profile_image_type: string;
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
        profile_image_type: "avatar",
        profile_image_reference: finalImageReference,
        payment_status: "pending",
      },
    ])
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id as string;
}

export async function markSubmissionPaid(submissionId: string) {
  const { error } = await supabaseAdmin
    .from("submissions")
    .update({ payment_status: "paid" })
    .eq("id", submissionId)
    .eq("payment_status", "pending");

  if (error) {
    throw new Error(error.message);
  }
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

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .update({ review: payload })
    .eq("id", submissionId)
    .eq("payment_status", "paid")
    .is("review", null)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Review already submitted or report not found");
  }
}
