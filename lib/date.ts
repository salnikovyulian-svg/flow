export function calculateReviewDate(
  commitmentDays: number,
) {
  const reviewDate = new Date();

  reviewDate.setUTCDate(
    reviewDate.getUTCDate() + commitmentDays,
  );

  return reviewDate.toISOString().slice(0, 10);
}
