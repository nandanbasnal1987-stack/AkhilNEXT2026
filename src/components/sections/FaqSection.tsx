"use client";

import { useRef } from "react";
import FaqItem from "@/components/ui/FaqItem";
import { useFaq } from "@/hooks/useFaq";
import "@/styles/faq.css";
const faqs = [
  {
    question: "What is Augastam Clinic?",
    answer: "Augastam Clinic is an AI-powered EMR and clinic management software from Akhil Systems Pvt. Ltd. It covers records, appointments, billing, patient app, WhatsApp, SMS and email for single-doctor clinics and polyclinics.",
  },
  {
    question: "Who is Augastam Clinic for?",
    answer: "It is built for single-doctor clinics, multi-doctor polyclinics and specialty clinics in India and abroad. Clinics can start small and scale to multiple doctors or locations on the same platform.",
  },
  {
    question: "Is Augastam Clinic ABDM compliant?",
    answer: "Yes, Augastam Clinic is built to ABDM requirements [confirm: milestones certified (M1, M2, M3) and certificate date]. It supports ABDM-aligned workflows so clinics can take part in India’s digital health ecosystem.",
  },
  {
    question: "Does Augastam Clinic follow NABH digital standards?",
    answer: "Augastam Clinic is designed to meet NABH Platinum-level digital standards [confirm official wording and evidence]. This helps clinics prepare for accreditation with documented, standards-based digital records.",
  },
  {
    question: "Which languages does Augastam Clinic support?",
    answer: "Augastam Clinic supports 80+ Indian and international languages through AI, including Hindi, English and Arabic [confirm scope for voice, screens, printouts and patient messages].",
  },
  {
    question: "Which medical coding standards does it support?",
    answer: "It supports SNOMED CT, ICD-11, CPT and LOINC, with HL7 FHIR interoperability. Diagnosis and lab codes can be mapped automatically to keep records consistent and claim-ready.",
  },{
    question: "Does the AI replace the doctor?",
    answer: "No. The AI drafts notes, summaries and care plans from the consultation, and the doctor reviews, edits and signs every record. The clinician always makes the clinical decision.",
  },
];

export default function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  useFaq(ref);

  return (
    <div className="merged-section pt-5 pb-5" id="section-13" ref={ref}>
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
