'use client';

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const GetInfo = () => {
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
        <div className='box-contactus-right'>
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
                <div className='row mt-3'>
                <div className='col-md-12 col-sm-12'>
                    <div className='mb-3'>
                    <input 
                        name="name" 
                        placeholder='John Doe' 
                        value={formData.name} 
                        onChange={handleChange} className='form-control'
                        required 
                    />
                </div>
                </div>
                <div className='col-md-6 col-sm-6'>
                    <div className='mb-3'>
                    <input 
                        name="hospitalName" 
                        placeholder='Hospital/Clinic Name' 
                        value={formData.hospitalName} 
                        onChange={handleChange} className='form-control'
                        required 
                    />
                </div>
                </div>
                <div className='col-md-6 col-sm-6'>
                    <div className='mb-3'>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        value={formData.email} 
                        onChange={handleChange} className='form-control'
                        required 
                    />
                </div>
                </div>
                <div className='col-md-12 col-sm-12'>
                    <div className='mb-3'>
                    <input 
                        name="phone" 
                        placeholder="758454534" 
                        value={formData.phone} 
                        onChange={handleChange}  className='form-control'
                        required 
                    />
                    </div>
                </div>
               <div className='col-md-12 col-sm-12'>
                    <div className='mb-3'>
                    <textarea 
                        name="message" 
                        placeholder="enter message" 
                        value={formData.message} 
                        onChange={handleChange}  className='form-control'
                        required
                    ></textarea>
                </div>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <button 
                        type="submit" 
                        className='main_btn text-white' 
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default GetInfo;