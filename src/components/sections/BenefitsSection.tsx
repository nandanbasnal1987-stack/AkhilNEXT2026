"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import { useBenefitRings } from "@/hooks/useBenefitRings";
import "@/styles/benefits.css";

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  useBenefitRings(ref);

  return (
    <div className="merged-section" id="section-8" ref={ref}>
      <section style={{"display":"block"}}>
        <span className="pill">
          WHY AUGASTAM
        </span>
        <h1>
          Better clinical outcomes,<br></br> backed by smarter workflows.
        </h1>
        <p className="lead">
          Augastam Clinical brings consultations, documentation, and clinic operations together to help healthcare teams save time, improve coordination, and deliver more informed patient care.
        </p>
        <div className="rings">
          <div className="ring" tabIndex={0} data-v="92" style={{ "--glow": "#2fbf7a" } as CSSProperties}>
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="sec8-g1" x1="0.3" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d594ef" />
                  <stop offset="1" stopColor="#a762e8" />
                </linearGradient>
              </defs>
              <circle className="t" cx="60" cy="60" r="56" transform="scale(1)" style={{ strokeWidth: "6.2" } as CSSProperties} />
              <circle className="p" cx="60" cy="60" r="56" pathLength="100" stroke="url(#sec8-g1)" style={{ strokeWidth: "6.2" } as CSSProperties} />
            </svg>
            <div className="in">
              <b>
                0%
              </b>
              <span>
                Faster Clinical Documentation
              </span>
            </div>
          </div>
          <div className="ring" tabIndex={0} data-v="100" style={{ "--glow": "#4a86e8" } as CSSProperties}>
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="sec8-g2" x1="0.3" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#dfb3f0" />
                  <stop offset="1" stopColor="#a829ad" />
                </linearGradient>
              </defs>
              <circle className="t" cx="60" cy="60" r="56" style={{ strokeWidth: "6.2" } as CSSProperties} />
              <circle className="p" cx="60" cy="60" r="56" pathLength="100" stroke="url(#sec8-g2)" style={{ strokeWidth: "6.2" } as CSSProperties} />
            </svg>
            <div className="in">
              <b>
                0%
              </b>
              <span>
                Connected Patient Journeys
              </span>
            </div>
          </div>
          <div className="ring" tabIndex={0} data-v="73" style={{ "--glow": "#2f9a7a" } as CSSProperties}>
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="sec8-g3" x1="0.3" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#dfb3f0" />
                  <stop offset="1" stopColor="#a829ad" />
                </linearGradient>
              </defs>
              <circle className="t" cx="60" cy="60" r="56" style={{ strokeWidth: "6.2" } as CSSProperties} />
              <circle className="p" cx="60" cy="60" r="56" pathLength="100" stroke="url(#sec8-g3)" style={{ strokeWidth: "6.2" } as CSSProperties} />
            </svg>
            <div className="in">
              <b>
                0%
              </b>
              <span>
                Improved Operational Visibility
              </span>
            </div>
          </div>
          <div className="ring" tabIndex={0} data-v="27" style={{ "--glow": "#1aa8d0" } as CSSProperties}>
            <svg viewBox="0 0 120 120">
              <defs>
                <linearGradient id="sec8-g4" x1="0.2" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#aa7abc" />
                  <stop offset="1" stopColor="#e8d5fb" />
                </linearGradient>
              </defs>
              <circle className="t" cx="60" cy="60" r="56" style={{ strokeWidth: "6.2" } as CSSProperties} />
              <circle className="p" cx="60" cy="60" r="56" pathLength="100" stroke="url(#sec8-g4)" style={{ strokeWidth: "6.2" } as CSSProperties} />
            </svg>
            <div className="in">
              <b>
                0%
              </b>
              <span>
                More Followup Patient Visits
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
