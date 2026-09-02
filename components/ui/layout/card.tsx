import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
        glass
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/6
        p-8
        shadow-[0_40px_120px_rgba(0,0,0,.45)]
        ${className}
      `}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[.06] to-transparent" />

      <div className="relative">
        {children}
      </div>
    </div>
  );
}
