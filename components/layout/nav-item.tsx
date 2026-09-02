import Link from "next/link";

type Props = {
  href: string;
  label: string;
  active?: boolean;
};

export function NavItem({
  href,
  label,
  active = false,
}: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
