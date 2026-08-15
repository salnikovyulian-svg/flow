import styles from "@/features/goal-contract/components/goal-contract.module.css";

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
      <div className={styles.progressMeta}>
        <span>{label}</span>
        <span className={styles.progressValue}>{valueLabel}</span>
      </div>

      <div
        aria-label={label}
        aria-valuemax={total}
        aria-valuemin={1}
        aria-valuenow={current}
        className={styles.progressTrack}
        role="progressbar"
      >
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
