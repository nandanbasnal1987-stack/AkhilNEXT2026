'use client';

import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser'

function TalkToExpertModal({ show, onClose }) {
  const formRef = useRef(null);
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hospital: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.hospital.trim()) newErrors.hospital = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate()) return;

    setLoading(true);

    emailjs
      .sendForm(
        "service_rjdaw98",
        "template_t5lcfaj",
        formRef.current,
        "1jS0s7rCMLTiVJWK3"
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);

          setLoading(false);
          setStatus("success");

          setFormData({
            name: "",
            email: "",
            phone: "",
            hospital: "",
            message: "",
          });

          setErrors({});
          setSubmitted(false);

          setTimeout(() => {
            setStatus("");
            onClose();
          }, 1500);
        },
        (error) => {
          console.log("Email error:", error.text);

          setLoading(false);
          setStatus("error");
        }
      );
  };

  const starStyle = (field) => ({
    color: submitted && errors[field] ? "red" : "#000",
  });

  return (
    <div
      className="getTouch"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "10px",
          width: "800px",
          maxWidth: "90%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 15,
            border: "none",
            background: "none",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h3>Get In Touch with Us!</h3>

        {status === "success" && (
          <div className="alert alert-success">
            Thank you! We will contact you shortly.
          </div>
        )}

        {status === "error" && (
          <div className="alert alert-danger">
            Something went wrong. Try again.
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6 mt-2">
              <label>
                Full Name <span style={starStyle("name")}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
            </div>

            <div className="col-6 mt-2">
              <label>
                Email Address <span style={starStyle("email")}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
            </div>

            <div className="col-6 mt-3">
              <label>
                Phone Number <span style={starStyle("phone")}>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              />
            </div>

            <div className="col-6 mt-3">
              <label>
                Hospital/Clinic Name{" "}
                <span style={starStyle("hospital")}>*</span>
              </label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className={`form-control ${
                  errors.hospital ? "is-invalid" : ""
                }`}
              />
            </div>

            <div className="col-12 mt-3">
              <label>
                What are you looking for?{" "}
                <span style={starStyle("message")}>*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-control ${
                  errors.message ? "is-invalid" : ""
                }`}
                rows="4"
              />
            </div>

            <div className="col-8 mt-3" style={{ fontSize: "14px" }}>
              * Our experts will connect with you within 24 hours.
            </div>

            <div className="col-4 mt-3 text-end">
              <button
                type="submit"
                className="signup-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TalkToExpertModal;