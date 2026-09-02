"use server";

import { redirect } from "next/navigation";

import { saveEndOfDayRepository } from "../repository";
import type { EndOfDay } from "../types";

export async function saveEndOfDay(
  values: EndOfDay,
) {
  await saveEndOfDayRepository({
    unfinished: values.unfinished,
    tomorrow: values.tomorrow,
    process_followed:
      values.processFollowed,
  });

  redirect("/");
}
