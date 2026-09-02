import type {
  DecisionContractActions,
  DecisionContractAnswers,
  DecisionContractQuestion,
  UpdateDecisionContractAnswer,
} from "@/features/decision-contract/types";

type QuestionStepProps = {
  answers: DecisionContractAnswers;
  onChange: UpdateDecisionContractAnswer;
  question: DecisionContractQuestion;
};

export function QuestionStep({
  answers,
  onChange,
  question,
}: QuestionStepProps) {
  const titleId = `${question.id}-title`;
  const helperId = `${question.id}-helper`;

  function updateAction(index: number, value: string) {
    const actions = [...answers.actions] as DecisionContractActions;
    actions[index] = value;
    onChange("actions", actions);
  }

  return (
    <div className="animate-[screen-enter_360ms_cubic-bezier(.22,1,.36,1)]">
      <h1
        id={titleId}
        className="max-w-3xl whitespace-pre-line text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl"
      >
        {question.title}
      </h1>

      <p
        id={helperId}
        className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg"
      >
        {question.helperText}
      </p>

      <div className="mt-10">
        {question.inputType === "actions" ? (
          <div className="grid gap-4">
            {question.actionPlaceholders.map(
              (placeholder, index) => (
                <input
                  key={placeholder}
                  value={answers.actions[index]}
                  onChange={(e) =>
                    updateAction(index, e.target.value)
                  }
                  placeholder={placeholder}
                  autoFocus={index === 0}
                  type="text"
                  className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-base text-white outline-none backdrop-blur-xl transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-400/10"
                />
              ),
            )}
          </div>
        ) : question.inputType === "options" ? (
          <>
            <div
              className="grid gap-3 sm:grid-cols-2"
              role="radiogroup"
            >
              {question.options.map((option) => {
                const selected =
                  answers.commitmentSelection ===
                  option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => {
                      onChange(
                        "commitmentSelection",
                        option.value,
                      );

                      onChange(
                        "commitmentDays",
                        typeof option.value === "number"
                          ? option.value
                          : 0,
                      );
                    }}
                    className={`h-16 rounded-2xl border px-5 text-left text-sm font-medium transition-all duration-200 ${
                      selected
                        ? "border-violet-400/50 bg-violet-400/10 text-white shadow-[0_0_30px_rgba(139,92,246,.10)]"
                        : "border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            {answers.commitmentSelection ===
              question.customOption && (
              <input
                type="number"
                min={1}
                step={1}
                placeholder={question.customPlaceholder}
                value={
                  answers.commitmentDays > 0
                    ? answers.commitmentDays
                    : ""
                }
                onChange={(e) =>
                  onChange(
                    "commitmentDays",
                    Number.isFinite(
                      e.currentTarget.valueAsNumber,
                    )
                      ? e.currentTarget.valueAsNumber
                      : 0,
                  )
                }
                className="mt-3 h-16 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-base text-white outline-none backdrop-blur-xl transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-400/10"
              />
            )}
          </>
        ) : question.inputType === "textarea" ? (
          <textarea
            rows={5}
            value={answers[question.field]}
            placeholder={question.placeholder}
            onChange={(e) =>
              onChange(question.field, e.target.value)
            }
            className="min-h-40 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base leading-7 text-white outline-none backdrop-blur-xl transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-400/10"
          />
        ) : (
          <input
            type="text"
            value={answers[question.field]}
            placeholder={question.placeholder}
            onChange={(e) =>
              onChange(question.field, e.target.value)
            }
            className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-base text-white outline-none backdrop-blur-xl transition placeholder:text-slate-600 focus:border-violet-400/50 focus:bg-white/[0.06] focus:ring-4 focus:ring-violet-400/10"
          />
        )}
      </div>
    </div>
  );
}
