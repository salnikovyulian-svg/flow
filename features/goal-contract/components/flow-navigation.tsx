import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import styles from "@/features/goal-contract/components/goal-contract.module.css";

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
    <div className={styles.navigation}>
      {showPrevious ? (
        <button
          className={styles.secondaryButton}
          onClick={onPrevious}
          type="button"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          {previousLabel}
        </button>
      ) : (
        <span aria-hidden="true" />
      )}

      <button
        className={styles.primaryButton}
        disabled={!canContinue}
        onClick={onNext}
        type="button"
      >
        {nextLabel}
        <NextIcon aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
