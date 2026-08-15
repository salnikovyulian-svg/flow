import type { HomeHeaderContent } from "@/features/home/types";

type HomeHeaderProps = {
  content: HomeHeaderContent;
};

export function HomeHeader({ content }: HomeHeaderProps) {
  return (
    <header className="pb-16 sm:pb-20">
      <p className="text-xs font-semibold tracking-[0.3em] text-primary">
        {content.brand}
      </p>

      <h1 className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.05em] text-foreground sm:text-5xl">
        <span className="block">{content.headline.primary}</span>
        <span className="block text-muted-foreground">
          {content.headline.secondary}
        </span>
      </h1>
    </header>
  );
}
