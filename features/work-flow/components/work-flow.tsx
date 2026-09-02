import { Page } from "@/components/ui/layout/page";
import { PageHeader } from "@/components/ui/layout/page-header";

import { WorkFlowForm } from "./work-flow-form";

export function WorkFlowScreen() {
  return (
    <Page>

      <PageHeader
        eyebrow="FLOW"
        title="Work Flow"
        description="Build a system before you begin."
      />

      <WorkFlowForm />

    </Page>
  );
}
