import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

export async function getEndOfDayRepository() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("end_of_day")
    .select("*")
    .eq("user_id", USER_ID)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function saveEndOfDayRepository(
  values: Record<string, unknown>,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("end_of_day")
    .insert({
      user_id: USER_ID,
      ...values,
    });

  if (error) throw error;
}

export async function getTodayEndOfDayRepository() {
  const { getWarsawDateKey, addDaysToDateKey } =
    await import("@/lib/date/warsaw");

  const supabase = await createClient();
  const today = getWarsawDateKey(new Date());
  const queryStart = addDaysToDateKey(
    today,
    -1,
  );

  const { data, error } = await supabase
    .from("end_of_day")
    .select("*")
    .eq("user_id", USER_ID)
    .gte(
      "created_at",
      `${queryStart}T00:00:00.000Z`,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (
    (data ?? []).find(
      (entry) =>
        getWarsawDateKey(
          entry.created_at,
        ) === today,
    ) ?? null
  );
}
