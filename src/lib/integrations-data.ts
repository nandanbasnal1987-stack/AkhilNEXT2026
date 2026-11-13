export type IntegrationNode = {
  t: string;
  x: number; // 0–1000 space
  y: number; // 0–470 space
};

export const HUB_NODES: IntegrationNode[] = [
  { t: "Kiosk", x: 300, y: 55 },
  { t: "Pine Lab", x: 700, y: 55 },
  { t: "Vital monitoring device", x: 175, y: 250 },
  { t: "PACS integration", x: 835, y: 250 },
  { t: "WhatsApp", x: 270, y: 420 },
  { t: "Email", x: 730, y: 420 },
];

export const MARQUEE_ROWS: string[][] = [
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