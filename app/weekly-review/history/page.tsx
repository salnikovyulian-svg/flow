import { getWeeklyReviewData } from "@/features/weekly-review/actions/get-weekly-review-data";
import { WeeklyReviewHistory } from "@/features/weekly-review/components/weekly-review-history";
import { getWeeklyReviewHistoryRepository } from "@/features/weekly-review/repository";

export const dynamic = "force-dynamic";

export default async function WeeklyReviewHistoryPage() {
  const reviews =
    await getWeeklyReviewHistoryRepository();

  const entries = await Promise.all(
    reviews.map(async (review) => ({
      review,
      data: await getWeeklyReviewData(
        review.week_start,
        review.week_end,
      ),
    })),
  );

  return (
    <WeeklyReviewHistory entries={entries} />
  );
}
