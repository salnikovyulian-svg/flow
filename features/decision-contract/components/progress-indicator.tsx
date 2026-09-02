type ProgressIndicatorProps = {
  current: number;
  label: string;
  total: number;
  valueLabel: string;
};

export function ProgressIndicator({
  current,
  label,
  total,
  valueLabel,
}: ProgressIndicatorProps) {
  const progress = (current / total) * 100;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4 text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
        <span>{label}</span>

        <span className="font-mono tracking-normal text-slate-400">
          {valueLabel}
        </span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        className="h-1 overflow-hidden rounded-full bg-white/[0.06]"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-400 to-blue-400 transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
