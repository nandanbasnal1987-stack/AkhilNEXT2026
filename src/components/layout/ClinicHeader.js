"use client";

import { useState } from "react";
import ClinicNavbar  from "@/components/layout/ClinicNavbar";
import "@/styles/clinic-header.css";

/** Announcement bar + sticky navigation (Section 1, top part). */
export default function Header() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className="section-1">
      <div className={`bar${dismissed ? " gone" : ""}`} id="sec1-bar">
        <a href="#">
          LIVE WEBINAR - OCT 23 | See Augastam Clinical in roll!!!  | Save your spot →
        </a>
        {" "}
        <button id="sec1-close" aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}>
          ✕
        </button>
      </div>
      <ClinicNavbar /> 
    </div>
  );
}
