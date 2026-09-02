"use server";

import { finishSessionRepository } from "../repository";

export async function finishSession(
  id: string,
) {
  return await finishSessionRepository(id);
}
