export type CalendarSession = {
  id: string;
  focus: string | null;
  started_at: string;
  finished_at: string | null;
  duration_minutes: number;
  insight: string | null;
  friction: string | null;
  distraction: string | null;
  next_step: string | null;
};

export type CalendarEndOfDay = {
  id: string;
  created_at: string;
  unfinished: string | null;
  tomorrow: string | null;
  process_followed: boolean | null;
};

export type CalendarData = {
  sessions: CalendarSession[];
  endOfDays: CalendarEndOfDay[];
};

export type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  minutes: number;
  sessions: CalendarSession[];
  endOfDay: CalendarEndOfDay | null;
};

export type CalendarMonth = {
  year: number;
  month: number;
  days: CalendarDay[];
};
