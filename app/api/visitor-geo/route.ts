import { NextResponse } from "next/server";
import { getVisitorGeo } from "@/lib/visitor-geo";

export async function GET() {
  const geo = await getVisitorGeo();
  return NextResponse.json({
    countryName: geo.countryName,
    code: geo.code,
  });
}
