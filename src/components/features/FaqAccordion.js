'use client';

import React from "react";

const faqData = [
  {
    question: "What is Augastam?",
    answer:
      "Augastam by Akhil Systems is a next-gen AI powered hospital management solution...",
  },
  {
    question: "What all specialties Augastam Supports?",
    answer:
      "Augastam supports various medical specialties such as cardiology, neurology, orthopedics, and more.",
  },
  {
    question: "Is it Available for Small Clinics?",
    answer:
      "Yes, Augastam is designed to scale from small clinics to large hospitals seamlessly.",
  },
  {
    question: "Difference in Augastam and MOC?",
    answer:
      "Augastam is an AI-powered HMS, while MOC focuses on digital operations and mobile-first workflows.",
  },
  {
    question: "What are the technical requirements for deployment?",
    answer:
      "Augastam can be deployed on cloud or on-premise depending on infrastructure and compliance needs.",
  },
  {
    question: "What all specialties Augastam Supports ?",
    answer:
      "Augastam can be deployed on cloud or on-premise depending on infrastructure and compliance needs.",
  },
];

const FaqAccordion = () => {
  return (
    <section className='hidden'>
      <div className="box-Ques">
          <div className="box-carehands">
            <h2 className="text-left pt-0" data-aos="fade-up">
              Govt Questions?
              <br /> We’ve Got You Covered
            </h2>
          </div>
          <div className="accordion-container" data-aos="fade-up">
            <div className="accordion" id="accordionExample">
              {faqData.map((item, index) => {
                const headingId = `heading${index}`;
                const collapseId = `collapse${index}`;
                return (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={headingId}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded="false"
                        aria-controls={collapseId}
                      >
                        {item.question}
                      </button>
                    </h2>
                    <div
                      id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId}
                      data-bs-parent="#accordionExample">
                      <div className="accordion-body">{item.answer}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    </section>
  );
};

export default FaqAccordion;
