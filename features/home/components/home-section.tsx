import type { ReactNode } from "react";

type HomeSectionProps = {
  children: ReactNode;
  id: string;
  title: string;
};

export function HomeSection({ children, id, title }: HomeSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-4 text-sm font-medium tracking-[-0.01em] text-muted-foreground"
      >
        {title}
      </h2>

      {children}
    </section>
  );
}
