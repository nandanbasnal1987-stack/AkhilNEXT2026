"use client";

type Props = {
  label: string;
  x: number;
  y: number;
  delay: number;
  index: number;
  onHover: (i: number | null) => void;
};

export default function IntegrationChip({
  label,
  x,
  y,
  delay,
  index,
  onHover,
}: Props) {
  return (
    <div
      className="hub-chip"
      tabIndex={0}
      style={{
        ["--x" as string]: x,
        ["--y" as string]: y,
        ["--d" as string]: `${delay.toFixed(2)}s`,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(index)}
      onBlur={() => onHover(null)}
    >
      <span>{label}</span>
    </div>
  );
}