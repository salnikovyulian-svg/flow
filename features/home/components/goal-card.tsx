import { Card, CardContent } from "@/components/ui/card";
import type { HomeGoal } from "@/features/home/types";

type GoalCardProps = {
  goal: HomeGoal;
};

export function GoalCard({ goal }: GoalCardProps) {
  const {
    current,
    icon: Icon,
    metric,
    target,
    title,
  } = goal;

  return (
    <Card className="min-h-40 rounded-2xl border-white/[0.07] bg-card shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
      <CardContent className="flex min-h-40 flex-col justify-between p-5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </span>

        <div>
          <h3 className="text-[15px] font-medium tracking-[-0.02em] text-card-foreground">
            {title}
          </h3>

          <div className="mt-3 flex items-center justify-between gap-3 text-xs">
            <span className="text-muted-foreground">{metric}</span>
            <span className="font-mono tabular-nums text-card-foreground">
              {current} / {target}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
