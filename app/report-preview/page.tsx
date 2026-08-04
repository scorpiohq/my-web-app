import ReportTemplate from "@/components/ReportTemplate";

const sampleData = {
  name: "Lewis Hamilton",
  age: 20,
  location: "London, United Kingdom",
  goal_line:
    "I want to build something online that can help me become financially free and enjoy my life.",
  profile_image_url: "https://placehold.co/200x200",
  creator_identity_title: "Experience Driven Travel Creator",
  identity_summary:
    "This is a placeholder identity summary — Stage 2 will generate the real version once the AI is wired in.",
  why_fits_bullets: [
    "You already enjoy this topic",
    "You have real-life experience",
    "You naturally consume content in this area",
    "You have stories to share consistently",
  ],
  why_fits_paragraph:
    "Placeholder paragraph explaining why this direction fits.",
  strengths_bullets: [
    "Placeholder strength one",
    "Placeholder strength two",
    "Placeholder strength three",
  ],
  strengths_paragraph: "Placeholder strengths paragraph.",
  blockers_bullets: [
    "Placeholder blocker one",
    "Placeholder blocker two",
    "Placeholder blocker three",
  ],
  blockers_paragraph: "Placeholder blockers paragraph.",
  next_move_bullets: [
    "Create an account",
    "Make your first post",
    "Post consistently for 2 weeks",
  ],
  missing_paragraph:
    "Placeholder text about what is still missing before this becomes reality.",
};

export default function ReportPreview() {
  return <ReportTemplate report={sampleData} />;
}
