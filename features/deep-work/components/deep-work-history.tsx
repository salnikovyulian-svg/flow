"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/layout/card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import { getDeepWorkHistory } from "../actions/get-history";
import { getDecisionById } from "@/features/decision-contract/actions/get-decision-by-id";

type Session = {
  id: string;
  focus: string | null;
  decision_id: string | null;
  started_at: string;
  finished_at: string;
  duration_minutes: number;
  insight: string | null;
  friction: string | null;
  distraction: string | null;
  next_step: string | null;
};

type Decision = {
  id: string;
  decision: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
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

export function DeepWorkHistory() {
  const [sessions, setSessions] =
    useState<Session[]>([]);

  const [decisions, setDecisions] =
    useState<Record<string, string>>({});

  const [openId, setOpenId] =
    useState<string | null>(null);

  useEffect(() => {
    getDeepWorkHistory().then(async (data) => {
      setSessions(data ?? []);

      const ids = [
        ...new Set(
          (data ?? [])
            .map((session) => session.decision_id)
            .filter(
              (id): id is string => !!id,
            ),
        ),
      ];

      const entries =
        await Promise.all(
          ids.map(async (id) => {
            const decision =
              await getDecisionById(id);

            return [
              id,
              decision?.decision ?? "",
            ] as const;
          }),
        );

      setDecisions(
        Object.fromEntries(entries),
      );
    });
  }, []);

  return (
    <Page>
      <PageHeader
        eyebrow="FLOW"
        title="Deep Work History"
        description="Review the work you have actually done."
      />

      <div className="space-y-4">
        {sessions.length === 0 && (
          <Card>
            <p className="text-muted">
              No completed sessions yet.
            </p>
          </Card>
        )}

        {sessions.map((session) => {
          const isOpen =
            openId === session.id;

          return (
            <Card key={session.id}>
              <button
                type="button"
                onClick={() =>
                  setOpenId(
                    isOpen
                      ? null
                      : session.id,
                  )
                }
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm text-muted">
                      {formatDate(
                        session.started_at,
                      )}{" "}
                      ·{" "}
                      {formatTime(
                        session.started_at,
                      )}
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                      {session.focus ||
                        "Focus Session"}
                    </h2>

                    {session.decision_id &&
                      decisions[
                        session.decision_id
                      ] && (
                        <p className="mt-2 text-sm text-muted">
                          Decision ·{" "}
                          {
                            decisions[
                              session.decision_id
                            ]
                          }
                        </p>
                      )}
                  </div>

                  <p className="whitespace-nowrap text-lg font-semibold">
                    {session.duration_minutes} min
                  </p>
                </div>
              </button>

              {isOpen && (
                <div className="mt-8 border-t border-border pt-8">
                  <div className="space-y-7">

                    {session.insight && (
                      <div>
                        <p className="text-sm font-medium">
                          Insight
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {session.insight}
                        </p>
                      </div>
                    )}

                    {session.friction && (
                      <div>
                        <p className="text-sm font-medium">
                          Friction
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {session.friction}
                        </p>
                      </div>
                    )}

                    {session.distraction && (
                      <div>
                        <p className="text-sm font-medium">
                          Distraction
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {session.distraction}
                        </p>
                      </div>
                    )}

                    {session.next_step && (
                      <div>
                        <p className="text-sm font-medium">
                          Next
                        </p>
                        <p className="mt-2 text-sm leading-6 text-muted">
                          {session.next_step}
                        </p>
                      </div>
                    )}

                    {!session.insight &&
                      !session.friction &&
                      !session.distraction &&
                      !session.next_step && (
                        <p className="text-sm text-muted">
                          No reflection recorded.
                        </p>
                      )}

                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </Page>
  );
}
