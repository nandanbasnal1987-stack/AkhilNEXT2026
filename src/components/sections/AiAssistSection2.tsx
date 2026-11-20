"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/augastam-ai.css";

type CSSVars = React.CSSProperties & {
  "--mx"?: number | string;
  "--my"?: number | string;
  "--i"?: number | string;
};

const SUMMARY_ONE =
  "RITIKA is a 31-year-old female at a current outpatient visit. The highest-priority problem is Salmonella sepsis, coded and unconfirmed.";
const SUMMARY_TWO =
  "Tuberculous neuritis (2025), endometrial carcinoma (2025), and active hypertension (2026) are on record. PCOS needs monitoring and follow-up.";
const SPEECH =
  "Penicillin — rash. Peanuts — mild swelling. No known latex allergy.";

const VISITS = [
  {
    date: "30 Oct 2026",
    doctor: "Dr. Anamika",
    notes: [
      "Hypertension and PCOS: monitor blood pressure regularly.",
      "Low BMI (17.32): evaluate nutritional status.",
    ],
    tags: ["Anemia", "Rotavirus"],
    diagnosis: "Hypertension — tablet 10 mg once daily",
  },
  {
    date: "22 Oct 2026",
    doctor: "Dr. Anamika",
    notes: [
      "Viral infection, unspecified: hydration and rest.",
      "Recheck temperature in 48 hours.",
    ],
    tags: ["Fever"],
    diagnosis: "Viral infection — supportive care",
  },
  {
    date: "05 Oct 2026",
    doctor: "Dr. Anamika",
    notes: [
      "PCOS ongoing: continue management plan.",
      "Review hormone panel next visit.",
    ],
    tags: ["Anemia"],
    diagnosis: "PCOS — lifestyle and follow-up",
  },
  {
    date: "30 Sep 2026",
    doctor: "Dr. Charu",
    notes: [
      "Active hypertension recorded.",
      "Continue monitoring and adjust medication as needed.",
    ],
    tags: ["Hypertension"],
    diagnosis: "Hypertension — monitor BP",
  },
  {
    date: "23 Sep 2026",
    doctor: "Dr. Anamika",
    notes: ["Low BMI noted: nutritional counseling advised."],
    tags: ["Low BMI"],
    diagnosis: "Nutritional deficiency — diet plan",
  },
];

function RefreshIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="#fff" strokeWidth="2" fill="none" />
    </svg>
  );
}

export default function AugastamAIPage() {
  //const [theme, setTheme] = useState("system");
  const [summaryOne, setSummaryOne] = useState("");
  const [summaryTwo, setSummaryTwo] = useState("");
  const [regenerating, setRegenerating] = useState(false);
  const [listening, setListening] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [hint, setHint] = useState("Speak Allergy information…");
  const [spokenText, setSpokenText] = useState("—");
  const [filled, setFilled] = useState(false);
  const [visitIndex, setVisitIndex] = useState(0);
  const [autoVisit, setAutoVisit] = useState(true);
  const [pointer, setPointer] = useState({ x: "50%", y: "30%" });
  const typeRun = useRef(0);
  const speechRun = useRef(0);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const run = ++typeRun.current;

    async function typeText(setter: (v: string) => void, value: string) {
      setter("");
      for (let i = 0; i < value.length; i += 1) {
        if (cancelled || run !== typeRun.current) return;
        setter(value.slice(0, i + 1));
        if (!reduced) await new Promise((resolve) => setTimeout(resolve, 14));
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        (async () => {
          setRegenerating(true);
          await typeText(setSummaryOne, SUMMARY_ONE);
          if (!cancelled && run === typeRun.current) await typeText(setSummaryTwo, SUMMARY_TWO);
          if (!cancelled) setRegenerating(false);
        })();
        observer.disconnect();
      }
    });
    const target = document.getElementById("ai-summary-text");
    if (target) observer.observe(target);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!listening) return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [listening]);

  useEffect(() => {
    if (!listening) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = ++speechRun.current;
    let index = 0;
    setHint("");
    setSpokenText("…");
    const timer = window.setInterval(() => {
      if (run !== speechRun.current) {
        window.clearInterval(timer);
        return;
      }
      index += 1;
      setHint(SPEECH.slice(0, index));
      if (index >= SPEECH.length) window.clearInterval(timer);
    }, reduced ? 1 : 55);
    return () => window.clearInterval(timer);
  }, [listening]);

  useEffect(() => {
    if (!autoVisit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setVisitIndex((value) => (value + 1) % VISITS.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [autoVisit]);

  function regenerate() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = ++typeRun.current;
    setRegenerating(true);
    setSummaryOne("");
    setSummaryTwo("");
    (async () => {
      for (let i = 0; i < SUMMARY_ONE.length; i += 1) {
        if (run !== typeRun.current) return;
        setSummaryOne(SUMMARY_ONE.slice(0, i + 1));
        if (!reduced) await new Promise((resolve) => setTimeout(resolve, 14));
      }
      for (let i = 0; i < SUMMARY_TWO.length; i += 1) {
        if (run !== typeRun.current) return;
        setSummaryTwo(SUMMARY_TWO.slice(0, i + 1));
        if (!reduced) await new Promise((resolve) => setTimeout(resolve, 14));
      }
      setRegenerating(false);
    })();
  }

  function startListening() {
    setSeconds(0);
    setFilled(false);
    setListening(true);
  }

  function stopAndFill() {
    if (!listening) {
      startListening();
      return;
    }
    speechRun.current += 1;
    setListening(false);
    setFilled(true);
    setSpokenText(SPEECH);
    setHint("Section filled from speech.");
    if (fieldRef.current && typeof fieldRef.current.animate === "function") {
      fieldRef.current.animate(
        [{ background: "#d9f5e5" }, { background: "transparent" }],
        { duration: 1200 }
      );
    }
  }

  function toggleListening() {
    if (listening) stopAndFill();
    else startListening();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    setPointer({ x: `${event.clientX}px`, y: `${event.clientY}px` });
  }

  const visit = VISITS[visitIndex];

  return (
    <div
      className={`augastam-ai-page`}
      onPointerMove={handlePointerMove}
      style={{ "--mx": pointer.x, "--my": pointer.y } as CSSVars}
    >
      <div className="glow" aria-hidden="true" />

      <main className="ai-main">
        <div className="brand">
          <span className="logo">AUGASTAM</span>
          <span className="chip">
            <i />
            <b>AI</b>
          </span>
        </div>

        <h1 className="headline">
          {"Let technology handle the busywork. Keep the clinical focus human."
            .split(" ")
            .map((word, index) => (
              <span className="w" style={{ "--i": index } as CSSVars} key={`${word}-${index}`}>
                {word}{" "}
              </span>
            ))}
        </h1>
        <p className="sub">Trusted by 600+ Hospitals to improve outcomes across every stage</p>

        <section className="grid">
          <article className="card">
            <div className="stage s1">
              <div className="paper">
                <div className="ph">
                  <div>
                    <b>Past Visit Summary</b>
                    <small>AI-generated from previous visits</small>
                  </div>
                  <button
                    className={`regen ${regenerating ? "busy" : ""}`}
                    type="button"
                    onClick={regenerate}
                  >
                    <RefreshIcon /> Regenerate
                  </button>
                </div>
                <div className="sec">
                  <h4>Patient Condition</h4>
                  <div id="ai-summary-text">{summaryOne}</div>
                </div>
                <div className="sec bg">
                  <h4>Background</h4>
                  <div>{summaryTwo}</div>
                </div>
              </div>
            </div>
            <h3>Quick AI Summary</h3>
            <p>
              Highlight key clinical details and potential risks to help doctors understand patient
              cases faster and make informed decisions.
            </p>
          </article>

          <article className="card">
            <div className="stage s2">
              <div className={`fill ${listening ? "rec" : ""}`}>
                <div className="top">
                  <span>Fill Section</span>
                  <span aria-hidden="true">✕</span>
                </div>
                <div className="row_remove" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    className={`mic on ${listening ? "on" : ""}`}
                    type="button"
                    onClick={toggleListening}
                    aria-label="Start or stop listening"
                  >
                    <MicIcon />
                  </button>
                  <span className="state">
                    {listening ? "Listening…" : filled ? "Filled ✓" : "Tap to talk"}
                  </span>
                  <div className={`wave ${listening ? "active" : ""}`} aria-hidden="true">
                    {Array.from({ length: 22 }, (_, index) => (
                      <span key={index} />
                    ))}
                  </div>
                  <span className="timer">{`00:${String(seconds).padStart(2, "0")}`}</span>
                </div>
                <button className="stop" type="button" onClick={stopAndFill}>
                  Stop &amp; Fill
                </button>
                <div className="hint">{hint}</div>
                <div className="field" ref={fieldRef}>
                  <b>Allergies:</b> <span>{spokenText}</span>
                </div>
              </div>
            </div>
            <h3>Speech-to-text</h3>
            <p>
              Convert doctor speech into accurate text in real time, reducing manual documentation
              during consultations. Capture clinical notes faster and help doctors focus more on
              patient care.
            </p>
          </article>

          <article className="card">
            <div className="stage s3">
              <div className="app">
                <div className="tl">
                  {VISITS.map((item, index) => (
                    <button
                      type="button"
                      key={item.date}
                      className={visitIndex === index ? "act" : ""}
                      onClick={() => {
                        setAutoVisit(false);
                        setVisitIndex(index);
                      }}
                    >
                      OP · {item.date}
                      <small>{item.doctor}</small>
                    </button>
                  ))}
                </div>
                <div className="pane" key={visit.date}>
                  <div className="fade">
                    <h5>AI Visit Summary</h5>
                    <div className="tags">
                      {visit.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <ul>
                      {visit.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                    <div className="dx">
                      <b>Diagnosis</b>
                      <br />
                      {visit.diagnosis}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3>Visit Summary — powered by AI</h3>
            <p>
              Highlight key clinical details and potential risks to help doctors understand patient
              cases faster and make informed decisions.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}