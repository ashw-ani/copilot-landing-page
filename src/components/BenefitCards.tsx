import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BenefitCards.css';

const BenefitCards = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 20%"]
    });

    const positions = {
        card1: {
            opacity: useTransform(scrollYProgress, [0, 0.2], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.2], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0, 0.29, 0.3], [.7, 1, 0])
        },
        card2: {
            opacity: useTransform(scrollYProgress, [0.3, 0.4], [0, 1]),
            y: useTransform(scrollYProgress, [0.3, 0.4], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.3, 0.49, 0.5], [.7, 1, 0])
        },
        card3: {
            opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.8], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.7, 0.89, 0.9], [.7, 1, 0])
        },
        card4: {
            opacity: useTransform(scrollYProgress, [0.5, 0.6], [0, 1]),
            y: useTransform(scrollYProgress, [0.5, 0.6], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.5, 0.69, 0.7], [.7, 1, 0])
        }
    };

    const benefits = [
        {
            title: "80% Time Saved",
            description: "Automate approvals and streamline workflows in real time",
            icon: "⏱️",
            cornerImage: "/frame1.svg" // Add your image paths
        },
        {
            title: "20%  Traveler Satisfaction",
            description: "Empower travelers while maintaining full control over your program",
            icon: "😊",
            cornerImage: "/frame1.svg"
        },
        {
            title: "100% Compliance",
            description: "Ensure adherence to company guidelines and avoid unnecessary costs",
            icon: "✓",
            cornerImage: "/frame1.svg"
        },
        {
            title: "20% Savings",
            description: "Unlock hidden savings through AI-powered spend and leakage optimization",
            icon: "💰",
            cornerImage: "/frame1.svg"
        }
    ];

    const getCardAnimation = (index: number) => {
        switch(index) {
            case 0: return positions.card1;
            case 1: return positions.card2;
            case 2: return positions.card3;
            case 3: return positions.card4;
            default: return positions.card1;
        }
    };

    return (
        <section className="benefits-section" ref={containerRef}>
            <div className="benefits-container">
                <motion.div
                    className="benefits-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Transform data into measurable outcomes</h2>
                    
                </motion.div>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => {
                        const animations = getCardAnimation(index);
                        return (
                            <motion.div
                                key={benefit.title}
                                className={`benefit-card benefit-card-${index + 1}`}
                                style={{
                                    opacity: animations.opacity,
                                    y: animations.y
                                }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <motion.img 
                                    src={benefit.cornerImage} 
                                    alt="" 
                                    className="corner-image"
                                    loading="lazy"
                                    style={{
                                        opacity: animations.cornerOpacity
                                    }}
                                />
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BenefitCards;