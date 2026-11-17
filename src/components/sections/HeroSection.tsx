"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import "@/styles/hero.css";

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
          <Image src="/images/home-banner.jpg" alt="Augastam clinic banner" width={0} height={0} sizes="100vw" priority style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="photo" id="sec1-photo" ref={photoRef}></div>
        <div className="shade"></div>
        <div className="copy">
          <h1 className="in" style={{ "--d": "1" } as CSSProperties}>
            <em>Augastam Clinic</em>: AI-powered EMR & clinic management software.
          </h1>
          <p className="lead in" style={{ "--d": "2" } as CSSProperties}>
            Everything a clinic will ever need, in one platform. Smarter conversations, complete records and fuller appointment books.
          </p>
          <div className="btns in" style={{ "--d": "3" } as CSSProperties}>
            <button className="b1">Explore platform</button>{" "}
            <button className="b2" data-onboard data-onboard-source="clinic-hero">Book a Live Demo</button>
          </div>
        </div>
      </section>
    </div>
  );
}