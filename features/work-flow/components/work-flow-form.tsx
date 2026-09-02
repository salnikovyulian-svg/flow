"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/layout/card";
import { Section } from "@/components/ui/layout/section";

import { getActiveDecisionsAction } from "@/features/decision-contract/actions/get-active-decisions";

import { useWorkFlow } from "../hooks/use-work-flow";
import { workLocations } from "../types";

type Decision = {
  id: string;
  decision: string;
};

export function WorkFlowForm() {
  const {
    workFlow,
    setFocus,
    setDecisionId,
    setLocation,
    setCustomLocation,
    setStartTime,
    setDurationMinutes,
    toggleRitualItem,
    isReady,
    save,
    isPending,
  } = useWorkFlow();

  const [decisions, setDecisions] =
    useState<Decision[]>([]);

  useEffect(() => {
    getActiveDecisionsAction().then((data) => {
      setDecisions(data ?? []);
    });
  }, []);

  return (
    <div className="space-y-10">

      <Section title="Focus">
        <Card>
          <input
            type="text"
            value={workFlow.focus}
            onChange={(e) =>
              setFocus(e.target.value)
            }
            placeholder="What are you working on?"
            className="w-full rounded-xl border bg-transparent p-4 outline-none"
          />
        </Card>
      </Section>

      <Section title="Decision">
        <Card>
          <select
            value={workFlow.decisionId ?? ""}
            onChange={(e) =>
              setDecisionId(
                e.target.value || null,
              )
            }
            className="w-full rounded-xl border bg-transparent p-4 outline-none"
          >
            <option value="">
              No decision
            </option>

            {decisions.map((decision) => (
              <option
                key={decision.id}
                value={decision.id}
              >
                {decision.decision}
              </option>
            ))}
          </select>

          {decisions.length === 0 && (
            <p className="mt-3 text-sm text-muted">
              No active decisions yet.
            </p>
          )}
        </Card>
      </Section>

      <Section title="Location">

        <div className="grid gap-3 md:grid-cols-2">
          {workLocations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => setLocation(location)}
              className={`rounded-2xl border p-5 text-left transition ${
                workFlow.location === location
                  ? "border-white bg-white text-black"
                  : "border-border bg-card hover:bg-card-hover"
              }`}
            >
              {location}
            </button>
          ))}
        </div>

        {workFlow.location === "custom" && (
          <input
            className="mt-4 w-full rounded-2xl border bg-transparent p-4"
            placeholder="Custom location"
            value={workFlow.customLocation}
            onChange={(e) =>
              setCustomLocation(e.target.value)
            }
          />
        )}

      </Section>

      <Section title="Session">

        <Card>
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <p className="mb-2 text-sm text-muted">
                Start
              </p>

              <input
                type="time"
                value={workFlow.startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="w-full rounded-xl border bg-transparent p-3"
              />
            </div>

            <div>
              <p className="mb-2 text-sm text-muted">
                Duration
              </p>

              <input
                type="number"
                min={15}
                step={15}
                value={workFlow.durationMinutes}
                onChange={(e) =>
                  setDurationMinutes(
                    Number(e.target.value),
                  )
                }
                className="w-full rounded-xl border bg-transparent p-3"
              />
            </div>

          </div>
        </Card>

      </Section>

      <Section title="Ritual">

        <Card>
          <div className="space-y-4">

            {workFlow.ritual.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    toggleRitualItem(item.id)
                  }
                />

                <span>{item.label}</span>
              </label>
            ))}

          </div>
        </Card>

      </Section>

      <button
        type="button"
        onClick={save}
        disabled={!isReady || isPending}
        className="w-full rounded-2xl bg-white py-4 font-semibold text-black disabled:opacity-40"
      >
        {isPending
          ? "Saving..."
          : "Save Work Flow"}
      </button>

    </div>
  );
}
