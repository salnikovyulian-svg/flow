import type {
  CalendarData,
  CalendarDay,
  CalendarMonth,
} from "../types";

function isSameDay(
  left: Date,
  right: Date,
) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function buildCalendar(
  data: CalendarData,
): CalendarMonth {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();

  const totalDays = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const days: CalendarDay[] = [];

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);

    const sessions = data.sessions.filter(
      (session) =>
        isSameDay(
          new Date(session.started_at),
          date,
        ),
    );

    const minutes = sessions.reduce(
      (total, session) =>
        total + (session.duration_minutes ?? 0),
      0,
    );

    const endOfDay =
      [...data.endOfDays]
        .reverse()
        .find((entry) =>
          isSameDay(
            new Date(entry.created_at),
            date,
          ),
        ) ?? null;

    days.push({
      date,
      day,
      isCurrentMonth: true,
      minutes,
      sessions,
      endOfDay,
    });
  }

  return {
    year,
    month,
    days,
  };
}
