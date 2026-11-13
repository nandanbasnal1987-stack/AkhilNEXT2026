"use client";

import { useIntegrationHub } from "@/hooks/useIntegrationHub";
import "@/styles/integrations.css";

export default function IntegrationHub() {
  const { nodes, rows, hot, setHot } = useIntegrationHub();

  return (
    <>
      <div
        className={`stage${hot ? " hot" : ""}`}
        aria-label="Integrations connected to one hub"
      >
        <svg viewBox="0 0 1000 470" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient
              id="g"
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
          <g id="wires">
            {nodes.map((n) => (
              <g key={n.index}>
                <path
                  d={n.path}
                  pathLength="1"
                  className="wire"
                  vectorEffect="non-scaling-stroke"
                  style={{ "--d": n.wireDelay }}
                />
                <path
                  d={n.path}
                  pathLength="1"
                  className="flow"
                  vectorEffect="non-scaling-stroke"
                  style={{ "--d": n.wireDelay }}
                />
              </g>
            ))}
          </g>
        </svg>

        <div className="hub" aria-label="Platform hub">
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <linearGradient id="b" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#7a4fe0" />
                <stop offset="1" stopColor="#4b5bd6" />
              </linearGradient>
            </defs>
            <path
              d="M33 2 L36 3 L36 34 L16 57 Q10 63 5 58 Q2 54 6 48 Z"
              fill="url(#b)"
            />
            <path
              d="M22 52 Q38 40 54 54"
              fill="none"
              stroke="#1d0f33"
              strokeWidth="9"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {nodes.map((n) => (
          <div
            key={n.index}
            className="chip"
            tabIndex={0}
            onMouseEnter={() => setHot(true)}
            onMouseLeave={() => setHot(false)}
            onFocus={() => setHot(true)}
            onBlur={() => setHot(false)}
            style={{
              "--x": n.x,
              "--y": n.y,
              "--d": n.chipDelay,
            }}
          >
            <span>{n.t}</span>
          </div>
        ))}
      </div>

      <div className="rows" aria-label="All supported integrations" style={{maxWidth:'1000px', margin: '50px auto'}}>
        {rows.map((list, r) => (
          <div key={r} className={`row${r ? " rev" : ""}`}>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="track2"
                aria-hidden={k === 1 ? "true" : undefined}
              >
                {[...list, ...list].map((t, j) => (
                  <div className="tag" key={`${t}-${j}`}>
                    {t}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}