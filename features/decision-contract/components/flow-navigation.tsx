import { ArrowLeft, ArrowRight, Check } from "lucide-react";

type FlowNavigationProps = {
  canContinue: boolean;
  isCompleteAction?: boolean;
  nextLabel: string;
  onNext: () => void;
  onPrevious: () => void;
  previousLabel: string;
  showPrevious: boolean;
};

export function FlowNavigation({
  canContinue,
  isCompleteAction = false,
  nextLabel,
  onNext,
  onPrevious,
  previousLabel,
  showPrevious,
}: FlowNavigationProps) {
  const NextIcon = isCompleteAction ? Check : ArrowRight;

  return (
    <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/6 pt-6">
      {showPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft size={16} />
          {previousLabel}
        </button>
      ) : (
        <span />
      )}

      <button
        disabled={!canContinue}
        onClick={onNext}
        type="button"
        className="
          inline-flex
          items-center
          gap-3
          rounded-2xl
          bg-white
          px-6
          py-3.5
          text-sm
          font-semibold
          text-slate-900
          shadow-[0_12px_40px_rgba(255,255,255,.08)]
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-[0_18px_50px_rgba(255,255,255,.14)]
          disabled:pointer-events-none
          disabled:opacity-30
        "
      >
        {nextLabel}
        <NextIcon size={17} />
      </button>
    </div>
  );
}
