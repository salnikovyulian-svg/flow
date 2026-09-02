import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

export async function getWorkFlow() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("work_flows")
    .select("*")
    .eq("user_id", USER_ID)
    .order("updated_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function saveWorkFlowRepository(
  values: Record<string, unknown>,
) {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("work_flows")
    .select("id")
    .eq("user_id", USER_ID)
    .order("updated_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("work_flows")
      .update({
        ...values,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    if (error) throw error;

    return;
  }

  const { error } = await supabase
    .from("work_flows")
    .insert({
      user_id: USER_ID,
      ...values,
    });

  if (error) throw error;
}
