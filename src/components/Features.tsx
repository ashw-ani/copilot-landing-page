import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Features.css';
import End from './End';

const Features = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    // const isInView = useInView(containerRef, { once: false, amount: 0.15 });
    const [isPaused, setIsPaused] = useState(false);

    // Initialize video playback
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Force play on mount
        const playVideo = async () => {
            try {
                await video.play();
                setIsPaused(false);
            } catch (error) {
                console.error('Error playing video:', error);
            }
        };

        playVideo();

        // Handle video loading
        video.addEventListener('loadeddata', playVideo);
        return () => {
            video.removeEventListener('loadeddata', playVideo);
        };
    }, []); // Run only on mount

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPaused(false);
        const handlePause = () => setIsPaused(true);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, []);

    // Remove the isInView condition from video playback
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (!isPaused) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error('Error playing video:', error);
                });
            }
        } else {
            video.pause();
        }
    }, [isPaused]);

    const handlePlayPause = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };

    useEffect(() => {
        const stickyContainer = stickyRef.current;
        const featuresContent = contentRef.current;
        if (!stickyContainer || !featuresContent) return;

        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.boundingClientRect.top <= 0) {
                    stickyContainer.classList.add('is-sticky');
                } else {
                    stickyContainer.classList.remove('is-sticky');
                }
            },
            { threshold: [1] }
        );

        const contentObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    stickyContainer.classList.add('has-overlay');
                } else {
                    stickyContainer.classList.remove('has-overlay');
                }
            },
            {
                threshold: [0],
                rootMargin: '0px'
            }
        );

        observer.observe(stickyContainer);
        contentObserver.observe(featuresContent);

        return () => {
            observer.disconnect();
            contentObserver.disconnect();
        };
    }, []);

    return (
        <motion.section 
            className="features"
            id="features"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            ref={containerRef}
        >
            <div className="features-sticky-container" ref={stickyRef}>
                <div className="features-video-wrapper">
                    <div className="features-video-controls">
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
                        className="features-video"
                        loop
                        playsInline
                        autoPlay
                        preload="auto"
                        src="/v4.mp4"
                    />
                </div>
            </div>
            <div className="features-overlay">
                <div className="features-content" ref={contentRef}>
                    <motion.div
                        className="feature-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>All Spend Data in One Place</h2>
                        <p>Connect your OBT, TMC, Chain, Expense data sources and view your data in one harmonized data interface.</p>
                    </motion.div>
                    
                    <motion.div
                        className="feature-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Actionable Insights</h2>
                        <p>Access tidy insights into your managed and unmanaged spending structured into driver views by region, channel and persona.</p>
                    </motion.div>
                    
                    <motion.div
                        className="feature-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>1-Click Optimization</h2>
                        <p>From RFP-less procurement and auto-configured points of sale to automated payments and VAT reclaim.</p>
                    </motion.div>
                </div>
                {/* <CardStack />
                <BenefitCards />
                <References /> */}
                <End/>
            </div>
            
        </motion.section>
    );
};

export default Features; 