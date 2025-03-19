import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './MultiWindows.css';

const MultiWindows = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    
    // Create opacity transforms for each window with no overlap
    const windowOpacity1 = useTransform(scrollYProgress, 
        [0.1, 0.2, 0.3, 0.35], 
        [0, 1, 1, 0]
    );
    const windowOpacity2 = useTransform(scrollYProgress, 
        [0.35, 0.4, 0.5, 0.55], 
        [0, 1, 1, 0]
    );
    const windowOpacity3 = useTransform(scrollYProgress, 
        [0.55, 0.6, 0.7, 0.75], 
        [0, 1, 1, 0]
    );
    const windowOpacity4 = useTransform(scrollYProgress, 
        [0.75, 0.8, 0.9, 0.95], 
        [0, 1, 1, 0]
    );

    useEffect(() => {
        const video = videoRef.current;
        const videoContainer = videoContainerRef.current;
        if (!video || !videoContainer) return;

        const handleEnded = () => {
            video.currentTime = video.duration;
        };

        video.addEventListener('ended', handleEnded);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                        if (video.currentTime < video.duration) {
                            video.play().catch(error => {
                                console.error("Error playing video:", error);
                            });
                        }
                    } else {
                        video.pause();
                    }
                });
            },
            {
                threshold: [0.4],
                root: null,
                rootMargin: '0px'
            }
        );

        observer.observe(videoContainer);

        return () => {
            video.removeEventListener('ended', handleEnded);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="multiwindows-section" ref={targetRef}>
            <motion.div 
                className="multiwindows-container"
                style={{ opacity }}
            >
                <div className='multiwindows-heading'>Multi-Window Experience</div>
                <div className="multiwindows-video-container" ref={videoContainerRef}>
                    <video 
                        ref={videoRef}
                        className="multiwindows-background-video"
                        muted
                        playsInline
                    >
                        <source src="/laptop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="multiwindows-window-cards-container">
                        <motion.div 
                            className="multiwindows-window-card"
                            style={{ opacity: windowOpacity1 }}
                        >
                            <p><b>Seamless Integration:</b> Experience a fluid multi-window interface that adapts to your workflow. Each window provides a dedicated space for different aspects of your work, allowing you to manage multiple tasks simultaneously with ease.</p>
                        </motion.div>
                        <motion.div 
                            className="multiwindows-window-card"
                            style={{ opacity: windowOpacity2 }}
                        >
                            <p><b>Intelligent Layout:</b> Our smart window management system automatically arranges your workspace for optimal productivity. Windows dynamically adjust based on your usage patterns and screen real estate.</p>
                        </motion.div>
                        <motion.div 
                            className="multiwindows-window-card"
                            style={{ opacity: windowOpacity3 }}
                        >
                            <p><b>Cross-Window Sync:</b> Keep your data synchronized across all windows in real-time. Changes made in one window instantly reflect across your entire workspace, ensuring consistency and accuracy.</p>
                        </motion.div>
                        <motion.div 
                            className="multiwindows-window-card"
                            style={{ opacity: windowOpacity4 }}
                        >
                            <p><b>Customizable Views:</b> Tailor your window layout to match your unique workflow. Save and switch between different window configurations with a single click, maximizing your productivity.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default MultiWindows; 