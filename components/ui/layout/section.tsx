import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({
  title,
  children,
}: Props) {
  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-semibold">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}
