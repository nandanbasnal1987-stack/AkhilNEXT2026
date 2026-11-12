'use client';

import React from 'react'
import '../styles/global.css';
import FaqAccordion from '../components/features/FaqAccordion';
import InputWithSend from '../components/common/Input/InputWithSend';
const docApp2 = "/images/doc-app2.png";
const data = "/images/data.png";
const datetwo = "/images/datetwo.png";
const datethree = "/images/datethree.png";
const datefore = "/images/datefore.png";
const mobiledate = "/images/mobiledate.png";
const mobileview = "/images/moblieview.png";
const partnerLogo1 = "/images/paytm-logo.png";
const awardtwo = "/images/awardtwo.png";
const awardthree = "/images/awardthree.png";
import BlueBanner from '../components/features/BlueBanner'
import BlueBanner2 from '../components/features/BlueBanner2'
const bg_mplace = "/images/mplace-bannerbg.png";
import InputWithSearch from '../components/common/Input/InputWithSearch';
import MarketFilter from '../components/features/MarketFilter';

function Marketplace() {
    return (
        <>

   {/* Hero Section */}
      <div className="bg-client mb-5">
        <img src={bg_mplace} alt="client background" />
        <div className="box-clients-details" data-aos="fade-up">
          <h2>Your Ecosystem, Expanded</h2>
          <p>Find tools, add-ons, and solutions that seamlessly work with our platform.</p>
           <div className='box-letfuture-inp mx-auto' style={{marginLeft:'0', 'float':'none'}}><InputWithSearch /></div>
        </div>
      </div>

<div className='position-overlap'>
      <div className='container featured-section'>
        <div className='row'>
            <div className='col-md-6'><h3>Featured Products/Partners</h3></div>
            <div className='col-md-6 text-end'><a href='#'>See all <i className='fa fa-arrow-left'></i></a></div>
        </div>

        <div className='row'>
            <div className='col-md-3'>
                <div className='block-featured'>
                <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest...</p>
                <button className='orangeBtn'>Visit Website</button>
                </div>
                 </div>

                <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest...</p>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

                <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest...</p>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

                <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest...</p>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

                

            </div>

        

       
      </div>

   <div className='container mt-5'>
<div className='row'>
    <div className='col-md-3'><MarketFilter /></div>
    <div className='col-md-9'>
        <h3>Discover solutions for your Product</h3>
        <p>Explore tools and add-ons built to enhance your Akhil experience.</p>

<div className='row'>

        
        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>

        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>


        <div className='col-md-3'>
                <div className='block-featured'>
                 <h3><img src={partnerLogo1} className='' width={40}  /> Paytm</h3>
                <p>Empower your payments with the help of the India’s fastest growing payment gate...</p>
                <p>By Pine Labs</p>
                <p>120k Users</p>
                <div className='rating-star'><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill'></span><span className='fill-outline'></span></div>
                <button className='orangeBtn'>Visit Website</button>
                </div></div>
        </div>

        </div>
    </div>
    </div>
</div>
 


<BlueBanner2 />

        </>
    )
}

export default Marketplace;