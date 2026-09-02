"use server";

import { redirect } from "next/navigation";

import { saveWorkFlowRepository } from "../repository";
import type { WorkFlow } from "../types";

export async function saveWorkFlow(
  workFlow: WorkFlow,
) {
  await saveWorkFlowRepository({
    focus: workFlow.focus,


    decision_id: workFlow.decisionId,

    location: workFlow.location,

    custom_location:
      workFlow.customLocation,

    start_time:
      workFlow.startTime,

    duration_minutes:
      workFlow.durationMinutes,

    ritual: workFlow.ritual,
  });

  redirect("/");
}
