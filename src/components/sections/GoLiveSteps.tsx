
"use client";

import { useEffect, useRef, useState } from "react";
//import "./go-live-steps.css";

const stepsData = [
  {
    title: "Demo and fit check",
    description:
      "We understand your specialty, workflow and patient volume.",
    color: "#4fa3e8",
    icon: (
      <>
        <circle cx="14" cy="14" r="8" />
        <path d="M20 20l9 9" />
        <path d="M10 14h8M14 10v8" />
      </>
    ),
  },
  {
    title: "Configure",
    description:
      "Forms, templates, printouts and messages set up your way.",
    color: "#2f8ae6",
    icon: (
      <>
        <path d="M4 30h28" />
        <path d="M8 26v-7M15 26v-12M22 26v-9M29 26V8" />
        <path d="M6 12l8-5 7 4 9-7" />
      </>
    ),
  },
  {
    title: "Train and migrate",
    description:
      "Your team is trained and your records moved in.",
    color: "#1f6fe0",
    icon: (
      <>
        <circle cx="18" cy="11" r="4.5" />
        <circle cx="7" cy="14" r="3.5" />
        <circle cx="29" cy="14" r="3.5" />
        <path d="M9 30c0-6 4-9 9-9s9 3 9 9M2 27c0-4 2-6 5-6M34 27c0-4-2-6-5-6" />
      </>
    ),
  },
  {
    title: "Go live and grow",
    description:
      "Dedicated support, then retention and analytics tools.",
    color: "#1450b8",
    icon: (
      <>
        <path d="M13 25c-3-2-5-5-5-9a10 10 0 0120 0c0 4-2 7-5 9v3H13z" />
        <path d="M14 32h8M18 2v3M5 7l2 2M31 7l-2 2M2 17h3M31 17h3" />
      </>
    ),
  },
];

const xs = [150, 450, 750, 1050];

export default function GoLiveSteps() {
  const beatRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 820;

  const resetAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    setActiveSteps([]);
    setActiveNodes([]);

    const beat = beatRef.current;

    if (beat) {
      const length = beat.getTotalLength();
      beat.style.strokeDasharray = `${length}`;
      beat.style.strokeDashoffset = `${length}`;
    }
  };

  const runAnimation = () => {
    const beat = beatRef.current;
    if (!beat) return;

    resetAnimation();

    const length = beat.getTotalLength();

    beat.style.strokeDasharray = `${length}`;
    beat.style.strokeDashoffset = `${length}`;

    if (isMobile()) {
      stepMobileAnimation();
      return;
    }

    const positions = xs.map((x) => {
      let position = 0;

      while (
        position < length &&
        beat.getPointAtLength(position).x < x
      ) {
        position += 3;
      }

      return position / length;
    });

    const duration = 3600;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min(
        (time - startTime) / duration,
        1
      );

      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      beat.style.strokeDashoffset = `${length * (1 - eased)}`;

      positions.forEach((position, index) => {
        if (eased >= position - 0.01) {
          setActiveNodes((prev) =>
            prev.includes(index) ? prev : [...prev, index]
          );

          setActiveSteps((prev) =>
            prev.includes(index) ? prev : [...prev, index]
          );
        }
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const stepMobileAnimation = () => {
    stepTimeouts.forEach(clearTimeout);
    stepTimeouts = [];

    stepTimeouts = stepsData.map((_, index) =>
      window.setTimeout(() => {
        setActiveSteps((prev) =>
          prev.includes(index) ? prev : [...prev, index]
        );
      }, index * 250)
    );
  };

  let stepTimeouts: number[] = [];

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      runAnimation();
    };

    let observer: IntersectionObserver | undefined;

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            start();
            observer?.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(track);
    } else {
      start();
    }

    const fallback = window.setTimeout(start, 1500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(fallback);

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      stepTimeouts.forEach(clearTimeout);
    };
  }, []);

  const pathData = (() => {
    let path = "M0 100H150";

    for (let k = 0; k < 3; k++) {
      const o = xs[k];

      path +=
        `H${o + 60}` +
        `L${o + 85} 100` +
        `L${o + 105} 62` +
        `L${o + 130} 150` +
        `L${o + 155} 22` +
        `L${o + 180} 118` +
        `L${o + 200} 100` +
        `H${xs[k + 1]}`;
    }

    return path + "H1200";
  })();

  return (
    <main className="gl-panel">

      <header className="gl-head">
        <div>
          <div className="gl-tag">
            <i />
            Integration
          </div>

          <h1>Go live in four steps</h1>
        </div>

        <p className="gl-sub">
          Connect your clinic’s essential tools in one place,
          so your team can access the systems they need without
          constantly switching between apps.
        </p>
      </header>

      <section className="gl-track" ref={trackRef}>

        <svg
          className="gl-ecg"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="gl-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="1200"
              y1="0"
              y2="0"
            >
              <stop offset="0" stopColor="#7cc0ff" />
              <stop offset=".45" stopColor="#2f8ae6" />
              <stop offset="1" stopColor="#1450b8" />
            </linearGradient>
          </defs>

          <path
            className="gl-base"
            d="M0 100H1200"
          />

          <path
            ref={beatRef}
            className="gl-beat"
            d={pathData}
          />
        </svg>

        <div className="gl-nodes">
          {stepsData.map((step, index) => (
            <div
              key={step.title}
              className={`gl-node ${
                activeNodes.includes(index) ? "on" : ""
              }`}
              style={{
                left: `${(xs[index] / 12)}%`,
                "--col": step.color,
              } as React.CSSProperties}
            >
              <svg viewBox="0 0 36 36">
                {step.icon}
              </svg>
            </div>
          ))}
        </div>
      </section>

      <section className="gl-steps">

        {stepsData.map((step, index) => (
          <article
            key={step.title}
            className={`gl-step ${
              activeSteps.includes(index) ? "on" : ""
            }`}
            style={{
              "--col": step.color,
            } as React.CSSProperties}
          >

            <div className="gl-mobile-icon">
              <svg viewBox="0 0 36 36">
                {step.icon}
              </svg>
            </div>

            <div className="gl-num">
              Step {index + 1}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

          </article>
        ))}

      </section>

     

    </main>
  );
}
