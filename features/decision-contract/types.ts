export type DecisionContractActions = [string, string, string];

export type DecisionContractTextField =
  | "decision"
  | "reason"
  | "success"
  | "failureReason";

export type DecisionContractCommitmentSelection =
  | number
  | "custom"
  | null;

export type DecisionContractCommitmentOption = {
  label: string;
  value: Exclude<DecisionContractCommitmentSelection, null>;
};

export type DecisionContractAnswers = {
  actions: DecisionContractActions;
  commitmentDays: number;
  commitmentSelection: DecisionContractCommitmentSelection;
  decision: string;
  failureReason: string;
  reason: string;
  success: string;
};

export type DecisionContractResolvedAnswers = Omit<
  DecisionContractAnswers,
  "commitmentSelection"
>;

type DecisionContractQuestionBase = {
  helperText: string;
  id: string;
  title: string;
};

export type DecisionContractTextQuestion =
  DecisionContractQuestionBase & {
    field: DecisionContractTextField;
    inputType: "text" | "textarea";
    placeholder: string;
  };

export type DecisionContractCommitmentQuestion =
  DecisionContractQuestionBase & {
    customOption: "custom";
    customPlaceholder: string;
    field: "commitmentSelection";
    inputType: "options";
    options: readonly DecisionContractCommitmentOption[];
  };

export type DecisionContractActionsQuestion =
  DecisionContractQuestionBase & {
    actionPlaceholders: DecisionContractActions;
    field: "actions";
    inputType: "actions";
  };

export type DecisionContractQuestion =
  | DecisionContractTextQuestion
  | DecisionContractCommitmentQuestion
  | DecisionContractActionsQuestion;

export type DecisionContractSummaryItem = {
  field: keyof DecisionContractResolvedAnswers;
  label: string;
};

export type UpdateDecisionContractAnswer = <
  Field extends keyof DecisionContractAnswers,
>(
  field: Field,
  value: DecisionContractAnswers[Field],
) => void;
