
"use client";

/** Burger button shown below 1100px; toggles the navbar open state. */
export default function ClinicMobileMenu({ open, onToggle }) {
  return (
    <button
      type="button"
      className="burger"
      id="sec1-burger"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="sec1-nav"
      onClick={onToggle}
    >
      {open ? "✕" : "☰"}
    </button>
  );
}
