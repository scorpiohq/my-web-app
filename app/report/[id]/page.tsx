import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import ReportTemplate from "@/components/ReportTemplate";

export default async function ReportPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const { data, error } = await supabaseAdmin
    .from("submissions")
    .select("id, name, age, location, profile_image_reference")
    .eq("id", id)
    .eq("payment_status", "paid")
    .single();

  if (error || !data) {
    return notFound();
  }

  const profileImageUrl = data.profile_image_reference
    ? data.profile_image_reference.startsWith("http")
      ? data.profile_image_reference
      : `/avatars/${data.profile_image_reference}`
    : "https://placehold.co/200x200";

  const report = {
    name: data.name || "Creator",
    age: data.age || "",
    location: data.location || "",
    goal_line:
      "Your personalized blueprint is ready — this summary is built from your answers.",
    profile_image_url: profileImageUrl,
    creator_identity_title: "Personalized Creator Identity",
    identity_summary:
      "This report is generated from the email you used to create your blueprint and shows your recommended creator direction.",
    why_fits_bullets: [
      "You already enjoy this topic",
      "You have meaningful experience to share",
      "You can connect authentically with an audience",
      "You are positioned to create consistent content",
      "Your voice can become a trusted perspective",
    ],
    why_fits_paragraph:
      "Your responses show a strong match to this content direction, and this report highlights why it fits your strengths.",
    strengths_bullets: [
      "You have a clear personal story to share",
      "You can create content consistently",
      "You already understand what your audience wants",
    ],
    strengths_paragraph:
      "These strengths make this direction a strong foundation for your creator growth.",
    blockers_bullets: [
      "You may need more confidence in sharing",
      "You might be unsure where to start",
      "You may want a clearer content plan",
    ],
    blockers_paragraph:
      "These are the obstacles this blueprint will help you overcome.",
    next_move_bullets: [
      "Clarify your first three content ideas",
      "Create a simple posting routine",
      "Share one personal story this week",
      "Use your unique experience as your angle",
      "Show your audience what you care about",
      "Stay consistent and review what works",
    ],
    missing_paragraph:
      "The final missing piece is a repeatable system that turns your creator direction into real progress.",
  };

  return <ReportTemplate report={report} />;
}
