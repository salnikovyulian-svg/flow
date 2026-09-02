"use client";

import { getDayColor } from "../utils/get-day-color";
import type { CalendarDay } from "../types";

type Props = {
  day: CalendarDay;
  onSelect(day: CalendarDay): void;
};

export function CalendarDayCard({
  day,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(day)}
      className={`
        aspect-square
        rounded-xl
        transition
        hover:scale-105
        ${getDayColor(day.minutes)}
      `}
    >
      <div className="flex h-full items-center justify-center text-sm font-medium text-white">
        {day.day}
      </div>
    </button>
  );
}
