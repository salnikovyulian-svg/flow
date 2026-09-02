type Props = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <header className="mb-20">

      <p className="mb-6 text-xs font-medium uppercase tracking-[0.45em] text-violet-300/80">
        {eyebrow}
      </p>

      <h1 className="hero-title">
        {title}
      </h1>

      <p className="hero-subtitle">
        {description}
      </p>

    </header>
  );
}
