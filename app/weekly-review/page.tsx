import { redirect } from "next/navigation";

import { getWeeklyReviewData } from "@/features/weekly-review/actions/get-weekly-review-data";
import { WeeklyReview } from "@/features/weekly-review/components/weekly-review";
import { getReviewWindow } from "@/features/weekly-review/lib/get-review-window";
import { getWeeklyReviewByStartRepository } from "@/features/weekly-review/repository";

export const dynamic = "force-dynamic";

export default async function WeeklyReviewPage() {
  const window = getReviewWindow();

  if (!window.isOpen) {
    redirect("/");
  }

  const existing =
    await getWeeklyReviewByStartRepository(
      window.weekStart,
    );

  if (existing) {
    redirect("/");
  }

  const data = await getWeeklyReviewData(
    window.weekStart,
    window.weekEnd,
  );

  return <WeeklyReview data={data} />;
}
