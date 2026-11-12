'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
const bg_client = "/images/photoGalleryBanner.JPG";


const generateDiwaliPhotos = (start, count, folder) => {
  return Array.from({ length: count }).map(
    (_, i) => `/gallery/${folder}/Image-${start + i}.jpeg`
  );
};

const generateSequentialPhotos = (start, count, folder) => {
  return Array.from({ length: count }).map(
    (_, i) => `/gallery/${folder}/DSC0${start + i}.jpg`
  );
};

const generate28thYearPhotos = () => {
  return Array.from({ length: 8 }).map(
     (_, i) => `/gallery/28/Image-${i + 1}.jpeg`
  );
};

const categoriesData = [

   {
    id: "Diwali Celebration at Office",
    title: "Diwali Celebration at Office",
    cover: "/gallery/Diwali/Image-11.jpeg",
    photos: generateDiwaliPhotos(1, 10, "Diwali"),
  },
  {
    id: "31st Year Celebration",
    title: "31st Year Celebration",
    cover: "/gallery/31/DSC05019.jpg",
    photos: generateSequentialPhotos(5013, 12, "31"),
  },
  {
    id: "28th Year Celebration",
    title: "28th Year Celebration",
    cover: "/gallery/28/Image-1.jpeg",
    photos: generate28thYearPhotos(),
  }
];

export default function PhotoGallery() {
  const [categories] = useState(categoriesData);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const openCategory = (id) => {
    setOpenCategoryId(id);
    setActivePhotoIndex(null);
    setIsZoomed(false);
  };

  const closeCategory = () => {
    setOpenCategoryId(null);
    setActivePhotoIndex(null);
    setIsZoomed(false);
  };

  const openPhoto = (index) => {
    setActivePhotoIndex(index);
    setIsZoomed(false);
  };

  const closePhoto = () => {
    setActivePhotoIndex(null);
    setIsZoomed(false);
  };

  const goToNext = () => {
    if (activePhotoIndex !== null && category) {
      setActivePhotoIndex((prev) => 
        prev < category.photos.length - 1 ? prev + 1 : 0
      );
      setIsZoomed(false);
    }
  };

  const goToPrevious = () => {
    if (activePhotoIndex !== null && category) {
      setActivePhotoIndex((prev) => 
        prev > 0 ? prev - 1 : category.photos.length - 1
      );
      setIsZoomed(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;

      switch (e.key) {
        case 'Escape':
          closePhoto();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case ' ':
          e.preventDefault();
          setIsZoomed(!isZoomed);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, isZoomed]);

  const category = categories.find((c) => c.id === openCategoryId);
  const activePhoto = activePhotoIndex !== null && category ? category.photos[activePhotoIndex] : null;

  return (
    <div className="bg-client">
      <div style={{height:'450px',position:'relative', overflow:'hidden'}}>
      <span className="bannerOverlay"></span>
      <img src={bg_client} alt="client background" style={{height:'100%', objectFit:'cover'}} />
      <div className="box-clients-details" data-aos="fade-up">
        <h2>Photo Gallery</h2>
        <p>
          From multi-specialty hospitals to diagnostic chains, healthcare
          providers across 11
          <br />
          countries rely on Akhil Systems to power their digital transformation.
        </p>
      </div>
      </div>

      {/* Categories List */}
      {!category && (
        <div className="container mt-5 mb-4">
          <div className="row g-4">
            <div className="col-12 pb-4">
              
              <h2 className="text-center" style={{fontWeight:'bold', fontSize:'48px'}}>
                Celebrating throughout the Years!
              </h2>
            </div>
            {categories.map((cat) => (
              <div className="col-12 col-sm-6 col-lg-4" key={cat.id}>
                <motion.button
                  onClick={() => openCategory(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="card border-0 shadow h-100 p-0 overflow-hidden text-start w-100"
                  style={{ background: 'transparent' }}
                >
                  <img
                    src={cat.cover}
                    alt={cat.title}
                    className="card-img-top img-fluid"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-img-overlay d-flex align-items-end p-3 bg-dark bg-opacity-50">
                    <div>
                      <h5 className="card-title text-white mb-1">
                        {cat.title}
                      </h5>
                      <p className="card-text text-white-50 small">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Detail */}
      {category && (
        <motion.div
          key={category.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white shadow-sm"
        >
          <div className="bg-light p-3 d-flex justify-content-between align-items-center border-bottom">
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-sm btn-outline-secondary" style={{display:'none'}}
                onClick={closeCategory}
              >
                ← Back
              </button>
              <div>
                <h5 className="mb-0">{category.title}</h5>
                <small className="text-muted">{category.description}</small>
              </div>
            </div>
            <div className="text-muted">
              {category.photos.length} photos
            </div>
          </div>

          {/* Media Grid */}
          <div className="container py-4">
            <div className="row g-3">
              {category.photos.map((photoUrl, index) => (
                <div className="col-6 col-md-4 col-lg-3" key={photoUrl}>
                  <motion.button
                    onClick={() => openPhoto(index)}
                    whileHover={{ scale: 1.02 }}
                    className="border-0 p-0 bg-transparent w-100"
                    style={{ background: 'transparent' }}
                  >
                    <img
                      src={photoUrl}
                      alt={`${category.title} ${index + 1}`}
                      className="img-fluid rounded shadow-sm w-100"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Photo Modal/Popup with Zoom and Navigation */}
          <AnimatePresence>
            {activePhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.95)",
                  zIndex: 9999,
                  backdropFilter: "blur(5px)"
                }}
                onClick={(e) => e.target === e.currentTarget && closePhoto()}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="position-relative d-flex flex-column align-items-center"
                  style={{ maxWidth: "95vw", maxHeight: "95vh" }}
                >
                  {/* Image Container with Zoom */}
                  <div 
                    className="position-relative overflow-hidden rounded"
                    style={{ 
                      maxHeight: "80vh",
                      maxWidth: "90vw",
                      cursor: isZoomed ? "zoom-out" : "zoom-in"
                    }}
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <motion.img
                      src={activePhoto}
                      alt="Enlarged view"
                      className="img-fluid"
                      animate={{
                        scale: isZoomed ? 1.5 : 1,
                        cursor: isZoomed ? "grab" : "zoom-in"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ 
                        maxHeight: "80vh",
                        maxWidth: "90vw",
                        objectFit: "contain"
                      }}
                      drag={isZoomed}
                      dragConstraints={{
                        left: -100,
                        right: 100,
                        top: -100,
                        bottom: 100
                      }}
                    />
                  </div>

                  {/* Navigation Info */}
                  <div className="text-white text-center mt-2">
                    <small>
                      {activePhotoIndex + 1} of {category.photos.length}
                    </small>
                  </div>

                  {/* Control Buttons */}
                  <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                    {/* Previous Button */}
                    <button
                      onClick={goToPrevious}
                      className="btn btn-outline-light btn-sm d-flex align-items-center"
                    >
                      ← Previous
                    </button>

                    {/* Zoom Button */}
                    <button
                      onClick={() => setIsZoomed(!isZoomed)}
                      className="btn btn-outline-light btn-sm"
                    >
                      {isZoomed ? "Zoom Out" : "Zoom In"}
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={closePhoto}
                      className="btn btn-outline-light btn-sm"
                    >
                      Close
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={goToNext}
                      className="btn btn-outline-light btn-sm d-flex align-items-center"
                    >
                      Next →
                    </button>
                  </div>

                  {/* Floating Close Button */}
                  <button
                    onClick={closePhoto}
                    className="btn btn-light position-absolute rounded-circle"
                    style={{
                      top: "-15px",
                      right: "5px",
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10000
                    }}
                  >
                    ✕
                  </button>

                  {/* Navigation Arrows */}
                  {category.photos.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="btn btn-outline-light position-absolute rounded-circle d-none d-md-flex"
                        style={{
                          left: "-60px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "50px",
                          height: "50px",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        ←
                      </button>

                      <button
                        onClick={goToNext}
                        className="btn btn-outline-light position-absolute rounded-circle d-none d-md-flex"
                        style={{
                          right: "-60px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "50px",
                          height: "50px",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        →
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}