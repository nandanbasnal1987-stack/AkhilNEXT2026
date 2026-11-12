'use client';

//import { type } from "@testing-library/user-event/dist/type";
import React from "react";

const faqData = [
  {
    question: "Information Collection and Use",
    answer:
      "As our website does not collect any personal information, the only data collected is essential usage data and anonymous analytics data to help us understand how our website is being used and to make improvements. None of your personal information is collected or stored in any way.",
  },
  {
    question: "Cookies",
    answer:
      "We use cookies on our website to provide you with the best browsing experience. Cookies are small data files stored on your browser by our website. Only essential cookies are used, which are necessary for the basic functioning of the website. We also use analytics cookies, which help us to understand how users interact with our website, allowing us to make improvements. You have the option to choose the type of cookies you want to be stored on your device. You can manage your cookie preferences by accessing the cookie settings in your browser or by visiting our website’s cookie settings page. Please note that by disabling certain cookies, some features of our website may not function properly.",
  },
  {
    question: "Third-Party Analytics",
    answer:
      "We use third-party analytics providers to help us understand how our website is being used and to make improvements. These third-party providers may collect anonymous usage data, but they do not collect any personally identifiable information.",
  },
  {
    question: "Data Security",
    answer:
      "The protection of your information is important to us. Although we do not collect any personally identifiable information through our website, we still take security measures to protect our user data. We use secure servers and implement technical and organizational measures, in compliance with GDPR, to ensure the security and confidentiality of our visitors’ data. Please bear in mind that the transmission of information via the internet is never completely secure, and while we strive to protect your data, we cannot guarantee its absolute security. GDPR Compliance We are committed to complying with the General Data Protection Regulation (GDPR) in our data processing practices. Although we do not collect any personally identifiable information through our website, we still adhere to the principles of data protection, such as processing data in a transparent manner, ensuring its accuracy, and keeping it secure.",
  },
];

const faqData2 = [
  {
    question: "Intellectual Property Rights",
    answer:
      "All content on this website, including but not limited to text, graphics, images, logos, and other material, is the exclusive property of Akhil Systems Pvt Ltd or its licensors and is protected under applicable copyright, trademark, and other intellectual property laws. Unauthorized use, reproduction, distribution, or modification of any content, in whole or in part, is strictly prohibited without our express written permission.",
  },
  {
  question: "Website Use and Restrictions",
  answer: `
    <b>You are free to use our website for any lawful purpose. However, you are prohibited from:</b>
    <ol type='a'>
      <li>Engaging in any activity that interferes with the proper working of our website or servers.</li>
      <li>Attempting to gain unauthorized access to our systems, data, or user information.</li>
      <li>Uploading or transmitting malicious code, viruses, or harmful software.</li>
      <li>Using our website for fraudulent or unlawful purposes.</li>
    </ol>
  `,
},
  
  {
    question: "External Links",
    answer:
      "Our website may contain links to external websites not owned or controlled by us. Akhil Systems Pvt Ltd is not responsible for the content, policies, or practices of any linked websites. We do not endorse or assume any responsibility for any external websites or their content. Clicking on external links is at your own risk.",
  },
  {
    question: "Limitation of Liability",
    answer:
      "To the maximum extent permitted by law, Akhil Systems Pvt Ltd disclaims any liability for any damages, losses, or injuries of any kind, whether direct, indirect, incidental, consequential, or otherwise, arising out of or in connection with the use of our website or any content contained therein. Your use of our website is at your sole risk.",
  },
  {
    question: "Indemnification",
    answer:
      "By using our website, you agree to indemnify, defend, and hold harmless Akhil Systems Pvt Ltd, its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, losses, expenses, damages, and costs, including reasonable attorneys’ fees, arising out of or in connection with your use of our website or any violation of these terms and conditions.",
  },
  {
    question: "Governing Law",
    answer:
      "These terms and conditions and any dispute arising from or in connection with them will be governed by and construed in accordance with the laws of the jurisdiction where Akhil Systems Pvt Ltd is registered, without regard to its conflict of law provisions.",
  },
  {
    question: "Changes to this Policy",
    answer:
      "Our website may contain links to external websites not owned or controlled by us. Akhil Systems Pvt Ltd is not responsible for the content, policies, or practices of any linked websites. We do not endorse or assume any responsibility for any external websites or their content. Clicking on external links is at your own risk.",
  },
  {
    question: "Contact Us",
    answer:
      "If you have any questions or concerns about these terms and conditions or our privacy policy, please contact us at [email address] or by mail at:<br><br>sales@akhilsystems.com<br> #205-206, Vardhman Times Plaza,<br>Plot No. 13, Rd No. 44,<br>Pitampura Commercial Complex,<br> Pitampura, NEW Delhi-110034",
  },
];

const PrivacyAccordion = () => {
  return (
    <div>
      <div className="box-Ques visible" style={{ display: "block" }}>
        <div className="box-carehands">
          <h3 className="text-left pt-0">Website Usage Policy</h3>
          <p style={{ width: "100%", textAlign: "left" }}>
            This website is owned and operated by Akhil Systems Pvt Ltd.
            Throughout the site, the terms “we”, “us” and “our” refer to service
            and products. By accessing or using our website, you agree to be
            bound by the terms and conditions set forth below. These terms and
            conditions may be updated or changed from time to time without
            notice to you. It is your responsibility to review this page
            periodically for any updates or changes.
          </p>

          <h3 className="text-left pt-4">Privacy Policy</h3>
          <p style={{ width: "100%", textAlign: "left" }}>
            At Akhil Systems Pvt Ltd, we respect and protect the privacy of our
            users. This Privacy Policy explains how we collect, use, and
            safeguard the information you provide to us through our website.
          </p>
        </div>

        {/* Privacy Accordion */}
        <div className="accordion-container" data-aos="fade-up">
          <div className="accordion" id="accordionPrivacy">
            {faqData.map((item, index) => {
              const headingId = `privacyHeading${index}`;
              const collapseId = `privacyCollapse${index}`;
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
                    id={collapseId}
                    className="accordion-collapse collapse"
                    aria-labelledby={headingId}
                    data-bs-parent="#accordionPrivacy"
                  >
                    <div
                      className="accordion-body"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terms Accordion */}
        <div className="box-carehands">
          <h3 className="text-left pt-4">Terms &amp; Conditions</h3>

          <div className="accordion-container" data-aos="fade-up">
            <div className="accordion" id="accordionTerms">
              {faqData2.map((item, index) => {
                const headingId = `termsHeading${index}`;
                const collapseId = `termsCollapse${index}`;
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
                      id={collapseId}
                      className="accordion-collapse collapse"
                      aria-labelledby={headingId}
                      data-bs-parent="#accordionTerms"
                    >
                      <div
                        className="accordion-body"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAccordion;
