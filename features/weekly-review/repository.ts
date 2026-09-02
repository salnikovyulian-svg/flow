import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

export async function getWeeklyReviewRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("weekly_reviews")
    .select("*")
    .eq("user_id", USER_ID)
    .order("created_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getWeeklyReviewByStartRepository(
  weekStart: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("weekly_reviews")
    .select("*")
    .eq("user_id", USER_ID)
    .eq("week_start", weekStart)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function getWeeklyReviewHistoryRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("weekly_reviews")
    .select("*")
    .eq("user_id", USER_ID)
    .not("week_start", "is", null)
    .order("week_start", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

export async function saveWeeklyReviewRepository(
  values: Record<string, unknown>,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("weekly_reviews")
    .insert({
      user_id: USER_ID,
      ...values,
    });

  if (error) throw error;
}
