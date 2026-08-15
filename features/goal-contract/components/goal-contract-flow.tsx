"use client";

import { useRouter } from "next/navigation";

import { ContractSuccess } from "@/features/goal-contract/components/contract-success";
import { ContractSummary } from "@/features/goal-contract/components/contract-summary";
import { FlowNavigation } from "@/features/goal-contract/components/flow-navigation";
import styles from "@/features/goal-contract/components/goal-contract.module.css";
import { ProgressIndicator } from "@/features/goal-contract/components/progress-indicator";
import { QuestionStep } from "@/features/goal-contract/components/question-step";
import { useGoalContract } from "@/features/goal-contract/hooks/use-goal-contract";
import {
  formatProgressStep,
  goalContractCopy,
} from "@/features/goal-contract/mock-data";

export function GoalContractFlow() {
  const router = useRouter();
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
  } = useGoalContract();

  function beginExecution() {
    router.push("/");
  }

  const visibleStep = isCreated ? totalSteps : currentStep;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header>
          <p className={styles.brand}>{goalContractCopy.brand}</p>
          <p className={styles.eyebrow}>{goalContractCopy.eyebrow}</p>
        </header>

        <div className={styles.progressSection}>
          <ProgressIndicator
            current={visibleStep}
            label={goalContractCopy.progressLabel}
            total={totalSteps}
            valueLabel={formatProgressStep(visibleStep, totalSteps)}
          />
        </div>

        <div className={styles.content}>
          <div
            className={styles.screen}
            key={isCreated ? goalContractCopy.success.title : currentStep}
          >
            {isCreated ? (
              <ContractSuccess
                actionLabel={goalContractCopy.success.action}
                description={goalContractCopy.success.description}
                onBeginExecution={beginExecution}
                title={goalContractCopy.success.title}
              />
            ) : isSummary ? (
              <ContractSummary
                answers={resolvedAnswers}
                description={goalContractCopy.summary.description}
                title={goalContractCopy.summary.title}
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
                  ? goalContractCopy.navigation.create
                  : isLastQuestion
                    ? goalContractCopy.navigation.review
                    : goalContractCopy.navigation.next
              }
              onNext={isSummary ? createContract : goNext}
              onPrevious={goPrevious}
              previousLabel={goalContractCopy.navigation.previous}
              showPrevious={showPrevious}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
