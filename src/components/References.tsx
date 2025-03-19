import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './References.css';

const References = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const references = [
        {
            video: "/v1.mp4",
            caption: "Copilot transformed how we manage lodging, saving time and costs effortlessly.",
            author: "Travel CEO, Siemens",
            avatar: "S",
            cornerIcon: "/frame1.svg"  // Add corner icon paths
        },
        {
            video: "/v1.mp4",
            caption: "From data chaos to clarity. Copilot is our strategic partner.",
            author: "Head of Procurement, Deloitte",
            avatar: "D",
            cornerIcon: "/frame1.svg"
        },
        {
            video: "/v1.mp4",
            caption: "A seamless experience for our entire travel ecosystem.",
            author: "Global Travel Manager, Allianz",
            avatar: "A",
            cornerIcon: "/frame1.svg"
        }
    ];

    const positions = {
        card1: {
            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            cornerOpacity: useTransform(scrollYProgress, [0, 0.29, 0.3], [1, 1, 0])
        },
        card2: {
            opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
            cornerOpacity: useTransform(scrollYProgress, [0.3, 0.49, 0.5], [1, 1, 0])
        },
        card3: {
            opacity: useTransform(scrollYProgress, [0.5, 0.6], [0, 1]),
            cornerOpacity: useTransform(scrollYProgress, [0.5, 0.69, 0.7], [1, 1, 0])
        }
    };

    return (
        <div className="references-section" ref={targetRef}>
            
            <motion.div 
                className="references-container"
                style={{
                    backgroundColor: "#202020"
                }}
            >
                
                    <div className='references-heading'>Why leading enterprises choose Copilot</div>
                    <div className='reference-wrapper'>
                    {references.map((ref, index) => (
                        <motion.div
                            key={index}
                            className="reference-card"
                            style={{
                                opacity: index === 0 ? positions.card1.opacity : index === 1 ? positions.card2.opacity : positions.card3.opacity,
                            }}
                        >
                            <motion.img 
                                src={ref.cornerIcon}
                                alt=""
                                className="reference-corner-icon"
                                style={{
                                    opacity: index === 0 
                                        ? positions.card1.cornerOpacity 
                                        : index === 1 
                                        ? positions.card2.cornerOpacity 
                                        : positions.card3.cornerOpacity
                                }}
                            />
                            <div className="reference-content">
                                <div className="reference-video-container">
                                    <video 
                                        className="reference-video"
                                        playsInline
                                        muted
                                        loop
                                        autoPlay
                                    >
                                        <source src={ref.video} type="video/mp4" />
                                    </video>
                                </div>
                                <p className="reference-quote">{ref.caption}</p>
                                <div className="reference-author">
                                    <div className="author-avatar">{ref.avatar}</div>
                                    <span>{ref.author}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default References;