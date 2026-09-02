type Props = {
  value: string;
  onChange(value: string): void;
  onBack(): void;
  onNext(): void;
};

export function StepTomorrow({
  value,
  onChange,
  onBack,
  onNext,
}: Props) {
  return (
    <>
      <h2 className="text-3xl font-semibold">
        Tomorrow
      </h2>

      <p className="mt-3 text-muted-foreground">
        What is the first Deep Work block
        tomorrow?
      </p>

      <textarea
        className="mt-8 min-h-56 w-full rounded-2xl border bg-card p-5"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <div className="mt-10 flex justify-between">

        <button
          onClick={onBack}
          className="rounded-xl border px-8 py-4"
        >
          ← Back
        </button>

        <button
          onClick={onNext}
          className="rounded-xl bg-primary px-8 py-4 font-semibold text-white"
        >
          Continue →
        </button>

      </div>
    </>
  );
}
