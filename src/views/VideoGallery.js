'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
const bg_client = "/images/photoGalleryBanner.JPG";

// Video data structure
const videoCategoriesData = [
  {
    id: "diwali-celebration",
    title: "Seasons of Joy, Stories of Us",
    cover: "/Video/Diwali/Image-11.jpeg",
    videos: [
      {
        id: "diwali-1",
        title: "Diwali Festivities",
        src: "/Video/Diwali/Video-1.mp4",
        duration: "2:45"
      },
      {
        id: "diwali-2",
        title: "Festive Vibes & Happy Faces!",
        src: "/Video/Diwali/Video-2.mp4",
        duration: "1:30"
      },
      {
        id: "diwali-3",
        title: "A Glimpse Into Our Celebrations",
        src: "/Video/Diwali/Video-3.mp4",
        duration: "1:30"
      },
      {
        id: "diwali-4",
        title: "Snapshots of Smiles & Success!",
        src: "/Video/Diwali/Video-4.mp4",
        duration: "1:30"
      },
      {
        id: "diwali-5",
        title: "Throwback To Good Times",
        src: "/Video/Diwali/Video-5.mp4",
        duration: "1:30"
      }
    ]
  },
  {
    id: "31st-year-celebration",
    title: "31st Year Celebration",
    cover: "/Video/31/Image-1.JPG",
    videos: [
      {
        id: "31st-1",
        title: "Diwali Event",
        src: "/Video/31/Video-1.mp4",
        duration: "4:15"
      },
      {
        id: "31st-2",
        title: "Anniversary Event",
        src: "/Video/31/Video-2.mp4",
        duration: "4:15"
      }
    ]
  }
];

// Simple Video Thumbnail component with better error handling
const VideoThumbnail = ({ video, category }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const generateThumbnail = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        const videoEl = videoRef.current;
        
        // Set up event listeners
        const onLoaded = () => {
          if (!isMounted) return;
          
          try {
            videoEl.currentTime = 0.5; // Try at 0.5 seconds
          } catch (err) {
            console.warn('Error setting video time:', err);
            fallbackThumbnail();
          }
        };

        const onSeeked = () => {
          if (!isMounted || !canvasRef.current) return;
          
          try {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            
            // Draw video frame to canvas
            ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
            
            // Get thumbnail as data URL
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            if (isMounted) {
              setThumbnailUrl(dataUrl);
              setLoading(false);
            }
          } catch (err) {
            console.warn('Error generating thumbnail:', err);
            fallbackThumbnail();
          }
        };

        const onError = () => {
          if (isMounted) {
            fallbackThumbnail();
          }
        };

        videoEl.addEventListener('loadeddata', onLoaded);
        videoEl.addEventListener('seeked', onSeeked);
        videoEl.addEventListener('error', onError);

        // Load the video
        videoEl.load();

        // Fallback timeout
        const timeout = setTimeout(() => {
          if (isMounted && loading) {
            fallbackThumbnail();
          }
        }, 3000);

        return () => {
          videoEl.removeEventListener('loadeddata', onLoaded);
          videoEl.removeEventListener('seeked', onSeeked);
          videoEl.removeEventListener('error', onError);
          clearTimeout(timeout);
        };

      } catch (err) {
        console.warn('Error in thumbnail generation:', err);
        fallbackThumbnail();
      }
    };

    const fallbackThumbnail = () => {
      if (isMounted) {
        setThumbnailUrl(category.cover);
        setLoading(false);
      }
    };

    generateThumbnail();

    return () => {
      isMounted = false;
    };
  }, [video.src, category.cover, loading]);

  return (
    <>
      {/* Hidden video element for thumbnail generation */}
      <video
        ref={videoRef}
        src={video.src}
        crossOrigin="anonymous"
        preload="metadata"
        style={{ display: 'none' }}
        muted
      />
      <canvas
        ref={canvasRef}
        width={400}
        height={225}
        style={{ display: 'none' }}
      />
      
      {/* Thumbnail display */}
      {loading ? (
        <div 
          className="card-img-top d-flex align-items-center justify-content-center bg-light"
          style={{ height: "200px", objectFit: "cover" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="card-img-top"
          style={{ 
            height: "200px", 
            width: "100%",
            objectFit: "cover",
            backgroundColor: '#f8f9fa'
          }}
          onError={(e) => {
            // Final fallback
            e.target.src = category.cover;
            e.target.alt = `${video.title} - Cover Image`;
          }}
        />
      )}
    </>
  );
};

export default function VideoGallery() {
  const [categories, setCategories] = useState(videoCategoriesData);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const controlsTimeout = useRef(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const openCategory = (id) => {
    setOpenCategoryId(id);
    setActiveVideoId(null);
    setIsPlaying(false);
    setVideoLoaded(false);
    setVideoError(false);
  };

  const closeCategory = () => {
    setOpenCategoryId(null);
    setActiveVideoId(null);
    setIsPlaying(false);
    setVideoLoaded(false);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const openVideo = (videoId) => {
    setActiveVideoId(videoId);
    setIsPlaying(false);
    setVideoLoaded(false);
    setVideoError(false);
    
    // Use setTimeout to ensure state is updated before playing
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(err => {
          console.warn('Auto-play failed:', err);
          setVideoError(true);
        });
      }
    }, 100);
  };

  const closeVideo = () => {
    setActiveVideoId(null);
    setIsPlaying(false);
    setVideoLoaded(false);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const playPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.warn('Play failed:', err);
          setVideoError(true);
        });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setVolume(videoRef.current.muted ? 0 : 1);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setVideoLoaded(true);
      setVideoError(false);
    }
  };

  const handleLoadStart = () => {
    setVideoLoaded(false);
    setVideoError(false);
  };

  const handleError = () => {
    setVideoError(true);
    setVideoLoaded(false);
    setIsPlaying(false);
  };

  const handleProgressClick = (e) => {
    if (videoRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Auto-hide controls
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeVideoId === null) return;

      switch (e.key) {
        case 'Escape':
          if (isFullscreen) {
            toggleFullscreen();
          } else {
            closeVideo();
          }
          break;
        case ' ':
          e.preventDefault();
          playPause();
          break;
        case 'm':
        case 'M':
          toggleMute();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'ArrowRight':
          skip(10);
          break;
        case 'ArrowLeft':
          skip(-10);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideoId, isPlaying, isFullscreen]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current);
      }
    };
  }, []);

  const category = categories.find((c) => c.id === openCategoryId);
  const activeVideo = activeVideoId && category 
    ? category.videos.find((v) => v.id === activeVideoId)
    : null;

  return (
    <div className="bg-client">
      <div style={{height:'450px',position:'relative', overflow:'hidden'}}>
        <span className="bannerOverlay"></span>
        <img src={bg_client} alt="client background" style={{height:'100%', objectFit:'cover'}} />
        <div className="box-clients-details" data-aos="fade-up">
          <h2>Video Gallery</h2>
          <p>
            Relive the memorable moments and celebrations throughout the years
            <br />
            with our collection of event videos and highlights.
          </p>
        </div>
      </div>

      {/* Categories List */}
      {!category && (
        <div className="container mt-5 mb-4">
          <div className="row g-4">
            <div className="col-12 pb-4">
              
              <h2  style={{fontWeight:'semi-bold', fontSize:'24px', textAlign:'left'}}>
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
                  <div className="position-relative">
                    <img
                      src={cat.cover}
                      alt={cat.title}
                      className="card-img-top img-fluid"
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className="bg-dark bg-opacity-50 rounded-circle p-3">
                        <i className="fas fa-play text-white fs-4"></i>
                      </div>
                    </div>
                  </div>
                  <div className="card-img-overlay d-flex align-items-end p-3 bg-dark bg-opacity-50">
                    <div>
                      <h5 className="card-title text-white mb-1">
                        {cat.title}
                      </h5>
                      <p className="card-text text-white-50 small">
                        {cat.videos.length} videos
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
                className="btn btn-sm btn-outline-secondary"
                onClick={closeCategory}
              >
                ← Back
              </button>
              <div>
                <h5 className="mb-0">{category.title}</h5>
                <small className="text-muted">
                  {category.videos.length} videos
                </small>
              </div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="container py-4">
            <div className="row g-4">
              {category.videos.map((video) => (
                <div className="col-12 col-sm-6 col-lg-4" key={video.id}>
                  <motion.button
                    onClick={() => openVideo(video.id)}
                    whileHover={{ scale: 1.02 }}
                    className="border-0 p-0 bg-transparent w-100 text-start"
                    style={{ background: 'transparent' }}
                  >
                    <div className="card shadow-sm h-100">
                      <div className="position-relative">
                        <VideoThumbnail 
                          video={video} 
                          category={category}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                          <div className="bg-dark bg-opacity-50 rounded-circle p-3">
                            <i className="fas fa-play text-white"></i>
                          </div>
                        </div>
                        <div className="position-absolute bottom-0 end-0 m-2">
                          <span className="badge bg-dark bg-opacity-75">
                            {video.duration}
                          </span>
                        </div>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title mb-0">{video.title}</h6>
                      </div>
                    </div>
                  </motion.button>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Video Player Modal */}
          <AnimatePresence>
            {activeVideo && (
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
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    closeVideo();
                  }
                }}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="position-relative bg-black rounded"
                  style={{ 
                    maxWidth: "90vw", 
                    maxHeight: "90vh", 
                    width: isFullscreen ? "100vw" : "800px",
                    height: isFullscreen ? "100vh" : "auto"
                  }}
                  ref={playerRef}
                >
                  {/* Enhanced Video Player */}
                  <div 
                    className="position-relative w-100"
                    style={{ height: isFullscreen ? "100vh" : "450px" }}
                    onMouseMove={showControlsTemporarily}
                    onMouseLeave={() => {
                      if (isPlaying) {
                        controlsTimeout.current = setTimeout(() => setShowControls(false), 2000);
                      }
                    }}
                  >
                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      src={activeVideo.src}
                      className="w-100 h-100"
                      style={{ 
                        objectFit: "contain",
                        backgroundColor: '#000'
                      }}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onLoadStart={handleLoadStart}
                      onError={handleError}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      onClick={playPause}
                      controls={false}
                      playsInline
                    />
                    
                    {/* Loading State */}
                    {!videoLoaded && !videoError && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading video...</span>
                        </div>
                      </div>
                    )}

                    {/* Error State */}
                    {videoError && (
                      <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                        <i className="fas fa-exclamation-triangle fs-1 mb-3"></i>
                        <p>Failed to load video</p>
                        <button 
                          className="btn btn-primary mt-2"
                          onClick={() => openVideo(activeVideo.id)}
                        >
                          Try Again
                        </button>
                      </div>
                    )}

                    {/* Enhanced Custom Video Controls */}
                    <AnimatePresence>
                      {showControls && videoLoaded && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="position-absolute bottom-0 w-100 p-3"
                          style={{
                            background: "linear-gradient(transparent, rgba(0,0,0,0.7))"
                          }}
                        >
                          {/* Progress Bar */}
                          <div 
                            className="progress mb-3"
                            style={{ height: "6px", cursor: "pointer" }}
                            onClick={handleProgressClick}
                          >
                            <div 
                              className="progress-bar bg-danger"
                              style={{ 
                                width: `${(currentTime / (duration || 1)) * 100}%` 
                              }}
                            />
                          </div>
                          
                          {/* Controls Row */}
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                              {/* Play/Pause */}
                              <button
                                onClick={playPause}
                                className="btn btn-outline-light border-0 fs-5"
                              >
                                <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                              </button>
                              
                              {/* Time Display */}
                              <span className="text-white">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                              
                              {/* Volume Control */}
                              <div className="d-flex align-items-center gap-2">
                                <button
                                  onClick={toggleMute}
                                  className="btn btn-outline-light border-0"
                                >
                                  <i className={`fas ${volume === 0 ? 'fa-volume-mute' : volume > 0.5 ? 'fa-volume-up' : 'fa-volume-down'}`}></i>
                                </button>
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.1"
                                  value={volume}
                                  onChange={handleVolumeChange}
                                  className="form-range"
                                  style={{ width: "80px" }}
                                />
                              </div>
                            </div>
                            
                            <div className="d-flex align-items-center gap-3">
                              {/* Playback Speed */}
                              <select
                                value={playbackRate}
                                onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                                className="form-select form-select-sm bg-dark text-white border-secondary"
                                style={{ width: "auto" }}
                              >
                                <option value="0.5">0.5x</option>
                                <option value="0.75">0.75x</option>
                                <option value="1">1x</option>
                                <option value="1.25">1.25x</option>
                                <option value="1.5">1.5x</option>
                                <option value="2">2x</option>
                              </select>
                              
                              {/* Fullscreen */}
                              <button
                                onClick={toggleFullscreen}
                                className="btn btn-outline-light border-0"
                              >
                                <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Play/Pause overlay center button */}
                    {!isPlaying && videoLoaded && (
                      <div 
                        className="position-absolute top-50 start-50 translate-middle"
                        style={{ pointerEvents: 'none' }}
                      >
                        <button
                          onClick={playPause}
                          className="btn btn-light rounded-circle p-3 opacity-75"
                          style={{ pointerEvents: 'auto' }}
                        >
                          <i className="fas fa-play fs-2"></i>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-3 bg-dark text-white rounded-bottom">
                    <h6 className="mb-1">{activeVideo.title}</h6>
                    <small className="text-muted">{category.title}</small>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={closeVideo}
                    className="btn btn-light position-absolute rounded-circle"
                    style={{
                      top: "-15px",
                      right: "-15px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10000
                    }}
                  >
                    ✕
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}