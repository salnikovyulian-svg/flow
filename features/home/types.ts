import type { LucideIcon } from "lucide-react";

export type HomeHeaderContent = {
  brand: string;
  headline: {
    primary: string;
    secondary: string;
  };
};

export type HomeGoal = {
  current: number;
  icon: LucideIcon;
  id: string;
  metric: string;
  target: number;
  title: string;
};

export type HomeSectionContent = {
  id: string;
  title: string;
};
