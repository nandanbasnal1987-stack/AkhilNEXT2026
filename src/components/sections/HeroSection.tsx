"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import "@/styles/hero.css";
import Cslider from "../features/Cslider";
import HeroLogo from "../features/HeroLogo";

/** Hero banner with parallax background (Section 1, bottom part). */
export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  useHeroParallax(heroRef, [sceneRef, photoRef]);

  return (
    <div className="section-1">
      <section className="hero" id="sec1-hero" ref={heroRef} style={{ display: "block" }}>
        <div className="scene" id="sec1-scene" ref={sceneRef}>
          <Image src="/images/Clinic-banner.jpg" alt="Augastam clinic banner" width={0} height={0} sizes="100vw" priority style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="photo" id="sec1-photo" ref={photoRef}></div>
        <div className="shade"></div>
        <div className="copy">
          <h2>Augastam<span>Clinic</span></h2>
          <h1 className="in" style={{ "--d": "1" } as CSSProperties}>
           <strong>AI-powered Clinic</strong> Management Software.
          </h1>
          <p className="lead in" style={{ "--d": "2" } as CSSProperties}>
            Everything a clinic will ever need, in one platform. Smarter conversations, complete records and fuller appointment books.</p>
          <p>Single-doctor | Clinics | Polyclinics | ABDM Ready | NABH Digital Standards | 100% Configurable | Conversational AI in 80+ Indian & International Languages</p>
          <div className="btns in" style={{ "--d": "3" } as CSSProperties}>
            <button className="b1">Start Free Trial</button>{" "}
            <button className="b2" data-onboard data-onboard-source="clinic-hero">Talk to a Clinic Expert</button>
          </div>
          <HeroLogo />
        </div>
      </section>
    </div>
  );
}