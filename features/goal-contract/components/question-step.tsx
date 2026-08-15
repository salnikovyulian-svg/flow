import styles from "@/features/goal-contract/components/goal-contract.module.css";
import type {
  GoalContractActions,
  GoalContractAnswers,
  GoalContractQuestion,
  UpdateGoalContractAnswer,
} from "@/features/goal-contract/types";

type QuestionStepProps = {
  answers: GoalContractAnswers;
  onChange: UpdateGoalContractAnswer;
  question: GoalContractQuestion;
};

export function QuestionStep({
  answers,
  onChange,
  question,
}: QuestionStepProps) {
  const titleId = `${question.id}-title`;
  const helperId = `${question.id}-helper`;

  function updateAction(index: number, value: string) {
    const actions = [...answers.actions] as GoalContractActions;
    actions[index] = value;
    onChange("actions", actions);
  }

  return (
    <div>
      <h1 className={styles.questionTitle} id={titleId}>
        {question.title}
      </h1>

      <p className={styles.helperText} id={helperId}>
        {question.helperText}
      </p>

      <div className={styles.fieldArea}>
        {question.inputType === "actions" ? (
          <div className={styles.actionFields}>
            {question.actionPlaceholders.map((placeholder, index) => (
              <input
                aria-describedby={helperId}
                aria-label={placeholder}
                autoFocus={index === 0}
                className={styles.input}
                key={placeholder}
                onChange={(event) =>
                  updateAction(index, event.target.value)
                }
                placeholder={placeholder}
                required
                type="text"
                value={answers.actions[index]}
              />
            ))}
          </div>
        ) : question.inputType === "options" ? (
          <div>
            <div
              aria-describedby={helperId}
              aria-labelledby={titleId}
              className={styles.optionsGrid}
              role="radiogroup"
            >
              {question.options.map((option) => {
                const isSelected = answers.commitment === option;

                return (
                  <button
                    aria-checked={isSelected}
                    className={styles.option}
                    data-selected={isSelected}
                    key={option}
                    onClick={() => onChange("commitment", option)}
                    role="radio"
                    type="button"
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {answers.commitment === question.customOption ? (
              <input
                aria-describedby={helperId}
                aria-label={question.customPlaceholder}
                autoFocus
                className={`${styles.input} ${styles.customInput}`}
                onChange={(event) =>
                  onChange("customCommitment", event.target.value)
                }
                placeholder={question.customPlaceholder}
                required
                type="text"
                value={answers.customCommitment}
              />
            ) : null}
          </div>
        ) : question.inputType === "textarea" ? (
          <textarea
            aria-describedby={helperId}
            aria-labelledby={titleId}
            autoFocus
            className={`${styles.input} ${styles.textarea}`}
            onChange={(event) =>
              onChange(question.field, event.target.value)
            }
            placeholder={question.placeholder}
            required
            rows={5}
            value={answers[question.field]}
          />
        ) : (
          <input
            aria-describedby={helperId}
            aria-labelledby={titleId}
            autoFocus
            className={styles.input}
            onChange={(event) =>
              onChange(question.field, event.target.value)
            }
            placeholder={question.placeholder}
            required
            type="text"
            value={answers[question.field]}
          />
        )}
      </div>
    </div>
  );
}
