"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import "@/styles/hero.css";
import Cslider from "../features/Cslider";
import HeroLogo from "../features/HeroLogo";
import TalkToExpertModal from "../features/TalkToExpertModal";

const logo = "/images/augastam.svg";

const callExpert = "/images/Call_icon.svg";

const HERO_TAGS = [
  "Single-doctor",
  "Clinics",
  "Polyclinics",
  "ABDM Ready",
  "NABH Digital Standards",
  "100% Configurable",
  "Conversational AI in 80+ Indian & International Languages",
];

/** Hero banner with parallax background (Section 1, bottom part). */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  useHeroParallax(heroRef, [sceneRef, photoRef]);

  return (
    <div className="section-1">
      <section className="hero" id="sec1-hero" style={{ display: "block" }}>
        <div className="scene" id="sec1-scene">
          <Image
            src="/images/Clinic-banner.png"
            alt="Augastam clinic banner"
            width={0}
            height={0}
            sizes="100vw"
            priority
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="photo" id="sec1-photo"></div>
        <div className="shade"></div>
        <div className="copy">
          <h2 className="mb-2">
            AUGASTAM<span>Clinic</span>
          </h2>
          <h1 className="in" style={{ "--d": "1" } as CSSProperties}>
            AI-powered Clinic Management Software
          </h1>
          <p className="lead in" style={{ "--d": "2" } as CSSProperties}>
            Everything a clinic will ever need, in one platform. Smarter conversations, complete
            records and fuller appointment books.
          </p>

          <ul className="hero-tags in" style={{ "--d": "2.5" } as CSSProperties}>
            {HERO_TAGS.map((tag) => (
              <li key={tag} className="hero-badge">
                {tag}
              </li>
            ))}
          </ul>

          <div className="btns in" style={{ "--d": "3" } as CSSProperties}>
            <button className="b1" data-onboard data-onboard-source="clinic-hero">
              Start Free Trial
            </button>{" "}
            <button className="b2" onClick={() => setShowModal(true)}>
              Talk to Expert &nbsp;
              <img
                src={callExpert}
                className="product-image ml-5"
                width="20"
                height="20"
                alt="Call to Expert"
              />
            </button>
          </div>
          <HeroLogo />
        </div>
      </section>

      <TalkToExpertModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}