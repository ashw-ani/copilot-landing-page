import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './BenefitCards.css';

const BenefitCards = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 20%"]
    });

    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const positions = {
        card1: {
            opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.15], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0,  0.20,0.2], [1,  1, 0])
        },
        card2: {
            opacity: useTransform(scrollYProgress, [0.2, 0.35], [0, 1]),
            y: useTransform(scrollYProgress, [0.2, 0.35], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.2, 0.39, 0.4], [1, 1, 0])
        },
        card3: {
            opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]),
            y: useTransform(scrollYProgress, [0.6, 0.75], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.7, 0.89, 0.9], [.7, 1, 0])
        },
        card4: {
            opacity: useTransform(scrollYProgress, [0.4, 0.55], [0, 1]),
            y: useTransform(scrollYProgress, [0.4, 0.55], [50, 0]),
            cornerOpacity: useTransform(scrollYProgress, [0.4, 0.6, 0.6], [.7, 1, 0])
        }
    };

    const benefits = [
        {
            title: "80% Time Saved",
            description: "Automate approvals and streamline workflows in real time",
            icon: "⏱️",
            cornerImage: "/frame1.svg"
        },
        {
            title: "+20%  Traveler Satisfaction",
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
            title: "+20% Savings",
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

    // Laptop Version (Original - Unchanged)
    const LaptopBenefits = () => (
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
    );

    // Tablet Version
    const TabletBenefits = () => (
        <div className="benefits-container benefits-container-tablet">
            <motion.div
                className="benefits-title benefits-title-tablet"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                <h2>Transform data into measurable outcomes</h2>
            </motion.div>
            <div className="benefits-grid benefits-grid-tablet">
                {benefits.map((benefit, index) => {
                    // const animations = getCardAnimation(index);
                    return (
                        <motion.div
                            key={benefit.title}
                            className={`benefit-card benefit-card-tablet benefit-card-${index + 1}-tablet`}
                            style={{
                                // opacity: animations.opacity,
                                // y: animations.y
                                opacity: 1,
                                
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.img 
                                src={benefit.cornerImage} 
                                alt="" 
                                className="corner-image corner-image-tablet"
                                loading="lazy"
                                style={{
                                    // opacity: animations.cornerOpacity
                                    opacity: 0
                                }}
                            />
                            <div className="benefit-icon benefit-icon-tablet">{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );

    // Mobile Version
    const MobileBenefits = () => (
        <div className="benefits-container benefits-container-mobile">
            <motion.div
                className="benefits-title benefits-title-mobile"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                <h2>Transform data into measurable outcomes</h2>
            </motion.div>
            <div className="benefits-grid benefits-grid-mobile">
                {benefits.map((benefit, index) => {
                    // const animations = getCardAnimation(index);
                    return (
                        <motion.div
                            key={benefit.title}
                            className={`benefit-card benefit-card-mobile benefit-card-${index + 1}-mobile`}
                            style={{
                                // opacity: animations.opacity,
                                // y: animations.y
                                opacity: 1,
                                
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <motion.img 
                                src={benefit.cornerImage} 
                                alt="" 
                                className="corner-image corner-image-mobile"
                                loading="lazy"
                                style={{
                                    // opacity: animations.cornerOpacity
                                    opacity: 0
                                }}
                            />
                            <div className="benefit-icon benefit-icon-mobile">{benefit.icon}</div>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <section className="benefits-section" ref={containerRef}>
            {isLaptop && <LaptopBenefits />}
            {isTablet && <TabletBenefits />}
            {isMobile && <MobileBenefits />}
        </section>
    );
};

export default BenefitCards;