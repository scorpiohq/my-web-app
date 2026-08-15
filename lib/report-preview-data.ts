export type ReportData = {
  name: string;
  age: number | string;
  location: string;
  goal: string;
  creatorIdentity: string;
  profileImage: string;
  identityDescription: string;
  whyItFits: string[];
  whyItFitsDescription: string;
  strengths: string[];
  strengthsDescription: string;
  blockers: string[];
  blockersDescription: string;
  nextMoves: string[];
  gameplanCopyLine1: string;
  gameplanCopyLine2: string;
  gameplanCopyLine3: string;
};

export const previewReportData: ReportData = {
  name: "Lewis Hamilton",
  age: 20,
  location: "London, United Kingdom",
  goal: "I want to Build Something online, that can help me become financially free & able to enjoy my life.",
  creatorIdentity: "Experience Driven Travel Creator",
  profileImage: "/avatars/avatar_male_01.svg",
  identityDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day filled.",
  whyItFits: [
    "You already enjoy this topic",
    "You have real-life experience",
    "You naturally consume content in this area",
    "You have stories to share consistently",
    "Thoughts in your mind about these, are potential viral content, just need to be shared smartly",
  ],
  whyItFitsDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day filled.",
  strengths: [
    "Write a strong title that includes a keyword",
    "Use short paragraphs, no longer than 4 lines",
    "Finish the post with a clear CTA",
  ],
  strengthsDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day.",
  blockers: [
    "Write a strong title that includes a keyword",
    "Use short paragraphs, no longer than 4 lines",
    "Finish the post with a clear CTA",
  ],
  blockersDescription:
    "The morning sun rises slowly over the quiet hills, casting a golden light across the dewy grass. A gentle breeze whispers through the tall trees, waking the sleepy birds from their sweet dreams. Nature breathes deeply, welcoming a brand new day.",
  nextMoves: [
    "Create an (platform) account",
    "First post, share why you made this Account?",
    "Create 10 Posts without focusing on results.",
    "Believe yourself, and Trust the Plan",
    "The More you enjoy, more you create better.",
    "The More you enjoy, more you create better.",
  ],
  gameplanCopyLine1:
    "A direction, niche, Experiences worth sharing, & Enough time to start, The only thing missing now is a system that turns this into reality.",
  gameplanCopyLine2: "",
  gameplanCopyLine3: "",
};
