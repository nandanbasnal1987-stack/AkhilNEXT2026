'use client';

import React, { useState, useRef, useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import CircleAnimation from "./CircleAnimation";

const BannerSlider = () => {
  // ✅ YouTube background: autoplay, muted (required), loop, no controls
  const youtubeId = "V5VL6Kmeji4";
  const youtubeTitle = "Akhil Systems pvt ltd Company Profile";

  // Parameters explained:
  // autoplay=1     → start automatically
  // mute=1         → REQUIRED for autoplay in all modern browsers
  // loop=1         → loop the video
  // playlist=<id>  → REQUIRED for loop to actually work on a single video
  // controls=0     → hide the control bar
  // modestbranding=1 → hide YouTube logo (deprecated but harmless)
  // rel=0           → don't show related videos from other channels
  // iv_load_policy=3 → hide video annotations/cards
  // disablekb=1    → disable keyboard controls
  // fs=0           → disable fullscreen button
  // playsinline=1  → play inline on iOS instead of native player
  const youtubeSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&showinfo=0`;

  const AugastamIcon = "https://res.cloudinary.com/akhilsystems/image/upload/v1781675826/Augastam_biam2l.svg";
  const HISIcon = "https://res.cloudinary.com/akhilsystems/image/upload/v1781675738/his-icon_elqygd.png";
  const MocIcon = "https://res.cloudinary.com/akhilsystems/image/upload/v1781675732/moc-icon_ybr1sh.png";
  const MobilityIcon = "https://res.cloudinary.com/akhilsystems/image/upload/v1781675876/mobile-icon_rcb49g.png";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const sliderRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const autoplaySpeed = 5000; // 5 seconds

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    pauseOnHover: false,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      resetProgress();
    },
    fade: true,
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    resetProgress();
  }, [currentSlide]);

  const startProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setProgress(0);

    const intervalTime = 100;
    const incrementPerInterval = (100 / (autoplaySpeed / intervalTime));

    progressIntervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(progressIntervalRef.current);
          return 100;
        }
        const newProgress = prevProgress + incrementPerInterval;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, intervalTime);
  };

  const resetProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    startProgress();
  };

  const banners = [
    {
      id: 1,
      title: 'Augastam EMR — ',
      title1: 'The Smart EMR for Complete Patient Care',
      title2: 'Empower your practice with smart templates, dynamic reports, and a unified patient journey — designed for precision, speed, and smarter care delivery.',
      subtitle: 'Powered by Data. Designed for Care.',
      button: "Book Free Demo",
      buttonUrl: "/contact",
      subtitle2: "600 customers in 24 states and 12 countries",
      CardIcon: AugastamIcon,
      subtitle4: 'Augastam EMR',
      subtitle5: 'Modern EMR built for scale: configurable web parts, template creation, powerful analytics, and..',
      link: "Know more",
      url: "/Augastam"
    },
    {
      id: 2,
      title: 'Augastam Clinical —',
      title1: 'Powering Precise, Point of Care Decisions',
      title2: 'Unify clinical workflows, generate intelligent reports, and capture the full patient journey with configurable templates, annotation tools, and clinician-friendly interfaces.',
      subtitle: "INTUITIVE. PRECISE. CLINICIAN-FOCUSED.",
      button: "Book Free Demo",
      buttonUrl: "/solutions",
      subtitle2: "600 customers in 24 states and 12 countries",
      CardIcon: AugastamIcon,
      subtitle4: 'Augastam Clinical',
      subtitle5: 'Centralize patient records, clinical decision support, and collaborative care tools',
      link: "Know more",
      url: "/Clinic"
    },
    {
      id: 3,
      title: 'Miracle on Cloud —',
      title1: 'India’s Fastest-Growing MIS Platform',
      title2: 'MOC is Akhil Systems\' next-generation Cloud based Hospital Management Software platform designed to elevate the patient care journey. it empowers clinicians to focus more on healing, and less on paperwork.',
      subtitle: 'Smarter Management. Better Care.',
      button: "Book Free Demo",
      buttonUrl: "/demo",
      subtitle2: "600 customers in 24 states and 12 countries",
      CardIcon: MocIcon,
      subtitle4: 'Miracle on Cloud',
      subtitle5: 'MOC Cloud Based EMR platform designed to simplify and enhance clinical workflows...',
      link: "Know more",
      url: "/Moc"
    },
    {
      id: 4,
      title: 'All in One —',
      title1: 'Run Better Care with Miracle',
      title2: 'Miracle Hospital Management Information Systems is an End-to-end management for mid size Hospitals to big hospitals — streamline workflows, boost revenue, and deliver safer, faster patient care.',
      subtitle: 'Secure. Swift. Cloud-Based',
      button: "Book Free Demo",
      buttonUrl: "/demo",
      subtitle2: "600 customers in 24 states and 12 countries",
      CardIcon: HISIcon,
      subtitle4: 'Miracle',
      subtitle5: 'Configurable modules for clinics to enterprise hospitals, regulatory-ready records, and analytics...',
      link: "Know more",
      url: "/MiracleHIS"
    },
    {
      id: 5,
      title: 'Revolutionize Care Delivery with —',
      title1: 'Mobility Solutions',
      title2: 'Stay connected beyond hospital walls with mobile apps for clinicians, nurses, and patients — enabling faster, smarter, and more personalized care.',
      subtitle: 'Care That Moves With You',
      button: "Book Free Demo",
      buttonUrl: "/demo",
      subtitle2: "600 customers in 24 states and 13 countries",
      CardIcon: MobilityIcon,
      subtitle4: 'Mobility Solutions',
      subtitle5: 'Empower doctors, nurses, and patients with real-time access to records, reports, and care workflows',
      link: "Know more",
      url: "/cxoapp"
    }
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "480px",
        overflow: "hidden",
      }}
    >
      {/* ✅ YouTube Video Background (fills banner, cropped with cover, controls hidden) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <iframe
          src={youtubeSrc}
          title={youtubeTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "56.25vw",
            minWidth: "177.77vh",
            minHeight: "100vh",
            transform: "translate(-50%, -50%)",
            border: 0,
            pointerEvents: "none", // prevents user clicking YouTube UI
          }}
        />

        {/* Dark overlay for readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
        />
      </div>

      {/* Content Slider */}
      <Slider
        ref={sliderRef}
        {...settings}
        style={{ position: 'relative', zIndex: 3 }}
      >
        {banners.map((banner) => (
          <div className="banner-slider box-m-banner-slider" key={banner.id}>
            <div
              style={{
                minHeight: "480px",
                padding: "60px",
                display: "flex",
                alignItems: "center",
                color: "#fff",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="col-md-6 bannerContent" style={{ position: "relative", zIndex: 4 }}>
                <p className="crawl-text">{banner.subtitle}</p>
                <h1 className="crawl-text">
                  {banner.title} <br /> {banner.title1}
                </h1>

                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#386197',
                    margin: '0 0 20px',
                    overflow: 'hidden'
                  }}
                  className="crawl-text"
                >
                  <div
                    style={{
                      width: `${progress}%`,
                      height: '100%',
                      backgroundColor: '#ffffff',
                      transition: 'width 0.1s linear',
                      borderRadius: '0px'
                    }}
                  />
                </div>

                <h2 className="crawl-text">{banner.title2}</h2>
                <Link href={banner.buttonUrl} style={{ display: "inline-block", textDecoration: "none" }}>
                  <button className="demo-btn mt-4 crawl-text">
                    {banner.button}
                    <span className="demo-arrow"></span>
                  </button>
                </Link>
                <p className="customer crawl-text">{banner.subtitle2}</p>
                <div className="btm-circle2">
                  <CircleAnimation />
                </div>
              </div>

              <div className="col-md-6 ProdContent prod-content-animation" style={{ zIndex: 4 }}>
                <h4 className="prod-item">
                  <span>
                    <img src={banner.CardIcon} alt="icon" />
                  </span>{" "}
                  {banner.subtitle4}
                </h4>
                <p className="prod-item">{banner.subtitle5}</p>
                <Link href={banner.url} className="prod-item">{banner.link}</Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Inline CSS for animations */}
      <style>{`
        @keyframes crawlIn {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes prodContentSlide {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .crawl-text {
          animation: crawlIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .prod-content-animation {
          animation: prodContentSlide 1s ease-out 0.5s forwards;
          opacity: 0;
        }

        .prod-content-animation .prod-item:nth-child(1) {
          animation: crawlIn 0.8s ease-out 0.7s forwards;
          opacity: 0;
        }

        .prod-content-animation .prod-item:nth-child(2) {
          animation: crawlIn 0.8s ease-out 0.9s forwards;
          opacity: 0;
        }

        .prod-content-animation .prod-item:nth-child(3) {
          animation: crawlIn 0.8s ease-out 1.1s forwards;
          opacity: 0;
        }

        .bannerContent p.crawl-text { animation-delay: 0.1s; }
        .bannerContent h1.crawl-text { animation-delay: 0.2s; }
        .bannerContent .crawl-text:nth-child(3) { animation-delay: 0.3s; }
        .bannerContent h2.crawl-text { animation-delay: 0.4s; }
        .bannerContent .demo-btn.crawl-text { animation-delay: 0.5s; }
        .bannerContent .customer.crawl-text { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default BannerSlider;