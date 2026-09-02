type Props = {
  step: number;
};

export function ShutdownProgress({
  step,
}: Props) {
  return (
    <div className="mb-10 flex gap-3">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className={`h-2 flex-1 rounded-full transition ${
            item <= step
              ? "bg-primary"
              : "bg-card"
          }`}
        />
      ))}

    </div>
  );
}
