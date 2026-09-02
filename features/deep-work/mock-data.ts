import type { DeepWorkSession } from "./types";

export const initialSession: DeepWorkSession = {
  startedAt: null,
  finishedAt: null,
  durationMinutes: 90,
  status: "idle",
};
