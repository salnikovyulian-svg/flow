export function CalendarLegend() {
  return (
    <div className="mt-8 flex items-center gap-5 text-xs text-muted-foreground">

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-zinc-800" />
        0h
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-yellow-400" />
        1h
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-orange-400" />
        2h
      </div>

      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded bg-emerald-500" />
        3h+
      </div>

    </div>
  );
}
