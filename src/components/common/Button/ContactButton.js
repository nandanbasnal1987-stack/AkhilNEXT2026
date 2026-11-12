'use client';

import React from "react";
import Link from "next/link";
import '../../../styles/global.css';

function ContactButton() {
  return (
    <Link href="/contact" className="contact-btn">
      Contact us <span className="arrow">→</span>
    </Link>
  );
}

export default ContactButton;