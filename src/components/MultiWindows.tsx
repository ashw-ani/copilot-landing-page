import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './MultiWindows.css';

const MultiWindows = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
    
    // Create scale and opacity transforms for each image
    const scale1 = useTransform(scrollYProgress, [0.1, 0.3], [0.5, 1]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.4], [0.5, 1]);
    const scale3 = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);
    const scale4 = useTransform(scrollYProgress, [0.4, 0.6], [0.5, 1]);
    const scale5 = useTransform(scrollYProgress, [0.5, 0.7], [0.5, 1]);

    const opacity1 = useTransform(scrollYProgress, [0.1, 0.2, 0.2, 0.3], [0, 1, 1, 1]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.3, 0.4], [0, 1, 1, 1]);
    const opacity3 = useTransform(scrollYProgress, [0.3, 0.4, 0.4, 0.5], [0, 1, 1, 1]);
    const opacity4 = useTransform(scrollYProgress, [0.4, 0.5, 0.5, 0.6], [0, 1, 1, 1]);
    const opacity5 = useTransform(scrollYProgress, [0.5, 0.6, 0.6, 0.7], [0, 1, 1, 1]);

    return (
        <div className="multiwindows-section" ref={targetRef}>
            <motion.div 
                className="multiwindows-container"
                style={{ opacity }}
            >
                <div className='multiwindows-heading'>Multi-Window Experience</div>
                <div className="multiwindows-content-container">
                    <div className="multiwindows-images-container">
                        <motion.img 
                            src="/1.png"
                            alt="Seamless Integration"
                            className="multiwindows-image multiwindows-image-1"
                            style={{ 
                                scale: scale1,
                                opacity: opacity1,
                            }}
                        />
                        <motion.img 
                            src="/2.png"
                            alt="Intelligent Layout"
                            className="multiwindows-image multiwindows-image-2"
                            style={{ 
                                scale: scale2,
                                opacity: opacity2,
                            }}
                        />
                        <motion.img 
                            src="/3.png"
                            alt="Cross-Window Sync"
                            className="multiwindows-image multiwindows-image-3"
                            style={{ 
                                scale: scale3,
                                opacity: opacity3,
                            }}
                        />
                        <motion.img 
                            src="/4.png"
                            alt="Customizable Views"
                            className="multiwindows-image multiwindows-image-4"
                            style={{ 
                                scale: scale4,
                                opacity: opacity4,
                            }}
                        />
                        <motion.img 
                            src="/5.png"
                            alt="Customizable Views"
                            className="multiwindows-image multiwindows-image-5"
                            style={{ 
                                scale: scale5,
                                opacity: opacity5,
                            }}
                        />
                    </div>
                    <img 
                        src="/main.png"
                        alt="Background Laptop"
                        className="multiwindows-background-image"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default MultiWindows; 