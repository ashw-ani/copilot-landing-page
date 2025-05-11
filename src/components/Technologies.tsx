import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './Technologies.css';

const Technologies = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoLoadedRef = useRef(false);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [hasVideoError, setHasVideoError] = useState(false);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    
    // Create opacity transforms for each card with no overlap
    const cardOpacity1 = useTransform(scrollYProgress, 
        [0.06, 0.12, 0.18, 0.24], 
        [0, 1, 1, 0]
    );
    const cardOpacity2 = useTransform(scrollYProgress, 
        [0.24, 0.3, 0.36, 0.42], 
        [0, 1, 1, 0]
    );
    const cardOpacity3 = useTransform(scrollYProgress, 
        [0.42, 0.48, 0.54, 0.60], 
        [0, 1, 1, 0]
    );
    const cardOpacity4 = useTransform(scrollYProgress, 
        [0.66, 0.72, 0.78, 0.84], 
        [0, 1, 1, 0]
    );

    const isLaptop = useMediaQuery({ minWidth: 1280 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    useEffect(() => {
        const video = videoRef.current;
        const videoContainer = videoContainerRef.current;
        if (!video || !videoContainer) return;

        // Configure video
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');

        const handleEnded = () => {
            video.currentTime = video.duration;
        };

        const handleError = (e: Event) => {
            console.error("Error with video:", e);
            setHasVideoError(true);
            setIsVideoLoading(false);
            // Attempt to reload the video
            if (!videoLoadedRef.current) {
                setTimeout(() => {
                    video.load();
                    setHasVideoError(false);
                    setIsVideoLoading(true);
                }, 2000); // Retry after 2 seconds
            }
        };

        const handleLoadedData = () => {
            console.log("Video loaded successfully");
            videoLoadedRef.current = true;
            setIsVideoLoading(false);
            setHasVideoError(false);
        };

        const handleLoadStart = () => {
            setIsVideoLoading(true);
        };

        const playVideo = async () => {
            try {
                if (video.paused) {
                    // If video hasn't loaded properly, reload it
                    if (!video.readyState) {
                        await video.load();
                    }
                    await video.play();
                    console.log("Video playing");
                }
            } catch (error) {
                console.error("Error playing video:", error);
                setHasVideoError(true);
            }
        };

        const pauseVideo = () => {
            if (!video.paused) {
                video.pause();
            }
        };

        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('loadstart', handleLoadStart);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                        playVideo();
                    } else {
                        pauseVideo();
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

        // Initial playback check
        if (videoContainer.getBoundingClientRect().top < window.innerHeight * 0.6) {
            playVideo();
        }

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('error', handleError);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('loadstart', handleLoadStart);
            observer.disconnect();
            video.pause();
            video.removeAttribute('src');
            video.load();
        };
    }, []);

    // Laptop Version
    const LaptopTechnologies = () => (
        <motion.div 
            className="technologies-container"
            style={{ opacity }}
        >
            <div className='technologies-heading'>Copilot Technology</div>
            <div className="video-container" ref={videoContainerRef}>
                {isVideoLoading && !hasVideoError && (
                    <motion.img 
                        className="background-image"
                        src="/Main.png"
                        alt="Loading placeholder"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.5 }}
                    />
                )}
                {hasVideoError && (
                    <motion.img 
                        className="background-image"
                        src="/Main.png"
                        alt="Video fallback"
                    />
                )}
                <video 
                    ref={videoRef}
                    className="background-video"
                    muted
                    playsInline
                    preload="metadata"
                    poster="/Main.png"
                    style={{ opacity: isVideoLoading || hasVideoError ? 0 : 1 }}
                >
                    <source src="/laptopdark.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="tech-cards-container">
                    <motion.div 
                        className="tech-card"
                        style={{ opacity: cardOpacity1 }}
                    >
                        <p><b>AI Model:</b> Copilot is built on a Specialized Language Model developed by HRS Labs. The model is trained with 20 years of corporate lodging and meetings procurement, booking and payment data across all industries in the global marketplace. Annually the Copilot model adds billions rate impressions, hundreds of corporate rates and rate audits, 2-digit million payment and invoice insights</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card"
                        style={{ opacity: cardOpacity2 }}
                    >
                        <p><b>Cloud:</b> Copilot is hosted on HRS' vetted and infinitely scalable cloud infrastructure trusted by Fortune 500 companies and government organizations globally.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card"
                        style={{ opacity: cardOpacity3 }}
                    >
                        <p><b>Open Platform:</b> Copilot API seamlessly connects into your existing lodging and meetings ecosystem. Automatically ingest spend from TMC, OBT, Chain and Expense systems and export insightful reports into inhouse data and process tools.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card"
                        style={{ opacity: cardOpacity4 }}
                    >
                        <p><b>Security:</b> Copilot's model operated under privacy per company account and is quality-controlled against hallucinations. Copilot infrastructure is compliant with GDPR, PCI-DSS, CSRD, ISO14067, TISAX.</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );

    // Tablet Version
    const TabletTechnologies = () => (
        <motion.div 
            className="technologies-container-tablet"
            style={{ opacity }}
        >
            <div className='technologies-heading-tablet'>Copilot Technology</div>
            <div className="video-container-tablet" ref={videoContainerRef}>
                <motion.img 
                    className="background-image-tablet"
                    src="/Main.png"
                    alt="Technology Background"
                />
                <div className="tech-cards-container-tablet">
                    <motion.div 
                        className="tech-card-tablet"
                        style={{ opacity: cardOpacity1 }}
                    >
                        <p><b>AI Model</b> : Copilot is built on a Specialized Language Model developed by HRS Labs. The model is trained with 20 years of corporate lodging and meetings procurement, booking and payment data across all industries in the global marketplace. Annually the Copilot model adds billions of rate impressions, hundreds of corporate rates and rate audits, 2-digit million payment and invoice insights</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-tablet"
                        style={{ opacity: cardOpacity2 }}
                    >
                        <p><b>Cloud</b> : Copilot is hosted on HRS' vetted and infinitely scalable cloud infrastructure trusted by Fortune 500 companies and government organizations globally.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-tablet"
                        style={{ opacity: cardOpacity3 }}
                    >
                        <p><b>Open Platform</b> : Copilot API seamlessly connects into your existing lodging and meetings ecosystem. Automatically ingest spend from TMC, OBT, Chain and Expense systems and export insightful reports into inhouse data and process tools.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-tablet"
                        style={{ opacity: cardOpacity4 }}
                    >
                        <p><b>Security</b> : Copilot's model operated under privacy per company account and is quality-controlled against hallucinations. Copilot infrastructure is compliant with GDPR, PCI-DSS, CSRD, ISO14067, TISAX.</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );

    // Mobile Version
    const MobileTechnologies = () => (
        <motion.div 
            className="technologies-container-mobile"
            style={{ opacity }}
        >
            <div className='technologies-heading-mobile'>Copilot Technology</div>
            <div className="video-container-mobile" ref={videoContainerRef}>
                <motion.img 
                    className="background-image-mobile"
                    src="/Main.png"
                    alt="Technology Background"
                />
                <div className="tech-cards-container-mobile">
                    <motion.div 
                        className="tech-card-mobile"
                        style={{ opacity: cardOpacity1 }}
                    >
                        <p> <b>AI Model</b> : Copilot is built on a Specialized Language Model developed by HRS Labs. The model is trained with 20 years of corporate lodging and meetings procurement, booking and payment data across all industries in the global marketplace. Annually the Copilot model adds billions of rate impressions, hundreds of corporate rates and rate audits, 2-digit million payment and invoice insights</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-mobile"
                        style={{ opacity: cardOpacity2 }}
                    >
                        <p><b>Cloud</b> : Copilot is hosted on HRS' vetted and infinitely scalable cloud infrastructure trusted by Fortune 500 companies and government organizations globally.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-mobile"
                        style={{ opacity: cardOpacity3 }}
                    >
                        <p><b>Open Platform</b> : Copilot API seamlessly connects into your existing lodging and meetings ecosystem. Automatically ingest spend from TMC, OBT, Chain and Expense systems and export insightful reports into inhouse data and process tools.</p>
                    </motion.div>
                    <motion.div 
                        className="tech-card-mobile"
                        style={{ opacity: cardOpacity4 }}
                    >
                        <p> <b>Security</b> : Copilot's model operated under privacy per company account and is quality-controlled against hallucinations. Copilot infrastructure is compliant with GDPR, PCI-DSS, CSRD, ISO14067, TISAX.</p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="technologies-section" ref={targetRef}>
            {isLaptop && <LaptopTechnologies />}
            {isTablet && <TabletTechnologies />}
            {isMobile && <MobileTechnologies />}
        </div>
    );
};

export default Technologies; 