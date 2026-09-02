"use server";

import { redirect } from "next/navigation";

import { deleteDecision as deleteDecisionRepository } from "../repository";

export async function deleteDecision(id: string) {
  await deleteDecisionRepository(id);

  redirect("/");
}
