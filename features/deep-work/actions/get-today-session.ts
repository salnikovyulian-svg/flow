"use server";

import { getTodaySessionRepository } from "../repository";

export async function getTodaySession() {
  return await getTodaySessionRepository();
}
