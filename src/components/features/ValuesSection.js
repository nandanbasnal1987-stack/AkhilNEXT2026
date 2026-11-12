'use client';

import React, { useState } from 'react';
const coreIcon = "/images/Core_icon.png";
const valueImg = "/images/our-values-image.webp";
const gridImage3 = "/images/our-values-image2.webp";
const gridImage4 = "/images/our-values-image3.webp";

const ValuesSection = React.memo(() => {
  const [activeValue, setActiveValue] = useState(0);

  const valueImages = [
    valueImg,       // Integrity
    gridImage3,     // Personal Accountability
    gridImage4      // Will to Win
  ];

  return (
    <section className='plr-60'>
      <div className='container-fluid box-wrapper'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='box-carehands'>
              <h2 className='text-center' data-aos='fade-up'>Our Experience, Your Growth</h2>
              <p data-aos='fade-up'>At the heart of everything we build is a commitment to trust, innovation, and care. These values guide our journey — and empower yours.</p>
            </div>
          </div>
        </div>

        <div className='bg-bluedark' data-aos="zoom-in">
          <div className='box-value'>
            <ul>
              <li
                onClick={() => setActiveValue(0)}
                className={activeValue === 0 ? "active" : ""}
              >
                <h2>
                  <img src={coreIcon} alt='Integrity Image' loading='lazy' className='box-value-pic' />
                  <span>Integrity</span>
                </h2>
                <p>
                  We lead with integrity at every level championing honesty, transparency, and ethical conduct in every interaction.
                </p>
              </li>

              <li
                onClick={() => setActiveValue(1)}
                className={activeValue === 1 ? "active" : ""}
              >
                <h2>
                  <img src={coreIcon} alt='Personal Accountability Image' loading='lazy' className='box-value-pic' />
                  <span>Personal Accountability</span>
                </h2>
                <p>
                  We don't wait to be told we take charge. Every individual at Akhil Systems owns their outcomes.
                </p>
              </li>

              <li
                onClick={() => setActiveValue(2)}
                className={activeValue === 2 ? "active" : ""}
              >
                <h2>
                  <img src={coreIcon} alt='Will to Win Image' loading='lazy' className='box-value-pic' />
                  <span>Will to Win</span>
                </h2>
                <p>
                  Winning isn't just a goal it's a mindset. At Akhil Systems we push boundaries.
                </p>
              </li>
            </ul>
          </div>

          <div className='box-value-right'>
            <img src={valueImages[activeValue]} alt='Our Experience Images' loading='lazy' className='box-value-pic' />
          </div>
        </div>
      </div>
    </section>
  );
});

export default ValuesSection;