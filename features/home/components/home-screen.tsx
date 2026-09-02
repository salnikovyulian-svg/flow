import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { DeepWorkCalendar } from "@/features/deep-work-calendar";
import { getCalendar } from "@/features/deep-work-calendar/actions/get-calendar";

import { AppCard } from "@/components/ui/app-card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";
import { Section } from "@/components/ui/layout/section";

import type { HomeState } from "../lib/get-home-state";
import { dashboardCards } from "../mock-data";

import { DashboardCard } from "./dashboard-card";
import { TodayCard } from "./today-card";

type Props = {
  state: HomeState;
  decisions: Record<string, unknown>[];
};

function getTodayContent(state: HomeState) {
  switch (state) {
    case "decision":
      return {
        title: "Create your first Decision",
        description:
          "Everything starts with one clear decision.",
        action: "Create Decision",
        href: "/goals/new",
      };

    case "workflow":
      return {
        title: "Configure Work Flow",
        description:
          "Define how you will execute your decision.",
        action: "Open Work Flow",
        href: "/work-flow",
      };

    case "deep-work":
      return {
        title: "Start Deep Work",
        description:
          "Protect your attention and execute.",
        action: "Start Session",
        href: "/deep-work",
      };

    case "end-of-day":
      return {
        title: "Shutdown",
        description:
          "Close the day and clear your mind.",
        action: "End Of Day",
        href: "/end-of-day",
      };

    case "weekly-review":
      return {
        title: "Weekly Review",
        description:
          "Review your process, not your ego.",
        action: "Open Review",
        href: "/weekly-review",
      };
  }
}

export async function HomeScreen({
  state,
  decisions,
}: Props) {
  const today = getTodayContent(state);
  const calendarData = await getCalendar();

  const activeDecisions = decisions.slice(0, 3);

  return (
    <Page>
      <PageHeader
        eyebrow="FLOW"
        title="Build systems."
        description="Protect yourself from self-deception."
      />

      <TodayCard
        title={today.title}
        description={today.description}
        action={today.action}
        href={today.href}
      />

      <Section title="Decisions">
        <div className="grid gap-4 md:grid-cols-3">
          {activeDecisions.map((decision, index) => {
            const title =
              typeof decision.decision === "string"
                ? decision.decision
                : `Decision ${index + 1}`;

            return (
              <Link
                key={
                  typeof decision.id === "string"
                    ? decision.id
                    : index
                }
                href={
                  typeof decision.id === "string"
                    ? `/goals/${decision.id}`
                    : "/"
                }
                className="block"
              >
                <AppCard className="h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">
                    0{index + 1}
                  </p>

                  <h3 className="mt-5 line-clamp-3 text-xl font-semibold leading-tight text-white">
                    {title}
                  </h3>

                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                      Active
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-300 transition group-hover:bg-white/10">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </AppCard>
              </Link>
            );
          })}

          {activeDecisions.length < 3 && (
            <Link
              href="/goals/new"
              className="group flex min-h-[190px] items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-white/[0.02] transition hover:border-violet-400/30 hover:bg-white/[0.04]"
            >
              <div className="text-center">
                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition group-hover:bg-violet-400/10 group-hover:text-violet-300">
                  <Plus size={18} />
                </span>

                <p className="mt-4 text-sm font-medium text-slate-400 group-hover:text-white">
                  New Decision
                </p>
              </div>
            </Link>
          )}
        </div>
      </Section>

      <div className="mt-8">
        <DeepWorkCalendar data={calendarData} />
      </div>

      <Section title="Workspace">
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.id}
              card={card}
            />
          ))}
        </div>
      </Section>
    </Page>
  );
}
