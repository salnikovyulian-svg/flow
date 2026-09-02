"use server";

import { getDeepWorkHistoryRepository } from "../repository";

export async function getDeepWorkHistory() {
  return await getDeepWorkHistoryRepository();
}
