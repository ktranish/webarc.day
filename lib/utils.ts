import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/å/g, "a")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/Å/g, "a")
    .replace(/Ä/g, "a")
    .replace(/Ö/g, "o")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getDaysBetween(start: Date, end: Date) {
  const diffTime = end.getTime() - start.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
}

export function getDateRange(monthsAgo = 0): [Date, Date] {
  const end = new Date();
  const start = new Date();

  // Set end date to end of current day
  end.setHours(23, 59, 59, 999);

  // Set start date to beginning of current month
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  // If looking at previous period, adjust both dates
  if (monthsAgo > 0) {
    // First set the end date to the last day of the previous month
    end.setMonth(end.getMonth() - monthsAgo);
    end.setDate(0); // This sets to last day of previous month

    // Then set the start date to the first day of that same month
    start.setMonth(end.getMonth());
    start.setDate(1);
  }

  return [start, end];
}

export function calculateGrowth(current: number, last: number) {
  // Handle invalid inputs
  if (typeof current !== "number" || typeof last !== "number") {
    return 0;
  }

  // Handle NaN and Infinity
  if (isNaN(current) || isNaN(last) || !isFinite(current) || !isFinite(last)) {
    return 0;
  }

  // Handle zero last value
  if (last === 0) {
    return current > 0 ? 100 : 0;
  }

  // Calculate growth (can be negative for decline)
  const growth = ((current - last) / last) * 100;

  // Handle very large numbers
  if (!isFinite(growth)) {
    return current > last ? 100 : -100;
  }

  // Round to 1 decimal place
  return Math.round(growth * 10) / 10;
}

export function getContentSlots(totalItems: number): {
  adSlots: number[];
  newsletterSlots: number[];
} {
  const adSlots: number[] = [];
  const newsletterSlots: number[] = [];

  // Add ad slots every 8 posts
  for (let i = 8; i <= totalItems; i += 8) {
    adSlots.push(i);
  }

  // Add newsletter slots every 20 posts
  for (let i = 20; i <= totalItems; i += 20) {
    newsletterSlots.push(i);
  }

  return { adSlots, newsletterSlots };
}
