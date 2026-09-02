import {
  useEffect,
  useState,
  useTransition,
} from "react";

import { finishSession } from "../actions/finish-session";
import { getTodaySession } from "../actions/get-today-session";
import { getSessionById } from "../actions/get-session-by-id";
import { pauseSession } from "../actions/pause-session";
import { resumeSession } from "../actions/resume-session";
import { startSession } from "../actions/start-session";

import { getWorkFlowAction } from "@/features/work-flow/actions/get-work-flow";

type Session = {
  id: string;
  started_at: string;
  finished_at: string | null;
  duration_minutes: number;
  paused_at: string | null;
  total_paused_seconds: number;
};

type WorkFlowData = {
  focus: string;
  decision_id: string | null;
  duration_minutes: number;
};

export function useDeepWork() {
  const [session, setSession] =
    useState<Session | null>(null);

  const [workFlow, setWorkFlow] =
    useState<WorkFlowData | null>(null);

  const [remainingSeconds, setRemainingSeconds] =
    useState(0);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    startTransition(async () => {
      const [today, flow] = await Promise.all([
        getTodaySession(),
        getWorkFlowAction(),
      ]);

      setSession(today);

      if (flow) {
        setWorkFlow({
          focus: flow.focus ?? "",
          decision_id:
            flow.decision_id ?? null,
          duration_minutes:
            flow.duration_minutes,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (
      !session ||
      session.finished_at ||
      !workFlow
    ) {
      return;
    }

    function updateRemaining() {
      if (session!.paused_at) {
        return;
      }

      const elapsedSeconds = Math.floor(
        (Date.now() -
          new Date(
            session!.started_at,
          ).getTime()) /
          1000,
      );

      const pausedSeconds =
        session!.total_paused_seconds ?? 0;

      const activeSeconds =
        elapsedSeconds - pausedSeconds;

      const totalSeconds =
        workFlow!.duration_minutes * 60;

      setRemainingSeconds(
        Math.max(
          totalSeconds - activeSeconds,
          0,
        ),
      );
    }

    updateRemaining();

    const interval = setInterval(
      updateRemaining,
      1000,
    );

    return () => clearInterval(interval);
  }, [session, workFlow]);

  function start() {
    startTransition(async () => {
      const created =
        await startSession(
          workFlow?.decision_id ?? null,
          workFlow?.focus ?? "",
        );

      setSession(created);

      if (workFlow) {
        setRemainingSeconds(
          workFlow.duration_minutes * 60,
        );
      }
    });
  }

  function pause() {
    if (
      !session ||
      session.finished_at ||
      session.paused_at
    ) {
      return;
    }

    startTransition(async () => {
      const updated =
        await pauseSession(session.id);

      setSession(updated);
    });
  }

  function resume() {
    if (
      !session ||
      session.finished_at ||
      !session.paused_at
    ) {
      return;
    }

    startTransition(async () => {
      const pausedAt =
        session.paused_at;

      if (!pausedAt) return;

      const updated =
        await resumeSession(
          session.id,
          pausedAt,
        );

      setSession(updated);
    });
  }

  function finish() {
    if (!session) return;

    startTransition(async () => {
      await finishSession(session.id);

      const updated =
        await getSessionById(session.id);

      setSession(updated);
      setRemainingSeconds(0);
    });
  }

  return {
    finishSession: finish,
    isPending,
    isPaused:
      !!session?.paused_at,
    pauseSession: pause,
    remainingSeconds,
    resumeSession: resume,
    session,
    startSession: start,
    workFlow,
  };
}
