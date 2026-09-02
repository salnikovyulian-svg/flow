"use client";

import { useMemo, useState } from "react";

import { AppCard } from "@/components/ui/app-card";

import { buildCalendar } from "../utils/build-calendar";
import type {
  CalendarData,
  CalendarDay,
  CalendarSession,
} from "../types";

import { CalendarGrid } from "./calendar-grid";
import { CalendarLegend } from "./calendar-legend";

type Props = {
  data: CalendarData;
};

function formatDay(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) {
    return `${rest}m`;
  }

  return `${hours}h ${rest}m`;
}

function hasReflection(
  session: CalendarSession,
) {
  return Boolean(
    session.insight ||
      session.friction ||
      session.distraction ||
      session.next_step,
  );
}

function DayDetails({
  day,
}: {
  day: CalendarDay;
}) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 lg:min-h-full">
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-violet-300/70">
        Selected day
      </p>

      <h3 className="mt-3 text-xl font-semibold text-white">
        {formatDay(day.date)}
      </h3>

      <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-400/[0.06] p-4">
        <p className="text-sm text-slate-400">
          Total Deep Work
        </p>

        <p className="mt-1 text-3xl font-semibold tracking-tight text-white">
          {formatDuration(day.minutes)}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {day.sessions.length}{" "}
          {day.sessions.length === 1
            ? "session"
            : "sessions"}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {day.sessions.map(
          (session, index) => (
            <div
              key={session.id}
              className="rounded-2xl border border-white/8 bg-black/10 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    {formatTime(
                      session.started_at,
                    )}
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {session.focus ||
                      `Deep Work ${index + 1}`}
                  </p>
                </div>

                <p className="whitespace-nowrap text-sm font-semibold text-violet-200">
                  {formatDuration(
                    session.duration_minutes,
                  )}
                </p>
              </div>

              {hasReflection(session) && (
                <div className="mt-4 space-y-4 border-t border-white/8 pt-4">
                  {session.insight && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Insight
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {session.insight}
                      </p>
                    </div>
                  )}

                  {session.friction && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Friction
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {session.friction}
                      </p>
                    </div>
                  )}

                  {session.distraction && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Distraction
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {session.distraction}
                      </p>
                    </div>
                  )}

                  {session.next_step && (
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        Next step
                      </p>
                      <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                        {session.next_step}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ),
        )}

        {day.sessions.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-500">
            No Deep Work sessions.
          </p>
        )}
      </div>

      {day.endOfDay && (
        <div className="mt-6 border-t border-white/8 pt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-cyan-300/70">
            End of the Day
          </p>

          {day.endOfDay.unfinished && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Open loops
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {day.endOfDay.unfinished}
              </p>
            </div>
          )}

          {day.endOfDay.tomorrow && (
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                Tomorrow
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {day.endOfDay.tomorrow}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2">
            <span className="text-sm text-slate-400">
              Process followed
            </span>

            <span
              className={
                day.endOfDay.process_followed
                  ? "text-sm font-medium text-emerald-300"
                  : "text-sm font-medium text-slate-500"
              }
            >
              {day.endOfDay.process_followed
                ? "Yes"
                : "No"}
            </span>
          </div>
        </div>
      )}

      {!day.endOfDay && (
        <p className="mt-6 border-t border-white/8 pt-5 text-sm text-slate-500">
          No End of the Day note.
        </p>
      )}
    </div>
  );
}

export function DeepWorkCalendar({
  data,
}: Props) {
  const calendar = useMemo(
    () => buildCalendar(data),
    [data],
  );

  const today = new Date();

  const defaultDay =
    calendar.days.find(
      (day) =>
        day.date.getDate() ===
          today.getDate() &&
        day.date.getMonth() ===
          today.getMonth() &&
        day.date.getFullYear() ===
          today.getFullYear(),
    ) ?? calendar.days[0];

  const [selectedDay, setSelectedDay] =
    useState<CalendarDay | null>(null);

  const selected =
    selectedDay ?? defaultDay;

  return (
    <AppCard className="p-7 lg:p-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-violet-300/70">
            Consistency
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
            Deep Work Calendar
          </h2>
        </div>

        <p className="hidden text-sm text-slate-500 sm:block">
          Select a day to review it
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <CalendarGrid
            days={calendar.days}
            onSelect={setSelectedDay}
          />

          <div className="mt-6">
            <CalendarLegend />
          </div>
        </div>

        {selected && (
          <DayDetails day={selected} />
        )}
      </div>
    </AppCard>
  );
}
