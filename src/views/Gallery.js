'use client';

import React, { useState } from "react";
import "../styles/global.css";

import GalleryTabs from "../components/features/GalleryTabs";
import GalleryGrid from "../components/features/GalleryGrid";
import Lightbox from "../components/common/Light/Lightbox";

// Images
const image1 = "/images/GoLive/image-1.png";
const image2 = "/images/GoLive/image-2.png";
const image3 = "/images/GoLive/image-3.png";
const image4 = "/images/GoLive/image-4.png";
const image5 = "/images/GoLive/image-5.png";


const image1a = "/images/Achievement/ach-1.jpg";
const image2a = "/images/Achievement/ach-2.jpg";
const image3a = "/images/Achievement/ach-3.jpg";
const image4a = "/images/Achievement/ach-4.jpg";
const image5a = "/images/Achievement/ach-5.jpg";


const image1b = "/images/Events/Event-1.jpg";
const image2b = "/images/Events/Event-2.jpg";
const image3b = "/images/Events/Event-3.jpg";


const image100 = "/images/Events/Event-100.jpg";
const image101 = "/images/Events/Event-101.jpg";
const image102 = "/images/Events/Event-102.jpg";
const image103 = "/images/Events/Event-103.jpg";
const image104 = "/images/Events/Event-104.jpg";
const image105 = "/images/Events/Event-105.jpg";
const image106 = "/images/Events/Event-106.jpg";


function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");

  // Live Hospitals
  const galleryItems = [
    {
      image: image1,
      title: "Punjab Institute of Medical Sciences (PIMS)",
      location: "Jalandhar, Punjab",
    },
    {
      image: image2,
      title: "AR Super Speciality Hospital",
      location: "Kodungallur, Kerala",
    },
    {
      image: image3,
      title: "AR Super Speciality Hospital",
      location: "Kodungallur, Kerala",
    },
  ];

  // Achievements
  const galleryItems2 = [
    {
      image: image1a,
      title: "Healthcare Award 2025",
      location: "Delhi",
    },
    {
      image: image2a,
      title: "Innovation Excellence",
      location: "Mumbai",
    },
    {
      image: image3a,
      title: "National Recognition",
      location: "Chennai",
    },
    {
      image: image4a,
      title: "Top Medical Partner",
      location: "Bangalore",
    },
    {
      image: image5a,
      title: "Global Milestone",
      location: "Hyderabad",
    },
  ];

  // Events
  const galleryItems3 = [
    {
      image: image1b,
      title: "Medical Conference 2025",
      location: "Delhi",
    },
    {
      image: image2b,
      title: "Healthcare Summit",
      location: "Mumbai",
    },
    {
      image: image3b,
      title: "Hospital Launch Event",
      location: "Chennai",
    },
  ];


  const eventAlbums = [
  {
    id: 1,
    cover: image1b,
    title: "31st Annual Day",
    images: [
      {
        image: image1,
        title: "Conference Hall",
        location: "Delhi",
      },
      {
        image: image2,
        title: "Guest Session",
        location: "Delhi",
      },
      {
        image: image3,
        title: "Awards Ceremony",
        location: "Delhi",
      },
    ],
  },
  {
    id: 2,
    cover: image2b,
    title: "Webinar",
    images: [
      {
        image: image100,
        title: "Pregnancy Care with ONI AI",
      },
      {
        image: image101,
        title: "Data Analytics using Analytical AI",
        location: "Mumbai",
      },
      {
        image: image102,
        title: "RCM becomes easy with IHX",
        location: "Mumbai",
      },      
      {
        image: image104,
        title: "ABDM Adoption",
        location: "Mumbai",
      },
      {
        image: image105,
        title: "CXO and Phlebotomy App",
        location: "Mumbai",
      },
      {
        image: image106,
        title: "Discover Innovative Technologies",
        location: "Mumbai",
      },
    ],
  },
  {
    id: 3,
    cover: image3b,
    title: "Diwali Celebration",
    images: [
      {
        image: image2a,
        title: "Ribbon Cutting",
        location: "Chennai",
      },
      {
        image: image3,
        title: "Opening Ceremony",
        location: "Chennai",
      },
    ],
  },
];

  // Current tab items
  const currentItems =
  activeTab === "tab1"
    ? galleryItems
    : activeTab === "tab2"
    ? galleryItems2
    : selectedEvent
    ? selectedEvent.images
    : [];

  const nextImage = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex((prev) =>
      prev === currentItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;

    setLightboxIndex((prev) =>
      prev === 0 ? currentItems.length - 1 : prev - 1
    );
  };

  const tabs = [
  {
    id: "tab1",
    title: "Live Hospitals",
    content: (
      <GalleryGrid
        items={galleryItems}
        onImageClick={(index) => {
          setActiveTab("tab1");
          setLightboxIndex(index);
        }}
      />
    ),
  },
  {
    id: "tab2",
    title: "Achievements",
    content: (
      <GalleryGrid
        items={galleryItems2}
        onImageClick={(index) => {
          setActiveTab("tab2");
          setLightboxIndex(index);
        }}
      />
    ),
  },
  {
  id: "tab3",
  title: "Events",
  content: !selectedEvent ? (
    <div className="event-cover-grid">
      {eventAlbums.map((album) => (
        <div
          key={album.id}
          className="event-cover-card"
          onClick={() => {
            setActiveTab("tab3");
            setSelectedEvent(album);
          }}
        >
          <img src={album.cover} alt={album.title} />
          <h3>{album.title}</h3>
        </div>
      ))}
    </div>
  ) : (
    <div className="event-gallery-wrapper">
      <button
        className="back-btn"
        onClick={() => {
          setSelectedEvent(null);
          setLightboxIndex(null);
        }}
      >
        ← Back
      </button>

      <GalleryGrid
        items={selectedEvent.images}
        onImageClick={(index) => setLightboxIndex(index)}
      />
    </div>
  ),
},
];

  return (
    <>
      <div className="box-decades product-container bg-gallery mb-5">
        <div className="box-gallery-detail" data-aos="fade-up">
          <h2>
            Our Journey of <br /> Impact & Achievement
          </h2>
          <p>
            Celebrating milestones that have shaped healthcare innovation
            <br />
            and empowered better patient care across the globe.
          </p>
        </div>
      </div>

      <GalleryTabs tabs={tabs} />

      {lightboxIndex !== null && (
  <Lightbox
    items={currentItems}
    index={lightboxIndex}
    onClose={() => setLightboxIndex(null)}
    onPrev={prevImage}
    onNext={nextImage}
  />
)}
    </>
  );
}

export default Gallery;