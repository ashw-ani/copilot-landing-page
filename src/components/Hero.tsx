import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

interface HeroProps {
    onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1]);

    const handleLearnMore = () => {
        const previewSection = document.querySelector('.preview-section');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="hero-section" ref={targetRef}>
            <motion.div 
                className="hero-container"
                style={{ opacity }}
            >
                <motion.section 
                    className="hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div 
                        className="hero-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.img
                            src="/frame1.svg"
                            alt="Copilot Logo"
                            className="hero-logo"
                            style={{ 
                                perspective: 1000,
                                transformStyle: "preserve-3d"
                            }}
                            initial={{ 
                                opacity: 1, 
                                x: -200,
                                y: -200 
                            }}
                            animate={{ 
                                opacity: 1,
                                x: 0,
                                y: [0, -10, 0, -10, 0, 0, 0],
                                rotateY: [0, 0, 0, 0, 0, 360, 360],
                                scale: [1, 1, 1, 1, 1, 1.1, 1],
                            }}
                            transition={{
                                opacity: {
                                    duration: 5,
                                    ease: "easeOut"
                                },
                                x: {
                                    duration: 2.5,
                                    ease: [0.16, 1, 0.3, 1]
                                },
                                y: {
                                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2.5
                                },
                                rotateY: {
                                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2.5
                                },
                                scale: {
                                    times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2.5
                                }
                            }}
                        />
                        <motion.h1 
                            className="hero-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Copilot<br></br>
                            Your Personal AI Consultant
                        </motion.h1>
                        <motion.p 
                            className="hero-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            Unlock smarter decisions, seamless program management, and real-time insights—all in one AI-driven platform.
                        </motion.p>
                        <motion.div 
                            className="hero-actions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <motion.button 
                                className="hero-button hero-button--primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onGetStarted}
                            >
                                Get Started
                            </motion.button>
                            <motion.button 
                                className="hero-button hero-button--secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLearnMore}
                            >
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.section>
            </motion.div>
        </div>
    );
};

export default Hero;