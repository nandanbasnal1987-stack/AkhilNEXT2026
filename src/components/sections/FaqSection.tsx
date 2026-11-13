"use client";

import { useRef } from "react";
import FaqItem from "@/components/ui/FaqItem";
import { useFaq } from "@/hooks/useFaq";
import "@/styles/faq.css";
const faqs = [
  {
    question: "What is Augastam Clinic?",
    answer: "Augastam Clinic is a digital healthcare management platform developed by Akhil Systems Pvt. Ltd. It is designed to help clinics, doctors, and healthcare professionals manage their daily clinical operations through a modern, integrated digital system.",
  },
  {
    question: "Is Augastam Clinic ABDM compliant?",
    answer: "Akhil Systems has publicly stated that its healthcare solutions support ABDM integration and that the company has achieved ABDM M1, M2 and M3 certifications. However, I could not independently verify that the specific product Augastam Clinic has completed all ABDM certification requirements.",
  },
  {
    question: "Why are doctors opting for Augastam Clinic software, for patient and clinic management?",
    answer: "Doctors are opting for Augastam Clinic because it helps simplify everyday clinical work, reduce administrative effort, organise patient information and make clinic operations more efficient.",
  },
  {
    question: "Does Augastam Clinic follow NABH digital standards?",
    answer: "Augastam Clinic can be positioned around NABH Digital Health Standards, but I cannot confirm that Augastam Clinic itself has received NABH CMS certification.",
  },
  {
    question: "Which medical coding standards does it support?",
    answer: "For Augastam Clinic by Akhil Systems, medical coding standards are important for accurate clinical documentation, consistent diagnosis recording, laboratory reporting and healthcare interoperability.",
  },
  {
    question: "Does the AI replace the doctor?",
    answer: "In Augastam Clinic, AI should be positioned as a clinical assistant that supports doctors, not as a replacement for their medical expertise, judgement or decision-making.",
  },
];

export default function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  useFaq(ref);

  return (
    <div className="merged-section" id="section-13" ref={ref}>
      <section className="faq" aria-labelledby="sec13-t">
        <div className="intro">
          <h2 id="sec13-t">
            Frequently Asked Questions
          </h2>
          <p>
            Find Answers to Your Most Common Questions Here
          </p>
        </div>
        <div className="list" id="sec13-list">
          {faqs.map((f, i) => (
  <FaqItem key={i} n={i + 1} question={f.question} answer={f.answer} />
))}
        </div>
      </section>
    </div>
  );
}
