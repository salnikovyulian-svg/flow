export const workLocations = [
  "home",
  "coworking",
  "cafe",
  "office",
  "custom",
] as const;

export type WorkLocation = (typeof workLocations)[number];

export type RitualItem = {
  id: string;
  label: string;
  completed: boolean;
};

export type WorkFlow = {
  focus: string;
  decisionId: string | null;
  location: WorkLocation;
  customLocation: string;
  startTime: string;
  durationMinutes: number;
  ritual: RitualItem[];
};

export type WorkFlowForm = WorkFlow;
