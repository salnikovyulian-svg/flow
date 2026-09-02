"use client";

import { Card } from "@/components/ui/layout/card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import type { WeeklyReviewData } from "../actions/get-weekly-review-data";

type SavedReview = {
  id: string;
  week_start: string;
  week_end: string;
  wins: string;
  failures: string;
  causes: string;
  self_deception: string;
  keep_doing: string;
  stop_doing: string;
  start_doing: string;
  main_focus: string;
  first_action: string;
};

type Entry = {
  review: SavedReview;
  data: WeeklyReviewData;
};

type Props = {
  entries: Entry[];
};

function formatDate(value: string) {
  return new Date(
    `${value}T12:00:00.000Z`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

function formatDay(value: string) {
  return new Date(
    `${value}T12:00:00.000Z`,
  ).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return hours
    ? `${hours}h ${rest}m`
    : `${rest}m`;
}

function ReviewText({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  if (!value) return null;

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">
        {value}
      </p>
    </div>
  );
}

export function WeeklyReviewHistory({
  entries,
}: Props) {
  return (
    <Page>
      <PageHeader
        eyebrow="FLOW"
        title="Weekly Reviews"
        description="Your weekly process, decisions and improvements."
      />

      {entries.length === 0 && (
        <Card>
          <p className="text-slate-400">
            No completed weekly reviews yet.
          </p>
        </Card>
      )}

      <div className="space-y-5">
        {entries.map(({ review, data }) => (
          <details
            key={review.id}
            className="rounded-[28px] border border-white/8 bg-white/[0.03]"
          >
            <summary className="cursor-pointer list-none p-6 lg:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-violet-300/70">
                    Weekly Review
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {formatDate(
                      review.week_start,
                    )}{" "}
                    —{" "}
                    {formatDate(
                      review.week_end,
                    )}
                  </h2>

                  {review.main_focus && (
                    <p className="mt-2 text-sm text-slate-400">
                      Next focus ·{" "}
                      {review.main_focus}
                    </p>
                  )}
                </div>

                <div className="flex gap-6">
                  <div>
                    <p className="text-xs text-slate-500">
                      Deep Work
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {formatDuration(
                        data.totalMinutes,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Sessions
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {data.totalSessions}
                    </p>
                  </div>
                </div>
              </div>
            </summary>

            <div className="space-y-8 border-t border-white/8 p-6 lg:p-8">
              <section>
                <h3 className="text-lg font-semibold text-white">
                  Week by day
                </h3>

                <div className="mt-4 space-y-3">
                  {data.days.map((day) => (
                    <details
                      key={day.date}
                      className="rounded-2xl border border-white/8 bg-black/10"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {formatDay(day.date)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {day.sessions.length} sessions
                            {day.endOfDay
                              ? " · End of Day"
                              : ""}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-violet-200">
                          {formatDuration(
                            day.minutes,
                          )}
                        </p>
                      </summary>

                      <div className="space-y-5 border-t border-white/8 px-4 py-4">
                        {day.sessions.map(
                          (session) => (
                            <div key={session.id}>
                              <p className="font-medium text-white">
                                {session.focus ||
                                  "Focus Session"}
                                {" · "}
                                {formatDuration(
                                  session.duration_minutes,
                                )}
                              </p>

                              <div className="mt-3 space-y-3">
                                <ReviewText
                                  label="Insight"
                                  value={
                                    session.insight
                                  }
                                />
                                <ReviewText
                                  label="Friction"
                                  value={
                                    session.friction
                                  }
                                />
                                <ReviewText
                                  label="Distraction"
                                  value={
                                    session.distraction
                                  }
                                />
                                <ReviewText
                                  label="Next step"
                                  value={
                                    session.next_step
                                  }
                                />
                              </div>
                            </div>
                          ),
                        )}

                        {day.endOfDay && (
                          <div className="rounded-xl bg-white/[0.03] p-4">
                            <ReviewText
                              label="Open loops"
                              value={
                                day.endOfDay
                                  .unfinished
                              }
                            />
                            <div className="mt-4">
                              <ReviewText
                                label="Tomorrow"
                                value={
                                  day.endOfDay
                                    .tomorrow
                                }
                              />
                            </div>
                          </div>
                        )}

                        {day.sessions.length === 0 &&
                          !day.endOfDay && (
                            <p className="text-sm text-slate-500">
                              No records.
                            </p>
                          )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white">
                  Your reflection
                </h3>

                <div className="mt-5 grid gap-7 lg:grid-cols-2">
                  <ReviewText
                    label="What went well"
                    value={review.wins}
                  />
                  <ReviewText
                    label="What didn’t work"
                    value={review.failures}
                  />
                  <ReviewText
                    label="Causes"
                    value={review.causes}
                  />
                  <ReviewText
                    label="Self-deception"
                    value={
                      review.self_deception
                    }
                  />
                  <ReviewText
                    label="Keep"
                    value={review.keep_doing}
                  />
                  <ReviewText
                    label="Stop"
                    value={review.stop_doing}
                  />
                  <ReviewText
                    label="Start"
                    value={review.start_doing}
                  />
                  <ReviewText
                    label="Main focus"
                    value={review.main_focus}
                  />
                  <ReviewText
                    label="First action"
                    value={review.first_action}
                  />
                </div>
              </section>
            </div>
          </details>
        ))}
      </div>
    </Page>
  );
}
