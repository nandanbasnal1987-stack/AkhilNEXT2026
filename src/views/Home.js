'use client';

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
  lazy,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "../styles/global.css";

import ScrollProgress from "../components/features/ScrollProgress";

const prodVideo = "/videos/AugastamVideo.webm";
const prodVideoMp4 = "/videos/AugastamVideo.mp4";

const activeIcon = "/images/active_icon.webp";
const Hospital_Insi = "/images/CXOApp.webp";
const Patient = "/images/PatientApp.webp";
const Phlebo = "/images/PhleboAppLogin.webp";

const Aug_icon = "/images/moc-icon.webp";
const his_icon = "/images/his_icon.webp";
const cloud_icon = "/images/cloud_icon.webp";

// All four product logos pointed to the same file in the original code,
// so collapse the ternary into one import.
const prodLogo = "/images/prodHoverIcon.webp";

import CultureSection from "../components/features/CultureSection";
import ValuesSection from "../components/features/ValuesSection";
import PatientJourneySection from "../components/features/PatientJourneySection";

const BannerSlider = lazy(() => import("../components/features/BannerSlider"));
const TestimonialsSection = lazy(() =>
  import("../components/features/TestimonialsSection")
);
const ContactSection = lazy(() => import("../components/features/ContactSection"));
const Counter = lazy(() => import("../components/features/Counter"));
const Slickslide = lazy(() => import("../components/features/Slickslide"));
const AugastamSlider = lazy(() => import("../components/features/AugastamSlider"));

/* ─── useInView: render a section only when it enters viewport ──────────── */
function useInView(rootMargin = "200px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView || !ref.current) return;
    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}

/* ─── LazySection: reserves height to prevent CLS, mounts on scroll ─────── */
const LazySection = ({ children, minHeight = 400, rootMargin }) => {
  const [ref, inView] = useInView(rootMargin);
  return (
    <div ref={ref} style={{ minHeight: inView ? "auto" : minHeight }}>
      {inView ? children : null}
    </div>
  );
};

/* ─── ProductVideo: outside Home so identity is stable across renders ─── */
const ProductVideo = React.memo(function ProductVideo() {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Load the video sources only once the element is near the viewport.
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlayPause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  }, []);

  return (
    <div ref={wrapperRef}>
      <video
        ref={videoRef}
        className="fullImage"
        muted
        loop
        playsInline
        preload="none"
        width="100%"
        onClick={togglePlayPause}
        style={{ cursor: "pointer" }}
      >
        {ready && (
          <>
            <source src={prodVideoMp4} type="video/mp4" />
            <source src={prodVideo} type="video/webm" />
          </>
        )}
      </video>
    </div>
  );
});

/* ─── Static data tables (avoid 4x JSX duplication) ─────────────────────── */
const SERVICES = [
  {
    id: "div1",
    boxClass: "box-pic",
    title: "Augastam",
    subtitle: "An intelligent EMR platform built to simplify care",
    back:
      "Augastam EMR boosts clinical precision with smart templates, visual diagnostics, and intelligent workflows — enabling care teams to act on patient data at every critical moment.",
    link: "/Augastam",
    headIcon: Aug_icon,
  },
  {
    id: "div2",
    boxClass: "box-ags-cli",
    title: "Augastam Clinic",
    subtitle:
      "Manage appointments, patient records, and daily clinic workflows effortlessly",
    back:
      "Augastam Clinic is a web-based platform that unifies patient records, labs, prescriptions, and procedures into one intelligent workflow.",
    link: "/Augastam",
    headIcon: Aug_icon,
  },
  {
    id: "div3",
    boxClass: "box-his",
    title: "Miracle HMIS",
    subtitle: "Digitize and connect hospital departments seamlessly.",
    back:
      "Miracle is a web-based platform that streamlines clinical, administrative, and financial operations.",
    link: "/MiracleHIS",
    headIcon: his_icon,
  },
  {
    id: "div4",
    boxClass: "box-moc-pic",
    title: "Miracle on Cloud",
    subtitle: "A secure cloud platform that connects hospitals, data, and care teams",
    back:
      "MOC streamlines clinical workflows, enables real-time admin insights, and delivers faster, connected patient care. Secure, smart, and always accessible.",
    link: "/Moc",
    headIcon: cloud_icon,
  },
];

const CARE_APPS = [
  {
    label: "Hospital Insight App",
    text:
      "A real-time command center for hospital leadership — track revenue leakages, monitor daily admissions, discharges, and billing trends, and compare inter-facility performance with data-driven dashboards.",
    image: Hospital_Insi,
    route: "/cxoapp",
  },
  {
    label: "Patient App",
    text:
      "Designed for digital-first patients — book appointments, track results, access e-prescriptions, and consult with doctors virtually, all from one place.",
    image: Patient,
    route: "/Patientapp",
  },
  {
    label: "Phlebo App",
    text:
      "Built for field phlebotomists — navigate to patient homes, collect and barcode samples, and update collection statuses in real-time for zero mismatch and faster lab processing.",
    image: Phlebo,
    route: "/Phlebotomyapp",
  },
];

/* ─── Home ──────────────────────────────────────────────────────────────── */
export default function Home() {
  const [activeDiv, setActiveDiv] = useState("div1");
  const router = useRouter();
  const navigate = (to) => router.push(to);


  return (
    <>

      <Suspense fallback={<div className="loading" style={{ minHeight: 600 }} />}>
        <BannerSlider />
      </Suspense>

      <LazySection minHeight={300}>
        <section className="box-Decades">
          <Suspense fallback={<div style={{ minHeight: 200 }} />}>
            <Counter />
          </Suspense>
        </section>
      </LazySection>

      <LazySection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} />}>
          <AugastamSlider />
        </Suspense>
      </LazySection>

      <LazySection minHeight={400}>
        <Suspense fallback={<div style={{ minHeight: 400 }} />}>
          <Slickslide />
        </Suspense>
      </LazySection>

      <LazySection minHeight={700}>
        <section className="box-solutionpower plr-60">
          <div className="container-fluid box-wrapper">
            <div className="row">
              <div className="col-md-12 box-solutionpower-heading">
                <h2>Solutions For Healthcare Businesses of All Size</h2>
                <p>
                  <span>
                    Akhil&apos;s intelligent suite — built for modern hospitals, agile
                    clinics, and connected care networks — turns scattered data
                    into smart insights, empowering faster decisions and
                    elevating patient care from admission to discharge.
                  </span>
                  <button className="btn-solu">See All</button>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7">
                <div className="services-box">
                  {SERVICES.map((s) => (
                    <div
                      key={s.id}
                      className="service"
                      onClick={() => setActiveDiv(s.id)}
                      style={{ cursor: "pointer", color: "white" }}
                    >
                      <div className="flip-box">
                        <div className="flip-box-inner">
                          <div className={`flip-box-front ${s.boxClass}`}>
                            <div className="flip-box-details">
                              <h4>{s.title}</h4>
                              <p>{s.subtitle}</p>
                            </div>
                            <h2 className="hidden">
                              <img
                                src={s.headIcon}
                                loading="lazy"
                                decoding="async"
                                width={40}
                                height={40}
                                alt=""
                              />
                              {s.title}
                            </h2>
                          </div>

                          <div className="flip-box-back">
                            <h4>
                              <img
                                src={prodLogo}
                                loading="lazy"
                                decoding="async"
                                width={40}
                                height={40}
                                alt=""
                              />
                              {s.title}
                            </h4>
                            <p>{s.back}</p>
                            <Link href={s.link} className="knowmore">
                              Know More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-5">
                {activeDiv === "div1" && (
                  <div className="prodFull" style={{ padding: 0 }}>
                    <ProductVideo />
                    <div className="prodDescription">
                      <div className="row">
                        <div className="col-md-12">
                          <h4>
                            <img
                              src={prodLogo}
                              loading="lazy"
                              decoding="async"
                              height={40}
                              width={40}
                              alt=""
                            />
                            Augastam
                          </h4>
                          <p>
                            When technology truly understands care, healthcare
                            becomes smarter, faster, and more connected.
                            Augastam brings intelligent design and AI-driven
                            capabilities to modern clinical environments.
                          </p>
                        </div>
                        <div className="col-md-3 text-end">
                          <Link href="/Augastam" className="knowmore">
                            Know More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection minHeight={600}>
        <section>
          <div className="container-fluid box-wrapper">
            <div className="row">
              <div className="col-md-12">
                <div className="box-carehands">
                  <h2 className="text-center">
                    Care in Your Hands — Always Within Reach
                  </h2>
                  <p>
                    From doctors on the move to patients at home, our
                    mobile-first solutions empower you to connect, consult,
                    and care anytime, anywhere.
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="bg-box-carehands plr-60 m-t">
                {CARE_APPS.map((app) => (
                  <div
  key={app.label}
  className="box-carehands-slider"
  onClick={() => navigate(app.route)}
  style={{ cursor: "pointer" }}
>
                    <h2>
                      <span>
                        <img
                          src={activeIcon}
                          loading="lazy"
                          decoding="async"
                          alt=""
                          width={60}
                          height={60}
                        />
                      </span>
                      <label>{app.label}</label>
                    </h2>
                    <p>
                      <span>{app.text}</span>
                      <img
                        src={app.image}
                        loading="lazy"
                        decoding="async"
                        alt={app.label}
                      />
                    </p>
                    <button
                      type="button"
                      className="btn-carehands aa"
                      onClick={() => navigate(app.route)}
                    >
                      Know more
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      <LazySection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} />}>
          <TestimonialsSection />
        </Suspense>
      </LazySection>

      <LazySection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} />}>
          <ValuesSection />
        </Suspense>
      </LazySection>

      <LazySection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} />}>
          <PatientJourneySection />
        </Suspense>
      </LazySection>

      <LazySection minHeight={500}>
        <Suspense fallback={<div style={{ minHeight: 500 }} />}>
          <CultureSection />
        </Suspense>
      </LazySection>

      <LazySection minHeight={400}>
        <Suspense fallback={<div style={{ minHeight: 400 }} />}>
          <ContactSection />
        </Suspense>
      </LazySection>

      <ScrollProgress />
    </>
  );
}