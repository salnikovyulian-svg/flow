"use server";

import { getWorkFlow } from "../repository";

export async function getWorkFlowAction() {
  return await getWorkFlow();
}
