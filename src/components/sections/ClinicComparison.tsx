"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import "../../../styles/clinic-comparison.css";

// Comparison data
const comparisonData: [string, string, string, number][] = [
  ["AI-assisted clinical notes", "Yes", "Rare", 1],
  ["Language support", "80+", "No", 0],
  ["ABDM and NABH digital standards", "Built in", "No", 0],
  ["Coding: SNOMED CT, ICD-11, CPT, LOINC", "Yes", "Partial", 2],
  ["Customisable forms and workflows", "100%", "Fixed templates", 1],
  ["Patient app and WhatsApp", "Yes", "Often an add-on", 2],
  ["Grows from one doctor to many", "Yes", "Limited", 1],
];

// Audience data
const audienceData = [
  {
    type: "Single-doctor clinic",
    bestFor: "Doctors who want one simple system",
    highlights: [
      "AI notes",
      "WhatsApp reminders",
      "Patient app",
    ],
  },
  {
    type: "Polyclinic and multi-doctor clinic",
    bestFor: "Several doctors, one front desk",
    highlights: [
      "Multi-doctor calendar",
      "Team workflows",
      "Dashboards",
    ],
  },
  {
    type: "Clinic with collection services",
    bestFor:
      "Eye, ENT, Women’s health, Paediatrics, Cardiology and others",
    highlights: [
      "Custom forms and templates per specialty",
    ],
  },
  {
    type: "Single-doctor clinic",
    bestFor: "Home sample collection and lab tie-ups",
    highlights: [
      "Phlebotomist app",
      "Smart lab reports",
    ],
  },
  {
    type: "Growing clinic group",
    bestFor: "Opening a second or third location",
    highlights: [
      "Same platform",
      "Scalable configuration",
    ],
  },
  {
    type: "International clinic",
    bestFor: "Multilingual patients",
    highlights: [
      "80+ languages",
      "GDPR and CCPA-ready registration",
    ],
  },
];

// Checkmark icon
function CheckIcon() {
  return (
    <span className="cc-tick">
      <svg viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2 6.5l2.6 2.6L10 3.4" />
      </svg>
    </span>
  );
}

// Other software comparison indicator
function ComparisonIndicator({
  level,
}: {
  level: number;
}) {
  return (
    <span className="cc-meter" aria-label={`${level} out of 3`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={n <= level ? "filled" : ""}
        />
      ))}
    </span>
  );
}

// Animated number counter
function AnimatedValue({ value }: { value: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = valueRef.current;

    if (!element) return;

    const match = value.match(/^(\d+)(.*)$/);

    if (!match) return;

    const number = Number(match[1]);
    const suffix = match[2];

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    let animationFrame = 0;
    let startTime: number | null = null;

    element.textContent = `0${suffix}`;

    const animate = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.min(
        (time - startTime) / 1200,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);

      element.textContent =
        Math.round(number * eased) + suffix;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span ref={valueRef}>{value}</span>;
}

// Main component
export default function ClinicComparison() {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = pageRef.current;

    if (!root) return;

    const sections = root.querySelectorAll("section");

    // Reduced motion accessibility
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sections.forEach((section) => {
        section.classList.add("seen");
      });

      return;
    }

    // Browser fallback
    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => {
        section.classList.add("seen");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("seen");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main
      className="clinic-comparison-page"
      ref={pageRef}
    >
      {/* ==================================
          SECTION 01 - COMPARISON
      ================================== */}

      <section id="comparison-section">

        <h2>
          <i>How Augastam Clinic compares</i>
        </h2>

        <div
          className="cc-table cc-comparison"
          role="table"
          aria-label="Augastam Clinic software comparison"
        >
          {/* Table Header */}

          <div className="cc-row cc-heading" role="row">
            <div role="columnheader">
              Capability
            </div>

            <div className="cc-us" role="columnheader">
              Augastam Clinic
            </div>

            <div role="columnheader">
              Other software
            </div>
          </div>

          {/* Table Body */}

          {comparisonData.map((item, index) => (
            <div
              className="cc-row cc-body"
              role="row"
              key={item[0]}
              style={
                { "--i": index } as CSSProperties
              }
            >
              {/* Capability */}

              <div
                className="cc-key"
                role="cell"
              >
                {item[0]}
              </div>

              {/* Augastam Clinic */}

              <div
                className="cc-us"
                role="cell"
                data-label="Augastam Clinic"
              >
                <span className="cc-yes">

                  <CheckIcon />

                  <span className="cc-count">
                    <AnimatedValue value={item[1]} />
                  </span>

                </span>
              </div>

              {/* Other Software */}

              <div
                className="cc-other"
                role="cell"
                data-label="Other software"
              >
                <ComparisonIndicator level={item[3]} />

                <span>{item[2]}</span>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ==================================
          SECTION 02 - TARGET AUDIENCE
      ================================== */}

      <section id="audience-section">

        <h2>
          <i>Who Augastam Clinic is for</i>
        </h2>

        <div
          className="cc-table cc-audience"
          role="table"
          aria-label="Augastam Clinic target audience"
        >
          {/* Table Header */}

          <div className="cc-row cc-heading" role="row">

            <div role="columnheader">
              Clinic type
            </div>

            <div role="columnheader">
              Best for
            </div>

            <div role="columnheader">
              Highlights
            </div>

          </div>

          {/* Table Body */}

          {audienceData.map((item, index) => (
            <div
              className="cc-row cc-body"
              role="row"
              key={`${item.type}-${index}`}
              style={
                { "--i": index } as CSSProperties
              }
            >
              {/* Clinic Type */}

              <div
                className="cc-key"
                role="cell"
              >
                <span className="cc-dot" />

                {item.type}
              </div>

              {/* Best For */}

              <div
                className="cc-best-for"
                role="cell"
                data-label="Best for"
              >
                {item.bestFor}
              </div>

              {/* Highlights */}

              <div
                className="cc-tags"
                role="cell"
                data-label="Highlights"
              >
                {item.highlights.map((tag) => (
                  <span
                    className="cc-tag"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
