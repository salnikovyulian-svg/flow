import { Brain, Heart, Laptop } from "lucide-react";

import type {
  HomeGoal,
  HomeHeaderContent,
  HomeSectionContent,
} from "@/features/home/types";

export const homeHeaderContent: HomeHeaderContent = {
  brand: "FLOW",
  headline: {
    primary: "Build systems.",
    secondary: "Not motivation.",
  },
};

export const activeGoalsSection: HomeSectionContent = {
  id: "active-goals",
  title: "Active Goals",
};

export const activeGoals: readonly HomeGoal[] = [
  {
    current: 4,
    icon: Brain,
    id: "decision-making",
    metric: "Deep Work",
    target: 10,
    title: "Decision Making",
  },
  {
    current: 2,
    icon: Laptop,
    id: "build-flow",
    metric: "Sprint",
    target: 8,
    title: "Build Flow",
  },
  {
    current: 1,
    icon: Heart,
    id: "health",
    metric: "Workout",
    target: 4,
    title: "Health",
  },
];

export const placeholderSections: readonly HomeSectionContent[] = [
  { id: "todays-focus", title: "Today's Focus" },
  { id: "deep-work", title: "Deep Work" },
  { id: "next-reward", title: "Next Reward" },
  { id: "latest-update", title: "Latest Update" },
];
