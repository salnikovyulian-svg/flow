export function getDayColor(
  minutes: number,
) {
  if (minutes >= 180) {
    return "bg-emerald-500";
  }

  if (minutes >= 120) {
    return "bg-orange-400";
  }

  if (minutes >= 60) {
    return "bg-yellow-400";
  }

  return "bg-zinc-800";
}
