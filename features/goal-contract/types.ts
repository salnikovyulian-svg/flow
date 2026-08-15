export type GoalContractActions = [string, string, string];

export type GoalContractTextField =
  | "build"
  | "reason"
  | "success"
  | "failureReason";

export type GoalContractAnswers = {
  actions: GoalContractActions;
  build: string;
  commitment: string;
  customCommitment: string;
  failureReason: string;
  reason: string;
  success: string;
};

export type GoalContractResolvedAnswers = Omit<
  GoalContractAnswers,
  "customCommitment"
>;

type GoalContractQuestionBase = {
  helperText: string;
  id: string;
  title: string;
};

export type GoalContractTextQuestion = GoalContractQuestionBase & {
  field: GoalContractTextField;
  inputType: "text" | "textarea";
  placeholder: string;
};

export type GoalContractCommitmentQuestion =
  GoalContractQuestionBase & {
    customOption: string;
    customPlaceholder: string;
    field: "commitment";
    inputType: "options";
    options: readonly string[];
  };

export type GoalContractActionsQuestion =
  GoalContractQuestionBase & {
    actionPlaceholders: GoalContractActions;
    field: "actions";
    inputType: "actions";
  };

export type GoalContractQuestion =
  | GoalContractTextQuestion
  | GoalContractCommitmentQuestion
  | GoalContractActionsQuestion;

export type GoalContractSummaryItem = {
  field: keyof GoalContractResolvedAnswers;
  label: string;
};

export type UpdateGoalContractAnswer = <
  Field extends keyof GoalContractAnswers,
>(
  field: Field,
  value: GoalContractAnswers[Field],
) => void;
