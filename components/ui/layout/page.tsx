import type { ReactNode } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

type Props = {
  children: ReactNode;
};

export function Page({
  children,
}: Props) {
  return (
    <DashboardLayout>

      <div className="mx-auto w-full max-w-6xl">

        {children}

      </div>

    </DashboardLayout>
  );
}
