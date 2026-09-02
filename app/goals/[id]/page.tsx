import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppCard } from "@/components/ui/app-card";
import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import { DeleteDecisionButton } from "@/features/decision-contract/components/delete-decision-button";
import { getDecisionById } from "@/features/decision-contract/repository";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DecisionPage({
  params,
}: Props) {
  const { id } = await params;
  const decision = await getDecisionById(id);

  if (!decision) {
    return (
      <Page>
        <PageHeader
          eyebrow="DECISION"
          title="Decision not found."
          description="This decision does not exist or is no longer active."
        />

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </Page>
    );
  }

  return (
    <Page>
      <Link
        href="/"
        className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Home
      </Link>

      <PageHeader
        eyebrow="DECISION"
        title={decision.decision}
        description={decision.reason}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <AppCard className="p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">
            Actions
          </p>

          <div className="mt-6 space-y-4">
            {Array.isArray(decision.actions) &&
              decision.actions.map(
                (action: string, index: number) => (
                  <div
                    key={`${index}-${action}`}
                    className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
                  >
                    <span className="font-mono text-xs text-violet-300/70">
                      0{index + 1}
                    </span>

                    <span className="text-sm leading-6 text-slate-200">
                      {action}
                    </span>
                  </div>
                ),
              )}
          </div>
        </AppCard>

        <AppCard className="p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-300/70">
            Contract
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <p className="text-sm text-slate-500">
                Definition of success
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-200">
                {decision.success}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Failure condition
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-200">
                {decision.failure_reason}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Commitment
              </p>

              <p className="mt-2 text-2xl font-semibold text-white">
                {decision.commitment_days} days
              </p>
            </div>
          </div>
        </AppCard>
      </div>

      <div className="mt-10 flex justify-end border-t border-white/[0.06] pt-6">
        <DeleteDecisionButton id={id} />
      </div>
    </Page>
  );
}
