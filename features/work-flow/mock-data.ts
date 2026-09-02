import type { RitualItem, WorkFlow } from "./types";

export const defaultRitual: RitualItem[] = [
  {
    id: "water",
    label: "Water",
    completed: false,
  },
  {
    id: "dnd",
    label: "Phone → Do Not Disturb",
    completed: false,
  },
  {
    id: "telegram",
    label: "Close Telegram",
    completed: false,
  },
  {
    id: "x",
    label: "Close X",
    completed: false,
  },
  {
    id: "headphones",
    label: "Headphones",
    completed: false,
  },
  {
    id: "workspace",
    label: "Open only work apps",
    completed: false,
  },
];

export const initialWorkFlow: WorkFlow = {
  decisionId: null,
  focus: "",
  location: "home",
  customLocation: "",
  startTime: "08:00",
  durationMinutes: 90,
  ritual: defaultRitual,
};
