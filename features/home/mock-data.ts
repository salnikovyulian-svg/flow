import type {
  DashboardCard,
  TodayState,
} from "./types";

export const todayState: TodayState = {
  title: "Financial Modeling",
  description:
    "Complete one Deep Work session for your active decision.",
  action: "Start Deep Work",
  href: "/deep-work",
};

export const dashboardCards: DashboardCard[] = [
  {
    id: "decision",
    title: "Decision",
    description: "Active decision",
    status: "Active",
    href: "/goals/new",
  },
  {
    id: "workflow",
    title: "Work Flow",
    description: "Execution system",
    status: "Ready",
    href: "/work-flow",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    description: "Today's session",
    status: "Not Started",
    href: "/deep-work",
  },
  {
    id: "end-day",
    title: "End Of Day",
    description: "Daily shutdown",
    status: "Pending",
    href: "/end-of-day",
  },
  {
    id: "weekly",
    title: "Weekly Review",
    description: "Sunday reflection",
    status: "Sunday",
    href: "/weekly-review/history",
  },
];
