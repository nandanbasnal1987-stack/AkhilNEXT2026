'use client';

import React, { useEffect, useState } from 'react'
//import logo from '../../assets/images/akhil-logo.png'
//import callnumber from '../../assets/images/CallNumber.svg'
const imgn = "/images/update_icon.png";
import '../styles/global.css';


function Decades() {

    const [show, setShow] = useState(true);
   

    return (
        <>

          
                
                {show && (
                <div className="container-fluid topbar">
                   
                <div className='row '>


                   

                   <button className="close-btn" onClick={() => setShow(false)}>x</button>
                        <div className='col-md-6 news-text'>
                            <img src={imgn} className='product-image ml-5' width="30" height="24" alt="Responsive image" /> Exciting News!!  - Now <strong>Augastam</strong> is live on more than 25+ facilities

                        </div>

                        <div className='col-md-6'>
                            <form className='d-flex justify-content-end'>
                                <ul className='social-links'>
                                    <li><a href='#void'>Fb.</a></li>
                                    <li><a href='#void'>Inst.</a></li>
                                    <li><a href='#void'>Twt.</a></li>
                                </ul>
                            </form>

                       




                    </div>
                </div>
                </div>)}


            </>
            )
            }
            export default Topbar;