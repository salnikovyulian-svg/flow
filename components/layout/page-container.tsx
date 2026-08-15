import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[720px] px-5 py-12 sm:px-6 sm:py-20">
      {children}
    </main>
  );
}
