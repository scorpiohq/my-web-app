import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json();

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .insert([
      {
        name: body.name,
        age: body.age,
        location: body.location,
        gender: body.gender,
        answers: body.answers,
        profile_image_type: body.profile_image_type,
        profile_image_reference: body.profile_image_reference,
        payment_status: "pending",
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
