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
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

export function getDateRange(monthsAgo = 0): [Date, Date] {
  const end = new Date();
  const start = new Date();

  end.setHours(23, 59, 59, 999);

  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  if (monthsAgo > 0) {
    end.setMonth(end.getMonth() - monthsAgo);
    end.setDate(0);

    start.setMonth(end.getMonth());
    start.setDate(1);
  }

  return [start, end];
}

export function calculateGrowth(current: number, last: number) {
  if (typeof current !== "number" || typeof last !== "number") {
    return 0;
  }

  if (isNaN(current) || isNaN(last) || !isFinite(current) || !isFinite(last)) {
    return 0;
  }

  if (last === 0) {
    return current > 0 ? 100 : 0;
  }

  const growth = ((current - last) / last) * 100;

  if (!isFinite(growth)) {
    return current > last ? 100 : -100;
  }

  return Math.round(growth * 10) / 10;
}

export function getContentSlots(totalItems: number): {
  adSlots: number[];
  newsletterSlots: number[];
} {
  const adSlots: number[] = [];
  const newsletterSlots: number[] = [];

  for (let i = 8; i <= totalItems; i += 8) {
    adSlots.push(i);
  }

  for (let i = 20; i <= totalItems; i += 20) {
    newsletterSlots.push(i);
  }

  return { adSlots, newsletterSlots };
}
