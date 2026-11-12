'use client';

import React from "react";
const cart1 = "/images/cart1.jpg";
const cart2 = "/images/cart2.jpg";
const cart3 = "/images/cart3.jpg";
const cart4 = "/images/cart3.jpg";
import Card from "./Card";

function Cart() {
  const Cdata = [
    {
      id: 1,
      cart: cart1,
      title: "New Discoveries in Health care IT",
      desc: "We are thrilled to share the success of our recent Digital Health-tech Roadshow, a remarkable collaboration between ASPL and PwC. This event highlighted the transformative potential of digital innovation in healthcare...",
    },
    {
      id: 2,
      cart: cart2,
      title: "AI in Hospitals – Smarter Decisions",
      desc: "Artificial Intelligence is revolutionizing hospital management systems. From predictive analytics to decision support, AI is helping clinicians improve patient care and optimize workflows...",
    },
    {
      id: 3,
      cart: cart3,
      title: "The Future of EMR Systems",
      desc: "Electronic Medical Records (EMR) are no longer just digital files. Next-generation EMRs empower doctors with insights, reduce paperwork, and ensure seamless integration across hospital departments...",
    },
    {
      id: 4,
      cart: cart4,
      title: "The Future of EMR Systems",
      desc: "Electronic Medical Records (EMR) are no longer just digital files. Next-generation EMRs empower doctors with insights, reduce paperwork, and ensure seamless integration across hospital departments...",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row gy-4 p-5">
        {Cdata.map((value) => (
          <Card
            key={value.id}
            id={value.id}
            imag={value.cart}
            title={value.title}
            desc={value.desc}
          />
        ))}
      </div>
    </div>
  );
}

export default Cart;
