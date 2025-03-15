import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Preview.css';

const Preview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1]);

    // Video playback logic with intersection observer
    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        console.log('Initializing preview video playback');
        video.muted = true;

        const handlePlay = () => {
            console.log('Preview video play event triggered');
            setIsPlaying(true);
        };

        const handlePause = () => {
            console.log('Preview video pause event triggered');
            setIsPlaying(false);
        };

        const playVideo = async () => {
            if (video.paused) {
                try {
                    console.log('Attempting to play preview video');
                    await video.play();
                    console.log('Preview video playing successfully');
                    setIsPlaying(true);
                } catch (error) {
                    console.error('Error playing preview video:', error);
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
                    console.log('Preview video entered viewport');
                    playVideo();
                } else {
                    console.log('Preview video left viewport');
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
        <div className="preview-section" ref={containerRef}>
            <motion.div 
                className="preview-content"
                style={{ scale, opacity }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                }}
            >
                <div className="preview-header">
                    <h2>Simplify Travel. Amplify Strategy</h2>
                </div>
                <div className="preview-container">
                    <video 
                        ref={videoRef}
                        className="preview-video"
                        loop
                        muted
                        playsInline
                        webkit-playsinline
                        preload="metadata"
                    >
                        <source src="/intro_video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="video-controls">
                        <button 
                            className="play-pause-btn" 
                            onClick={handlePlayPause}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
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
                </div>
            </motion.div>
        </div>
    );
};

export default Preview;
