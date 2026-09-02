const TIME_ZONE = "Europe/Warsaw";
const FIRST_REVIEW_DATE = "2026-09-01";

type WarsawDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

export type ReviewWindow = {
  isOpen: boolean;
  weekStart: string;
  weekEnd: string;
};

function getWarsawDate(
  date: Date,
): WarsawDate {
  const formatter =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });

  const parts = formatter.formatToParts(date);

  const get = (type: string) =>
    Number(
      parts.find(
        (part) => part.type === type,
      )?.value ?? 0,
    );

  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

function toUtcDate(value: WarsawDate) {
  return new Date(
    Date.UTC(
      value.year,
      value.month - 1,
      value.day,
    ),
  );
}

function addDays(
  date: Date,
  amount: number,
) {
  const result = new Date(date);
  result.setUTCDate(
    result.getUTCDate() + amount,
  );

  return result;
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getReviewWindow(
  now = new Date(),
): ReviewWindow {
  const warsaw = getWarsawDate(now);
  const localDate = toUtcDate(warsaw);

  const weekday =
    localDate.getUTCDay() === 0
      ? 7
      : localDate.getUTCDay();

  const currentMonday = addDays(
    localDate,
    -(weekday - 1),
  );

  const isSundayAfterNoon =
    weekday === 7 &&
    (warsaw.hour > 12 ||
      (warsaw.hour === 12 &&
        warsaw.minute >= 0));

  const targetMonday =
    isSundayAfterNoon
      ? currentMonday
      : addDays(currentMonday, -7);

  const targetSunday =
    addDays(targetMonday, 6);

  const firstReviewDate = new Date(
    `${FIRST_REVIEW_DATE}T00:00:00.000Z`,
  );

  if (targetSunday < firstReviewDate) {
    return {
      isOpen: false,
      weekStart: FIRST_REVIEW_DATE,
      weekEnd: toDateKey(
        addDays(firstReviewDate, 5),
      ),
    };
  }

  const weekStart =
    targetMonday < firstReviewDate
      ? firstReviewDate
      : targetMonday;

  return {
    isOpen: true,
    weekStart: toDateKey(weekStart),
    weekEnd: toDateKey(targetSunday),
  };
}
