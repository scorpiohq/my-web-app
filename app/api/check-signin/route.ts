import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select("public_id, payment_status")
    .ilike("email", email)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0 || !data[0].public_id) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  return NextResponse.json({ found: true, id: data[0].public_id });
}
