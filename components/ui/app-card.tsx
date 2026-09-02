import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement>;

export function AppCard({
  className,
  children,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={cn(
        `
relative
overflow-hidden
rounded-[28px]

border
border-white/10

bg-white/[0.04]

backdrop-blur-3xl

shadow-[0_30px_120px_rgba(0,0,0,.45)]

before:absolute
before:inset-0
before:bg-gradient-to-br
before:from-white/[.08]
before:to-transparent
before:pointer-events-none

transition-all
duration-300

hover:border-white/15
hover:bg-white/[0.05]
hover:-translate-y-[2px]
`,
        className,
      )}
    >
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
