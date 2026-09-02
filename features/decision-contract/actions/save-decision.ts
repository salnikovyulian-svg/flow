"use server";

import { redirect } from "next/navigation";

import type { DecisionContractResolvedAnswers } from "@/features/decision-contract/types";
import { calculateReviewDate } from "@/lib/date";

import { createDecision } from "../repository";

type SaveDecisionResult = {
  error: string;
};

export async function saveDecision(
  answers: DecisionContractResolvedAnswers,
): Promise<SaveDecisionResult> {
  try {
    await createDecision({
      decision: answers.decision,
      reason: answers.reason,

      actions: answers.actions,

      success: answers.success,
      failure_reason: answers.failureReason,

      commitment_days:
        answers.commitmentDays,

      review_date: calculateReviewDate(
        answers.commitmentDays,
      ),

      status: "active",
    });
  } catch (error) {
    console.error(error);

    return {
      error:
        "Unable to save decision.",
    };
  }

  redirect("/");
}
