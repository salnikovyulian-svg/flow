"use client";

import {
  useState,
  useTransition,
} from "react";

import { Card } from "@/components/ui/layout/card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import type { WeeklyReviewData } from "../actions/get-weekly-review-data";
import { saveWeeklyReview } from "../actions/save-weekly-review";
import { initialWeeklyReview } from "../mock-data";
import type {
  WeeklyReview as WeeklyReviewValues,
} from "../types";

type Props = {
  data: WeeklyReviewData;
};

type FieldProps = {
  label: string;
  prompt: string;
  value: string;
  onChange(value: string): void;
};

function ReviewField({
  label,
  prompt,
  value,
  onChange,
}: FieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">
        {label}
      </span>

      <span className="mt-1 block text-sm leading-6 text-slate-500">
        {prompt}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-3 min-h-32 w-full resize-y rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-base leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/40 focus:bg-white/[0.05]"
      />
    </label>
  );
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return hours > 0
    ? `${hours}h ${rest}m`
    : `${rest}m`;
}

function formatDate(date: string) {
  return new Date(
    `${date}T12:00:00.000Z`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function formatLongDate(date: string) {
  return new Date(
    `${date}T12:00:00.000Z`,
  ).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function WeeklyReview({
  data,
}: Props) {
  const [review, setReview] =
    useState<WeeklyReviewValues>(
      initialWeeklyReview,
    );

  const [isPending, startTransition] =
    useTransition();

  function update(
    key: keyof WeeklyReviewValues,
    value: string,
  ) {
    setReview((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function finish() {
    startTransition(() => {
      void saveWeeklyReview(review);
    });
  }

  return (
    <Page>
      <PageHeader
        eyebrow={`${formatDate(data.weekStart)} — ${formatDate(data.weekEnd)}`}
        title="Weekly Review"
        description="See the facts. Understand the process. Design the next week."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-slate-500">
            Deep Work
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {formatDuration(
              data.totalMinutes,
            )}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Sessions
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {data.totalSessions}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Active days
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {data.daysWithDeepWork}/
            {data.days.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-500">
            Process followed
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {data.processFollowedDays}/
            {data.days.length}
          </p>
        </Card>
      </div>

      <Card>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet-300/70">
            What happened?
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Your week, day by day
          </h2>
        </div>

        <div className="mt-7 space-y-3">
          {data.days.map((day) => (
            <details
              key={day.date}
              className="group rounded-2xl border border-white/8 bg-white/[0.02]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="font-medium">
                    {formatLongDate(
                      day.date,
                    )}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {day.sessions.length}{" "}
                    {day.sessions.length === 1
                      ? "session"
                      : "sessions"}
                    {day.endOfDay
                      ? " · End of Day saved"
                      : ""}
                  </p>
                </div>

                <p className="whitespace-nowrap font-semibold text-violet-200">
                  {formatDuration(
                    day.minutes,
                  )}
                </p>
              </summary>

              <div className="space-y-5 border-t border-white/8 px-5 py-5">
                {day.sessions.map(
                  (session) => (
                    <div key={session.id}>
                      <div className="flex justify-between gap-4">
                        <p className="font-medium">
                          {session.focus ||
                            "Focus Session"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {formatDuration(
                            session.duration_minutes,
                          )}
                        </p>
                      </div>

                      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-400">
                        {session.insight && (
                          <p>
                            <span className="text-slate-200">
                              Insight ·{" "}
                            </span>
                            {session.insight}
                          </p>
                        )}

                        {session.friction && (
                          <p>
                            <span className="text-slate-200">
                              Friction ·{" "}
                            </span>
                            {session.friction}
                          </p>
                        )}

                        {session.distraction && (
                          <p>
                            <span className="text-slate-200">
                              Distraction ·{" "}
                            </span>
                            {session.distraction}
                          </p>
                        )}

                        {session.next_step && (
                          <p>
                            <span className="text-slate-200">
                              Next ·{" "}
                            </span>
                            {session.next_step}
                          </p>
                        )}
                      </div>
                    </div>
                  ),
                )}

                {day.endOfDay && (
                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-cyan-300/70">
                      End of the Day
                    </p>

                    {day.endOfDay.unfinished && (
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                        <span className="text-slate-200">
                          Open loops ·{" "}
                        </span>
                        {
                          day.endOfDay
                            .unfinished
                        }
                      </p>
                    )}

                    {day.endOfDay.tomorrow && (
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-400">
                        <span className="text-slate-200">
                          Tomorrow ·{" "}
                        </span>
                        {
                          day.endOfDay
                            .tomorrow
                        }
                      </p>
                    )}
                  </div>
                )}

                {day.sessions.length === 0 &&
                  !day.endOfDay && (
                    <p className="text-sm text-slate-500">
                      No records for this day.
                    </p>
                  )}
              </div>
            </details>
          ))}
        </div>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-emerald-300/70">
          01 · Celebrate
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Celebrate the week
        </h2>

        <div className="mt-7">
          <ReviewField
            label="What went well?"
            prompt="What are you proud of? Which decisions or actions worked?"
            value={review.wins}
            onChange={(value) =>
              update("wins", value)
            }
          />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-300/70">
          02 · Understand
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Understand the week
        </h2>

        <div className="mt-7 space-y-8">
          <ReviewField
            label="What didn’t work?"
            prompt="Where did the week fall short?"
            value={review.failures}
            onChange={(value) =>
              update("failures", value)
            }
          />

          <ReviewField
            label="What caused it?"
            prompt="Look for the process behind the result."
            value={review.causes}
            onChange={(value) =>
              update("causes", value)
            }
          />

          <ReviewField
            label="Where did I deceive myself?"
            prompt="Where did your explanation differ from the facts?"
            value={review.selfDeception}
            onChange={(value) =>
              update(
                "selfDeception",
                value,
              )
            }
          />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-300/70">
          03 · Adjust
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Change the process
        </h2>

        <div className="mt-7 grid gap-8 lg:grid-cols-3">
          <ReviewField
            label="Keep"
            prompt="What will you continue?"
            value={review.keepDoing}
            onChange={(value) =>
              update("keepDoing", value)
            }
          />

          <ReviewField
            label="Stop"
            prompt="What will you remove?"
            value={review.stopDoing}
            onChange={(value) =>
              update("stopDoing", value)
            }
          />

          <ReviewField
            label="Start"
            prompt="What new action will you introduce?"
            value={review.startDoing}
            onChange={(value) =>
              update("startDoing", value)
            }
          />
        </div>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet-300/70">
          04 · Design
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Design next week
        </h2>

        <div className="mt-7 space-y-8">
          <ReviewField
            label="Main focus"
            prompt="What single focus would make next week successful?"
            value={review.mainFocus}
            onChange={(value) =>
              update("mainFocus", value)
            }
          />

          <ReviewField
            label="First action"
            prompt="What exactly will you do first?"
            value={review.firstAction}
            onChange={(value) =>
              update("firstAction", value)
            }
          />
        </div>
      </Card>

      <button
        type="button"
        onClick={finish}
        disabled={
          isPending ||
          !review.mainFocus.trim() ||
          !review.firstAction.trim()
        }
        className="w-full rounded-2xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending
          ? "Saving review..."
          : "Complete Weekly Review"}
      </button>
    </Page>
  );
}
