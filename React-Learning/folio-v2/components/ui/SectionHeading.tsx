/**
 * components/ui/SectionHeading.tsx
 * ---------------------------------------------------------------------------
 * Consistent sci-fi section header: a small monospace "index" label
 * (e.g. "02 // SYSTEMS") above a large gradient title.
 */
interface SectionHeadingProps {
  /** Two-digit section index shown in the label. */
  index: string;
  /** Short uppercase label next to the index. */
  label: string;
  /** Main heading text. */
  title: string;
}

export default function SectionHeading({
  index,
  label,
  title,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <p className="section-heading__label">
        <span className="section-heading__index">{index}</span> {"//"} {label}
      </p>
      <h2 className="section-heading__title gradient-text">{title}</h2>
    </header>
  );
}
