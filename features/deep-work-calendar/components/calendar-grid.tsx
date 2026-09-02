"use client";

import type { CalendarDay } from "../types";

import { CalendarDayCard } from "./calendar-day";

const weekDays = [
  "M",
  "T",
  "W",
  "T",
  "F",
  "S",
  "S",
];

type Props = {
  days: CalendarDay[];
  onSelect(day: CalendarDay): void;
};

export function CalendarGrid({
  days,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <CalendarDayCard
            key={day.date.toISOString()}
            day={day}
            onSelect={onSelect}
          />
        ))}
      </div>

    </div>
  );
}
