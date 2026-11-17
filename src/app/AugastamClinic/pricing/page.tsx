"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactSection from "@/components/sections/ContactSection";
import { useOnboard } from "@/onboarding/OnboardProvider";
import "./pricing.css";

/* ================================================================
   COMPARISON TABLE DATA
   ================================================================ */
type Cell =
  | string
  | { type: "included" | "excluded" | "addon" | "usage" | "custom"; text?: string };

type Row = { label: string; info?: boolean; cells: Cell[] };
type Section = { group: string; rows: Row[] };

const blankCells: Cell[] = ["", ""];
const makeRow = (label: string, cells: Cell[] = blankCells): Row => ({
  label,
  info: true,
  cells,
});

const sections: Section[] = [
  {
    group: "Patient Registration & Management",
    rows: [
      makeRow("Patient registration and records", [{ type: "included" }, { type: "included" }]),
      makeRow("Configurable Registration Form", [{ type: "included" }, { type: "included" }]),
      makeRow("Configurable Patient List", [{ type: "included" }, { type: "included" }]),
      makeRow("Alerts", [{ type: "included" }, { type: "included" }]),
      makeRow("Notifications", [{ type: "included" }, { type: "included" }]),
      makeRow("Continuous Journey record", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Clinical Management & EMR",
    rows: [
      makeRow("Extensive Doctor wise EMR Configuration", [{ type: "included" }, { type: "included" }]),
      makeRow("Specialty-wise EMR variations", [{ type: "included" }, { type: "included" }]),
      makeRow("Configurable SOAP notes", [{ type: "included" }, { type: "included" }]),
      makeRow("Personalized SOAP note and workflow configuration", [{ type: "included" }, { type: "included" }]),
      makeRow("Digital prescriptions", [{ type: "included" }, { type: "included" }]),
      makeRow("Growth Chart", [{ type: "included" }, { type: "included" }]),
      makeRow("Immunization Chart", [{ type: "included" }, { type: "included" }]),
      makeRow("Vital Chart", [{ type: "included" }, { type: "included" }]),
      makeRow("Lab Chart", [{ type: "included" }, { type: "included" }]),
      makeRow("Pediatric Dose Calculation", [{ type: "included" }, { type: "included" }]),
      makeRow("ANC Card", [{ type: "included" }, { type: "included" }]),
      makeRow("Certifications", [{ type: "included" }, { type: "included" }]),
      makeRow("Developmental Milestone with chart", [{ type: "included" }, { type: "included" }]),
      makeRow("Opthalmology EMR", [{ type: "included" }, { type: "included" }]),
      makeRow("Data Attribute", [{ type: "included" }, { type: "included" }]),
      makeRow("Split Screen", [{ type: "included" }, { type: "included" }]),
      makeRow("Printout Configuration", [{ type: "included" }, { type: "included" }]),
      makeRow("Personalized Care Plan", [{ type: "included" }, { type: "included" }]),
      makeRow("Quick patient summary", [{ type: "included" }, { type: "included" }]),
      makeRow("Quick Summary", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Appointments & Clinic Operations",
    rows: [
      makeRow("Appointment scheduling", [{ type: "included" }, { type: "included" }]),
      makeRow("Online appointment booking", [{ type: "included" }, { type: "included" }]),
      makeRow("Multi-doctor clinic management", [{ type: "included" }, { type: "included" }]),
      makeRow("Queue Management System (QMS)", [{ type: "included" }, { type: "included" }]),
      makeRow("Assignement Process", [{ type: "included" }, { type: "included" }]),
      makeRow("Employee chat", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Billing & Payment Management",
    rows: [
      makeRow("OP billing and payments", [{ type: "included" }, { type: "included" }]),
      makeRow("Billing and Payments", [{ type: "included" }, { type: "included" }]),
      makeRow("Payment gateway integration", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Patient Engagement & Communication",
    rows: [
      makeRow("Patient portal", [{ type: "included" }, { type: "included" }]),
      makeRow("Patient mobile app", [{ type: "included" }, { type: "included" }]),
      makeRow("Doctor mobile app", [{ type: "included" }, { type: "included" }]),
      makeRow("Teleconsultation", [{ type: "included" }, { type: "included" }]),
      makeRow("WhatsApp communication", [{ type: "included" }, { type: "included" }]),
      makeRow("WhatsApp", [{ type: "included" }, { type: "included" }]),
      makeRow("SMS and email notifications", [{ type: "included" }, { type: "included" }]),
      makeRow("SMS and Email", [{ type: "included" }, { type: "included" }]),
      makeRow("Follow-up reminders", [{ type: "included" }, { type: "included" }]),
      makeRow("AI follow-up reminders", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Healthcare Integrations & ABDM",
    rows: [
      makeRow("ABDM integration and consent-based record sharing", [{ type: "included" }, { type: "included" }]),
      makeRow("Lab integration", [{ type: "included" }, { type: "included" }]),
      makeRow("Pharmacy integration", [{ type: "included" }, { type: "included" }]),
      makeRow("E-lab / home lab services", [{ type: "included" }, { type: "included" }]),
      makeRow("Medicine delivery services", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Website & Digital Presence",
    rows: [
      makeRow("Personalized clinic website", [{ type: "included" }, { type: "included" }]),
      makeRow("Google Business Profile / SEO", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Analytics & Reporting",
    rows: [
      makeRow("Analytics dashboard", [{ type: "included" }, { type: "included" }]),
      makeRow("Analytical Dashboard", [{ type: "included" }, { type: "included" }]),
      makeRow("AI clinical analytics and predictive insights", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Augastam AI",
    rows: [
      makeRow("Ambient conversational AI", [{ type: "included" }, { type: "included" }]),
      makeRow("Conversational AI", [{ type: "included" }, { type: "included" }]),
      makeRow("AI visit summarization", [{ type: "included" }, { type: "included" }]),
      makeRow("Visit summarization", [{ type: "included" }, { type: "included" }]),
      makeRow("OCR document extraction", [{ type: "included" }, { type: "included" }]),
      makeRow("OCR", [{ type: "included" }, { type: "included" }]),
      makeRow("Unstructured-to-structured data extraction", [{ type: "included" }, { type: "included" }]),
      makeRow("Voice assistant for EMR operation", [{ type: "included" }, { type: "included" }]),
      makeRow("Voice assistant", [{ type: "included" }, { type: "included" }]),
      makeRow("Clinical Decision Support System (CDSS)", [{ type: "included" }, { type: "included" }]),
      makeRow("CDSS — Wolters Kluwer", [{ type: "included" }, { type: "included" }]),
      makeRow("CDSS — Augastam AI", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Cloud Infrastructure & Data Management",
    rows: [
      makeRow("Cloud storage", [{ type: "included" }, { type: "included" }]),
      makeRow("Private database", [{ type: "included" }, { type: "included" }]),
      makeRow("Data migration from existing EMR", [{ type: "included" }, { type: "included" }]),
      makeRow("Data migration", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Implementation & Customization",
    rows: [
      makeRow("Implementation and onboarding", [{ type: "included" }, { type: "included" }]),
      makeRow("Implementation", [{ type: "included" }, { type: "included" }]),
      makeRow("Custom form builder", [{ type: "included" }, { type: "included" }]),
    ],
  },
  {
    group: "Support & Services",
    rows: [
      makeRow("Standard support", [{ type: "included" }, { type: "included" }]),
      makeRow("Support", [{ type: "included" }, { type: "included" }]),
      makeRow("Premium support / dedicated relationship manager", [{ type: "included" }, { type: "included" }]),
    ],
  },
];

/* ================================================================
   ICONS
   ================================================================ */
function TickIcon() {
  return (
    <svg
      className="cell-icon cell-icon--tick"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-label="Included"
      role="img"
    >
      <circle cx="12" cy="12" r="10" fill="#22c55e" stroke="none" />
      <path d="m9 12 2 2 4-4" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="cell-icon cell-icon--cross"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-label="Not included"
      role="img"
    >
      <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="none" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================
   HELPERS
   ================================================================ */
function CellContent({ cell }: { cell: Cell }) {
  if (typeof cell === "string") return <span className="cell-text">{cell}</span>;
  switch (cell.type) {
    case "included": return <TickIcon />;
    case "excluded": return <CrossIcon />;
    case "addon":
    case "usage":
    case "custom":
      return <span className={`cell-pill ${cell.type}`}>{cell.text ?? ""}</span>;
    default: return null;
  }
}

function InfoDot() {
  return <span className="info-dot" aria-hidden="true">i</span>;
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <>
      <tr className="group-row">
        <td colSpan={3}>{section.group}</td>
      </tr>
      {section.rows.map((row, index) => (
        <tr key={`${row.label}-${index}`}>
          <td className="td-feature">
            {row.label}
            {row.info && (<> <InfoDot /></>)}
          </td>
          {row.cells.map((cell, i) => (
            <td key={i}><CellContent cell={cell} /></td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* ================================================================
   GET STARTED MODAL — FULL EMAILJS VERSION
   ================================================================ */
type FormState = {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  message: string;
};

const emptyForm: FormState = { name: "", email: "", phone: "", clinic: "", message: "" };

function GetStartedModal({
  open,
  plan,
  period,
  onClose,
}: {
  open: boolean;
  plan: string;
  period: "m" | "y";
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setErrors({});
      setSuccess(false);
      setSubmitting(false);
      setStatus(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (!form.email.trim()) next.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.phone.trim()) next.phone = "Please enter your phone";
    else if (!/^[+\d][\d\s-]{6,}$/.test(form.phone)) next.phone = "Enter a valid phone";
    if (!form.clinic.trim()) next.clinic = "Please enter your clinic / organization";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm(
        "service_rjdaw98",
        "template_t5lcfaj",
        formRef.current as HTMLFormElement,
        "1jS0s7rCMLTiVJWK3"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setStatus("success");
        setSuccess(true);
        setForm(emptyForm);
      })
      .catch((error) => {
        console.error("Error sending email:", error.text);
        setStatus("error");
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,.55)",
        zIndex: 2147483000, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 16, overflowY: "auto",
      }}
    >
      <div
        className="demo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          background: "#fff", borderRadius: 16, padding: 28, width: "100%",
          maxWidth: 520, maxHeight: "90vh", overflowY: "auto",
          position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,.25)",
        }}
      >
        <button
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
          type="button"
          style={{
            position: "absolute", top: 12, right: 16, background: "none",
            border: "none", fontSize: 24, cursor: "pointer", lineHeight: 1,
          }}
        >
          ×
        </button>

        {success ? (
          <div className="modal-success" style={{ textAlign: "center" }}>
            <div className="modal-success-icon" style={{ display: "flex", justifyContent: "center", margin: "20px auto" }}>
              <TickIcon />
            </div>
            <h3 id="modal-title">Thank you!</h3>
            <p>
              We&apos;ve received your request for <b>{plan}</b> (
              {period === "y" ? "Yearly billing" : "Monthly billing"}). Our team will reach out shortly.
            </p>
            <button className="sc-btn primary" onClick={onClose} type="button">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="modal-head" style={{ marginBottom: 16 }}>
              <span className="modal-tag">{plan}</span>
              <h3 id="modal-title" style={{ marginTop: 8 }}>Get Started with {plan}</h3>
              <p style={{ color: "#555" }}>
                Fill in a few details — our team will reach out within 1 business day.
              </p>
            </div>

            {status === "error" && (
              <div
                className="alert alert-danger"
                style={{
                  background: "#fdecea", color: "#b3261e", border: "1px solid #f5c2c0",
                  padding: "10px 14px", borderRadius: 8, marginBottom: 12, fontSize: 14,
                }}
              >
                Something went wrong. Please try again later.
              </div>
            )}

            <form ref={formRef} className="modal-form" onSubmit={onSubmit} noValidate>
              <input type="hidden" name="plan" value={plan} />
              <input type="hidden" name="period" value={period === "y" ? "Yearly" : "Monthly"} />

              <div className="form-row" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <label className="form-field" style={{ flex: 1 }}>
                  <span>Full name *</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Dr. Jane Doe"
                    autoFocus
                    style={{ width: "100%", padding: 10, marginTop: 4 }}
                  />
                  {errors.name && <em className="form-error" style={{ color: "red", fontSize: 12 }}>{errors.name}</em>}
                </label>

                <label className="form-field" style={{ flex: 1 }}>
                  <span>Work email *</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@clinic.com"
                    style={{ width: "100%", padding: 10, marginTop: 4 }}
                  />
                  {errors.email && <em className="form-error" style={{ color: "red", fontSize: 12 }}>{errors.email}</em>}
                </label>
              </div>

              <div className="form-row" style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <label className="form-field" style={{ flex: 1 }}>
                  <span>Phone *</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{ width: "100%", padding: 10, marginTop: 4 }}
                  />
                  {errors.phone && <em className="form-error" style={{ color: "red", fontSize: 12 }}>{errors.phone}</em>}
                </label>

                <label className="form-field" style={{ flex: 1 }}>
                  <span>Clinic / Organization *</span>
                  <input
                    type="text"
                    name="clinic"
                    value={form.clinic}
                    onChange={(e) => setForm({ ...form, clinic: e.target.value })}
                    placeholder="Sunrise Clinic"
                    style={{ width: "100%", padding: 10, marginTop: 4 }}
                  />
                  {errors.clinic && <em className="form-error" style={{ color: "red", fontSize: 12 }}>{errors.clinic}</em>}
                </label>
              </div>

              <label className="form-field" style={{ display: "block", marginBottom: 12 }}>
                <span>Message (optional)</span>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your clinic size, specialty, or requirements…"
                  style={{ width: "100%", padding: 10, marginTop: 4 }}
                />
              </label>

              <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="sc-btn primary" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit Request"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function PricingPage() {
  const [revealed, setRevealed] = useState(false);
  const [period, setPeriod] = useState<"m" | "y">("m");
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({});
  const toggleRef = useRef<HTMLDivElement>(null);
  const monthlyButtonRef = useRef<HTMLButtonElement>(null);
  const yearlyButtonRef = useRef<HTMLButtonElement>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // "Get Started" now opens the 4-step onboarding form on the chosen plan (the old lead modal below is no longer opened).
  const { open: openOnboarding } = useOnboard();
  const handleGetStarted = (planName: string) => {
    openOnboarding(planName.includes("Enterprise") ? "custom" : "standard", `pricing:${planName}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan("");
  };

  useEffect(() => {
    const updatePill = () => {
      const button = period === "m" ? monthlyButtonRef.current : yearlyButtonRef.current;
      const wrap = toggleRef.current;
      if (!button || !wrap) return;
      const b = button.getBoundingClientRect();
      const w = wrap.getBoundingClientRect();
      setPillStyle({
        width: `${b.width}px`,
        transform: `translateX(${b.left - w.left - 4}px)`,
      });
    };
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [period]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector(".compare-wrap");
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.9) setRevealed(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getPrice = (basePrice: number) => (period === "y" ? Math.round(basePrice * 0.8) : basePrice);

  return (
    <main className="pricing-page">
      <section className="pricing-header" style={{ display: "block", padding: "0" }}>
        <h1>Choose the Perfect Plan for Your Healthcare Needs</h1>
        <p>Simple, transparent pricing that scales with your clinic network.</p>
      </section>

      <div className="toggle-wrap" ref={toggleRef} role="group" aria-label="Billing period">
        <span className="toggle-pill" style={pillStyle} />
        <button ref={monthlyButtonRef} type="button" className="toggle-btn"
          aria-pressed={period === "m"} onClick={() => setPeriod("m")}>
          Monthly
        </button>
        <button ref={yearlyButtonRef} type="button" className="toggle-btn"
          aria-pressed={period === "y"} onClick={() => setPeriod("y")}>
          Yearly <span className="discount">−20%</span>
        </button>
      </div>

      <section className="screenshot-cards screenshot-cards--two" style={{ padding: "0" }}>
        <article className="screenshot-card popular">
          <div className="sc-badge">Most Popular</div>
          <h2>Augastam Elite</h2>
          <div className="sc-price">
            <span className="amt">${getPrice(160)}</span>
            <span className="per">{period === "y" ? "/month, billed yearly" : "/month"}</span>
          </div>
          <p className="sc-desc">For growing clinics that need advanced EMR + AI.</p>
          <ul className="sc-features">
            <li><TickIcon /><span>Up to 5 facility onboarding</span></li>
            <li><TickIcon /><span>Advanced EMR configuration</span></li>
            <li><TickIcon /><span>Augastam AI — higher allowance</span></li>
            <li><TickIcon /><span>Priority support + named contact</span></li>
            <li><TickIcon /><span>Advanced analytics dashboard</span></li>
          </ul>
          <button className="sc-btn primary" type="button" onClick={() => handleGetStarted("Augastam Elite")}>
            Get Started
          </button>
        </article>

        <article className="screenshot-card">
          <h2>Augastam Enterprise</h2>
          <div className="sc-price">
            <span className="amt" style={{ fontSize: "2.5rem" }}>Contact Us</span>
          </div>
          <p className="sc-desc" style={{ marginTop: "8px" }}>
            For large networks with custom scope &amp; SLAs.
          </p>
          <ul className="sc-features">
            <li><TickIcon /><span>Unlimited facility onboarding</span></li>
            <li><TickIcon /><span>Custom integrations &amp; dashboards</span></li>
            <li><TickIcon /><span>Dedicated infrastructure options</span></li>
            <li><TickIcon /><span>Contracted SLA &amp; account support</span></li>
            <li><TickIcon /><span>Custom AI allocation / contract</span></li>
          </ul>
          <button className="sc-btn secondary" type="button" onClick={() => handleGetStarted("Augastam Enterprise")}>
            Get Started
          </button>
        </article>
      </section>

      <div className="divider"></div>

      <section className="compare-head" style={{ padding: "0" }}>
        <div>
          <h2>Compare plan features</h2>
          <p className="muted">
            Rows are grouped by module so clinics can scan the differences quickly.
          </p>
        </div>
        <div className="legend">
          <span className="legend-item"><i className="sw included" /> Included</span>
          <span className="legend-item"><i className="sw addon" /> Add-on</span>
          <span className="legend-item"><i className="sw usage" /> Usage-based</span>
          <span className="legend-item"><i className="sw custom" /> Custom</span>
        </div>
      </section>

      <section className={`compare-wrap ${revealed ? "in" : ""}`} id="comparison" style={{ display: "block", padding: "0" }}>
        <div className="sheet">
          <table>
            <thead>
              <tr>
                <th className="th-feature">Feature / Offering <InfoDot /></th>
                <th>Augastam Elite</th>
                <th>Augastam Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <SectionBlock key={section.group} section={section} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="pricing-note">
        <b>Pricing and scope note:</b> final package pricing, included seats, AI/message allowances, storage limits,
        implementation fees, vendor licensing, overage rates and support SLAs must be approved before public launch.
        Items marked custom or usage-based need transparent commercial rules.
      </p>

      <section className="cta-band">
        <div>
          <h3>Need a configured clinic solution?</h3>
          <p>
            Enterprise requirements can be assessed against clinic count, specialty mix, integrations, data migration,
            infrastructure and support needs.
          </p>
        </div>
        <a className="cta-btn" href="/contact">Contact Sales</a>
      </section>

      <ContactSection />

      <GetStartedModal
        open={modalOpen}
        plan={selectedPlan}
        period={period}
        onClose={closeModal}
      />
    </main>
  );
}