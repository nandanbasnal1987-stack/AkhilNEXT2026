'use client';

import React from 'react';
const gridImage1 = "/images/imagebg.webp";
const gridImage2 = "/images/imagebg1.webp";

const TestimonialsSection = React.memo(function TestimonialsSection() {
  return (
    <section className='plr-60'>
      <div className='container-fluid box-wrapper'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='box-carehands'>
              <h2 className='text-center' data-aos='fade-up'>Built on Trust, Backed by Experience</h2>
              <p data-aos='fade-up'>At the heart of everything we build is a commitment to trust, innovation, and care. These values guide our journey — and empower yours.</p>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='box-built-trust'>
            <div className='column'>
              <div className='content-wrapper' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Mr. Bibhas Sen Choudhuri
                      <p>DGM IT</p>
                    </h2>
                    <p>
                      Managing a hospital network with facilities spread across cities was always a challenge—especially when it came to standardizing care, harmonizing SOPs, and managing data centrally. That changed when we onboarded Miracle from Akhil Systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className='content-wrapper box-bg-pink' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <img src={gridImage1} loading='lazy' />
                  </div>
                </div>
              </div>

              <div className='content-wrapper box-bg-green' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Yashoda Hospital
                      <p>Director</p>
                    </h2>
                    <p>
                      Our 15-year partnership with Akhil Systems has exceeded expectations, with their HMIS helping elevate our hospitals to the next level.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='column mt-3'>
              <div className='content-wrapper box-bg-pinklight' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Mr. Sudhir Talwar
                      <p>CEO</p>
                    </h2>
                    <p>
                      Since adopting Miracle, we&apos;ve achieved full digital transformation- billing leakages have been virtually eliminated thanks to automated charge capture and real-time dashboards. The system&apos;s analytics and reporting capabilities have empowered our finance and operations teams.
                    </p>
                  </div>
                </div>
              </div>

              <div className='content-wrapper box-bg-pinkdrak' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <img src={gridImage2} loading='lazy' />
                  </div>
                </div>
              </div>

              <div className='content-wrapper box-bg-magenta' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Dr. Pratik
                      <p></p>
                    </h2>
                    <p>
                      I&apos;ve used Akhil Systems&apos; Miracle On Cloud for a year—it&apos;s stable, reliable, and covers everything from patient records to billing, lab, and pharmacy. Great support, no major issues. Highly recommended for mid-size healthcare organizations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='column'>
              <div className='content-wrapper box-bg-yellow' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Brahmanandam Hospital
                    </h2>
                    <p>
                      We sincerely appreciate the hard work, dedicated efforts and commitment in successfully implementing and running the online HMIS Miracle software in our hospital.
 <br></br>
Your professionalism and prompt response to  every challenge have been highly commendable.
                    </p>
                  </div>
                </div>
              </div>

              <div className='content-wrapper box-bg-pinklight2' data-aos='fade-up'>
                <div className='image-wrapper'>
                  <div className='content-wrapper-slider'>
                    <h2>
                      Mrs. Pranti, Optometrist
                      <p>Eye 7 Hospital</p>
                    </h2>
                    <p>
                      Augastam EMR has been a smooth, AI-enabled solution tailored for ophthalmology, meeting all our needs. It securely stores patient data, improving efficiency, reliability, and how we deliver eye care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default TestimonialsSection;