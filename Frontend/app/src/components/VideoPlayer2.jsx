import React, { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ video, autoPlay }) => {
  const videoRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  const handlePlayClick = () => {
    // Check if the Fullscreen API is available
    if (videoRef.current.requestFullscreen) {
      // Toggle full-screen mode
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }

    // If the Fullscreen API is not available, handle the play as normal
    // Note: You can provide an alternative full-screen solution for browsers that do not support the Fullscreen API
    // For example, open the video in a new tab/window.
    videoRef.current.play();
  };

  return (
    <div >
    
      <video
        ref={videoRef}
        width="300"
        height="200"
        controls
        autoPlay={autoPlay}
        onCanPlay={() => setLoading(false)}
        onError={() => setError('Error loading the video.')}
        // Attach the play button click event handler
        onPlay={handlePlayClick}
      >
        <source src={`http://localhost:3000/videos1/${video.name}`} type="video/mp4"></source>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
