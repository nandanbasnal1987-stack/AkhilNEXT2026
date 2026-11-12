'use client';

import React, { useState, useMemo, useRef, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { FaFilter } from "react-icons/fa";

const jobData = [
  {
    id: 1,
    summary: [
      { label: "Designation", value: "Lead- Scrum Master" },
      { label: "Job Location", value: "Gurugram" },
      { label: "Experience Level", value: "8-10 Years" },
      { label: "No. of Opening", value: "1" },
    ],
    fullDetails: [
      {
        label: "Job Purpose",
        value:
          "We are looking for a dynamic and technically proficient Scrum Master with hands-on experience in MERN Stack (MongoDB, Express.js, React.js, Node.js) to join our agile development team. The ideal candidate should be capable of facilitating agile practices while also understanding the technical nuances of full-stack development. You will serve as a servant-leader, empowering your team to deliver high-quality products efficiently.",
      },
      { label: "Key Responsibilities",  value: (
      <>
      <ul>
      <li>Lead and facilitate daily stand-ups, sprint planning, retrospectives, and sprint reviews</li>
      <li>Foster a high-performing, self-organizing team that delivers high-quality software</li>
      <li>Collaborate with Product Owners to maintain and prioritize the product backlog</li>
      <li>Remove impediments to team progress and shield the team from external distractions</li>
      <li>Work closely with MERN developers to understand technical challenges and provide relevant support</li>
      <li>Promote Agile best practices across teams and stakeholders</li>
      <li>Identify process improvement areas and help implement agile transformation where needed</li>
      <li>Track and communicate sprint progress using tools like Jira, Trello, or Azure DevOps</li>
      <li>Drive team metrics (velocity, burn-down, etc.) and provide transparency into delivery health</li>
      <li>Support release planning, cross-team coordination, and roadmap alignment</li>
      </ul>
    </>
  )
},

{ label: "Must-Have Qualifications",  value: (
      <>
      <ul>
      <li>Proven experience as a Scrum Master in a product or software development environment</li>
      <li>Technical background with working knowledge of MERN Stack or similar web technologies</li>
      </ul>
    </>
  )
},
{ label: "Preferred Skills",  value: (
      <>
      <ul>
      <li>Experience in microservices architecture and modern backend integrations</li>
      <li>Exposure to CI/CD, DevOps practices, and cloud platforms (AWS/Azure)</li>
      <li>Familiarity with Git, Docker, or containerization technologies</li>
      <li>Ability to handle fast-paced development environments with changing priorities</li>
      </ul>
    </>
  )
},  
    ],
  },

  {
    id: 2,
    summary: [
      { label: "Designation", value: "Node.js API Developer" },
      { label: "Job Location", value: "Gurugram" },
      { label: "Experience Level", value: "2-4 Years" },
      { label: "No. of Opening", value: "2" },
    ],
    fullDetails: [
      {
        label: "Job Purpose",
        value:
          "We are looking for a dynamic and technically proficient Scrum Master with hands-on experience in MERN Stack (MongoDB, Express.js, React.js, Node.js) to join our agile development team. The ideal candidate should be capable of facilitating agile practices while also understanding the technical nuances of full-stack development. You will serve as a servant-leader, empowering your team to deliver high-quality products efficiently.",
      },
      { label: "Key Responsibilities",  value: (
      <>
      <ul>
      <li>Lead and facilitate daily stand-ups, sprint planning, retrospectives, and sprint reviews</li>
      <li>Foster a high-performing, self-organizing team that delivers high-quality software</li>
      <li>Collaborate with Product Owners to maintain and prioritize the product backlog</li>
      <li>Remove impediments to team progress and shield the team from external distractions</li>
      <li>Work closely with MERN developers to understand technical challenges and provide relevant support</li>
      <li>Promote Agile best practices across teams and stakeholders</li>
      <li>Identify process improvement areas and help implement agile transformation where needed</li>
      <li>Track and communicate sprint progress using tools like Jira, Trello, or Azure DevOps</li>
      <li>Drive team metrics (velocity, burn-down, etc.) and provide transparency into delivery health</li>
      <li>Support release planning, cross-team coordination, and roadmap alignment</li>
      </ul>
    </>
  )
},

{ label: "Must-Have Qualifications",  value: (
      <>
      <ul>
      <li>Proven experience as a Scrum Master in a product or software development environment</li>
      <li>Technical background with working knowledge of MERN Stack or similar web technologies</li>
      </ul>
    </>
  )
},
{ label: "Preferred Skills",  value: (
      <>
      <ul>
      <li>Experience in microservices architecture and modern backend integrations</li>
      <li>Exposure to CI/CD, DevOps practices, and cloud platforms (AWS/Azure)</li>
      <li>Familiarity with Git, Docker, or containerization technologies</li>
      <li>Ability to handle fast-paced development environments with changing priorities</li>
      </ul>
    </>
  )
},  
    ],
  },

  {
    id: 3,
    summary: [
      { label: "Designation", value: "Marketing Executive (Healthcare Software Solutions)" },
      { label: "Job Location", value: "Gurugram" },
      { label: "Experience Level", value: "2-3 Years" },
      { label: "No. of Opening", value: "5" },
    ],
    fullDetails: [
      {
        label: "Job Purpose",
        value:
          "We are seeking dynamic and result-oriented Marketing Executives with experience in software or healthcare sales/marketing to join our growing team across multiple cities.",
      },
      { label: "Desired Skills",  value: (
      <>
      <ul>
      <li>MBA (Marketing) or equivalent degree.</li>
      <li>2–3 years of relevant experience in Software / Healthcare / Hospital Management Information Systems.</li>
      <li>Strong communication and presentation skills.</li>
      <li>Self-motivated with a go-getter attitude and willingness to travel locally.</li>
      <li>Prior experience in healthcare domain marketing will be an added advantage.</li>

      </ul>
    </>
  )
},

{ label: "Responsibilities",  value: (
      <>
      <ul>
        <li>Identify and develop new business opportunities in the assigned region.</li>
        <li>Generate leads through field visits, networking, and digital research.</li>
        <li>Present and promote healthcare software products to potential clients (Hospitals, Clinics, Diagnostic Centres, etc.).</li>
        <li>Coordinate with the internal sales and technical teams for proposal and demo presentations.</li>
        <li>Achieve monthly and quarterly business targets.</li>
        <li>Maintain strong relationships with existing clients for repeat business and referrals.</li>
        <li>Provide regular market feedback and competitor analysis.</li>
      </ul>
    </>
  )
},
{ label: "Qualifications",  value: (
      <>
      <ul>
      <li>Certification in Healthcare Information and Management Systems (CPHIMS) or similar.</li>
      <li>Experience with telemedicine, clinical decision support systems (CDSS), or mobile health technologies.</li>
      <li>Knowledge of quality improvement methods in healthcare (Lean, Six Sigma, etc.).</li>
      </ul>
    </>
  )
},
{ label: "Education",  value: (
      <>
      MBA (Marketing) or equivalent degree.
    </>
  )
},
{ label: "Total Experience",  value: (
      <>
      2-3 Years
    </>
  )
},
{ label: "Relevant Experience",  value: (
      <>
      2–3 years experience in Software / Healthcare / Hospital Management Information Systems.
    </>
  )
},
{ label: "CTC per annum",  value: (
      <>
      As per Industry Standard
    </>
  )
},
{ label: "Perks and Benefits",  value: (
      <>
      <ul>
        <li>Attractive Incentive Structure.</li>
        <li>Travel Allowance.</li>
        <li>Growth Opportunities within the Organization.</li>
        <li>Exposure to leading healthcare IT products.</li>
      </ul>
    </>
  )
},  
    ],
  },

  {
    id: 4,
    summary: [
      { label: "Designation", value: "TL- MERN Full Stack (Architect Level)" },
      { label: "Job Location", value: "Gurugram" },
      { label: "Experience Level", value: "7-10 Years" },
      { label: "No. of Opening", value: "1" },
    ],
    fullDetails: [
      {
        label: "Job Purpose",
        value:
          "We are looking for an experienced and highly skilled MERN Full Stack Team Leader at the Architect level to lead our development team in designing scalable, robust, and efficient web applications. The ideal candidate will have deep expertise in the MERN stack, strong leadership capabilities, and a strategic mindset. Experience in the healthcare domain will be a strong advantage.",
      },
      { label: "Key Responsibilities",  value: (
      <>
      <ul>
      <li>Lead the architecture, design, and development of scalable applications using MongoDB, Express.js, React.js, and Node.js.</li>
      <li>Provide technical leadership and mentorship to the development team.
</li>
      <li>Collaborate with cross-functional teams including product managers, QA, DevOps, and business stakeholders.
</li>
      <li>Translate business requirements into technical solutions that are secure, scalable, and aligned with industry best practices.
</li>
      <li>Establish and maintain coding standards, architecture guidelines, and best practices.
</li>
      <li>Perform code reviews, system design reviews, and enforce high code quality standards.
</li>
      <li>Handle project planning, timelines, and resource allocation.
</li>
      <li>Ensure timely delivery of high-quality features and modules.
</li>
      <li>Drive innovation and continuous improvement in engineering processes.
</li>
      <li>Provide architectural support for integrations with third-party systems and APIs.
</li>
     
      </ul>
    </>
  )
},

{ label: "Required Skills & Qualifications",  value: (
      <>
      <ul>
      <li>7–10 years of hands-on experience with MERN stack (Postgres, MongoDB, Express.js, React.js, Node.js).</li>
<li>2–3 years of experience in technical leadership or team lead roles.</li>
<li>Proven experience in architecting full-stack applications with high performance and scalability.</li>
<li>Strong knowledge of JavaScript ES6+, REST APIs, HTML5, CSS3, and modern JS frameworks.</li>
<li>Solid understanding of DevOps, CI/CD pipelines, Git, Docker, and deployment automation.</li>
<li>Experience working with cloud platforms like AWS or Azure.</li>
<li>Excellent analytical and problem-solving skills.</li>
<li>Strong interpersonal and communication skills for team collaboration and stakeholder interactions.</li>

      </ul>
    </>
  )
},
{ label: "Preferred Skills",  value: (
      <>
      <ul>
      <li>Experience in the healthcare domain, including familiarity with HIPAA compliance, HL7, FHIR, or similar healthcare protocols.</li>
<li>Exposure to GraphQL, Redux, Next.js, or microservices architecture.</li>
<li>Knowledge of Agile/Scrum methodologies.</li>
<li>Experience with unit testing frameworks like Jest or Mocha.</li>

      </ul>
    </>
  )
},  
    ],
  },
  ,

  {
    id: 6,
    summary: [
      { label: "Designation", value: "AI Solutions Architect" },
      { label: "Job Location", value: "Gurugram" },
      { label: "Experience Level", value: "5-8 Years" },
      { label: "No. of Opening", value: "1" },
    ],
    fullDetails: [
      {
        label: "Job Purpose",
        value:
          "Akhil Systems is seeking an experienced AI Solutions Architect to design and implement scalable AI-driven solutions across business functions. The ideal candidate should be capable of translating business requirements into practical AI architectures, selecting the right AI technologies, and leading end-to-end solution design and execution. This role requires strong expertise in AI/ML technologies, automation frameworks, LLMs, AI agents, system integrations, and enterprise solution architecture.",
      },
      
      { label: "Key Responsibilities",  value: (
      <>
      <ul>
      <li>Design end-to-end AI solutions based on business requirements</li>
      <li>Define AI implementation roadmaps, workflows, and system architecture.</li>
      <li>Evaluate and select appropriate AI models, frameworks, and tools for specific use cases.</li>
      <li>Architect AI-powered applications using LLMs, AI Agents, RAG, NLP, Computer Vision, and Automation technologies. </li>
      <li>Collaborate with business stakeholders to identify automation and AI opportunities. </li>
      <li>Lead technical decision-making related to AI platforms, deployment strategies, security, and scalability. </li>
      <li>Integrate AI solutions with existing enterprise systems, APIs, databases, and cloud environments.</li>
      <li>Establish best practices for AI governance, performance monitoring, and optimization.</li>
      <li>Guide development teams throughout implementation and deployment phases.</li>
      <li>Stay updated with emerging AI technologies and recommend innovative solutions.</li>
      </ul>
    </>
  )
},

{ label: "Required Skills Must-Have Qualifications",  value: (
      <>
      <ul>
      <li>5+ years of experience in Software Architecture, AI, ML, or Solution Design.</li>
      <li>Hands-on experience with Generative AI and Large Language Models (LLMs).</li>
      <li>Experience with AI frameworks such as LangChain, LlamaIndex, CrewAI, AutoGen, or similar. </li>
      <li>Strong understanding of RAG (Retrieval-Augmented Generation), AI Agents, Prompt Engineering, and Vector Databases. </li>
      <li>Experience working with OpenAI, Anthropic, Gemini, or open-source LLMs. </li>
      <li>Knowledge of Machine Learning lifecycle and model deployment. </li>
      <li>Experience designing scalable cloud-based architectures. </li>
      <li>Strong API integration and system design expertise. </li>
      <li>Ability to convert business problems into technical AI solutions. </li>
      <li>Excellent stakeholder management and decision-making skills. </li>
      </ul>
    </>
  )
},
{ label: "Good to Have",  value: (
      <>
      <ul>
      <li>Experience with Azure AI, AWS AI Services, or Google Cloud AI. </li>
      <li>Knowledge of MLOps and AI governance.</li>
      <li>Experience building enterprise-grade AI assistants or automation platforms. </li>
      <li>Exposure to Computer Vision, OCR, Speech-to-Text, and Document Intelligence solutions. </li>
      </ul>
    </>
  )
},
{ label: "What We're Looking For",  value: (
      <>
      <b>We need someone who can independently:</b>
      <ul>
      <li>Analyze business challenges</li>
      <li>Design solution architecture</li>
      <li>Select the right AI tools and technologies</li>
      <li>Create implementation workflows</li>
      <li>Lead technical discussions with stakeholders</li>
      <li>Drive AI projects from concept to production</li>
      </ul>
    </>
  )
},    
    ],
  },

];

/* 🔽 Accordion Components */
function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <div>
      <h4>Filter on Jobs</h4>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ title, children, isOpen, onClick }) {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="box-filter-panel border mb-2 rounded">
      
      <button
        onClick={onClick}
        className="box-filter-col flex justify-between w-full p-2 font-bold"
      >
        {title}
        <span
  style={{
    transition: "transform 0.2s",
    fontSize: "18px",
  }}
>
  {isOpen ? "−" : "+"}
</span>
      </button>
      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <div className="p-2 bg-white text-sm">{children}</div>
      </div>
    </div>
  );
}
/* 🔼 End Accordion */

export default function CareerAccordion() {
  const [openId, setOpenId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [modalJob, setModalJob] = useState(null);
  const form = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    designation: '',
    currentPackage: '',
    expectedPackage: '',
    totalExperience: '',
    coverLetter: '',
    noticePeriod: '',
    resume: null
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const [filters, setFilters] = useState({
    designation: [],
    experience: [],
    location: [],
  });

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const openModal = (job) => {
    setModalJob(job);
    // Pre-fill the designation field when modal opens
    setFormData(prev => ({
      ...prev,
      designation: job.summary[0].value
    }));
  };
  
  const closeModal = () => {
    setModalJob(null);
    setStatus(null);
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      designation: '',
      currentPackage: '', 
      expectedPackage: '',
      totalExperience: '',
      coverLetter: '',
      noticePeriod: '',
      resume: null
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  const sendEmail = (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Using EmailJS to send the job application
  emailjs.sendForm(
    'service_gvtp93h', // Replace with your EmailJS service ID
    'template_0qvl2eh', // Replace with your EmailJS template ID
    form.current,
    'G1itaT4GvIPfupvAy' // Replace with your EmailJS public key
  )
  .then((result) => {
    console.log('Email sent successfully:', result.text);
    setStatus('success');      
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      designation: '',
      currentPackage: '',              
      expectedPackage: '',
      totalExperience: '',  
      coverLetter: '',
      noticePeriod: '',
      resume: null
    });
    
    // Close modal after 3 seconds to show success message
    setTimeout(() => {
      closeModal();
    }, 3000);
  })
  .catch((error) => {
    console.error('Error sending email:', error.text);
    setStatus('error');
    // Clear error status after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  })
  .finally(() => {
    setLoading(false);
  });
};

  const getCounts = (labelName) => {
    const counts = {};
    jobData.forEach((job) => {
      const val = job.summary.find((d) => d.label === labelName)?.value;
      if (val) counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  };

  const designationCounts = useMemo(() => getCounts("Designation"), []);
  const experienceCounts = useMemo(() => getCounts("Experience Level"), []);
  const locationCounts = useMemo(() => getCounts("Job Location"), []);

  const handleCheckbox = (filterKey, value) => {
    setFilters((prev) => {
      const current = prev[filterKey];
      return {
        ...prev,
        [filterKey]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const des = job.summary.find((d) => d.label === "Designation")?.value;
      const exp = job.summary.find((d) => d.label === "Experience Level")?.value;
      const loc = job.summary.find((d) => d.label === "Job Location")?.value;

      return (
        (filters.designation.length === 0 ||
          filters.designation.includes(des)) &&
        (filters.experience.length === 0 ||
          filters.experience.includes(exp)) &&
        (filters.location.length === 0 || filters.location.includes(loc))
      );
    });
  }, [filters]);

  /* Accordion items for Filters */
  const filterAccordionItems = [
    {
      title: "Job Designation",
      content: (
        <div>
          {Object.entries(designationCounts).map(([des, count]) => (
            <label key={des} className="block">
              <input
                type="checkbox"
                value={des}
                checked={filters.designation.includes(des)}
                onChange={() => handleCheckbox("designation", des)}
              />{" "}
              {des} ({count})
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Job Location",
      content: (
        <div>
          {Object.entries(locationCounts).map(([loc, count]) => (
            <label key={loc} className="block">
              <input
                type="checkbox"
                value={loc}
                checked={filters.location.includes(loc)}
                onChange={() => handleCheckbox("location", loc)}
              />{" "}
              {loc} ({count})
            </label>
          ))}
        </div>
      ),
    },
    {
      title: "Experience Level",
      content: (
        <div>
          {Object.entries(experienceCounts).map(([exp, count]) => (
            <label key={exp} className="block">
              <input
                type="checkbox"
                value={exp}
                checked={filters.experience.includes(exp)}
                onChange={() => handleCheckbox("experience", exp)}
              />{" "}
              {exp} ({count})
            </label>
          ))}
        </div>
      ),
    },
    
  ];

  return (

    <>
<button
  className={`mobile-filter-btn ${showFilters ? "active" : ""}`}
  onClick={() => setShowFilters(!showFilters)}
>
  <FaFilter className="filter-icon" />
</button>


    <div className="box-career-detail flex gap-6">
      {/* ---- FILTER SECTION WITH ACCORDION ---- */}
      <div
  className={`box-career-left mobile-filter-panel ${
    showFilters ? "filter-open" : ""
  }`}
>
  <Accordion items={filterAccordionItems} />
</div>

      {/* ---- JOB LIST ---- */}
      <div className="box-career-right w-2/3">
        {filteredJobs.map((job) => (
          <div key={job.id} className="box-career-show border p-3 mb-3">
            <div className="box-career-show-left">
              <ul>
                {job.summary.map((detail, index) => (
                  <li key={index} className="flex1 justify-between py-1">
                    <span className="font-medium">{detail.label}:</span>
                    <span>{detail.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="box-career-show-right flex1 justify-between items-center cursor-pointer"
              onClick={() => toggleAccordion(job.id)}
            >
              <span className="text-lg font-bold">
                {openId === job.id ? "−" : "+"}
              </span>
            </div>

            {openId === job.id && (
              <div className="box-career-show-middle mt-3">
                <button
                  onClick={() => openModal(job)}
                  className="mt-1 px-4 py-2 bg-primary border-0 text-white rounded hover:bg-blue-700"
                >
                  Apply for this job
                </button>
                <hr></hr>
                <ul>
                  {job.fullDetails.map((detail, index) => (
                    <li key={index} className="flex1 justify-between py-1">
                      <span className="font-medium">{detail.label}:</span>
                      <ul><li>{detail.value}</li></ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ---- MODAL ---- */}
      {modalJob && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Apply for {modalJob.summary[0].value}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {status === 'success' && (
                    <div className="alert alert-success">
                      Thank you for your application! We will get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="alert alert-danger">
                      Something went wrong. Please try again later.
                    </div>
                  )}
                  <form ref={form} onSubmit={sendEmail} className="row space-y-3">
                    <input type="hidden" name="job_title" value={modalJob.summary[0].value} />
                    
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="number"
                        name="phone"
                        placeholder="Mobile Number"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <select
                        className="form-control"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                      >
                        {Object.keys(designationCounts).map((des) => (
                          <option key={des} value={des}>
                            {des}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="currentPackage"
                        placeholder="Current Package"
                        className="form-control"
                        value={formData.currentPackage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="expectedPackage"
                        placeholder="Expected Package"
                        className="form-control"
                        value={formData.expectedPackage}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="totalExperience"
                        placeholder="Total Experience"
                        className="form-control"
                        value={formData.totalExperience}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6 mb-3" style={{pointerEvents: 'none'}}>
                      <input
                        type="file"
                        name="resume"
                        className="form-control"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </div>

                    
                    <div className="col-6 mb-3">
                      <input
                        type="text"
                        name="noticePeriod"
                        placeholder="Notice Period"
                        className="form-control"
                        value={formData.noticePeriod}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <textarea
                        name="coverLetter"
                        placeholder="Cover Letter"
                        className="form-control"
                        rows="3"
                        value={formData.coverLetter}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="modal-footer" style={{"justifyContent":"left"}}>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>

</>
  );
}