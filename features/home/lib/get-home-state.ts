import { getActiveDecision } from "@/features/decision-contract/repository";
import { getTodayDeepWorkSessionsRepository } from "@/features/deep-work/repository";
import { getTodayEndOfDayRepository } from "@/features/end-of-day/repository";
import { getWorkFlow } from "@/features/work-flow/repository";
import { getReviewWindow } from "@/features/weekly-review/lib/get-review-window";
import { getWeeklyReviewByStartRepository } from "@/features/weekly-review/repository";

export type HomeState =
  | "decision"
  | "workflow"
  | "deep-work"
  | "end-of-day"
  | "weekly-review";

export async function getHomeState(): Promise<HomeState> {
  const reviewWindow = getReviewWindow();

  if (reviewWindow.isOpen) {
    const weeklyReview =
      await getWeeklyReviewByStartRepository(
        reviewWindow.weekStart,
      );

    if (!weeklyReview) {
      return "weekly-review";
    }
  }

  const decision = await getActiveDecision();

  if (!decision) {
    return "decision";
  }

  const workFlow = await getWorkFlow();

  if (!workFlow) {
    return "workflow";
  }

  const sessions =
    await getTodayDeepWorkSessionsRepository();

  if (sessions.length === 0) {
    return "deep-work";
  }

  const activeSession = sessions.find(
    (session) => !session.finished_at,
  );

  if (activeSession) {
    return "deep-work";
  }

  const endOfDay =
    await getTodayEndOfDayRepository();

  if (!endOfDay) {
    return "end-of-day";
  }

  return "deep-work";
}
