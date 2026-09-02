"use server";

import { getDecisionById as getDecisionByIdRepository } from "../repository";

export async function getDecisionById(id: string) {
  return await getDecisionByIdRepository(id);
}
