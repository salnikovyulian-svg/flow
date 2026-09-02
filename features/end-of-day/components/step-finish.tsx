type Props = {
  onBack(): void;
  onFinish(): void;
};

export function StepFinish({
  onBack,
  onFinish,
}: Props) {
  return (
    <>
      <h2 className="text-3xl font-semibold">
        Ready to Shutdown
      </h2>

      <div className="mt-10 space-y-5 rounded-2xl border bg-card p-8">

        <p>✓ Tomorrow has a plan.</p>

        <p>✓ Open loops captured.</p>

        <p>✓ Workday complete.</p>

      </div>

      <div className="mt-10 flex justify-between">

        <button
          onClick={onBack}
          className="rounded-xl border px-8 py-4"
        >
          ← Back
        </button>

        <button
          onClick={onFinish}
          className="rounded-xl bg-primary px-8 py-4 font-semibold text-white"
        >
          Finish Day
        </button>

      </div>
    </>
  );
}
