"use server";

import { resumeSessionRepository } from "../repository";

export async function resumeSession(
  id: string,
  pausedAt: string,
) {
  return await resumeSessionRepository(
    id,
    pausedAt,
  );
}
