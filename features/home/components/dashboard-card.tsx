import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/layout/card";

import type { DashboardCard as DashboardCardType } from "../types";

type Props = {
  card: DashboardCardType;
};

export function DashboardCard({ card }: Props) {
  return (
    <Link href={card.href}>
      <Card>
        <div className="flex h-full flex-col">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                {card.title}
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                {card.status}
              </h3>

            </div>

            <ChevronRight
              size={18}
              className="text-zinc-600"
            />

          </div>

          <p className="mt-8 text-sm text-zinc-400">
            {card.description}
          </p>

        </div>
      </Card>
    </Link>
  );
}
