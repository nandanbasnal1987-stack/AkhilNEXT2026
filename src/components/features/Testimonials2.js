"use client";

import React from "react";
import Image from "next/image";
//import "./testimonials.css";

const avatarData = [
  { bg: "#f4c9b0", skin: "#d9a37a" },
  { bg: "#f5a3b5", skin: "#c98f68" },
  { bg: "#b9c9d6", skin: "#e0b48f" },
  { bg: "#cfd8c8", skin: "#b98259" },
  { bg: "#9fb8c9", skin: "#d6a07c" },
  { bg: "#c7b8a6", skin: "#c79470" },
  { bg: "#c7b8a6", skin: "#c79470" },
];

const testimonialsLeft = [
  {
    avatar: 0,
    image: "/images/Testimonials/client-1.jpg",
    name: "Mr. Bibhas Sen Choudhuri",
    role: "DGM IT",
    text: "Managing a hospital network with facilities spread across cities was always a challenge—especially when it came to standardizing care, harmonizing SOPs, and managing data centrally. That changed when we onboarded Miracle from Akhil Systems.",
  },
  {
    avatar: 1,
    name: "Mr. Sudhir Talwar",
    role: "CEO",
    text: "Since adopting Miracle, we've achieved full digital transformation- billing leakages have been virtually eliminated thanks to automated charge capture and real-time dashboards. The system's analytics and reporting capabilities have empowered our finance and operations teams.",
  },
  {
    avatar: 2,
    image: "/images/Testimonials/client-2.jpg",
    name: "Yashoda Hospital",
    role: "Director",
    text: "Our 15-year partnership with Akhil Systems has exceeded expectations, with their HMIS helping elevate our hospitals to the next level.",
  },
];

const testimonialsRight = [
  {
    avatar: 3,
    image: "/images/Testimonials/client-3.jpg",
    name: "Sehgal Neo Hospital",
    role: "Head-IT",
    text: "We are a mid-sized, multi-specialty hospital located in New Delhi, and we have been utilizing Akhil Systems HIS for nearly two decades. It stands out as a leading software in the industry, encompassing a wide range of modules suitable for both large hospitals and small nursing homes. Akhil Systems consistently adapts and evolves to meet the ever-changing needs of the healthcare sector. We extend our best wishes to them for all their future endeavors.",
  },
  {
    avatar: 4,
    image: "/images/Testimonials/client-4.jpg",
    name: "Brahmanandam Hospital",
    role: "",
    text: "We sincerely appreciate the hard work, dedicated efforts and commitment in successfully implementing and running the online HMIS Miracle software in our hospital. Your professionalism and prompt response to every challenge have been highly commendable.",
  },
  {
    avatar: 5,
    image: "/images/Testimonials/client-5.png",
    name: "Mrs. Pranti",
    role: "Optometrist, Eye 7 Hospital",
    text: "Augastam EMR has been a smooth, AI-enabled solution tailored for ophthalmology, meeting all our needs. It securely stores patient data, improving efficiency, reliability, and how we deliver eye care.",
  },
  {
    avatar: 6,
    name: "Dr. Pratik",
    role: "Director",
    text: "I've used Akhil Systems' Miracle On Cloud for a year—it's stable, reliable, and covers everything from patient records to billing, lab, and pharmacy. Great support, no major issues. Highly recommended for mid-size healthcare organizations.",
  },
];

// Reusable SVG Avatar (fallback when no image)
const Avatar = ({ bg, skin }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 74 74"
    className="testimonial-avatar"
    aria-hidden="true"
  >
    <rect width="74" height="74" fill={bg} />
    <path d="M8 74c2-18 14-26 29-26s27 8 29 26z" fill="#2c3a48" />
    <circle cx="37" cy="30" r="13" fill={skin} />
    <path
      d="M23 28c1-12 9-16 15-16s13 4 14 16c-4-6-8-8-14-8s-11 2-15 8z"
      fill="#1d2630"
    />
  </svg>
);

// Testimonial Card
const TestimonialCard = ({ avatar, image, name, role, text }) => {
  const person = avatarData[avatar];

  return (
    <article className="testimonial-card">
      <div className="testimonial-who">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="testimonial-avatar-img"
          />
        ) : (
          <Avatar bg={person.bg} skin={person.skin} />
        )}
        <div className="testimonial-user">
          <b>{name}</b>
          <small>{role}</small>
        </div>
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
            key={`${item.name}-${index}`}
            avatar={item.avatar}
            image={item.image}
            name={item.name}
            role={item.role}
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
        <div className="testimonial-pill rise l1">TESTIMONIAL</div>

        <h1>
          <span className="testimonial-reveal">
            <span>Real Experiences.</span>
          </span>

          <span className="testimonial-reveal">
            <span>Trusted Care.</span>
          </span>
        </h1>

        <p className="testimonial-lead rise l3">
          Hear from doctors and healthcare professionals who trust Augastam
          Clinic to support their everyday clinical practice and patient care.
        </p>

        <div className="testimonial-foot rise l4">
          <span>Trusted Clinical Partners</span>
          <i>·</i>
          <span>Trusted Doctor Experiences</span>
        </div>
      </section>

      {/* Right Testimonials */}
      <section className="testimonial-right" aria-label="Customer testimonials">
        <TestimonialColumn items={testimonialsLeft} direction="up" />
        <TestimonialColumn items={testimonialsRight} direction="down" />
      </section>
    </main>
  );
};

export default Testimonials2;