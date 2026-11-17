"use client";

import { useRef } from "react";
import Image from "next/image";
import { useContactDialog } from "@/hooks/useContactDialog";
import "@/styles/contact.css";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  useContactDialog(ref);

  return (
    <div className="merged-section" id="section-12" ref={ref}>
      <section
        className="cta"
        id="sec12-cta"
        aria-labelledby="sec12-h"
        style={{ display: "block" }}
      >
        <div
          className="photo"
          id="sec12-photo"
          role="img"
          aria-label="Doctor talking with two patients"
        >
          <Image
            src="/images/Background+Border.svg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="body">
          <h1 id="sec12-h">
            Run Your Clinic Better. Make More Time for Care.
          </h1>
          <p className="lead">
            See how Augastam Clinic can fit your registration, appointment, QMS, EMR,
            billing and AI workflows.
          </p>
          <div className="btns">
            <button className="btn p" id="sec12-demo" type="button" data-onboard data-onboard-source="clinic-contact">
              Book a Demo{" "}
              <span className="ar" aria-hidden="true">
                →
              </span>
            </button>{" "}
            <a className="btn s" href="#" id="sec12-visit">
              Visit Akhil Systems
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}