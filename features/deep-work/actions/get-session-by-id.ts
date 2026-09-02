"use server";

import { getSessionByIdRepository } from "../repository";

export async function getSessionById(id: string) {
  return await getSessionByIdRepository(id);
}
