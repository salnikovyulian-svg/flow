import styles from "@/features/goal-contract/components/goal-contract.module.css";
import { goalContractSummaryItems } from "@/features/goal-contract/mock-data";
import type { GoalContractResolvedAnswers } from "@/features/goal-contract/types";

type ContractSummaryProps = {
  answers: GoalContractResolvedAnswers;
  description: string;
  title: string;
};

export function ContractSummary({
  answers,
  description,
  title,
}: ContractSummaryProps) {
  return (
    <div>
      <h1 className={styles.questionTitle}>{title}</h1>
      <p className={styles.helperText}>{description}</p>

      <div className={styles.summaryCard}>
        {goalContractSummaryItems.map((item) => {
          const value = answers[item.field];

          return (
            <div className={styles.summaryRow} key={item.field}>
              <span className={styles.summaryLabel}>{item.label}</span>

              {Array.isArray(value) ? (
                <ol className={styles.actionList}>
                  {value.map((action, index) => (
                    <li key={`${index}-${action}`}>{action}</li>
                  ))}
                </ol>
              ) : (
                <span className={styles.summaryValue}>{value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
