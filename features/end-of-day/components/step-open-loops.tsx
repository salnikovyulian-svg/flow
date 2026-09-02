type Props = {
  value: string;
  onChange(value: string): void;
  onNext(): void;
};

export function StepOpenLoops({
  value,
  onChange,
  onNext,
}: Props) {
  return (
    <>

      <h2 className="text-3xl font-semibold">
        Open Loops
      </h2>

      <p className="mt-3 text-muted-foreground">
        Capture everything your brain is
        still holding.
      </p>

      <textarea
        className="mt-8 min-h-56 w-full rounded-2xl border bg-card p-5"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <button
        onClick={onNext}
        className="mt-10 rounded-xl bg-primary px-8 py-4 font-semibold text-white"
      >
        Continue →
      </button>

    </>
  );
}
