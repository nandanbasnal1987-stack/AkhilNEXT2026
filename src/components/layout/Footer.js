'use client';

import React from 'react'
import Link from "next/link";
const logo = "/images/img1.jpg";
import '../../styles/global.css';
const phoneicon = "/images/Phone_icon.svg";
const mailicon = "/images/Mail_icon.svg";
const footerLogo = "/images/akhil-logo.png";
const footerLogoIcon = "/images/akhil-icon.svg";
const youtube = "/images/youtube-icon.svg";
const facebook = "/images/facebook-icon.svg";
const twitter = "/images/twitter-icon.svg";
const instagram = "/images/instagram-icon.svg";
const linkedin = "/images/linkedin-icon.svg";
const appStore = "/images/appStore-icon.svg";
const googleStore = "/images/googleStore-icon.svg";

import ScrollProgress from '../features/ScrollProgress.js'

function Footer() {
    return (
        <>
            {/* Changed <section> → <footer> so DiwaliDecor can find it by default */}
            <footer className='bg-footer' id="site-footer" style={{ position: 'relative', paddingTop: '40px' }}>
                <div className='container-fluid box-wrapper plr-60'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='box-footer-logo'>
                                <img src={footerLogo} alt='Akhil' />
                                <span className='hidden'>
                                    We are one of the pioneers Hospital Management Information Systems (HMIS) company with 30+ years of experience in the single domain of healthcare and specialized in delivering management information systems for Hospitals, Medical Colleges, Clinics, Diagnostic Centers and Pharmacy Chains.
                                </span>
                            </div>

                            <div className='box-footer-link'>
                                <ul>
                                    <li><h2 className='text-uppercase'>Web Products</h2></li>
                                    <li><Link href="/Augastam">Augastam EMR</Link></li>
                                    <li><Link href="/Clinic">Augastam Clinic</Link></li>
                                    <li><Link href="/Moc">Miracle On Cloud</Link></li>
                                    <li><Link href="/MiracleHIS">Miracle HIS</Link></li>
                                </ul>

                                <ul>
                                    <li><h2 className='text-uppercase'>Resources</h2></li>
                                    <li><span>Help Center</span></li>
                                    <li><Link href="/Blog">Blog</Link></li>
                                    <li><Link href="/contact">Contact Us</Link></li>
                                    <li><span>Marketplace</span></li>
                                </ul>

                                <ul>
                                    <li><h2 className='text-uppercase'>Mobility Solultion</h2></li>
                                    <li><Link href="/Patientapp">Patient App</Link></li>
                                    <li><Link href="/Doctorapp">Doctor App</Link></li>
                                    <li><Link href="/cxoapp">CXO App</Link></li>
                                    <li><Link href="/Phlebotomyapp">Phlebotomy App</Link></li>
                                </ul>

                                <ul>
                                    <li><h2 className='text-uppercase'>Company</h2></li>
                                    <li><Link href="/Aboutus">About Us</Link></li>
                                    <li><Link href="/OurCareer">Career</Link></li>
                                    <li><Link href="/Team">Team</Link></li>
                                    <li><Link href="/">Testimonials</Link></li>
                                    <li style={{ display: 'none' }}><span>Privacy Policy</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-4 d-none'>
                            <img src={footerLogoIcon} alt='Akhil' style={{ width: '90px' }} />
                            <p className='copyText'>@ 2023 Company Name, Inc. All rights reserved.</p>
                        </div>

                        <div className='col-md-4'>
                            <p className='copyText'>© 2023 Akhil Systems Pvt. Ltd. All rights reserved.</p>
                        </div>

                        <div className='col-md-3 box-terms'>
                            <ul className='list-inline'>
                                <li><span>Terms</span></li>
                                <li><Link href="/privacy-policy-2">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className='col-md-2 box-social'>
                            <ul className='list-inline'>
                                <li><a href='https://www.youtube.com/channel/UCyxwHghu_3_7eviVvtTzy9Q' target='_blank' rel="noreferrer"><img src={youtube} alt='Youtube' /></a></li>
                                <li><a href='https://www.facebook.com/AkhilSystems' target='_blank' rel="noreferrer"><img src={facebook} alt='Facebook' /></a></li>
                                <li><span><img src={twitter} alt='Twitter' /></span></li>
                                <li><a href='https://www.instagram.com/AkhilSystems' target='_blank' rel="noreferrer"><img src={instagram} alt='Instagram' /></a></li>
                                <li><a href='https://www.linkedin.com/company/1695279' target='_blank' rel="noreferrer"><img src={linkedin} alt='LinkedIn' /></a></li>
                            </ul>
                        </div>

                        <div className='col-md-3 box-appstore'>
                            <ul>
                                <li><span><img src={appStore} alt='App Store' /></span></li>
                                <li><a href="https://play.google.com/store/apps/collection/cluster?gsr=SldqGHBBd1drQVlTVDRQbFBkWTlPMDR0Z2c9PbICOgodChljb20uYWtzLnBhdGllbnRjb25mZXJlbmNlEAcSFwgBEhM1MTQyMjkxNzg5NjY3MjUyNjQ4GAA%3D:S:ANO1ljIvaIU&hl=en_IN" target='_blank' rel="noreferrer"><img src={googleStore} alt='Google Store' /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className='row' style={{ display: 'none' }}>
                        <div className='col-md-12 box-footer-dir'>
                            <p>In sed posuere sed ullamcorper feugiat. Lacinia elit neque, ipsum, non. Tellus mattis enim volutpat habitasse. Semper posuere lectus consectetur aliquam et ullamcorper. Dictumst aenean justo fames diam eget volutpat vestibulum elit. Blandit aliquet bibendum pellentesque turpis id penatibus faucibus id nunc. Aenean rhoncus, erat pellentesque eu. Quis morbi condimentum phasellus in ultricies eu amet.</p>
                        </div>
                    </div>
                </div>
            </footer>

            <ScrollProgress />
        </>
    )
}
export default Footer;