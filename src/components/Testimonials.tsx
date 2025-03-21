import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Testimonials.css';

// Update the feature type to include cornerIcon
type Feature = {
    title: string;
    description: string;
    video: string;
    cornerIcon: string; // Add this property
}

const Testimonials = (props: { data: any[], isReversed: boolean }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [currentVideo, setCurrentVideo] = useState(0);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

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

    return (
        <div className="testimonials-section" ref={targetRef}>
            <motion.div
                className="testimonials-container"
                style={{
                    backgroundColor: "rgb(12, 12, 12)"
                }}
            >
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
        </div>
    );
};

export default Testimonials;