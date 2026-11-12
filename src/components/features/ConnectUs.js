'use client';

import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Country, State } from 'country-state-city';

const ConnectUs = () => {
    const form = useRef();

    const [formData, setFormData] = useState({
        name: '',
        hospitalName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        numberOfBeds: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const countries = Country.getAllCountries();
    const states = formData.country
        ? State.getStatesOfCountry(formData.country)
        : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCountryChange = (e) => {
        setFormData({
            ...formData,
            country: e.target.value,
            state: '' // reset state on country change
        });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .sendForm(
                'service_rjdaw98',
                'template_t5lcfaj',
                form.current,
                '1jS0s7rCMLTiVJWK3'
            )
            .then(() => {
                setStatus('success');
                setFormData({
                    name: '',
                    hospitalName: '',
                    email: '',
                    phone: '',
                    country: '',
                    state: '',
                    city: '',
                    numberOfBeds: '',
                    message: ''
                });
            })
            .catch(() => setStatus('error'))
            .finally(() => {
                setLoading(false);
                setTimeout(() => setStatus(null), 5000);
            });
    };

    return (
        <div className="box-contactus-right">
            {status === 'success' && (
                <div className="alert alert-success">
                    Thank you for your message! We will get back to you soon.
                </div>
            )}

            {status === 'error' && (
                <div className="alert alert-danger">
                    Something went wrong. Please try again later.
                </div>
            )}

            <form ref={form} onSubmit={sendEmail}>
                <div className="row mt-3">
                    <div className="col-md-6">
                        <input name="name" placeholder="Full Name*" className="form-control mb-3" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <input name="phone" placeholder="Phone Number*" className="form-control mb-3" value={formData.phone} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <input name="email" type="email" placeholder="Email Address*" className="form-control mb-3" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <input name="hospitalName" placeholder="Hospital/Clinic Name*" className="form-control mb-3" value={formData.hospitalName} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <select name="country" className="form-control mb-3" value={formData.country} onChange={handleCountryChange} required>
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c.isoCode} value={c.isoCode}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <select name="state" className="form-control mb-3" value={formData.state} onChange={handleChange} disabled={!formData.country} required>
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s.isoCode} value={s.isoCode}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <input name="city" placeholder="City" className="form-control mb-3" value={formData.city} onChange={handleChange} />
                    </div>

                    <div className="col-md-6">
                        <input name="numberOfBeds" type="number" min="0" placeholder="Number of Beds" className="form-control mb-3" value={formData.numberOfBeds} onChange={handleChange} />
                    </div>

                    <div className="col-md-12">
                        <textarea name="message" placeholder="Enter message" className="form-control mb-3" value={formData.message} onChange={handleChange} required />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button type="submit" className="main_btn text-white" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ConnectUs;
