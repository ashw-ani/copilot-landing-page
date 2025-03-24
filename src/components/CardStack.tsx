import React, { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './CardStack.css';

const CardStack = () => {
    const cards = [
        {
            title: "No more wasted time and money",
            caption: "Smarter, faster, cost-optimized decisions in real time",
            video: "/stack1newdark.mov"
        },
        {
            title: "No more fragmented data",
            caption: "One source of truth for all travel spend",
            video: "/stack2newdark.mov"
        },
        {
            title: "No more manual processes",
            caption: "AI does the work, you make the decisions",
            video: "/stack3newdark.mov"
        },
    ].reverse(); // Reverse the array so the first card appears on top

    // Create refs for each screen size
    const firstVideoRefLaptop = useRef<HTMLVideoElement>(null);
    const secondVideoRefLaptop = useRef<HTMLVideoElement>(null);
    const thirdVideoRefLaptop = useRef<HTMLVideoElement>(null);
    const firstVideoRefTablet = useRef<HTMLVideoElement>(null);
    const secondVideoRefTablet = useRef<HTMLVideoElement>(null);
    const thirdVideoRefTablet = useRef<HTMLVideoElement>(null);
    const firstVideoRefMobile = useRef<HTMLVideoElement>(null);
    const secondVideoRefMobile = useRef<HTMLVideoElement>(null);
    const thirdVideoRefMobile = useRef<HTMLVideoElement>(null);

    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    // Group video refs by screen size
    const laptopVideoRefs = useMemo(() => [firstVideoRefLaptop, secondVideoRefLaptop, thirdVideoRefLaptop], []);
    const tabletVideoRefs = useMemo(() => [firstVideoRefTablet, secondVideoRefTablet, thirdVideoRefTablet], []);
    const mobileVideoRefs = useMemo(() => [firstVideoRefMobile, secondVideoRefMobile, thirdVideoRefMobile], []);

    const firstCardRef = useRef<HTMLDivElement>(null);
    const secondCardRef = useRef<HTMLDivElement>(null);
    const thirdCardRef = useRef<HTMLDivElement>(null);
    const cardRefs = [firstCardRef, secondCardRef, thirdCardRef];

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Create inView states
    // const firstCardInView = useInView(firstCardRef, { once: false, amount: 0.3 });
    // const secondCardInView = useInView(secondCardRef, { once: false, amount: 0.3 });
    // const thirdCardInView = useInView(thirdCardRef, { once: false, amount: 0.3 });
    // const cardInViews = useMemo(() => [firstCardInView, secondCardInView, thirdCardInView],
    //     [firstCardInView, secondCardInView, thirdCardInView]);
    // cardInViews&& console.log("") 
    // Create separate refs for each video and viewport detection
    const videoObservers = useRef<IntersectionObserver[]>([]);

    // Handle video playback for all cards
    useEffect(() => {
        const currentVideoRefs = isLaptop ? laptopVideoRefs : isTablet ? tabletVideoRefs : mobileVideoRefs;
        
        // Cleanup previous observers
        videoObservers.current.forEach(observer => observer.disconnect());
        videoObservers.current = [];

        currentVideoRefs.forEach((videoRef, index) => {
            const video = videoRef.current;
            if (!video) return;

            // Configure video
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            
            // Add error handling for loading
            video.addEventListener('error', (e) => {
                console.error(`Error loading video ${index + 1}:`, e);
            });

            // Add loading event listeners
            video.addEventListener('loadeddata', () => {
                console.log(`Video ${index + 1} loaded successfully`);
            });

            const playVideo = async () => {
                try {
                    if (video.paused) {
                        // For mobile, reload the video before playing
                        if ((isTablet || isMobile) && !video.readyState) {
                            await video.load();
                        }
                        await video.play();
                        console.log(`Video ${index + 1} playing`);
                    }
                } catch (error) {
                    console.error(`Error playing video ${index + 1}:`, error);
                }
            };

            const pauseVideo = () => {
                if (!video.paused) {
                    video.pause();
                }
            };

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
                    threshold: isLaptop ? 0.6 : isTablet ? 0.5 : 0.4,
                    rootMargin: isLaptop ? '0px' : '50px 0px'
                }
            );

            observer.observe(video);
            videoObservers.current.push(observer);

            // Initial playback check
            if (video.getBoundingClientRect().top < window.innerHeight * (isLaptop ? 0.6 : isTablet ? 0.5 : 0.4)) {
                playVideo();
            }
        });

        return () => {
            videoObservers.current.forEach(observer => observer.disconnect());
            currentVideoRefs.forEach(videoRef => {
                const video = videoRef.current;
                if (video) {
                    video.pause();
                    video.removeAttribute('src'); // Clear source to free memory
                    video.load(); // Reset video state
                }
            });
        };
    }, [isLaptop, isTablet, isMobile, laptopVideoRefs, tabletVideoRefs, mobileVideoRefs]);

    const { scrollYProgress } = useScroll({
        target: scrollContainerRef,
        offset: ["start start", "end end"]
    });

    // Transforms for laptop version (unchanged)
    const firstCardY = useTransform(scrollYProgress, [0, 0.15, 0.45], [20, 20, -1000]);
    const secondCardY = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.46, 0.75], [80, 80, 0, 0, -1000]);
    const thirdCardY = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75, 0.76], [140, 140, 140, 80, 0]);
    const yTransforms = [firstCardY, secondCardY, thirdCardY];

    const firstCardScale = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
    const secondCardScale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
    const thirdCardScale = useTransform(scrollYProgress, [0, 0.75], [0.8, 1]);
    const scaleTransforms = [firstCardScale, secondCardScale, thirdCardScale];

    const firstCardOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.46], [1, 1, 1, 0]);
    const secondCardOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.76], [1, 1, 1, 0]);
    const thirdCardOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const opacityTransforms = [firstCardOpacity, secondCardOpacity, thirdCardOpacity];

    // Update video attributes in all versions
    const videoAttributes = {
        loop: true,
        muted: true,
        playsInline: true,
        preload: "auto" as const,
        className: "card-video"
    };

    const tabletVideoAttributes = {
        ...videoAttributes,
        className: "card-video card-video-tablet"
    };

    const mobileVideoAttributes = {
        ...videoAttributes,
        className: "card-video card-video-mobile"
    };

    // Laptop Version (Original - Unchanged)
    const LaptopCardStack = () => (
                <div className="card-stack" ref={containerRef}>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            className="stack-card"
                            ref={cardRefs[index]}
                            style={{
                                y: yTransforms[index],
                                scale: scaleTransforms[index],
                                opacity: opacityTransforms[index],
                                zIndex: cards.length - index
                            }}
                            initial={{ 
                                scale: 1 - (index * 0.1),
                        y: index * 50
                            }}
                            transition={{
                                duration: 0.1,
                                ease: "linear"
                            }}
                        >
                            <div className="stack-card-media">
                                <video 
                            ref={laptopVideoRefs[index]}
                                    {...videoAttributes}
                                    src={card.video}
                                />
                            </div>
                            <div className="stack-card-content">
                                <h2>{card.title}</h2>
                                <div className="caption-container">
                                    <p className="caption">{card.caption}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Tablet Version
    const TabletCardStack = () => (
        <div className="card-stack card-stack-tablet" ref={containerRef}>
            <p className='stack-heading-tablet'>Copilot - friction-free travel management</p>
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    className="stack-card stack-card-tablet"
                    ref={cardRefs[index]}
                    style={{
                        y: yTransforms[index],
                        scale: scaleTransforms[index],
                        opacity: opacityTransforms[index],
                        zIndex: cards.length - index
                    }}
                    initial={{ 
                        scale: 1 - (index * 0.1),
                        y: index * 50
                    }}
                    transition={{
                        duration: 0.1,
                        ease: "linear"
                    }}
                >
                    <div className="stack-card-media stack-card-media-tablet">
                        <video 
                            ref={tabletVideoRefs[index]}
                            {...tabletVideoAttributes}
                            src={card.video}
                        />
                    </div>
                    <div className="stack-card-content stack-card-content-tablet">
                        <h2>{card.title}</h2>
                        <div className="caption-container caption-container-tablet">
                            <p className="caption caption-tablet">{card.caption}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Mobile Version
    const MobileCardStack = () => (
        <div className="card-stack card-stack-mobile" ref={containerRef}>
            <p className='stack-heading-mobile'>Copilot - friction-free travel management</p>
            {cards.map((card, index) => (
                <motion.div
                    key={card.title}
                    className="stack-card stack-card-mobile"
                    ref={cardRefs[index]}
                    style={{
                        y: yTransforms[index],
                        scale: scaleTransforms[index],
                        opacity: opacityTransforms[index],
                        zIndex: cards.length - index
                    }}
                    initial={{ 
                        scale: 1 - (index * 0.1),
                        y: index * 50
                    }}
                    transition={{
                        duration: 0.1,
                        ease: "linear"
                    }}
                >
                    <div className="stack-card-media stack-card-media-mobile">
                        <video 
                            ref={mobileVideoRefs[index]}
                            {...mobileVideoAttributes}
                            src={card.video}
                        />
                    </div>
                    <div className="stack-card-content stack-card-content-mobile">
                        <h2>{card.title}</h2>
                        <div className="caption-container caption-container-mobile">
                            <p className="caption caption-mobile">{card.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
    );

    return (
        <div className="card-stack-container" ref={scrollContainerRef} style={{ height: "400vh" }}>
            {isLaptop && <p className='stack-heading'>Copilot - friction-free travel management</p>}
            
           
            <div className="card-stack-sticky" style={{ position: "sticky", top: 0, height: "100vh" }}>
                {isLaptop && <LaptopCardStack />}
                {isTablet && <TabletCardStack />}
                {isMobile && <MobileCardStack />}
            </div>
        </div>
    );
};

export default CardStack;