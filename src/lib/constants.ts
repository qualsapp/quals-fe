import { Option } from "@/types/global";

export const days: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const sportList: Option[] = [
  { value: "badminton", label: "Badminton" },
  { value: "padel", label: "Padel" },
];

export const locationList: Option[] = [
  { value: "bandung", label: "Bandung" },
  { value: "jakarta", label: "Jakarta" },
];

export const levelList: Option[] = [
  { label: "Beginner", value: "weekly" },
  { label: "Intermediete", value: "intermediete" },
  { label: "Advance", value: "advance" },
];

export const padelScoreType: Option[] = [
  { label: "Race To", value: "race_to" },
  { label: "Total Of", value: "total_of" },
];

export const padelSets: Option[] = [
  { label: "4 Sets", value: "4" },
  { label: "6 Sets", value: "6" },
  { label: "8 Sets", value: "8" },
  { label: "9 Sets", value: "9" },
];

export const badmintonScoreType: Option[] = [
  { label: "Rally Point", value: "rally_point" },
  { label: "Traditional", value: "traditional" },
];

export const badmintonScoring: Option[] = [
  { label: "Best of 2", value: "best_of_2" },
  { label: "Follow Through", value: "follow_through" },
];

export const badmintonFinalScore: Option[] = [
  { label: "21", value: "21" },
  { label: "30", value: "30" },
  { label: "42", value: "42" },
];
export const knockoutSeats: Option[] = [
  { label: "16", value: "16" },
  { label: "32", value: "32" },
  { label: "64", value: "64" },
];
