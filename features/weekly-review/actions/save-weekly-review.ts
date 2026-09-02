"use server";

import { redirect } from "next/navigation";

import { getReviewWindow } from "../lib/get-review-window";
import {
  getWeeklyReviewByStartRepository,
  saveWeeklyReviewRepository,
} from "../repository";
import type { WeeklyReview } from "../types";

export async function saveWeeklyReview(
  values: WeeklyReview,
) {
  const window = getReviewWindow();

  if (!window.isOpen) {
    throw new Error(
      "Weekly Review is not available yet.",
    );
  }

  const existing =
    await getWeeklyReviewByStartRepository(
      window.weekStart,
    );

  if (existing) {
    redirect("/");
  }

  await saveWeeklyReviewRepository({
    week_start: window.weekStart,
    week_end: window.weekEnd,
    wins: values.wins,
    failures: values.failures,
    causes: values.causes,
    self_deception:
      values.selfDeception,
    keep_doing: values.keepDoing,
    stop_doing: values.stopDoing,
    start_doing: values.startDoing,
    next_improvement:
      values.mainFocus,
    main_focus: values.mainFocus,
    first_action: values.firstAction,
  });

  redirect("/");
}
