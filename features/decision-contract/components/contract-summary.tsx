import { AppCard } from "@/components/ui/app-card";

import { decisionContractSummaryItems } from "@/features/decision-contract/mock-data";
import type { DecisionContractResolvedAnswers } from "@/features/decision-contract/types";

type ContractSummaryProps = {
  answers: DecisionContractResolvedAnswers;
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
      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
        {title}
      </h1>

      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
        {description}
      </p>

      <AppCard className="mt-10 p-0">
        {decisionContractSummaryItems.map((item) => {
          const value = answers[item.field];

          return (
            <div
              key={item.field}
              className="grid gap-3 border-b border-white/[0.06] px-6 py-6 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8"
            >
              <span className="text-sm font-medium text-slate-500">
                {item.label}
              </span>

              {Array.isArray(value) ? (
                <ol className="space-y-3 text-sm leading-6 text-slate-200">
                  {value.map((action, index) => (
                    <li
                      key={`${index}-${action}`}
                      className="flex gap-3"
                    >
                      <span className="font-mono text-xs text-violet-300/70">
                        0{index + 1}
                      </span>

                      <span>{action}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <span className="text-sm leading-6 text-slate-200">
                  {value}
                </span>
              )}
            </div>
          );
        })}
      </AppCard>
    </div>
  );
}
