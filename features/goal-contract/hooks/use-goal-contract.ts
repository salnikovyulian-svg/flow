import { useState } from "react";

import {
  customCommitmentOption,
  goalContractQuestions,
  initialGoalContractAnswers,
} from "@/features/goal-contract/mock-data";
import type {
  GoalContractActions,
  GoalContractAnswers,
  GoalContractQuestion,
  GoalContractResolvedAnswers,
} from "@/features/goal-contract/types";

function isQuestionComplete(
  question: GoalContractQuestion | null,
  answers: GoalContractAnswers,
) {
  if (!question) {
    return false;
  }

  if (question.inputType === "actions") {
    return answers.actions.every((action) => action.trim().length > 0);
  }

  if (question.inputType === "options") {
    if (answers.commitment === customCommitmentOption) {
      return answers.customCommitment.trim().length > 0;
    }

    return answers.commitment.trim().length > 0;
  }

  return answers[question.field].trim().length > 0;
}

function createInitialAnswers(): GoalContractAnswers {
  return {
    ...initialGoalContractAnswers,
    actions: [
      ...initialGoalContractAnswers.actions,
    ] as GoalContractActions,
  };
}

export function useGoalContract() {
  const [answers, setAnswers] = useState<GoalContractAnswers>(
    createInitialAnswers,
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [isCreated, setIsCreated] = useState(false);

  const totalSteps = goalContractQuestions.length + 1;
  const currentQuestion = goalContractQuestions[stepIndex] ?? null;
  const isSummary = stepIndex === goalContractQuestions.length;
  const isLastQuestion = stepIndex === goalContractQuestions.length - 1;

  const resolvedAnswers: GoalContractResolvedAnswers = {
    actions: answers.actions,
    build: answers.build,
    commitment:
      answers.commitment === customCommitmentOption
        ? answers.customCommitment
        : answers.commitment,
    failureReason: answers.failureReason,
    reason: answers.reason,
    success: answers.success,
  };

  function updateAnswer<Field extends keyof GoalContractAnswers>(
    field: Field,
    value: GoalContractAnswers[Field],
  ) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [field]: value,
    }));
  }

  function goNext() {
    if (!isQuestionComplete(currentQuestion, answers)) {
      return;
    }

    setStepIndex((currentStep) =>
      Math.min(currentStep + 1, goalContractQuestions.length),
    );
  }

  function goPrevious() {
    setStepIndex((currentStep) => Math.max(currentStep - 1, 0));
  }

  function createContract() {
    setIsCreated(true);
  }

  return {
    answers,
    canContinue: isQuestionComplete(currentQuestion, answers),
    createContract,
    currentQuestion,
    currentStep: stepIndex + 1,
    goNext,
    goPrevious,
    isCreated,
    isLastQuestion,
    isSummary,
    resolvedAnswers,
    showPrevious: stepIndex > 0,
    totalSteps,
    updateAnswer,
  };
}
