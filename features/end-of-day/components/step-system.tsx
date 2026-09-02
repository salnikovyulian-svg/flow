type Props = {
  value: boolean;
  onChange(value: boolean): void;
  onBack(): void;
  onNext(): void;
};

export function StepSystem({
  value,
  onChange,
  onBack,
  onNext,
}: Props) {
  return (
    <>
      <h2 className="text-3xl font-semibold">
        Trusted System
      </h2>

      <p className="mt-3 text-muted-foreground">
        Have all unfinished tasks been
        captured or scheduled?
      </p>

      <div className="mt-10 space-y-4">

        <button
          onClick={() => onChange(true)}
          className={`w-full rounded-2xl border p-5 text-left ${
            value
              ? "border-primary bg-primary/10"
              : ""
          }`}
        >
          Yes
        </button>

        <button
          onClick={() => onChange(false)}
          className={`w-full rounded-2xl border p-5 text-left ${
            value === false
              ? "border-primary bg-primary/10"
              : ""
          }`}
        >
          No
        </button>

      </div>

      {!value && (
        <p className="mt-6 text-sm text-amber-400">
          Your brain probably still holds
          open loops.
        </p>
      )}

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
