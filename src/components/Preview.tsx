import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Preview.css';

const Preview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "start start"] // Changed to start animation earlier
    });

    // Scale up as element comes into view, reach full size when sticky
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1]);

    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (value) => {
            if (value > 0.1 && value < 0.9) {
                setIsInView(true);
                videoRef.current?.play();
            } else {
                setIsInView(false);
                videoRef.current?.pause();
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    // Add event listeners for video state changes
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                // Add play promise handling
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch(error => console.log("Video play error:", error));
                }
            }
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
                    duration: 0.8,
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
                        playsInline
                    >
                        <source src="/v4.mp4" type="video/mp4" />
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
