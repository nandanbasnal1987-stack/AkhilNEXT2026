'use client';

import React, { useState } from "react";

function FaqCustom({ title, faqs }) {
  // 👇 First item open by default
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container-fluid box-wrapper p-0">
      
      {title && (
        <div className="row">
          <div className="col-md-12 faqHead">
            <h4 className="pb-2 pt-4 text-center">{title}</h4>
          </div>
        </div>
      )}

      <div className="faq-container">
        {faqs.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={index} className={`faq-item ${isActive ? "active" : ""}`}>
              
              {/* Question */}
              <div
                className={`faq-question ${isActive ? "active" : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </div>

              {/* Answer */}
              {isActive && (
                <div className="faq-answer">
                  {typeof item.answer === "string" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  )}

                  {typeof item.answer === "object" && (
                    <>
                      {item.answer.text && (
                        <div
                          dangerouslySetInnerHTML={{ __html: item.answer.text }}
                        />
                      )}
                      
                      {item.answer.list && (
                        <ul>
                          {item.answer.list.map((li, i) => (
                            <li key={i}>{li}</li>
                          ))}
                        </ul>
                      )}

                      {item.answer.text2 && (
                        <div
                          dangerouslySetInnerHTML={{ __html: item.answer.text2 }}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqCustom;