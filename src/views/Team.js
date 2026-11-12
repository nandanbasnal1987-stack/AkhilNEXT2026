'use client';

import React from 'react'
import { useRouter } from "next/navigation";
const bgmiraclehis = "/images/bgmiraclehis.png";
import InputWithSend from '../components/common/Input/InputWithSend';
import FaqAccordion from '../components/features/FaqAccordion';
const demoscreenshot = "/images/image_653.png";

const Digital_OPD = "/images/dig-opd.webp";
const Digital_IPD = "/images/ipd.png";
const Supply_chain_Pharmacy = "/images/Supply_chain_Pharmacy.png";
const Diagnostic_Solutions = "/images/Diagnostic_Solutions.png";
const productall = "/images/box-pro.png";
import GoldBanner2 from '../components/features/GoldBanner2'
const bg_mplace = "/images/TeamBanner.png";
import InputWithSearch from '../components/common/Input/InputWithSearch';
const TeamMember = "/images/sk_photo.png";

const rj = "/images/rj_photo.png";
const sj = "/images/sj_photo.png";
const ua = "/images/ua_photo.png";
const na = "/images/na_photo.png";
const sp = "/images/sp_photo.png";
const sk = "/images/sk_photo.png";
const as = "/images/as_photo.png";
const sk2 = "/images/sk2_photo.png";
const skp = "/images/sk3_photo.png";
const mp = "/images/mp_photo.png";

function Team(){
    const router = useRouter();
  const navigate = (to) => router.push(to);
    return(
        <>
         <div className="bg-client mb-5">
        <img src={bg_mplace} alt="client background" />
        <div className="box-clients-details" data-aos="fade-up">
          <h2 style={{fontWeight:'400'}}>Our Strength Lies in Our People</h2>
          <p style={{color:'#fff', fontSize:'22px',wordSpacing:'1px'}}>Driven by expertise, united by purpose we’re building smarter healthcare, together.</p>
          <button className="demo-btn mt-4" onClick={() => navigate("/OurCareer")}>
  Explore Careers
  <span className="demo-arrow"></span>
</button>
        </div>
      </div>
    <section className='mx-auto'>
        <div className='container-fluid' data-aos="fade-up">
            <div className='row'>
<div className='col-md-12 text-center box-teams'>
    <h2>Meet Our Team</h2>
        <p>Explore tools and add-ons built to enhance your Akhil experience.</p>

<div className='box-powerfull'>
    <ul>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={rj} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>Mrs. Rekha Jain</h2>
                    <p>Director</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={sj} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>Mr. Sanjay Jain</h2>
                    <p>Managing Director</p>
                </div>
            </div>
        </li>
    </ul>
    <ul>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={ua} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. UMESH ANAND</h2>
                    <p>Head Product Delivery</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={na} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. NAEEM AHMAD</h2>
                    <p>VP - Project & Business Dev.</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={sp} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. SURYA PRATAP</h2>
                    <p>VP - Head of Mobility Solution</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={TeamMember} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. SUNIL KAUSHIK</h2>
                    <p>VP - Miralce Enterprise Solution</p>
                </div>
            </div>
        </li>
    </ul>
    <ul>
       
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={as} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. ASHUTOSH SHARMA</h2>
                    <p>VP International Projects</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={sk2} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. SAJID KAMAL</h2>
                    <p>Chief - DB Design and ERP Integration</p>
                </div>
            </div>
        </li>
         <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={skp} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. SUMAN KUMAR</h2>
                    <p>VP - Miracle Enterprise Solution</p>
                </div>
            </div>
        </li>
        <li>
            <div className='box-emp'>
               <div className='box-emp-bor'>                 
               </div>
               <div className='box-emp-pic'>
                    <img src={mp} alt="client background" />
                </div>
                <div className='box-emp-details'>
                    <h2>MR. MANOJ PURI</h2>
                    <p>HOD - Miracle HIS Support and Services</p>
                </div>
            </div>
        </li>
    </ul>
</div>
                </div>
                </div>
        </div>
    </section>



       <GoldBanner2 />
    
       
        </>
    )
}

export default Team;

