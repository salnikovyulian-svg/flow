"use server";

import { startSessionRepository } from "../repository";

export async function startSession(
  decisionId: string | null,
  focus: string,
) {
  return await startSessionRepository(
    decisionId,
    focus,
  );
}
