import { Check, Play } from "lucide-react";

type ContractSuccessProps = {
  actionLabel: string;
  description: string;
  error: string | null;
  isSubmitting: boolean;
  onBeginExecution: () => void;
  title: string;
};

export function ContractSuccess({
  actionLabel,
  description,
  error,
  isSubmitting,
  onBeginExecution,
  title,
}: ContractSuccessProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300 shadow-[0_0_50px_rgba(139,92,246,.12)]">
        <Check
          aria-hidden="true"
          size={28}
          strokeWidth={2}
        />
      </div>

      <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-xl whitespace-pre-line text-base leading-7 text-slate-400 sm:text-lg">
        {description}
      </p>

      <button
        disabled={isSubmitting}
        onClick={onBeginExecution}
        type="button"
        className="
          mt-10
          inline-flex
          items-center
          gap-3
          rounded-2xl
          bg-white
          px-7
          py-4
          text-sm
          font-semibold
          text-slate-900
          shadow-[0_15px_50px_rgba(255,255,255,.08)]
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-[0_20px_60px_rgba(255,255,255,.14)]
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        {actionLabel}

        <Play
          aria-hidden="true"
          size={17}
        />
      </button>

      {error ? (
        <p className="mt-5 text-sm text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
