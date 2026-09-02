"use server";

import { getActiveDecisions } from "../repository";

export async function getActiveDecisionsAction() {
  return await getActiveDecisions();
}
