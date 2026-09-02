import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AppCard } from "@/components/ui/app-card";

type Props = {
  title: string;
  description: string;
  action: string;
  href: string;
};

export function TodayCard({
  title,
  description,
  action,
  href,
}: Props) {
  return (
    <AppCard className="relative overflow-hidden p-10 lg:p-14">

      <div className="absolute right-[-120px] top-[-120px] h-72 w-72 rounded-full bg-violet-500/15 blur-[120px]" />

      <div className="absolute bottom-[-120px] left-[-120px] h-72 w-72 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative">

        <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-violet-200">
          Today
        </span>

        <h1 className="mt-8 max-w-3xl text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-white">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
          {description}
        </p>

        <Link
          href={href}
          className="
            mt-12
            inline-flex
            items-center
            gap-3
            rounded-2xl
            bg-white
            px-7
            py-4
            font-semibold
            text-slate-900
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_20px_60px_rgba(255,255,255,.18)]
          "
        >
          {action}

          <ArrowRight size={18} />
        </Link>

      </div>

    </AppCard>
  );
}
