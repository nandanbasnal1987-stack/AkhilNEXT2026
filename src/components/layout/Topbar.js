'use client';

import React, { useEffect, useState } from 'react'
const imgn = "/images/update_icon.png";
// import '../../styles/global.css';
const diwaliAniDesktop = "/images/diwaliAni.gif";
const diwaliAniMobile = "/images/diwaliAniMobile.gif";

function Topbar() {
  const [show, setShow] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkScreenSize() // initial check
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <>
     

      {show && (
        <div
          className="container-fluid topbar plr-60"
          style={{ position: 'relative' }}
        >
          <div className="line" style={{ display: 'none' }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div className="diya-div" key={i}>
                <div className="light layer1"></div>
                <div className="lamp layer2"></div>
              </div>
            ))}
          </div>

          <div className="row">
            <button className="close-btn" onClick={() => setShow(false)}>
              x
            </button>

            <div className="col-md-6 news-text">
              <img
                src={imgn}
                className="product-image ml-5"
                width="30"
                height="24"
                alt="update icon"
              />{' '}
              Exciting News!! - Now <strong>Augastam</strong> is live on more
              than 25+ facilities
            </div>

            <div className="col-md-6">
              <form className="d-flex justify-content-end">
                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/AkhilSystems"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Fb.
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/1695279"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Lin.
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/AkhilSystems"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Inst.
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCyxwHghu_3_7eviVvtTzy9Q"
                      target="_blank"
                      rel="noreferrer"
                    >
                      You.
                    </a>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar
