import { NextResponse } from "next/server";

/**
 * Lightweight waitlist capture for /gouti/gameplan-waitlist.
 * Stores nothing yet — validates and acknowledges so the UI can complete.
 * Hook to Supabase / email later without changing the page.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      name?: string;
    };

    const email = body.email?.trim().toLowerCase() ?? "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      email,
      name: body.name?.trim() || null,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not join waitlist." },
      { status: 500 },
    );
  }
}
