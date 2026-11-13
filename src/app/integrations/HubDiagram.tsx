"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { HUB_NODES } from "@/lib/integrations-data";
import IntegrationChip from "./IntegrationChip";


function buildPath(x: number, y: number) {
  const dx = (500 - x) / 2;
  return `M${x} ${y} C${x + dx} ${y},${500 - dx} 250,500 250`;
}

export default function HubDiagram() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleHover = useCallback((i: number | null) => {
    setActiveIndex(i);
  }, []);

  return (
    <div
      className={`hub-stage${activeIndex !== null ? " is-hot" : ""}`}
      aria-label="Integrations connected to one hub"
    >
      <svg
        viewBox="0 0 1000 470"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="hubGrad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="1000"
            y2="0"
          >
            <stop offset="0" stopColor="#4b5bd6" />
            <stop offset="1" stopColor="#a06cf0" />
          </linearGradient>
        </defs>

        <g>
          {HUB_NODES.map((n, i) => {
            const d = buildPath(n.x, n.y);
            const delay = `${(0.25 + i * 0.12).toFixed(2)}s`;
            const isOn = activeIndex === i;

            return (
              <g key={n.t}>
                <path
                  d={d}
                  pathLength={1}
                  className={`hub-wire${isOn ? " on" : ""}`}
                  vectorEffect="non-scaling-stroke"
                  style={{ ["--d" as string]: delay }}
                />
                <path
                  d={d}
                  pathLength={1}
                  className="hub-flow"
                  vectorEffect="non-scaling-stroke"
                  style={{ ["--d" as string]: delay }}
                />
              </g>
            );
          })}
        </g>
      </svg>

      <div className="hub-center" aria-label="Platform hub">
  <Image 
    src="/images/logoicon.svg" 
    alt="Augastam" 
    fill 
    style={{ objectFit: "contain", padding: "20%" }} 
  />
</div>

      {HUB_NODES.map((n, i) => (
        <IntegrationChip
          key={n.t}
          label={n.t}
          x={n.x}
          y={n.y}
          delay={0.3 + i * 0.12}
          onHover={handleHover}
          index={i}
        />
      ))}
    </div>
  );
}