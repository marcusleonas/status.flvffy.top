type TimeUnit = "year" | "month" | "day" | "hour" | "minute" | "second";

export function getTimeSince(date: Date | string | number): string {
  const inputDate = new Date(date);
  if (isNaN(inputDate.getTime())) return "Invalid date";

  const now = new Date();
  const differenceMs = now.getTime() - inputDate.getTime();
  const isPast = differenceMs >= 0;
  let absDiff = Math.abs(differenceMs);

  // Time constants in milliseconds
  const MINUTE = 60 * 1000;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;
  const MONTH = DAY * 30.436875; // Average month length
  const YEAR = DAY * 365.25; // Account for leap years

  const units: { unit: TimeUnit; value: number }[] = [
    { unit: "year", value: YEAR },
    { unit: "month", value: MONTH },
    { unit: "day", value: DAY },
    { unit: "hour", value: HOUR },
    { unit: "minute", value: MINUTE },
    { unit: "second", value: 1000 },
  ];

  const parts: string[] = [];

  for (const { unit, value } of units) {
    const count = Math.floor(absDiff / value);
    if (count > 0) {
      parts.push(`${count} ${unit}${count !== 1 ? "s" : ""}`);
      absDiff -= count * value;
    }
    if (parts.length >= 2) break;
  }

  if (parts.length === 0) return "Just now";

  const timeString = parts.join(", ");
  return isPast ? `${timeString} ago` : `in ${timeString}`;
}
