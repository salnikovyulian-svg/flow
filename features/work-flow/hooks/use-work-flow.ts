import {
  useEffect,
  useState,
  useTransition,
} from "react";

import { getWorkFlowAction } from "../actions/get-work-flow";
import { saveWorkFlow } from "../actions/save-work-flow";
import { initialWorkFlow } from "../mock-data";
import type {
  RitualItem,
  WorkFlow,
  WorkLocation,
} from "../types";

function createInitialState(): WorkFlow {
  return {
    ...initialWorkFlow,
    ritual: initialWorkFlow.ritual.map((item) => ({
      ...item,
    })),
  };
}

export function useWorkFlow() {
  const [workFlow, setWorkFlow] =
    useState<WorkFlow>(createInitialState);

  const [isPending, startTransition] =
    useTransition();

  useEffect(() => {
    startTransition(async () => {
      const data =
        await getWorkFlowAction();

      if (!data) return;

      setWorkFlow({
        focus: data.focus ?? "",
        decisionId: data.decision_id ?? null,
        location: data.location,
        customLocation:
          data.custom_location ?? "",
        startTime: data.start_time,
        durationMinutes:
          data.duration_minutes,
        ritual: data.ritual,
      });
    });
  }, []);

  function setFocus(focus: string) {
    setWorkFlow((current) => ({
      ...current,
      focus,
    }));
  }

  function setDecisionId(
    decisionId: string | null,
  ) {
    setWorkFlow((current) => ({
      ...current,
      decisionId,
    }));
  }

  function setLocation(location: WorkLocation) {
    setWorkFlow((current) => ({
      ...current,
      location,
    }));
  }

  function setCustomLocation(customLocation: string) {
    setWorkFlow((current) => ({
      ...current,
      customLocation,
    }));
  }

  function setStartTime(startTime: string) {
    setWorkFlow((current) => ({
      ...current,
      startTime,
    }));
  }

  function setDurationMinutes(
    durationMinutes: number,
  ) {
    setWorkFlow((current) => ({
      ...current,
      durationMinutes,
    }));
  }

  function toggleRitualItem(
    id: RitualItem["id"],
  ) {
    setWorkFlow((current) => ({
      ...current,
      ritual: current.ritual.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    }));
  }

  function save() {
    startTransition(async () => {
      await saveWorkFlow(workFlow);
    });
  }

  return {
    workFlow,
    isPending,
    isReady: workFlow.ritual.every(
      (item) => item.completed,
    ),
    save,
    setFocus,
    setDecisionId,
    setLocation,
    setCustomLocation,
    setStartTime,
    setDurationMinutes,
    toggleRitualItem,
  };
}
