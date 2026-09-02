"use server";

import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

type DeepWorkEntry = {
  id: string;
  focus: string | null;
  started_at: string;
  duration_minutes: number;
  insight: string | null;
  friction: string | null;
  distraction: string | null;
  next_step: string | null;
};

type EndOfDayEntry = {
  id: string;
  created_at: string;
  unfinished: string | null;
  tomorrow: string | null;
  process_followed: boolean | null;
};

export type WeeklyDay = {
  date: string;
  minutes: number;
  sessions: DeepWorkEntry[];
  endOfDay: EndOfDayEntry | null;
};

export type WeeklyReviewData = {
  weekStart: string;
  weekEnd: string;
  totalMinutes: number;
  totalSessions: number;
  daysWithDeepWork: number;
  processFollowedDays: number;
  days: WeeklyDay[];
};

function getWarsawDateKey(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function addDays(
  dateKey: string,
  amount: number,
) {
  const date = new Date(
    `${dateKey}T00:00:00.000Z`,
  );

  date.setUTCDate(
    date.getUTCDate() + amount,
  );

  return date.toISOString().slice(0, 10);
}

export async function getWeeklyReviewData(
  weekStart: string,
  weekEnd: string,
): Promise<WeeklyReviewData> {
  const supabase = await createClient();

  const queryStart = addDays(weekStart, -1);
  const queryEnd = addDays(weekEnd, 2);

  const [sessionsResult, endOfDaysResult] =
    await Promise.all([
      supabase
        .from("deep_work_sessions")
        .select(`
          id,
          focus,
          started_at,
          duration_minutes,
          insight,
          friction,
          distraction,
          next_step
        `)
        .eq("user_id", USER_ID)
        .not("finished_at", "is", null)
        .gte(
          "started_at",
          `${queryStart}T00:00:00.000Z`,
        )
        .lt(
          "started_at",
          `${queryEnd}T00:00:00.000Z`,
        )
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
        .gte(
          "created_at",
          `${queryStart}T00:00:00.000Z`,
        )
        .lt(
          "created_at",
          `${queryEnd}T00:00:00.000Z`,
        )
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

  const sessions = (
    sessionsResult.data ?? []
  ).filter((session) => {
    const date = getWarsawDateKey(
      session.started_at,
    );

    return (
      date >= weekStart &&
      date <= weekEnd
    );
  });

  const endOfDays = (
    endOfDaysResult.data ?? []
  ).filter((entry) => {
    const date = getWarsawDateKey(
      entry.created_at,
    );

    return (
      date >= weekStart &&
      date <= weekEnd
    );
  });

  const days: WeeklyDay[] = [];
  let date = weekStart;

  while (date <= weekEnd) {
    const daySessions = sessions.filter(
      (session) =>
        getWarsawDateKey(
          session.started_at,
        ) === date,
    );

    const dayEndOfDay =
      [...endOfDays]
        .reverse()
        .find(
          (entry) =>
            getWarsawDateKey(
              entry.created_at,
            ) === date,
        ) ?? null;

    days.push({
      date,
      sessions: daySessions,
      endOfDay: dayEndOfDay,
      minutes: daySessions.reduce(
        (total, session) =>
          total +
          (session.duration_minutes ?? 0),
        0,
      ),
    });

    date = addDays(date, 1);
  }

  return {
    weekStart,
    weekEnd,
    days,
    totalMinutes: days.reduce(
      (total, day) =>
        total + day.minutes,
      0,
    ),
    totalSessions: sessions.length,
    daysWithDeepWork: days.filter(
      (day) => day.minutes > 0,
    ).length,
    processFollowedDays: days.filter(
      (day) =>
        day.endOfDay?.process_followed ===
        true,
    ).length,
  };
}
