'use client';

import React, { useEffect, useRef } from "react";

const HoverPlayIframe = () => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Load YouTube IFrame Player API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        events: {
          onReady: () => console.log("Player Ready"),
        },
      });
    };
  }, []);

  const handleMouseEnter = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handleMouseLeave = () => {
    if (playerRef.current) {
      playerRef.current.pauseVideo();
    }
  };

  return (
    <div>
      <div
        className="hover-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "300px",
          height: "150px",
          background: "#f0f0f0",
          marginBottom: "10px",
          cursor: "pointer",
        }}
      >
        Hover me to play
      </div>

      <div style={{ width: "300px", height: "200px" }}>
        <iframe
          id="yt-player"
          width="300"
          height="200"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube Video"
        ></iframe>
      </div>
    </div>
  );
};

export default HoverPlayIframe;
