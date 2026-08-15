import { Check, Play } from "lucide-react";

import styles from "@/features/goal-contract/components/goal-contract.module.css";

type ContractSuccessProps = {
  actionLabel: string;
  description: string;
  onBeginExecution: () => void;
  title: string;
};

export function ContractSuccess({
  actionLabel,
  description,
  onBeginExecution,
  title,
}: ContractSuccessProps) {
  return (
    <div className={styles.success}>
      <div className={styles.successIcon}>
        <Check aria-hidden="true" size={24} strokeWidth={2} />
      </div>

      <h1 className={styles.successTitle}>{title}</h1>
      <p className={styles.successDescription}>{description}</p>

      <button
        className={styles.primaryButton}
        onClick={onBeginExecution}
        type="button"
      >
        {actionLabel}
        <Play aria-hidden="true" size={16} />
      </button>
    </div>
  );
}
