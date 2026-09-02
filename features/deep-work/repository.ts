import { createClient } from "@/lib/supabase/server";
import { USER_ID } from "@/lib/repositories/constants";

export async function getTodaySessionRepository() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("deep_work_sessions")
    .select("*")
    .eq("user_id", USER_ID)
    .is("finished_at", null)
    .order("started_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  return data;
}

export async function getSessionByIdRepository(
  id: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .select("*")
    .eq("id", id)
    .eq("user_id", USER_ID)
    .single();

  if (error) throw error;

  return data;
}

export async function startSessionRepository(
  decisionId: string | null,
  focus: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .insert({
      user_id: USER_ID,
      decision_id: decisionId,
      focus,
      started_at: new Date().toISOString(),
      duration_minutes: 0,
      total_paused_seconds: 0,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function pauseSessionRepository(
  id: string,
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .update({
      paused_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("finished_at", null)
    .is("paused_at", null)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function resumeSessionRepository(
  id: string,
  pausedAt: string,
) {
  const supabase = await createClient();

  const pauseSeconds = Math.max(
    0,
    Math.floor(
      (Date.now() -
        new Date(pausedAt).getTime()) /
        1000,
    ),
  );

  const { data: current, error: currentError } =
    await supabase
      .from("deep_work_sessions")
      .select("total_paused_seconds")
      .eq("id", id)
      .single();

  if (currentError) throw currentError;

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .update({
      paused_at: null,
      total_paused_seconds:
        (current.total_paused_seconds ?? 0) +
        pauseSeconds,
    })
    .eq("id", id)
    .is("finished_at", null)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function saveReflectionRepository(
  id: string,
  reflection: {
    insight: string;
    friction: string;
    distraction: string;
    nextStep: string;
  },
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("deep_work_sessions")
    .update({
      insight: reflection.insight,
      friction: reflection.friction,
      distraction: reflection.distraction,
      next_step: reflection.nextStep,
    })
    .eq("id", id);

  if (error) throw error;
}

export async function finishSessionRepository(
  id: string,
) {
  const supabase = await createClient();

  const { data: session, error: sessionError } =
    await supabase
      .from("deep_work_sessions")
      .select(
        "started_at,paused_at,total_paused_seconds",
      )
      .eq("id", id)
      .single();

  if (sessionError) throw sessionError;

  let pausedSeconds =
    session.total_paused_seconds ?? 0;

  if (session.paused_at) {
    pausedSeconds += Math.max(
      0,
      Math.floor(
        (Date.now() -
          new Date(
            session.paused_at,
          ).getTime()) /
          1000,
      ),
    );
  }

  const elapsedSeconds = Math.floor(
    (Date.now() -
      new Date(
        session.started_at,
      ).getTime()) /
      1000,
  );

  const durationMinutes = Math.max(
    0,
    Math.round(
      (elapsedSeconds - pausedSeconds) /
        60,
    ),
  );

  const { error } = await supabase
    .from("deep_work_sessions")
    .update({
      finished_at: new Date().toISOString(),
      duration_minutes: durationMinutes,
      paused_at: null,
      total_paused_seconds: pausedSeconds,
    })
    .eq("id", id);

  if (error) throw error;

  return durationMinutes;
}

export async function getDeepWorkHistoryRepository() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .select(`
      id,
      focus,
      decision_id,
      started_at,
      finished_at,
      duration_minutes,
      insight,
      friction,
      distraction,
      next_step
    `)
    .eq("user_id", USER_ID)
    .not("finished_at", "is", null)
    .order("started_at", {
      ascending: false,
    });

  if (error) throw error;

  return data ?? [];
}

export async function getTodayDeepWorkSessionsRepository() {
  const { getWarsawDateKey, addDaysToDateKey } =
    await import("@/lib/date/warsaw");

  const supabase = await createClient();
  const today = getWarsawDateKey(new Date());
  const queryStart = addDaysToDateKey(
    today,
    -1,
  );

  const { data, error } = await supabase
    .from("deep_work_sessions")
    .select(`
      id,
      started_at,
      finished_at,
      duration_minutes
    `)
    .eq("user_id", USER_ID)
    .gte(
      "started_at",
      `${queryStart}T00:00:00.000Z`,
    )
    .order("started_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []).filter(
    (session) =>
      getWarsawDateKey(
        session.started_at,
      ) === today,
  );
}
