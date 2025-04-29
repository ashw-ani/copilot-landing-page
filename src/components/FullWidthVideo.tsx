import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './FullWidthVideo.css';

interface FullWidthVideoProps {
  videoSrc: string;
  heading?: string;
  subheading?: string;
}

const FullWidthVideo: React.FC<FullWidthVideoProps> = ({ videoSrc, heading, subheading }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  // const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Video playback logic with intersection observer
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.muted = true;

    const handlePlay = () => {
      setIsPaused(false);
    };

    const handlePause = () => {
      setIsPaused(true);
    };

    const playVideo = async () => {
      if (video.paused) {
        try {
          await video.play();
          setIsPaused(false);
        } catch (error) {
          console.error('Error playing video:', error);
        }
      }
    };

    const pauseVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    // Create intersection observer for video playback
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          playVideo();
        } else {
          pauseVideo();
        }
      },
      {
        threshold: 0.2 // Start playing when 20% of the video is visible
      }
    );

    // Add event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Start observing the container
    observer.observe(container);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      observer.disconnect();
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(error => console.error('Error playing video:', error));
    } else {
      video.pause();
    }
  };

  return (
    <motion.section 
      className="full-width-video-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      ref={containerRef}
    >
      {(heading || subheading) && (
        <div className="full-width-video-header">
          {heading && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {heading}
            </motion.h2>
          )}
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {subheading}
            </motion.p>
          )}
        </div>
      )}
      
      <div className="full-width-video-container">
        <div className="full-width-video-wrapper">
          <div className="full-width-video-controls">
            <button 
              className="video-control-button"
              onClick={handlePlayPause}
              aria-label={isPaused ? 'Play video' : 'Pause video'}
            >
              {!isPaused ? (
                <svg viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
          <video 
            ref={videoRef}
            className="full-width-video"
            loop
            muted
            playsInline
            webkit-playsinline
            autoPlay
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.section>
  );
};

export default FullWidthVideo; 