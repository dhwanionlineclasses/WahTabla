import { weeklyNotesLinks, theoryLinks } from "@/data/constants/notes";

export function getThisWeekNoteLink(videoTitle: string): string | null {
  const match = videoTitle.match(/week\s*(\d+)/i);
  if (!match) return null; // Return null if no valid week number is found

  const weekKey = `week-${parseInt(match[1], 10)}` as keyof typeof weeklyNotesLinks;
  return weeklyNotesLinks[weekKey] || null; // Return the corresponding link or null if not found
}

export const getTheoryLink = (videoTitle: string): string | null => {
  // Extract the week number from the title
  const match = videoTitle.match(/\d+/);
  if (!match) return null; // No number found, return null

  const weekNumber = parseInt(match[0], 10);
  const monthNumber = Math.ceil(weekNumber / 4);

  // Create the key and assert it as a valid key of theoryLinks
  const key = `month-${monthNumber}-theory` as keyof typeof theoryLinks;

  return theoryLinks[key] || null;
};