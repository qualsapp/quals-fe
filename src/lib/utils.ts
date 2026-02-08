import { EventResponse } from "@/types/event";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const eventState = (event: EventResponse) => {
  const startDate = dayjs(event.start_time);
  const endDate = dayjs(event.end_time);
  const now = dayjs();

  if (now.isBefore(startDate)) {
    return "next";
  }

  if (now.isAfter(endDate)) {
    return "completed";
  }

  return "live";
};
