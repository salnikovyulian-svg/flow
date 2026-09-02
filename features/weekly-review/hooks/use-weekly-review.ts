import { useState } from "react";

import { initialWeeklyReview } from "../mock-data";

export function useWeeklyReview() {
  const [review, setReview] =
    useState(initialWeeklyReview);

  function update(
    key: keyof typeof review,
    value: string,
  ) {
    setReview((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return {
    review,
    update,
  };
}
