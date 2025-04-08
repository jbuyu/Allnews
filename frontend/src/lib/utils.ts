import type { QueryClient } from "@tanstack/react-query"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from "luxon"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


//route type

export interface RouterContext {
  queryClient: QueryClient
}
export function relativeTime(date: string) {
  const datetime = DateTime.fromISO(date);
  return datetime.toRelative();
}