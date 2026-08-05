import { NextResponse } from "next/server";
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

function pickAvatar(gender: string) {
  const key = (gender || "").toLowerCase();
  const list = avatarsByGender[key] || avatarsByGender["male"];
  return list[Math.floor(Math.random() * list.length)];
}

export async function POST(request: Request) {
  const body = await request.json();

  const finalImageReference = pickAvatar(body.gender);

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .insert([
      {
        name: body.name,
        age: body.age,
        location: body.location,
        gender: body.gender,
        answers: body.answers,
        profile_image_type: "avatar",
        profile_image_reference: finalImageReference,
        payment_status: "pending",
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
