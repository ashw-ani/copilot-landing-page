import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './CardStack.css';

const CardStack = () => {
    const cards = [
        {
            title: "No more wasted time and money",
            caption: "Efficient and cost-effective solutions",
     
            video: "/v2.mp4"
        },
        {
            title: "No more fragmented data",
            caption: "All your information in one place",
            
            video: "/v1.mp4"
        },
        {
            title: "No more manual processes",
            caption: "AI does the work, you make the decisions",
            
            video: "/v2.mp4"
        },
    ].reverse(); // Reverse the array so the first card appears on top

    // Create refs outside of any callbacks
    const firstVideoRef = useRef<HTMLVideoElement>(null);
    const secondVideoRef = useRef<HTMLVideoElement>(null);
    const thirdVideoRef = useRef<HTMLVideoElement>(null);
    const videoRefs = [firstVideoRef, secondVideoRef, thirdVideoRef];

    const firstCardRef = useRef<HTMLDivElement>(null);
    const secondCardRef = useRef<HTMLDivElement>(null);
    const thirdCardRef = useRef<HTMLDivElement>(null);
    const cardRefs = [firstCardRef, secondCardRef, thirdCardRef];

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Create inView states outside of any callbacks
    const firstCardInView = useInView(firstCardRef, { once: false, amount: 0.3 });
    const secondCardInView = useInView(secondCardRef, { once: false, amount: 0.3 });
    const thirdCardInView = useInView(thirdCardRef, { once: false, amount: 0.3 });
    const cardInViews = [firstCardInView, secondCardInView, thirdCardInView];

    // Handle video playback for all cards
    useEffect(() => {
        cardInViews.forEach((isInView, index) => {
            const video = videoRefs[index].current;
            if (isInView && video) {
                video.play();
            } else if (video) {
                video.pause();
            }
        });
    }, [cardInViews]);

    const { scrollYProgress } = useScroll({
        target: scrollContainerRef,
        offset: ["start start", "end end"]
    });

    // Modify Y transforms to have larger movement range
    const firstCardY = useTransform(scrollYProgress, [0, 0.15, 0.45], [20, 20, -1000]);
    const secondCardY = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.46, 0.75], [80, 80, 0, 0, -1000]);
    const thirdCardY = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.75, 0.76], [140, 140, 140, 80, 0]);
    const yTransforms = [firstCardY, secondCardY, thirdCardY];

    // Keep existing scale transforms
    const firstCardScale = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
    const secondCardScale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
    const thirdCardScale = useTransform(scrollYProgress, [0, 0.75], [0.8, 1]);
    const scaleTransforms = [firstCardScale, secondCardScale, thirdCardScale];

    const firstCardOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.46], [1, 1, 1, 0]);
    const secondCardOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.76], [1, 1, 1, 0]);
    const thirdCardOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const opacityTransforms = [firstCardOpacity, secondCardOpacity, thirdCardOpacity];

    return (
        <div className="card-stack-container" ref={scrollContainerRef} style={{ height: "400vh" }}>  {/* Tall container for scroll space */}
            <p className='stack-heading'>Copilot - friction-free travel management</p>
            <div className="card-stack-sticky" style={{ position: "sticky", top: 0, height: "100vh" }}>
                
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
                                y: index * 50  // Smaller initial stacking offset
                            }}
                            transition={{
                                duration: 0.1,
                                ease: "linear"
                            }}
                        >
                            <div className="stack-card-media">
                                <video 
                                    ref={videoRefs[index]}
                                    className="card-video"
                                    loop
                                    muted
                                    playsInline
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
            </div>
        </div>
    );
};

export default CardStack; 