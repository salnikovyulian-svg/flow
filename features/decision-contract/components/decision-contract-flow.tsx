"use client";

import { useState } from "react";

import { saveDecision } from "@/features/decision-contract/actions/save-decision";
import { ContractSuccess } from "@/features/decision-contract/components/contract-success";
import { ContractSummary } from "@/features/decision-contract/components/contract-summary";
import { FlowNavigation } from "@/features/decision-contract/components/flow-navigation";
import styles from "@/features/decision-contract/components/decision-contract.module.css";
import { ProgressIndicator } from "@/features/decision-contract/components/progress-indicator";
import { QuestionStep } from "@/features/decision-contract/components/question-step";
import { useDecisionContract } from "@/features/decision-contract/hooks/use-decision-contract";
import {
  decisionContractCopy,
  formatDecisionProgressStep,
} from "@/features/decision-contract/mock-data";

export function DecisionContractFlow() {
  const [saveError, setSaveError] = useState<string | null>(
    null,
  );
  const [isSaving, setIsSaving] = useState(false);

  const {
    answers,
    canContinue,
    createContract,
    currentQuestion,
    currentStep,
    goNext,
    goPrevious,
    isCreated,
    isLastQuestion,
    isSummary,
    resolvedAnswers,
    showPrevious,
    totalSteps,
    updateAnswer,
  } = useDecisionContract();

  async function beginExecution() {
    setSaveError(null);
    setIsSaving(true);

    const result = await saveDecision(resolvedAnswers);

    if (result?.error) {
      setSaveError(result.error);
      setIsSaving(false);
    }
  }

  const visibleStep = isCreated ? totalSteps : currentStep;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header>
          <p className={styles.brand}>
            {decisionContractCopy.brand}
          </p>
          <p className={styles.eyebrow}>
            {decisionContractCopy.eyebrow}
          </p>
        </header>

        <div className={styles.progressSection}>
          <ProgressIndicator
            current={visibleStep}
            label={decisionContractCopy.progressLabel}
            total={totalSteps}
            valueLabel={formatDecisionProgressStep(
              visibleStep,
              totalSteps,
            )}
          />
        </div>

        <div className={styles.content}>
          <div
            className={styles.screen}
            key={
              isCreated
                ? decisionContractCopy.success.title
                : currentStep
            }
          >
            {isCreated ? (
              <ContractSuccess
                actionLabel={
                  decisionContractCopy.success.action
                }
                description={
                  decisionContractCopy.success.description
                }
                error={saveError}
                isSubmitting={isSaving}
                onBeginExecution={beginExecution}
                title={decisionContractCopy.success.title}
              />
            ) : isSummary ? (
              <ContractSummary
                answers={resolvedAnswers}
                description={
                  decisionContractCopy.summary.description
                }
                title={decisionContractCopy.summary.title}
              />
            ) : currentQuestion ? (
              <QuestionStep
                answers={answers}
                onChange={updateAnswer}
                question={currentQuestion}
              />
            ) : null}
          </div>

          {!isCreated ? (
            <FlowNavigation
              canContinue={isSummary || canContinue}
              isCompleteAction={isSummary}
              nextLabel={
                isSummary
                  ? decisionContractCopy.navigation.create
                  : isLastQuestion
                    ? decisionContractCopy.navigation.review
                    : decisionContractCopy.navigation.next
              }
              onNext={
                isSummary ? createContract : goNext
              }
              onPrevious={goPrevious}
              previousLabel={
                decisionContractCopy.navigation.previous
              }
              showPrevious={showPrevious}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
