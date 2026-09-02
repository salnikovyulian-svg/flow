"use server";

import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

import type { CalendarData } from "../types";

export async function getCalendar(): Promise<CalendarData> {
  const supabase = await createClient();

  const [sessionsResult, endOfDaysResult] =
    await Promise.all([
      supabase
        .from("deep_work_sessions")
        .select(`
          id,
          focus,
          started_at,
          finished_at,
          duration_minutes,
          insight,
          friction,
          distraction,
          next_step
        `)
        .eq("user_id", USER_ID)
        .order("started_at", {
          ascending: true,
        }),

      supabase
        .from("end_of_day")
        .select(`
          id,
          created_at,
          unfinished,
          tomorrow,
          process_followed
        `)
        .eq("user_id", USER_ID)
        .order("created_at", {
          ascending: true,
        }),
    ]);

  if (sessionsResult.error) {
    throw sessionsResult.error;
  }

  if (endOfDaysResult.error) {
    throw endOfDaysResult.error;
  }

  return {
    sessions: sessionsResult.data ?? [],
    endOfDays: endOfDaysResult.data ?? [],
  };
}
