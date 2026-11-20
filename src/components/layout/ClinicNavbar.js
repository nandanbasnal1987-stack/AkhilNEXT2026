"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import ClinicMobileMenu from "@/components/layout/ClinicMobileMenu";
import { LoginLink } from "@/onboarding/SignInLinks";
import { useScrolled } from "@/hooks/useScrolled";
import "@/styles/navbar.css";

const logo = "/images/akhil-logo.png";

// Demo video (embed URL — note the /embed/ path, not /watch)
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/oRlrnhMdznU";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,}$/;

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  clinic: "",
  message: "",
};

const NAV_ITEMS = [
  { label: "About Us", href: "#section-2", id: "section-2" },
  { label: "Why Augastam Clinics", href: "#section-3a", id: "section-3a" },
  { label: "Features", href: "#section-5", id: "section-5" },
  { label: "AI", href: "#section-9", id: "section-9" },
];

export default function ClinicNavbar() {
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false); // NEW: video modal
  const scrolled = useScrolled(10);

  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  const [form, setForm] = useState({ ...emptyForm });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null); // null | 'success' | 'error'

  const formRef = useRef(null);

  /* Navigation scroll handler */
  const handleScroll = (e, id) => {
    const el = document.getElementById(id);

    if (!el) {
      e.preventDefault();
      const targetUrl = `/AugastamClinic#${id}`;
      if (pathname !== "/AugastamClinic") {
        window.location.href = targetUrl;
      } else {
        window.location.hash = id;
      }
      setOpen(false);
      return;
    }

    e.preventDefault();
    const headerOffset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    window.scrollTo({ top, behavior });
    window.history.pushState(null, "", `#${id}`);
    setOpen(false);
    setActiveLink(id);
  };

  /* Keep active navigation in sync */
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && NAV_ITEMS.some((item) => item.id === hash)) {
        setActiveLink(hash);
      } else {
        setActiveLink("");
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pathname]);

  /* Demo modal helpers */
  const openDemo = () => {
    setForm({ ...emptyForm });
    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
    setStatus(null);
    setDemoOpen(true);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    setSubmitting(false);
  };

  /* Video modal helpers */
  const openVideo = () => {
    setVideoOpen(true);
    setOpen(false); // close mobile menu if open
  };

  const closeVideo = () => setVideoOpen(false);

  /* Escape key and body scroll lock (shared by both modals) */
  useEffect(() => {
    if (!demoOpen && !videoOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDemoOpen(false);
        setVideoOpen(false);
        setSubmitting(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [demoOpen, videoOpen]);

  /* Form validation */
  const validate = (values) => {
    const validationErrors = {};
    if (!values.name.trim()) {
      validationErrors.name = "Please enter your full name.";
    } else if (values.name.trim().length < 2) {
      validationErrors.name = "Name must be at least 2 characters.";
    }
    if (!values.email.trim()) {
      validationErrors.email = "Please enter your work email.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!values.phone.trim()) {
      validationErrors.phone = "Please enter your phone number.";
    } else if (!PHONE_RE.test(values.phone.trim())) {
      validationErrors.phone = "Please enter a valid phone number.";
    }
    if (!values.clinic.trim()) {
      validationErrors.clinic = "Please enter your clinic or organization.";
    }
    if (values.message.trim().length > 500) {
      validationErrors.message = "Message must be 500 characters or fewer.";
    }
    return validationErrors;
  };

  /* Form field change */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      return { ...prev, [name]: undefined };
    });
  };

  /* Form field blur */
  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  };

  /* Form submit — EmailJS */
  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      const element = formRef.current?.querySelector(`[name="${firstKey}"]`);
      element?.focus();
      return;
    }

    setSubmitting(true);
    setStatus(null);

    emailjs
      .sendForm(
        "service_rjdaw98",
        "template_t5lcfaj",
        formRef.current,
        "1jS0s7rCMLTiVJWK3"
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setStatus("success");
        setSubmitted(true);
        setForm({ ...emptyForm });
      })
      .catch((error) => {
        console.error("Error sending email:", error.text);
        setStatus("error");
      })
      .finally(() => {
        setSubmitting(false);
        if (status !== "success") {
          setTimeout(() => setStatus(null), 5000);
        }
      });
  };

  return (
    <>
      <header
        className={`nav${open ? " open" : ""}${scrolled ? " sh" : ""}`}
        id="sec1-nav"
      >
        <div
          className="logo-group"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <Link className="logo akhil-logo" href="/" title="Go to Home">
            <img className="akhil-logo" src={logo} height="45" alt="Responsive image" />
          </Link>
        </div>

        <ul className="menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={activeLink === item.id ? "active" : ""}
                onClick={(e) => handleScroll(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/AugastamClinic/pricing"
              className={pathname === "/AugastamClinic/pricing" ? "active" : ""}
            >
              Pricing
            </Link>
          </li>
          <li>
            <a href="#" data-onboard-status data-onboard-source="clinic-header">
              Track application
            </a>
          </li>
        </ul>

        <div className="cta">
          <LoginLink className="login" source="clinic-header">
            Login
          </LoginLink>
         
<button type="button" className="demo" onClick={openVideo}>
  <span className="play-icon">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  </span>
  <span>Watch Demo</span>
</button>

        </div>

        <ClinicMobileMenu
          open={open}
          onToggle={() => setOpen((previous) => !previous)}
        />
      </header>

      {/* ---------------- Video Modal ---------------- */}
      {videoOpen && (
        <div
          className="demo-modal-overlay"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
          aria-label="Augastam Clinic demo video"
        >
          <div
            className="demo-modal"
            style={{ maxWidth: "960px", width: "92%", padding: "16px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="demo-modal-close"
              aria-label="Close"
              onClick={closeVideo}
            >
              ×
            </button>
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                borderRadius: "12px",
                overflow: "hidden",
                background: "#000",
              }}
            >
              <iframe
                src={`${DEMO_VIDEO_URL}?autoplay=1&rel=0`}
                title="Augastam Clinic demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- Book a Demo Modal ---------------- */}
      {demoOpen && (
        <div
          className="demo-modal-overlay"
          onClick={closeDemo}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <div className="demo-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="demo-modal-close"
              aria-label="Close"
              onClick={closeDemo}
            >
              ×
            </button>

            {submitted ? (
              <div className="demo-modal-success">
                <h2 id="demo-modal-title">Thank you!</h2>
                <p>We&apos;ve received your request and will be in touch shortly.</p>
                <button type="button" className="demo" onClick={closeDemo}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 id="demo-modal-title">Book a demo</h2>
                <p>Tell us a bit about your practice and we&apos;ll be in touch.</p>

                {status === "error" && (
                  <div className="alert alert-danger">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <form
                  ref={formRef}
                  className="demo-modal-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="demo-modal-grid">
                    <div className="demo-field">
                      <label htmlFor="demo-name">Full name</label>
                      <input
                        id="demo-name"
                        name="name"
                        type="text"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "err-name" : undefined}
                      />
                      {errors.name && (
                        <span className="demo-error" id="err-name">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="demo-field">
                      <label htmlFor="demo-email">Work email</label>
                      <input
                        id="demo-email"
                        name="email"
                        type="email"
                        placeholder="jane@clinic.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "err-email" : undefined}
                      />
                      {errors.email && (
                        <span className="demo-error" id="err-email">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="demo-modal-grid">
                    <div className="demo-field">
                      <label htmlFor="demo-phone">Phone</label>
                      <input
                        id="demo-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "err-phone" : undefined}
                      />
                      {errors.phone && (
                        <span className="demo-error" id="err-phone">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="demo-field">
                      <label htmlFor="demo-clinic">Clinic / Organization</label>
                      <input
                        id="demo-clinic"
                        name="clinic"
                        type="text"
                        placeholder="Sunrise Clinic"
                        value={form.clinic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.clinic}
                        aria-describedby={errors.clinic ? "err-clinic" : undefined}
                      />
                      {errors.clinic && (
                        <span className="demo-error" id="err-clinic">
                          {errors.clinic}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="demo-field">
                    <label htmlFor="demo-message">
                      Anything we should know? (optional)
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your needs…"
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "err-message" : undefined}
                    />
                    {errors.message && (
                      <span className="demo-error" id="err-message">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className="demo" disabled={submitting}>
                    {submitting ? "Sending…" : "Send request"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}