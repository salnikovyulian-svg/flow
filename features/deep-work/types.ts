export type DeepWorkStatus =
  | "idle"
  | "running"
  | "paused"
  | "completed";

export type DeepWorkSession = {
  id?: string;

  startedAt: string | null;
  finishedAt: string | null;

  durationMinutes: number;

  status: DeepWorkStatus;
};
