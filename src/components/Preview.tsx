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
    const [isMuted, setIsMuted] = useState(true);

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

        const handleVolumeChange = () => {
            setIsMuted(video.muted);
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
        video.addEventListener('volumechange', handleVolumeChange);
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
            video.removeEventListener('volumechange', handleVolumeChange);
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

    const handleMuteToggle = () => {
        const currentVideoRef = isLaptop ? videoRefLaptop : isTablet ? videoRefTablet : videoRefMobile;
        const video = currentVideoRef.current;
        if (!video) return;

        video.muted = !video.muted;
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
                    muted={isMuted}
                    playsInline
                    autoPlay
                    preload="auto"
                >
                    <source src="/intronewdark.mp4" type="video/mp4" />
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
                    <button 
                        className="mute-btn" 
                        onClick={handleMuteToggle}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <svg viewBox="0 0 24 24">
                                <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
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
                    muted={isMuted}
                    playsInline
                    autoPlay
                    preload="auto"
                >
                    <source src="/intronewdark.mp4" type="video/mp4" />
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
                    <button 
                        className="mute-btn mute-btn-tablet" 
                        onClick={handleMuteToggle}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <svg viewBox="0 0 24 24">
                                <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
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
                    muted={isMuted}
                    playsInline
                    autoPlay
                    preload="auto"
                >
                    <source src="/intronewdark.mp4" type="video/mp4" />
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
                    <button 
                        className="mute-btn mute-btn-mobile" 
                        onClick={handleMuteToggle}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? (
                            <svg viewBox="0 0 24 24">
                                <path d="M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
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
