'use client';

import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import '../styles/global.css';
const Chatbox = "/images/Chat_Box.svg";
const mailicon = "/images/Mail_icon.svg";
const phoneicon = "/images/Phone_icon.svg";
const flower = "/images/flower.svg";
const contactuspic = "/images/Contact_image.png";
const office_loc = "/images/officeicon.png";
const starIcon = "/images/logo-btmbg.png";

const addloc = "/images/loc.png";
import AugastamSlider from '../components/features/AugastamSlider'


import SpotLightBanner from '../components/features/SpotLightBanner'

function Contactus() {
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        hospitalName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // null, 'success', 'error'
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Using EmailJS to send the form
        emailjs.sendForm(
            'service_rjdaw98',
            'template_t5lcfaj',
            form.current,
            '1jS0s7rCMLTiVJWK3'
        )
        .then((result) => {
            console.log('Email sent successfully:', result.text);
            setStatus('success');
            // Reset form
            setFormData({
                name: '',
                hospitalName: '',
                email: '',
                phone: '',
                message: ''
            });
        })
        .catch((error) => {
            console.error('Error sending email:', error.text);
            setStatus('error');
        })
        .finally(() => {
            setLoading(false);
            // Clear status after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        });
    };
    return (
        <>
        <section className='bg-Contactus'>
        <div className='container-fluid'>
            <div className='box-contactus'>
                <div className='box-contactus-left'>
                    <h2>Not sure where <br />to start with ?</h2>
                    <p>Our expert team will contact you back!</p>
                    <img src={contactuspic} alt='image' />
                    <div className='box-cont-detail'>
                        <h2>Contact Sales and Support</h2>
                        <h3>Sales Department</h3>
                        <h4><span>📧</span> sales@akhilsystems.com</h4>
                        <h5> <span>📞</span> +91 9968464439, 8791798751, 8448535001, 9953188908, 8448799453 <label style={{'display':'block'}}>(South India)</label></h5>
                        <hr />
                        <h3>Support Department</h3>
                        <h4><span>📧</span> support@akhilsystems.com</h4>
                        <h5> <span>📞</span> +91 8447846239</h5>
                    </div>
                </div>
                <div className='box-contactus-right'>
                    <h2>Get In Touch with Us!</h2>
                    {status === 'success' && (
                        <div className='alert alert-success'>
                            Thank you for your message! We will get back to you soon.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className='alert alert-danger'>
                            Something went wrong. Please try again later.
                        </div>
                    )}
                    <form ref={form} onSubmit={sendEmail}>
                        <div className='box-inpcol'>
                            <label>Full Name *</label>
                            <input 
                                name="name" 
                                placeholder='John Doe' 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className='box-inpcol'>
                            <label>Enter Hospital/Clinic Name *</label>
                            <input 
                                name="hospitalName" 
                                placeholder='Hospital/Clinic Name' 
                                value={formData.hospitalName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className='box-inpcol'>
                            <label>Enter Email Address *</label>
                            <input 
                                name="email" 
                                type="email" 
                                placeholder="john.doe@example.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className='box-inpcol'>
                            <label>Enter Phone Number *</label>
                            <input 
                                name="phone" 
                                placeholder="758454534" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className='box-inpcol'>
                            <label>What are you looking for ? *</label>
                            <textarea 
                                name="message" 
                                placeholder="enter message" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required
                            ></textarea>
                        </div>
                        <div className='box-inpcol'>
                            <button 
                                type="submit" 
                                className='btn-submit' 
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
<div className='clearfix'></div>
        <div className='container-fluid'>
            <div className='box-contactus'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-md-4'>
                        <div className='box-cont-col'>
                            <h3><span>
                            <img src={office_loc} alt='' />
                                </span>Registered Office</h3>
                            <h4><img src={addloc} alt='' /> New Delhi</h4>
                            <p>#205-206, Vardhman Times Plaza, Plot No. 13, Rd No. 44, Pitampura Commercial Complex, Pitampura, NEW Delhi-110034</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='box-cont-col'>
                            <h3><span><img src={office_loc} alt='' /></span>Development Office</h3>
                            <h4><img src={addloc} alt='' /> Gurgram</h4>
                            <p>
                                Incuspaze Building, 5th Floor,
                                Plot No. 17, Sector 18, Udyog Vihar Phase 4,
                                Gurugram, Haryana 122015
                            </p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='box-cont-col'>
                            <h3><span><img src={office_loc} alt='' /></span>Myanmar Office</h3>
                            <h4><img src={addloc} alt='' /> Concordia International CO. LTD</h4>
                            <p>Building 11, Universities&apos; Hlaing Campus, Hlaing Township - 11052, Yangon, Myanmar</p>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='box-cont-col'>
                            <h3><span><img src={office_loc} alt='' /></span>SOUTH INDIA OFFICE</h3>
                            <h4><img src={addloc} alt='' /> Hyderabad/Chennai/Bengaluru/Kochi</h4>
                            <p>
                                Contact Person: Mr. Debangshu Sengupta<br />
                                Business Head - South<br />
                                Phone: +91 844 879 9453
                            </p>
                            {/* <p>
                                Contact Person: Mr. Ram Kumar <br />
                                Phone: +91 988 451 9358
                            </p> */}
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='box-cont-col'>
                            <h3><span><img src={office_loc} alt='' /></span>DUBAI OFFICE</h3>
                            <h4><img src={addloc} alt='' /> Dubai</h4>
                            <p>Rostamani Twin Tower A, 4624+2J7 – 113,22 St – Al Barsha – Al Barsha 2 – Dubai – United Arab Emirates</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
    </section>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.606268208097!2d77.07455717528359!3d28.491401875742046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce58c7403e0a1%3A0x2a35ba3fcd3ecb95!2sAkhil%20Systems%20Pvt%20Ltd%20-%20Electronic%20Medical%20Records%20Software%2C%20Best%20Hospital%20Software%20India!5e0!3m2!1sen!2sin!4v1759222979470!5m2!1sen!2sin" width="100%" height="350" allowFullScreen="" style={{float:'left',}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

        
    </>
    )
}
        export default Contactus;