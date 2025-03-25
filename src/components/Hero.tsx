import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
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

    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1]);

    const handleLearnMore = () => {
        const previewSection = document.querySelector('.preview-section');
        if (previewSection) {
            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Laptop Version (Original)
    const LaptopHero = () => (
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
                        className="hero-content"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.h1 
                            className="hero-heading1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Copilot
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
                                opacity: { duration: 5, ease: "easeOut" },
                                x: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
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
                        </motion.h1>
                        <motion.h1 
                            className="hero-heading2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Your Personal AI Consultant
                        </motion.h1>
                        <motion.p 
                            className="hero-description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            Unlock smarter decisions, seamless program management, and real-time insights — all in one AI-driven platform.
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
                    <motion.div 
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <motion.img
                            src="/Main.png"
                            alt="Hero Illustration"
                            className="hero-right-image"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        />
                        {/* <motion.img
                            src="/4.png"
                            alt="Feature 1"
                            className="hero-floating-image hero-floating-image-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        />
                        <motion.img
                            src="/2.png"
                            alt="Feature 2"
                            className="hero-floating-image hero-floating-image-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        />
                        <motion.img
                            src="/3.png"
                            alt="Feature 3"
                            className="hero-floating-image hero-floating-image-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    /> */}
                </motion.div>
            </motion.section>
        </motion.div>
    );

    // Tablet Version
    const TabletHero = () => (
        <motion.div 
            className="hero-container hero-container-tablet"
            style={{ opacity }}
        >
            <motion.section 
                className="hero hero-tablet"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                    className="hero-content hero-content-tablet"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h1 
                        className="hero-heading1 hero-heading1-tablet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Copilot
                        <motion.img
                            src="/frame1.svg"
                            alt="Copilot Logo"
                            className="hero-logo hero-logo-tablet"
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
                                opacity: { duration: 5, ease: "easeOut" },
                                x: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
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
                    </motion.h1><motion.img
                        src="/Main.png"
                        alt="Hero Illustration"
                        className="hero-right-image hero-right-image-tablet"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    />
                    <motion.h1 
                        className="hero-heading2 hero-heading2-tablet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Your Personal AI Consultant
                    </motion.h1>
                    <motion.p 
                        className="hero-description hero-description-tablet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Unlock smarter decisions, seamless program management, and real-time insights — all in one AI-driven platform.
                    </motion.p>
                    <motion.div 
                        className="hero-actions hero-actions-tablet"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <motion.button 
                            className="hero-button hero-button--primary hero-button-tablet"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onGetStarted}
                        >
                            Get Started
                        </motion.button>
                        <motion.button 
                            className="hero-button hero-button--secondary hero-button-tablet"
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
    );

    // Mobile Version
    const MobileHero = () => (
        <motion.div 
            className="hero-container hero-container-mobile"
            style={{ opacity }}
        >
            <motion.section 
                className="hero hero-mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                    className="hero-content hero-content-mobile"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h1 
                        className="hero-heading1 hero-heading1-mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Copilot
                        <motion.img
                            src="/frame1.svg"
                            alt="Copilot Logo"
                            className="hero-logo hero-logo-mobile"
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
                                opacity: { duration: 5, ease: "easeOut" },
                                x: { duration: 2.5, ease: [0.16, 1, 0.3, 1] },
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
                    </motion.h1>
                    <motion.img
                        src="/Main.png"
                        alt="Hero Illustration"
                        className="hero-right-image hero-right-image-mobile"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    />
                    <motion.h1 
                        className="hero-heading2 hero-heading2-mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Your Personal AI Consultant
                    </motion.h1>
                    <motion.p 
                        className="hero-description hero-description-mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Unlock smarter decisions, seamless program management, and real-time insights — all in one AI-driven platform.
                    </motion.p>
                    <motion.div 
                        className="hero-actions hero-actions-mobile"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        <motion.button 
                            className="hero-button hero-button--primary hero-button-mobile"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onGetStarted}
                        >
                            Get Started
                        </motion.button>
                        <motion.button 
                            className="hero-button hero-button--secondary hero-button-mobile"
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
    );

    return (
        <div className="hero-section" ref={targetRef}>
            {isLaptop && <LaptopHero />}
            {isTablet && <TabletHero />}
            {isMobile && <MobileHero />}
        </div>
    );
};

export default Hero;