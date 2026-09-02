"use client";

import { useState } from "react";
import {
  Pause,
  Play,
  Square,
} from "lucide-react";

import { Card } from "@/components/ui/layout/card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import { saveReflection } from "../actions/save-reflection";
import { useDeepWork } from "../hooks/use-deep-work";

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(
    (seconds % 3600) / 60,
  );
  const remainingSeconds = seconds % 60;

  return [hours, minutes, remainingSeconds]
    .map((value) =>
      String(value).padStart(2, "0"),
    )
    .join(":");
}

export function DeepWork() {
  const {
    session,
    workFlow,
    remainingSeconds,
    startSession,
    pauseSession,
    resumeSession,
    finishSession,
    isPaused,
    isPending,
  } = useDeepWork();

  const [insight, setInsight] = useState("");
  const [friction, setFriction] = useState("");
  const [distraction, setDistraction] =
    useState("");
  const [nextStep, setNextStep] = useState("");

  const [isSavingReflection, setIsSavingReflection] =
    useState(false);
  const [reflectionSaved, setReflectionSaved] =
    useState(false);

  const isRunning =
    !!session &&
    !session.finished_at;

  const focus =
    workFlow?.focus || "Focus Session";

  async function handleSaveReflection() {
    if (!session) return;

    const hasContent =
      insight.trim() ||
      friction.trim() ||
      distraction.trim() ||
      nextStep.trim();

    if (!hasContent) return;

    setIsSavingReflection(true);

    try {
      await saveReflection(session.id, {
        insight: insight.trim(),
        friction: friction.trim(),
        distraction: distraction.trim(),
        nextStep: nextStep.trim(),
      });

      setReflectionSaved(true);
    } finally {
      setIsSavingReflection(false);
    }
  }

  return (
    <Page>
      <PageHeader
        eyebrow="FLOW"
        title="Deep Work"
        description="Protect your attention."
      />

      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-muted">
          TODAY'S FOCUS
        </p>

        <h2 className="mt-4 text-4xl font-semibold">
          {focus}
        </h2>

        <p className="mt-3 text-muted">
          {workFlow
            ? `${workFlow.duration_minutes} minutes planned`
            : "Configure your Work Flow first."}
        </p>

        <div className="mt-12">
          {!session && (
            <button
              onClick={startSession}
              disabled={
                isPending || !workFlow
              }
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-black disabled:opacity-40"
            >
              <Play size={17} />
              Start Session
            </button>
          )}

          {isRunning && (
            <div>
              <p className="font-mono text-6xl font-semibold tracking-tight text-white">
                {formatTime(
                  remainingSeconds,
                )}
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={
                    isPaused
                      ? resumeSession
                      : pauseSession
                  }
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border px-6 py-4 font-semibold text-white disabled:opacity-40"
                >
                  {isPaused ? (
                    <Play size={17} />
                  ) : (
                    <Pause size={17} />
                  )}

                  {isPaused
                    ? "Resume"
                    : "Pause"}
                </button>

                <button
                  onClick={finishSession}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-black disabled:opacity-40"
                >
                  <Square size={16} />
                  Finish Session
                </button>
              </div>

              {isPaused && (
                <p className="mt-5 text-sm uppercase tracking-[0.25em] text-muted">
                  Session paused
                </p>
              )}
            </div>
          )}

          {session?.finished_at && (
            <div className="mt-2">
              <p className="text-2xl font-semibold">
                Session completed
              </p>

              <p className="mt-2 text-muted">
                {session.duration_minutes} minutes
              </p>

              <div className="mt-10 border-t border-border pt-8">
                <p className="text-sm uppercase tracking-[0.3em] text-muted">
                  Reflection
                </p>

                <div className="mt-7 space-y-6">

                  <div>
                    <p className="text-sm font-medium text-white">
                      Insight
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      What did you understand?
                    </p>

                    <textarea
                      value={insight}
                      onChange={(e) => {
                        setInsight(e.target.value);
                        setReflectionSaved(false);
                      }}
                      rows={3}
                      className="mt-3 w-full resize-none rounded-2xl border border-border bg-transparent p-4 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Friction
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      Where did you struggle?
                    </p>

                    <textarea
                      value={friction}
                      onChange={(e) => {
                        setFriction(e.target.value);
                        setReflectionSaved(false);
                      }}
                      rows={3}
                      className="mt-3 w-full resize-none rounded-2xl border border-border bg-transparent p-4 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Distraction
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      What took your attention away?
                    </p>

                    <textarea
                      value={distraction}
                      onChange={(e) => {
                        setDistraction(
                          e.target.value,
                        );
                        setReflectionSaved(false);
                      }}
                      rows={3}
                      className="mt-3 w-full resize-none rounded-2xl border border-border bg-transparent p-4 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-white">
                      Next
                    </p>

                    <p className="mt-1 text-sm text-muted">
                      Where will you start next time?
                    </p>

                    <textarea
                      value={nextStep}
                      onChange={(e) => {
                        setNextStep(e.target.value);
                        setReflectionSaved(false);
                      }}
                      rows={3}
                      className="mt-3 w-full resize-none rounded-2xl border border-border bg-transparent p-4 text-sm outline-none"
                    />
                  </div>

                </div>

                <button
                  onClick={handleSaveReflection}
                  disabled={
                    isSavingReflection ||
                    !(
                      insight.trim() ||
                      friction.trim() ||
                      distraction.trim() ||
                      nextStep.trim()
                    )
                  }
                  className="mt-8 rounded-2xl bg-white px-6 py-3 font-semibold text-black disabled:opacity-40"
                >
                  {isSavingReflection
                    ? "Saving..."
                    : reflectionSaved
                      ? "Saved"
                      : "Save Reflection"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Page>
  );
}
