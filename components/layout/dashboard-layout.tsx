import type { ReactNode } from "react";

import { Sidebar } from "./sidebar";

type Props = {
  children: ReactNode;
};

export function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="page">

      <div className="flex gap-8">

        <Sidebar />

        <main className="flex-1">

          {children}

        </main>

      </div>

    </div>
  );
}
