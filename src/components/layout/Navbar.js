'use client';

import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const logo = "/images/akhil-logo.png";
const logoIcon = "/images/Akhil_logo_WG.svg";
//import logoIcon from '../../assets/images/akhil_icon.svg'
const logoAug = "/images/aug_logo.svg";
const logoMoc = "/images/Moc_logo.svg";
const search = "/images/Search_icon.png";
const language = "/images/language_icon.png";
const callnumber = "/images/CallNumber.svg";
import '../../styles/globalv2.css';
// import '../../styles/responsive.css';
import LanguageSwitcher from '../../components/features/LanguageSwitcher.js';
const mocDetailsIcon = "/images/MOC.svg";
const augDetailsIcon = "/images/Augastam-icon.svg";
const hisDetailsIcon = "/images/MiracleHIS.svg";
const mobilityDetailsIcon = "/images/MobileSolution.svg";
const AugastamProductLogo = "/images/augastam_color_logo.svg";
const MocProductLogo = "/images/Miracle_On_cloud_logo.svg";
const HISProductLogo = "/images/Miracle_HIS_logo.svg";
const MobilityProductLogo = "/images/Mobility_Solution_logo.svg";
const callExpert = "/images/Call_icon.svg";
import TalkToExpertModal from "../../components/features/TalkToExpertModal";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const navigate = (to) => router.push(to);
  const [isDown, setIsDown] = useState(false);

  // 👇 New: control which product details are shown
  const [activeProduct, setActiveProduct] = useState("moc"); 
  // default "moc", can be "aug"

  const handleDropdownToggle = (e) => e.preventDefault();

  

  const handleTogglerClick = () => {
    if (!isCollapsed) {
      setAnimationClass('flip-out');
      setTimeout(() => {
        setIsCollapsed(true);
        setAnimationClass('');
      }, 500);
    } else {
      setIsCollapsed(false);
      setAnimationClass('flip-in');
    }
  };

  // Handle Augastam EMR click - navigate and show section
  const handleAugastamClick = (e) => {
    e.preventDefault();
    // Navigate to Augastam page
    navigate('/Augastam');
    // The section will be shown automatically based on the route
  };

const [showModal, setShowModal] = useState(false);

  // Handle Augastam Clinic click - navigate and show section
  const handleClinicClick = (e) => {
    e.preventDefault();
    // Navigate to Clinic page
    navigate('/Clinic');
    // The section will be shown automatically based on the route
  };

  // Auto-close navbar on route change
  useEffect(() => {
    setIsCollapsed(true);
    setAnimationClass('');

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsDown(true);
      } else {
        setIsDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <div className={`container-fluid header-container plr-60 sticky-top ${isDown ? "down" : ""}`}>
        <div className='row v-middle'>
          <div className='col-lg-3 col-md-3 col-sm-3 col-9 box-logo-pic'>
            <img className='logo-icon' src={logoIcon} height="45" alt="Responsive image" />
            <img className='akhil-logo' src={logo} height="45" alt="Responsive image" />
            {/* <img className='aug-logo' src={logoAug} height="45" alt="Responsive image" />
            <img className='logo-moc' src={logoMoc} height="45" alt="Responsive image" /> */}
          </div>

          <div className='col-md-6 col-12'>
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  aria-controls="navbarNav"
                  aria-expanded={!isCollapsed}
                  aria-label="Toggle navigation"
                  onClick={handleTogglerClick}
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''} ${animationClass}`}
                  id="navbarNav"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="/">Home</Link>
                    </li>
                    <li className="nav-item"><Link className="nav-link" href="/Aboutus">About Us</Link></li>

                    {/* Mega Menu Item */}
                    <li className="nav-item dropdown position-static">
                      <a
                        href="#void"
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        onClick={handleDropdownToggle}
                      >
                        Products
                      </a>
                      <div className="dropdown-menu mega-menu p-4">
                        <div className="row">
                          <div className="col-lg-6">
                            <h6 className="dropdown-header">Product List</h6>

                            {/* 👇 Hover handlers */}
                            <Link className="dropdown-item his-link" href="/MiracleHIS" onMouseEnter={() => setActiveProduct("miracleHIS")}>Miracle HMIS<span>Hospital Management Information Systems (HMIS)</span></Link>
                            <Link
                              className="moc-link dropdown-item"
                              href="/Moc"
                              onMouseEnter={() => setActiveProduct("moc")}
                            >
                              Miracle on Cloud<span>50+ Hospitals Trust Miracle On Cloud</span>
                            </Link>
                            <Link
  className="dropdown-item his-link"
  href=""
  onClick={(e) => e.preventDefault()}
  onMouseEnter={() => setActiveProduct("miracleHIS")}
>
  Miracle LIS
  <span>Accurate Laboratory Management for Faster Diagnostics</span>
</Link>
<Link
  className="dropdown-item his-link"
  href=""
  onClick={(e) => e.preventDefault()}
  onMouseEnter={() => setActiveProduct("miracleHIS")}
>
  Miracle RIS
  <span>Advanced Imaging Management for Better Patient Care</span>
</Link>
<Link
  className="dropdown-item his-link"
  href=""
  onClick={(e) => e.preventDefault()}
  onMouseEnter={() => setActiveProduct("miracleHIS")}
>
  Miracle Health@Home
  <span>Connected Homecare Solutions for Better Outcomes</span>
</Link>

<Link
  className="dropdown-item"
  href="/AugastamClinic"
  onMouseEnter={() => setActiveProduct("augClinic")}
>
  Augastam Clinic
  <span>
    Simplifying Daily Operations for Modern Healthcare Clinics
  </span>
</Link>

                            <Link
                              className="AugEMR-link dropdown-item"
                              href="/Augastam"
                              onMouseEnter={() => setActiveProduct("aug")}
                              onClick={handleAugastamClick}
                            >
                              Augastam EMR<span>Digital Patient Records for Smarter Clinical Decisions</span>
                            </Link>
                            
                            <Link className="dropdown-item mobile-link" href="/" onMouseEnter={() => setActiveProduct("mobility")}>Mobility Solution<span>Healthcare Access Anytime Through Mobile Innovation</span></Link>
                          </div>

                          <div className="col-lg-6 navbar-content">
                            {/* Show Augastam details */}
                            {activeProduct === "aug" && (
                              <div className='aug-details'>
                                <img src={augDetailsIcon} alt="Augastam" />
                                <h3>Augastam EMR</h3>
                                <p>Smarter Care, Anywhere</p>
                                <p>20+ Hospitals are<br></br> Using Augastam EMR</p>
                              </div>
                            )}

                            {/* Show MOC details */}
                            {activeProduct === "augClinic" && (
                              <div className='augClinic-details'>
                                <img src={augDetailsIcon} alt="MOC" />
                                <h3>Augastam Clinic</h3>
                                <p>Smarter Care, Anywhere</p>
                                <p>20+ Hospitals are<br></br> Using Augastam Clinic</p>
                              </div>
                            )}

                            {/* Show MOC details */}
                            {activeProduct === "moc" && (
                              <div className='moc-details'>
                                <img src={mocDetailsIcon} alt="MOC" />
                                <h3>Miracle On Cloud (MOC)</h3>
                                <p>Smarter Care, Anywhere</p>
                                <p>50+ Hospitals are<br></br> Using Miracle On Cloud</p>
                              </div>
                            )}

                            {/* Show MOC details */}
                            {activeProduct === "miracleHIS" && (
                              <div className='his-details'>
                                <img src={hisDetailsIcon} alt="Miracle HIS" />
                                <h3>Hospital Management Information System (HMIS)</h3>
                                <p>Smarter Care, Anywhere</p>
                                <p>100+ Hospitals are<br></br> Using Miracle</p>
                              </div>
                            )}

                            {/* Show MOC details */}
                            {activeProduct === "mobility" && (
                              <div className='mobility-details'>
                                 <img src={mobilityDetailsIcon} alt="Mobility Solution" />
                                <h3>Mobility Solution</h3>
                                <p>Smarter Care, Anywhere</p>
                                <div><Link className="dropdown-item-child" href="/cxoapp">CXO App</Link> <Link className="dropdown-item-child" href="/Doctorapp">Doctor App</Link> <Link className="dropdown-item-child" href="/Patientapp">Patient App</Link> <Link className="dropdown-item-child" href="/Phlebotomyapp">Phlebotomy App</Link></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="nav-item"><Link className="nav-link" href="/OurClients">Clients</Link></li>
                    <li className="nav-item" style={{display:'none'}}><Link className="nav-link" href="#void">Partner</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="/OurCareer">Career</Link></li>
                    <li className="nav-item"><Link className="nav-link" href="/contact">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

       <div className='col-md-3 mt-2 text-end'>
  <button
    className='signup-btn talkExpert'
    onClick={() => setShowModal(true)}
  >
    Talk to Expert
    <img
      src={callExpert}
      className='product-image ml-5'
      width="20"
      height="20"
      alt="Call to Expert"
    />
  </button>
</div>

<TalkToExpertModal
  show={showModal}
  onClose={() => setShowModal(false)}
/>

          <div className='col-md-3 mt-2 hidden'>
            <form className='d-flex justify-content-end'>
              <span className='hidden'><img src={search} className='product-image ml-5' width="36" height="36" alt="Search" /></span>
              <span className='langsec'>
                <img src={language} className='product-image ml-5' width="16" height="16" alt="Language" />
                <LanguageSwitcher /> EN
              </span>
              <button className='signup-btn'>Sign Up</button>
            </form>
          </div>
        </div>
      </div>

      

      {/* Show Augastam EMR Section when on /Augastam route */}
      {pathname === '/Augastam' && (
        <AugastamEMRSection />
      )}

      {/* Show Augastam Clinic Section when on /Clinic route */}
      {pathname === '/Clinic' && (
        <AugastamClinicSection />
      )}

      {/* Show Augastam Clinic Section when on /Clinic route */}
      {pathname === '/Moc' && (
        <MoCSection />
      )}

       {/* Show Augastam Clinic Section when on /Clinic route */}
      {pathname === '/MiracleHIS' && (
        <HISSection />
      )}

       {/* Show Augastam Clinic Section when on /Clinic route */}
      {pathname === '/cxoapp' && (
        <MobileSolutionSection />
      )}

  
    </>
  );
}

// Augastam EMR Section Component
const AugastamEMRSection = () => {
  const router = useRouter();
  const navigate = (to) => router.push(to);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div id="augastam-section" className="container-fluid augastam-custom-section p-2 sticky-top hidden" style={{
  borderBottom: '1px solid #ccc',
  borderTop: '1px solid #ccc'
}}>
      <div className="plr-60">
        <div className="row">
          <div className="col-3">
            <img className='aug-logo' src={AugastamProductLogo} height="55" alt="Responsive image" style={{'display':'inline-block'}} />
            </div>

            <div className="col-7">
              <nav className='navbar navbar-expand-lg'>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">About Product</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Pricing</Link>
                    </li>
                    </ul>
                    </nav>
          </div>

          <div className='col-md-2 mt-2 text-end'>
            <button className='signup-btn' style={{'border': '1px solid #0074E4'}}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Augastam Clinic Section Component
const AugastamClinicSection = () => {
  const router = useRouter();
  const navigate = (to) => router.push(to);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div id="clinic-section" className="container-fluid clinic-custom-section p-2 hidden" style={{'borderBottom':'1px solid #ccc','bordertop':'1px solid #ccc'}}>
      <div className="container-fluid plr-60">
        <div className="row">
          <div className="col-3">
            <img className='aug-logo' src={AugastamProductLogo} height="55" alt="Responsive image" style={{'display':'inline-block'}} />
            </div>

            <div className="col-7">
              <nav className='navbar navbar-expand-lg'>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">About Product</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Pricing</Link>
                    </li>
                    </ul>
                    </nav>
          </div>

          <div className='col-md-2 mt-2 text-end'>
            <button className='signup-btn' style={{'border': '1px solid #0074E4'}}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// MoC Section Component
const MoCSection = () => {
  const router = useRouter();
  const navigate = (to) => router.push(to);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div id="MoC-section" className="container-fluid augastam-custom-section p-2 hidden" style={{'borderBottom':'1px solid #ccc','bordertop':'1px solid #ccc'}}>
       <div className="container-fluid plr-60">
        <div className="row">
          <div className="col-3">
            <img className='aug-logo' src={MocProductLogo} height="55" alt="Responsive image" style={{'display':'inline-block'}} />
            </div>

            <div className="col-7">
              <nav className='navbar navbar-expand-lg'>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">About Product</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Pricing</Link>
                    </li>
                    </ul>
                    </nav>
          </div>

          <div className='col-md-2 mt-2 text-end'>
            <button className='signup-btn' style={{'border': '1px solid #0074E4'}}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// MoC Section Component
const HISSection = () => {
  const router = useRouter();
  const navigate = (to) => router.push(to);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div id="HIS-section" className="container-fluid augastam-custom-section p-2 hidden" style={{'borderBottom':'1px solid #ccc','borderTop':'1px solid #ccc'}}>
       <div className="container-fluid plr-60">
        <div className="row">
          <div className="col-3">
            <img className='aug-logo' src={HISProductLogo} height="55" alt="Responsive image" style={{'display':'inline-block'}} />
            </div>

            <div className="col-7">
              <nav className='navbar navbar-expand-lg'>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">About Product</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Pricing</Link>
                    </li>
                    </ul>
                    </nav>
          </div>

          <div className='col-md-2 mt-2 text-end'>
            <button className='signup-btn' style={{'border': '1px solid #0074E4'}}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// MoC Section Component
const MobileSolutionSection = () => {
  const router = useRouter();
  const navigate = (to) => router.push(to);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div id="Mobility-section" className="container-fluid augastam-custom-section p-2 hidden" style={{'borderBottom':'1px solid #ccc','bordertop':'1px solid #ccc'}}>
       <div className="container-fluid plr-60">
        <div className="row">
          <div className="col-3">
            <img className='aug-logo' src={MobilityProductLogo} height="55" alt="Responsive image" style={{'display':'inline-block'}} />
            </div>

            <div className="col-7">
              <nav className='navbar navbar-expand-lg'>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0 custom-nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">About Product</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Features</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Clients</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="#void">Pricing</Link>
                    </li>
                    </ul>
                    </nav>
          </div>

          <div className='col-md-2 mt-2 text-end'>
            <button className='signup-btn' style={{'border': '1px solid #0074E4'}}>Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;