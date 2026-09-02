import { NavItem } from "./nav-item";

export function Sidebar() {
  return (
    <aside className="glass sticky top-8 flex h-[calc(100vh-64px)] w-[280px] flex-col p-7">

      <div>

        <p className="text-xs uppercase tracking-[0.45em] text-violet-300">
          FLOW
        </p>

        <h2 className="mt-4 text-3xl font-bold text-white">
          Build systems.
        </h2>

      </div>

      <nav className="mt-12 flex flex-col gap-2">

        <NavItem href="/" label="Home" active />

        <NavItem
          href="/goals/new"
          label="Decision"
        />

        <NavItem
          href="/work-flow"
          label="Work Flow"
        />

        <NavItem
          href="/deep-work"
          label="Deep Work"
        />

        <NavItem
          href="/end-of-day"
          label="End Of Day"
        />

        <NavItem
          href="/weekly-review/history"
          label="Weekly Review"
        />

      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-5">

        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Today's Focus
        </p>

        <p className="mt-3 text-3xl font-bold text-white">
          0h
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Deep Work
        </p>

      </div>

    </aside>
  );
}
