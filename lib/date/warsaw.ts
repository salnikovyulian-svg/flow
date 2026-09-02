const WARSAW_TIME_ZONE =
  "Europe/Warsaw";

export function getWarsawDateKey(
  value: Date | string,
) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: WARSAW_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(
    typeof value === "string"
      ? new Date(value)
      : value,
  );
}

export function addDaysToDateKey(
  dateKey: string,
  amount: number,
) {
  const date = new Date(
    `${dateKey}T00:00:00.000Z`,
  );

  date.setUTCDate(
    date.getUTCDate() + amount,
  );

  return date.toISOString().slice(0, 10);
}
