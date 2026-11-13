"use client";

import { useMemo, useState } from "react";

/** Chip centers in a 1000 x 470 coordinate space. Hub sits at 500,250. */
export const INTEGRATION_NODES = [
  { t: "Kiosk", x: 300, y: 55 },
  { t: "Pine Lab", x: 700, y: 55 },
  { t: "Vital monitoring device", x: 175, y: 250 },
  { t: "PACS integration", x: 835, y: 250 },
  { t: "WhatsApp", x: 270, y: 420 },
  { t: "Email", x: 730, y: 420 },
];

/** Tags for the two marquee rows (top row scrolls left, bottom row reversed). */
export const MARQUEE_ROWS = [
  [
    "Kiosk",
    "Laboratory integration",
    "Pharmacy",
    "Pine Lab",
    "WhatsApp",
    "Email",
    "SMS integration",
    "Vital monitoring device",
  ],
  [
    "PACS integration",
    "ABDM integration",
    "WhatsApp",
    "SMS integration",
    "Email",
    "Vital monitoring device",
  ],
];

const VIEW_W = 1000;
const HUB_X = 500;
const HUB_Y = 250;

/** Build the cubic bezier from a chip to the hub. */
function buildWirePath(node) {
  const dx = (HUB_X - node.x) / 2;
  return `M${node.x} ${node.y} C${node.x + dx} ${node.y},${HUB_X - dx} ${HUB_Y},${HUB_X} ${HUB_Y}`;
}

/**
 * useIntegrationHub
 *
 * @param {object} [opts]
 * @param {number} [opts.stagger=0.12]      per-index delay step (seconds)
 * @param {number} [opts.baseDelay=0.25]    first-wire delay (seconds)
 * @param {number} [opts.chipBaseDelay=0.3] first-chip delay (seconds)
 *
 * @returns {{
 *   nodes: Array<{
 *     t: string,
 *     x: number,
 *     y: number,
 *     index: number,
 *     path: string,
 *     wireDelay: string,
 *     chipDelay: string,
 *   }>,
 *   rows: string[][],
 *   hot: boolean,
 *   setHot: (v: boolean) => void,
 *   viewWidth: number,
 * }}
 */
export function useIntegrationHub(opts = {}) {
  const {
    stagger = 0.12,
    baseDelay = 0.25,
    chipBaseDelay = 0.3,
  } = opts;

  // Single boolean is enough for the "dim all wires" hover effect.
  // For per-chip highlighting, swap for `hotIndex` (see the notes below).
  const [hot, setHot] = useState(false);

  const nodes = useMemo(
    () =>
      INTEGRATION_NODES.map((n, i) => ({
        ...n,
        index: i,
        path: buildWirePath(n),
        wireDelay: `${(baseDelay + i * stagger).toFixed(2)}s`,
        chipDelay: `${(chipBaseDelay + i * stagger).toFixed(2)}s`,
      })),
    [stagger, baseDelay, chipBaseDelay]
  );

  return {
    nodes,
    rows: MARQUEE_ROWS,
    hot,
    setHot,
    viewWidth: VIEW_W,
  };
}

export default useIntegrationHub;