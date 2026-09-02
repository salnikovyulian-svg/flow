import { useState } from "react";

import {
  decisionContractQuestions,
  initialDecisionContractAnswers,
} from "@/features/decision-contract/mock-data";
import type {
  DecisionContractActions,
  DecisionContractAnswers,
  DecisionContractQuestion,
  DecisionContractResolvedAnswers,
} from "@/features/decision-contract/types";

function isQuestionComplete(
  question: DecisionContractQuestion | null,
  answers: DecisionContractAnswers,
) {
  if (!question) {
    return false;
  }

  if (question.inputType === "actions") {
    return answers.actions.every((action) => action.trim().length > 0);
  }

  if (question.inputType === "options") {
    return (
      answers.commitmentSelection !== null &&
      Number.isInteger(answers.commitmentDays) &&
      answers.commitmentDays > 0
    );
  }

  return answers[question.field].trim().length > 0;
}

function createInitialAnswers(): DecisionContractAnswers {
  return {
    ...initialDecisionContractAnswers,
    actions: [
      ...initialDecisionContractAnswers.actions,
    ] as DecisionContractActions,
  };
}

export function useDecisionContract() {
  const [answers, setAnswers] =
    useState<DecisionContractAnswers>(
      createInitialAnswers,
    );

  const [stepIndex, setStepIndex] = useState(0);
  const [isCreated, setIsCreated] = useState(false);

  const totalSteps = decisionContractQuestions.length + 1;
  const currentQuestion =
    decisionContractQuestions[stepIndex] ?? null;

  const isSummary =
    stepIndex === decisionContractQuestions.length;

  const isLastQuestion =
    stepIndex ===
    decisionContractQuestions.length - 1;

  const resolvedAnswers: DecisionContractResolvedAnswers = {
    actions: answers.actions,
    commitmentDays: answers.commitmentDays,
    decision: answers.decision,
    failureReason: answers.failureReason,
    reason: answers.reason,
    success: answers.success,
  };

  function updateAnswer<
    Field extends keyof DecisionContractAnswers,
  >(
    field: Field,
    value: DecisionContractAnswers[Field],
  ) {
    setAnswers((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function goNext() {
    if (!isQuestionComplete(currentQuestion, answers)) {
      return;
    }

    setStepIndex((current) =>
      Math.min(
        current + 1,
        decisionContractQuestions.length,
      ),
    );
  }

  function goPrevious() {
    setStepIndex((current) =>
      Math.max(current - 1, 0),
    );
  }

  function createContract() {
    setIsCreated(true);
  }

  return {
    answers,
    canContinue: isQuestionComplete(
      currentQuestion,
      answers,
    ),
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
