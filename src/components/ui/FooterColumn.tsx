import type { CSSProperties } from "react";
import Link from "next/link";

type FooterLink = string | { label: string; href: string };

interface FooterColumnProps {
  title: string;
  delay?: number;
  links: FooterLink[];
}

export default function FooterColumn({ title, delay, links }: FooterColumnProps) {
  const style: CSSProperties =
    typeof delay === "number" ? { animationDelay: `${delay}ms` } : {};

  return (
    <div className="footer-column" style={style}>
      <h4 className="footer-column__title">{title}</h4>
      <ul className="footer-column__list">
        {links.map((link, i) => {
          const { label, href } =
            typeof link === "string" ? { label: link, href: "#" } : link;

          return (
            <li key={`${label}-${i}`} className="footer-column__item">
              <Link href={href}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}