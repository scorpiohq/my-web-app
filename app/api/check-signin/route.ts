import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

function normalizeName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function namesMatch(input: string, stored: string) {
  const typed = normalizeName(input);
  const saved = normalizeName(stored);

  if (!typed || !saved) {
    return false;
  }

  if (typed === saved) {
    return true;
  }

  const typedFirst = typed.split(" ")[0];
  const savedFirst = saved.split(" ")[0];

  return typedFirst === savedFirst && (typed === typedFirst || saved === savedFirst);
}

export async function POST(request: Request) {
  const body = await request.json();
  const email = (body.email || "").trim().toLowerCase();
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!email || !name) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select("public_id, name, payment_status")
    .ilike("email", email)
    .eq("payment_status", "paid")
    .order("created_at", { ascending: false })
    .limit(1);

  if (
    error ||
    !data ||
    data.length === 0 ||
    !data[0].public_id ||
    !namesMatch(name, String(data[0].name || ""))
  ) {
    return NextResponse.json({ found: false }, { status: 404 });
  }

  return NextResponse.json({ found: true, id: data[0].public_id });
}
