import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './Preview.css';

const Preview = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefLaptop = useRef<HTMLVideoElement>(null);
    const videoRefTablet = useRef<HTMLVideoElement>(null);
    const videoRefMobile = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1]);

    // Video playback logic with intersection observer
    useEffect(() => {
        const currentVideoRef = isLaptop ? videoRefLaptop : isTablet ? videoRefTablet : videoRefMobile;
        const video = currentVideoRef.current;
        
        if (!video) return;

        // console.log('Initializing preview video playback');
        video.muted = true;
        video.playsInline = true; // Ensure inline playback
        video.setAttribute('playsinline', ''); // For iOS Safari
        video.setAttribute('webkit-playsinline', ''); // For older iOS

        const handlePlay = () => {
            // console.log('Preview video play event triggered');
            setIsPlaying(true);
        };

        const handlePause = () => {
            // console.log('Preview video pause event triggered');
            setIsPlaying(false);
        };

        const playVideo = async () => {
            try {
                if (video.paused) {
                    console.log('Attempting to play preview video');
                    // Load the video first on mobile
                    if (isMobile) {
                        await video.load();
                    }
                    await video.play();
                    console.log('Preview video playing successfully');
                    setIsPlaying(true);
                }
            } catch (error) {
                console.error('Error playing video:', error);
            }
        };

        const pauseVideo = () => {
            if (!video.paused) {
                video.pause();
                setIsPlaying(false);
            }
        };

        // Create observer with different threshold for mobile
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    console.log('Preview video entered viewport at threshold');
                    playVideo();
                } else {
                    // console.log('Preview video left viewport');
                    pauseVideo();
                }
            },
            {
                threshold: isMobile ? 0.4 : 0.6, // Lower threshold for mobile
                rootMargin: isMobile ? '50px 0px' : '0px' // Add some margin on mobile
            }
        );

        observer.observe(video);

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('loadedmetadata', () => {
            if (video.getBoundingClientRect().top < window.innerHeight * (isMobile ? 0.4 : 0.6)) {
                playVideo();
            }
        });

        // Initial play attempt if video is already in viewport
        if (video.getBoundingClientRect().top < window.innerHeight * (isMobile ? 0.4 : 0.6)) {
            playVideo();
        }

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            observer.disconnect();
        };
    }, [isLaptop, isTablet, isMobile]);

    const handlePlayPause = () => {
        const currentVideoRef = isLaptop ? videoRefLaptop : isTablet ? videoRefTablet : videoRefMobile;
        const video = currentVideoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play().catch(error => console.error('Error playing video:', error));
        } else {
            video.pause();
        }
    };

    // Laptop Version (Original)
    const LaptopPreview = () => (
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
                    ref={videoRefLaptop}
                    className="preview-video"
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
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
    );

    // Tablet Version
    const TabletPreview = () => (
        <motion.div 
            className="preview-content preview-content-tablet"
            style={{ scale, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
            }}
        >
            <div className="preview-header preview-header-tablet">
                <h2>Simplify Travel. Amplify Strategy</h2>
            </div>
            <div className="preview-container preview-container-tablet">
                <video 
                    ref={videoRefTablet}
                    className="preview-video preview-video-tablet"
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                >
                    <source src="/intro_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-controls video-controls-tablet">
                    <button 
                        className="play-pause-btn play-pause-btn-tablet" 
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
    );

    // Mobile Version
    const MobilePreview = () => (
        <motion.div 
            className="preview-content preview-content-mobile"
            style={{ scale, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2
            }}
        >
            <div className="preview-header preview-header-mobile">
                <h2>Simplify Travel. Amplify Strategy</h2>
            </div>
            <div className="preview-container preview-container-mobile">
                <video 
                    ref={videoRefMobile}
                    className="preview-video preview-video-mobile"
                    loop
                    muted
                    playsInline
                    autoPlay
                    preload="auto"
                >
                    <source src="/intro_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-controls video-controls-mobile">
                    <button 
                        className="play-pause-btn play-pause-btn-mobile" 
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
    );

    return (
        <div className="preview-section" ref={containerRef}>
            {isLaptop && <LaptopPreview />}
            {isTablet && <TabletPreview />}
            {isMobile && <MobilePreview />}
        </div>
    );
};

export default Preview;
