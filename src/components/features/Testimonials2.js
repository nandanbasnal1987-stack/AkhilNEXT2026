
"use client";

import React from "react";
//import "./testimonials.css";

const testimonialText =
  "Hear from doctors and healthcare professionals who trust Augastam Clinic to support their everyday clinical practice and patient care.";

const longText = `${testimonialText} ${testimonialText}`;

const avatarData = [
  { bg: "#f4c9b0", skin: "#d9a37a" },
  { bg: "#f5a3b5", skin: "#c98f68" },
  { bg: "#b9c9d6", skin: "#e0b48f" },
  { bg: "#cfd8c8", skin: "#b98259" },
  { bg: "#9fb8c9", skin: "#d6a07c" },
  { bg: "#c7b8a6", skin: "#c79470" },
];

const testimonialsLeft = [
  { avatar: 0, text: testimonialText },
  { avatar: 1, text: longText },
  { avatar: 2, text: testimonialText },
];

const testimonialsRight = [
  { avatar: 3, text: testimonialText },
  { avatar: 4, text: longText },
  { avatar: 5, text: testimonialText },
];

// Reusable SVG Avatar
const Avatar = ({ bg, skin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 74 74"
    className="testimonial-avatar"
    aria-hidden="true"
  >
    <rect width="74" height="74" fill={bg} />
    <path
      d="M8 74c2-18 14-26 29-26s27 8 29 26z"
      fill="#2c3a48"
    />
    <circle cx="37" cy="30" r="13" fill={skin} />
    <path
      d="M23 28c1-12 9-16 15-16s13 4 14 16c-4-6-8-8-14-8s-11 2-15 8z"
      fill="#1d2630"
    />
  </svg>
);

// Testimonial Card
const TestimonialCard = ({ avatar, text }) => {
  const person = avatarData[avatar];

  return (
    <article className="testimonial-card">
      <div className="testimonial-who">
        <Avatar bg={person.bg} skin={person.skin} />
        <b>Customer 123</b>
      </div>

      <p>{text}</p>
    </article>
  );
};

// Animated Column
const TestimonialColumn = ({ items, direction = "up" }) => {
  const repeatedItems = [...items, ...items];

  return (
    <div className={`testimonial-col ${direction}`}>
      <div className="testimonial-track">
        {repeatedItems.map((item, index) => (
          <TestimonialCard
            key={`${item.avatar}-${index}`}
            avatar={item.avatar}
            text={item.text}
          />
        ))}
        <div className="testimonial-pad" />
      </div>
    </div>
  );
};

const Testimonials2 = () => {
  return (
    <main className="testimonial-stage">

      {/* Vertical Grid Lines */}
      <span className="testimonial-vline" />
      <span className="testimonial-vline" />
      <span className="testimonial-vline" />

      {/* Left Content */}
      <section className="testimonial-left">

        <div className="testimonial-pill rise l1">
          TESTIMONIAL
        </div>

        <h1>
          <span className="testimonial-reveal">
            <span>Real Experiences.</span>
          </span>

          <span className="testimonial-reveal">
            <span>Trusted Care.</span>
          </span>
        </h1>

        <p className="testimonial-lead rise l3">
          Hear from doctors and healthcare professionals who trust
          Augastam Clinic to support their everyday clinical practice
          and patient care.
        </p>

        <div className="testimonial-foot rise l4">
          <span>Trusted Clinical Partners</span>
          <i>·</i>
          <span>Trusted Doctor Experiences</span>
        </div>

      </section>

      {/* Right Testimonials */}
      <section
        className="testimonial-right"
        aria-label="Customer testimonials"
      >
        <TestimonialColumn
          items={testimonialsLeft}
          direction="up"
        />

        <TestimonialColumn
          items={testimonialsRight}
          direction="down"
        />
      </section>

    </main>
  );
};

export default Testimonials2;
