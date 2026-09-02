"use server";

import { saveReflectionRepository } from "../repository";

export async function saveReflection(
  id: string,
  reflection: {
    insight: string;
    friction: string;
    distraction: string;
    nextStep: string;
  },
) {
  await saveReflectionRepository(
    id,
    reflection,
  );
}
