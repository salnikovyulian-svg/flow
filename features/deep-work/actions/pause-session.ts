"use server";

import { pauseSessionRepository } from "../repository";

export async function pauseSession(id: string) {
  return await pauseSessionRepository(id);
}
