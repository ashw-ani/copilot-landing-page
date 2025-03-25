import React, { useRef, useState, useEffect, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './Testimonials.css';

// Update the feature type to include cornerIcon
type Feature = {
    title: string;
    description: string;
    video: string;
    cornerIcon: string;
}

const Testimonials = (props: { data: any[], isReversed: boolean }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [videosLoaded, setVideosLoaded] = useState<boolean[]>([]);
    const videoRefs = useRef<RefObject<HTMLVideoElement>[]>([]);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const testimonials = props.data;
    // const testimonials = [
    //     {
    //         features: [{
    //             title: "Full market access",
    //             description: "Get pre-screened, verified access to market insights in selected procurement RFPs",
    //             video: "/v1.mp4"
    //         },
    //         {
    //             title: "Full market access",
    //             description: "Get pre-screened, verified access to market insights in selected procurement RFPs",
    //             video: "/v2.mp4"
    //         },
    //         {
    //             title: "End-to-End Integration",
    //             description: "Streamlined process from RFPs to post-bidding and meetings support",
    //             video: "/v1.mp4"
    //         }]
    //     }
    // ];

    // Create scale and opacity animations for each feature
    const feature1Scale = useTransform(scrollYProgress, [0, 0.22, 0.22], [1.05, 1.05, 1]);
    const feature1Opacity = useTransform(scrollYProgress, [0, 0.22, 0.22], [1, 1, 0.15]);

    const feature2Scale = useTransform(scrollYProgress, [0, 0.22, 0.22, 0.44, 0.44], [1, 1, 1.05, 1.05, 1]);
    const feature2Opacity = useTransform(scrollYProgress, [0, 0.22, 0.22, 0.44, 0.44], [0.15, 0.15, 1, 1, 0.15]);

    const feature3Scale = useTransform(scrollYProgress, [0, 0.44, 0.44, 0.66], [1, 1, 1.05, 1.05]);
    const feature3Opacity = useTransform(scrollYProgress, [0, 0.44, 0.44, 0.66], [0.15, 0.15, 1, 1]);

    // Add state for active feature
    const [activeFeature, setActiveFeature] = useState(0);

    // Initialize video refs and start preloading immediately
    useEffect(() => {
        if (!testimonials || !testimonials[0]?.features) return;

        // Create refs for all videos
        videoRefs.current = testimonials[0].features.map(() => React.createRef<HTMLVideoElement>());
        setVideosLoaded(new Array(testimonials[0].features.length).fill(false));

        // Create and configure video elements for each feature
        testimonials[0].features.forEach((feature: Feature, index: number) => {
            const video = document.createElement('video');
            video.style.display = 'none';
            video.preload = 'auto';
            video.muted = true;
            video.playsInline = true;
            
            // Create source element
            const source = document.createElement('source');
            source.src = feature.video;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            
            // Start loading immediately
            video.load();
            
            // Track when each video is loaded
            video.addEventListener('loadeddata', () => {
                setVideosLoaded(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });

                // Update the actual video element
                if (videoRefs.current[index].current) {
                    const actualVideo = videoRefs.current[index].current!;
                    actualVideo.src = feature.video;
                    actualVideo.load();
                }
            });

            // Append to document
            document.body.appendChild(video);
            
            // Remove after starting the load
            setTimeout(() => {
                document.body.removeChild(video);
            }, 100); // Give more time for loading to start
        });

        return () => {
            videoRefs.current.forEach(ref => {
                if (ref.current) {
                    ref.current.src = '';
                    ref.current.load();
                }
            });
        };
    }, [testimonials]);

    // Update video playback based on current video with improved loading check
    useEffect(() => {
        videoRefs.current.forEach((videoRef, index) => {
            if (videoRef.current) {
                if (index === currentVideo) {
                    // Ensure video is loaded before attempting to play
                    if (videosLoaded[index] && videoRef.current.readyState >= 3) {
                        videoRef.current.play().catch(console.error);
                    } else {
                        // If not loaded, set up a one-time listener
                        const handleCanPlay = () => {
                            videoRef.current?.play().catch(console.error);
                            videoRef.current?.removeEventListener('canplay', handleCanPlay);
                        };
                        videoRef.current.addEventListener('canplay', handleCanPlay);
                    }
                } else {
                    videoRef.current.pause();
                }
            }
        });
    }, [currentVideo, videosLoaded]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (value) => {
            if (value < 0.22) {
                setCurrentVideo(0);
                setActiveFeature(0);
            } else if (value < 0.44) {
                setCurrentVideo(1);
                setActiveFeature(1);
            } else {
                setCurrentVideo(2);
                setActiveFeature(2);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    // Laptop Version (Original - Unchanged)
    const LaptopTestimonials = () => (
        <motion.div className="testimonials-container">
            <div className='testimonials-container-heading'>{props.data[0].heading}</div>
            {testimonials.map((testimonial, index) => (
                <div
                    key={index}
                    className="testimonial-content"
                    style={{
                        flexDirection: testimonial.order
                    }}
                >
                    <div className="testimonial-text">
                        <div className="features-list">
                            {testimonial.features.map((feature: Feature, idx: number) => (
                                <motion.div
                                    key={idx}
                                    className="testimonial-feature-item"
                                    initial={{
                                        opacity: idx === 0 ? 1 : 0.15,
                                        scale: idx === 0 ? 1.05 : 1
                                    }}
                                    style={{
                                        scale: idx === 0 ? feature1Scale : idx === 1 ? feature2Scale : feature3Scale,
                                        opacity: idx === 0 ? feature1Opacity : idx === 1 ? feature2Opacity : feature3Opacity,
                                    }}
                                    transition={{
                                        scale: { duration: 0.3 },
                                        opacity: { duration: 0.3 }
                                    }}
                                >
                                    <motion.img 
                                        src={feature.cornerIcon}
                                        alt=""
                                        className="feature-corner-icon"
                                        style={{
                                            opacity: idx === activeFeature ? 1 : 0
                                        }}
                                        transition={{
                                            opacity: { duration: 0.22 }
                                        }}
                                    />
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="testimonial-media">
                        <div className="media-container">
                            {testimonial.features.map((feature: { video: string }, idx: number) => (
                                <motion.video
                                    key={idx}
                                    className="testimonial-video"
                                    playsInline
                                    muted
                                    loop
                                    autoPlay
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: currentVideo === idx ? 1 : 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <source src={feature.video} type="video/mp4" />
                                </motion.video>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    );

    // Update the video elements in tablet and mobile versions
    const videoProps = {
        playsInline: true,
        muted: true,
        loop: true,
        preload: "auto" as const,
        style: { 
            opacity: 1,
            display: 'block'
        }
    };

    // Tablet Version
    const TabletTestimonials = () => (
        <div className="testimonials-wrapper-tablet">
            <motion.div className="testimonials-viewport-container-tablet">
                <div className='testimonials-container-heading-tablet'>{props.data[0].heading}</div>
                {testimonials.map((testimonial) => (
                    testimonial.features.map((feature: Feature, idx: number) => (
                        <motion.div
                            key={idx}
                            className="testimonial-block-tablet"
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: currentVideo === idx ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <div className="testimonial-video-wrapper-tablet">
                                <video
                                    ref={videoRefs.current[idx]}
                                    className="testimonial-video-tablet"
                                    {...videoProps}
                                >
                                    <source src={feature.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="testimonial-content-block-tablet">
                                <motion.img 
                                    src={feature.cornerIcon}
                                    alt=""
                                    className="feature-corner-icon-tablet"
                                />
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </motion.div>
                    ))
                ))}
            </motion.div>
        </div>
    );

    // Mobile Version with same video loading optimization
    const MobileTestimonials = () => (
        <div className="testimonials-wrapper-mobile">
            <motion.div className="testimonials-viewport-container-mobile">
                <div className='testimonials-container-heading-mobile'>{props.data[0].heading}</div>
                {testimonials.map((testimonial) => (
                    testimonial.features.map((feature: Feature, idx: number) => (
                        <motion.div
                            key={idx}
                            className="testimonial-block-mobile"
                            initial={{ opacity: 0 }}
                            animate={{ 
                                opacity: currentVideo === idx ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <div className="testimonial-video-wrapper-mobile">
                                <video
                                    ref={videoRefs.current[idx]}
                                    className="testimonial-video-mobile"
                                    {...videoProps}
                                >
                                    <source src={feature.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="testimonial-content-block-mobile">
                                <motion.img 
                                    src={feature.cornerIcon}
                                    alt=""
                                    className="feature-corner-icon-mobile"
                                />
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        </motion.div>
                    ))
                ))}
            </motion.div>
        </div>
    );

    return (
        <div className="testimonials-section" ref={targetRef}>
            {isLaptop && <LaptopTestimonials />}
            {isTablet && <TabletTestimonials />}
            {isMobile && <MobileTestimonials />}
        </div>
    );
};

export default Testimonials;