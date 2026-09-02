import type { ReactNode } from "react";

type Props = {
  step: number;
  children: ReactNode;
};

export function ShutdownLayout({
  step,
  children,
}: Props) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center px-8 py-16">

      <div className="mb-12">

        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          FLOW
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Shutdown Ritual
        </h1>

        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Your goal is not to finish everything.
          Your goal is to leave nothing inside your head.
        </p>

      </div>

      {children}

      <p className="mt-14 text-sm text-muted-foreground">
        Step {step} of 4
      </p>

    </main>
  );
}
