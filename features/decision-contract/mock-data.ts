import type {
  DecisionContractAnswers,
  DecisionContractQuestion,
  DecisionContractSummaryItem,
} from "@/features/decision-contract/types";

export const customCommitmentOption = "custom";

export const decisionContractCopy = {
  brand: "FLOW",
  eyebrow: "DECISION CONTRACT",
  navigation: {
    create: "Create Decision Contract",
    next: "Next",
    previous: "Previous",
    review: "Review Decision",
  },
  progressLabel: "Decision contract progress",
  success: {
    action: "Begin Execution",
    description:
      "Your decision has been recorded.\n\nPlanning is finished.\n\nExecution begins now.",
    title: "Decision recorded",
  },
  summary: {
    description:
      "Review each commitment before recording your decision.",
    title: "Review your decision",
  },
} as const;

export const decisionContractQuestions: readonly DecisionContractQuestion[] = [
  {
    field: "decision",
    helperText:
      "Describe the system, outcome, or capability this decision will create.",
    id: "decision-build",
    inputType: "text",
    placeholder: "Build a better decision-making system",
    title: "What do you want to build?",
  },
  {
    field: "reason",
    helperText:
      "Capture why this decision deserves your time and attention.",
    id: "decision-reason",
    inputType: "textarea",
    placeholder: "Better decisions improve every area of my life.",
    title: "Why does it matter?",
  },
  {
    field: "success",
    helperText:
      "Describe the concrete result that would make this decision successful.",
    id: "decision-success",
    inputType: "textarea",
    placeholder:
      "I consistently make important decisions using a clear framework.",
    title: "What does success look like?",
  },
  {
    customOption: customCommitmentOption,
    customPlaceholder: "Enter a custom commitment period",
    field: "commitmentSelection",
    helperText:
      "Choose a period long enough to make meaningful progress.",
    id: "decision-commitment",
    inputType: "options",
    options: [
      { label: "14 Days", value: 14 },
      { label: "30 Days", value: 30 },
      { label: "60 Days", value: 60 },
      {
        label: "Custom",
        value: customCommitmentOption,
      },
    ],
    title:
      "How long will you commit before reviewing this decision?",
  },
  {
    actionPlaceholders: [
      "First action",
      "Second action",
      "Third action",
    ],
    field: "actions",
    helperText:
      "Choose the three actions that will move this decision forward.",
    id: "decision-actions",
    inputType: "actions",
    title: "What actions move this decision forward?",
  },
  {
    field: "failureReason",
    helperText:
      "Use pre-mortem thinking to identify the most likely point of failure.",
    id: "decision-failure",
    inputType: "textarea",
    placeholder: "This decision failed because...",
    title:
      "Imagine this decision failed.\n\nWhat is the most likely reason?",
  },
];

export const decisionContractSummaryItems: readonly DecisionContractSummaryItem[] = [
  { field: "decision", label: "Decision" },
  { field: "reason", label: "Why it matters" },
  { field: "success", label: "Success" },
  { field: "commitmentDays", label: "Commitment" },
  { field: "actions", label: "Three Actions" },
  { field: "failureReason", label: "Failure risk" },
];

export const initialDecisionContractAnswers: DecisionContractAnswers = {
  actions: ["", "", ""],
  commitmentDays: 0,
  commitmentSelection: null,
  decision: "",
  failureReason: "",
  reason: "",
  success: "",
};

export function formatDecisionProgressStep(current: number, total: number) {
  return `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
