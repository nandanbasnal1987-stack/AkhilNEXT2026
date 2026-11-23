'use client';

import React, { useState } from 'react';
const EmailIcon = "/images/landing/2.gif";
const CallIcon = "/images/landing/call.gif";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="https://akhilsystems.com/static/media/akhil-logo.7b6b526465370149fe8d.png" alt="Akhil Systems" />
          </a>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-end ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item letstalk">
                <a href="mailto:sales@akhilsystems.com" className="nav-link" style={{paddingRight: 0}}>
                  <img src={EmailIcon} alt="email" style={{maxWidth:'35px', paddingRight:'7px'}} />
                  <div>
                    <p className="mb-0">Email:</p>
                    <h6 className="mb-0">sales@akhilsystems.com</h6>
                  </div>
                </a>
              </li>
              
              <li className="nav-item letstalk">
                <a href="tel:#" className="nav-link" style={{paddingRight: 0}}>
                    <img src={CallIcon} alt="call" />
                  <div>
                    <p className="mb-0">Let&apos;s Talk!</p>
                    <h6 className="mb-0">+1 999 999 9999</h6>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;