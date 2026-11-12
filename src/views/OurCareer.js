'use client';

import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import "../styles/global.css";

const bg_career = "/images/bg-career.png";

// Lazy-load the heavy interactive panels — they're below the hero
const CareerAccordion = lazy(() =>
  import("../components/features/CareerAccordion")
);
const CareerAccordionFilter = lazy(() =>
  import("../components/features/CareerAccordionFilter")
);

// Toggle for the optional Base64 upload utility. Flip to `true` if/when needed.
const SHOW_UPLOAD_TOOL = false;

// Pure helper — lives at module scope, not redefined per render
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

function UploadToBase64() {
  const [base64Image, setBase64Image] = useState("");

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setBase64Image(base64);
    } catch (err) {
      // Surface errors without dumping large payloads to the console
      console.error("Error converting image");
    }
  }, []);

  return (
    <div
      className="upload-section"
      style={{ textAlign: "center", marginTop: 40 }}
    >
      <h3>Upload Image to Convert into Base64</h3>
      <input type="file" accept="image/*" onChange={handleFileUpload} />

      {base64Image && (
        <div style={{ marginTop: 20 }}>
          <p>
            <strong>Base64 Output:</strong>
          </p>
          <textarea
            value={base64Image}
            readOnly
            style={{ width: "80%", height: 150 }}
          />
          <div style={{ marginTop: 20 }}>
            <img src={base64Image} alt="Preview" width="200" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function OurCareer() {
  // If you actually want AOS animations, uncomment this block AND keep the
  // aos imports. Otherwise leave it removed — the original code never called
  // AOS.init() so the data-aos attributes were doing nothing.
  //
  // useEffect(() => {
  //   import("aos").then(({ default: AOS }) => {
  //     import("aos/dist/aos.css");
  //     AOS.init({ duration: 800, once: true });
  //   });
  // }, []);


  return (
    <>

      <div className="box-career">
        <img
          src={bg_career}
          alt="Careers at Akhil Systems"
          width={1920}
          height={455}
          decoding="async"
          fetchPriority="high"
        />

        

        
        <div className="box-clients-details">
          <h2>
            Join Us! <br />
            Be Part of Something Bigger
          </h2>
          <p>
            Join our mission to transform healthcare through innovation and
            technology.
          </p>
          
        </div>
      </div>

      <section>
        <div className="box-career-panel">
          <div className="box-career-left hidden">
            <Suspense fallback={<div style={{ minHeight: 300 }} />}>
              <CareerAccordionFilter />
            </Suspense>
          </div>
          <div className="box-career-right1">
            <Suspense fallback={<div style={{ minHeight: 600 }} />}>
              <CareerAccordion />
            </Suspense>
          </div>
        </div>
      </section>

      {SHOW_UPLOAD_TOOL && <UploadToBase64 />}
    </>
  );
}