import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

export async function getActiveDecisions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("decision_contracts")
    .select("*")
    .eq("user_id", USER_ID)
    .eq("status", "active")
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data ?? [];
}

export async function getActiveDecision() {
  const decisions = await getActiveDecisions();

  return decisions[0] ?? null;
}

export async function createDecision(
  values: Record<string, unknown>,
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("decision_contracts")
    .insert({
      user_id: USER_ID,
      ...values,
    });

  if (error) throw error;
}

export async function getDecisionById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("decision_contracts")
    .select("*")
    .eq("id", id)
    .eq("user_id", USER_ID)
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function deleteDecision(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("decision_contracts")
    .delete()
    .eq("id", id)
    .eq("user_id", USER_ID);

  if (error) throw error;
}
