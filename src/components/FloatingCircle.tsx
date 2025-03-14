import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './FloatingCircle.css';

interface Coordinate {
    centerPosition: {
        x: number;
        y: number;
    };
    scrollPercentage: number;
}

// Complete list of coordinates
const coordinatesList: Coordinate[] = [
    {
        centerPosition: { x: 880, y: 307.5 },
        scrollPercentage: 0
    },
    
    {
        centerPosition: { x: 605.5, y: 380.5 },
        scrollPercentage: 2.49
    },
    
    {
        centerPosition: { x: 453.5, y: 590.5 },
        scrollPercentage: 4.49
    },
    {
        centerPosition: { x: 100.5, y: 800.5 },
        scrollPercentage: 7.73
    },
    {
        centerPosition: { x: 120.5, y: 80 },
        scrollPercentage: 10.68
    },

    {
        centerPosition: { x: 120.5, y: 590.5 },
        scrollPercentage: 14
    },
    
    {
        centerPosition: { x: 1700, y: 795.5 },
        scrollPercentage: 16.5
    },
    {
        centerPosition: { x: 1700, y: 597.5 },
        scrollPercentage: 17.46
    },
    {
        centerPosition: { x: 1700, y: 120.5 },
        scrollPercentage: 19.36
    },
    {
        centerPosition: { x: 1700, y: 120.5 },
        scrollPercentage: 19.96
    },
    
    
    {
        centerPosition: { x: 1700, y: 797 },
        scrollPercentage: 29.93
    },
    
    {
        centerPosition: { x: 847.5, y: 743.5 },
        scrollPercentage: 30.77
    },{
        centerPosition: { x: 600, y: 650 },
        scrollPercentage: 31.55
    },
    {
        centerPosition: { x: 400, y: 600 },
        scrollPercentage: 32.15
    },
    
    {
        centerPosition: { x: 120, y: 601.5 },
        scrollPercentage: 32.9
    },
    
    {
        centerPosition: { x: 120, y: 200 },
        scrollPercentage: 36.24
    },{
        centerPosition: { x: 320, y: 100 },
        scrollPercentage: 37.96
    },
    
    {
        centerPosition: { x: 320.5, y: 130 },
        scrollPercentage: 38.81
    },
    
    {
        centerPosition: { x: 870, y: 130 },
        scrollPercentage: 42.54
    },
    
    {
        centerPosition: { x: 1460.5, y: 130 },
        scrollPercentage: 46.3
    },
    {
        centerPosition: { x: 1700, y: 130 },
        scrollPercentage: 47.1
    },
    
    {
        centerPosition: { x: 1760, y: 256.5 },
        scrollPercentage: 47.91
    },
    {
        centerPosition: { x: 1760, y: 517},
        scrollPercentage: 49.54
    },
    
    
    
    {
        centerPosition: { x: 80,y:124.5 },
        scrollPercentage: 51.38
    },
    {
        centerPosition: { x: 80, y: 190},
        scrollPercentage: 51.92
    },
 
   
    
    {
        centerPosition: { x: 80,y:190},
        scrollPercentage: 54.9
    },
    {
        centerPosition: { x: 80, y: 410},
        scrollPercentage: 55.45
    },
    {
        centerPosition: { x: 80, y: 410},
        scrollPercentage: 59.6
    },
    {
        centerPosition: { x: 80, y: 600 },
        scrollPercentage: 59.8
    },
    {
        centerPosition: { x: 80, y: 600 },
        scrollPercentage: 61.47
    },
    {
        centerPosition: { x: 80, y: 750},
        scrollPercentage: 62.34
    },
    
    {
        centerPosition: { x: 800, y: 429.5 },
        scrollPercentage: 63.56
    },
    {
        centerPosition: { x: 1700, y: 160 },
        scrollPercentage: 65.09
    },
    
    {
        centerPosition: { x: 1700, y: 200 },
        scrollPercentage: 65.7
    },
    
    {
        centerPosition: { x: 1700, y: 200},
        scrollPercentage: 69.31
    },
    {
        centerPosition: { x: 1700, y: 420 },
        scrollPercentage: 69.95
    },
    
    {
        centerPosition: { x: 1700, y: 420 },
        scrollPercentage: 73.65
    },
    {
        centerPosition: { x: 1700, y: 600 },
        scrollPercentage: 73.94
    },
    
    {
        centerPosition: { x: 1700, y: 600 },
        scrollPercentage: 75.67
    },
    {
        centerPosition: { x: 1700, y: 600 },
        scrollPercentage: 76.26
    },
    {
        centerPosition: { x: 850, y: 400 },
        scrollPercentage: 77.48
    },
    {
        centerPosition: { x: 170, y: 150 },
        scrollPercentage: 78.7
    },
    {
        centerPosition: { x: 80, y: 200 },
        scrollPercentage: 79.31
    },
    
    {
        centerPosition: {  x: 80, y: 200 },
        scrollPercentage: 82.56
    },
    {
        centerPosition: { x: 80, y: 410 },
        scrollPercentage: 83.3
    },
    {
        centerPosition: { x: 80, y: 410 },
        scrollPercentage: 87.4
    },
    
    
    {
        centerPosition: { x: 80, y: 600 },
        scrollPercentage: 87.98
    },
    
    {
        centerPosition: { x: 80, y: 600 },
        scrollPercentage: 89.91
    },
    {
        centerPosition: { x: 87.5, y: 667.5 },
        scrollPercentage: 90.41
    },
    {
        centerPosition: { x: 87.5, y: 667.5 },
        scrollPercentage: 90.91
    },
    {
        centerPosition: { x: 87.5, y: 667.5 },
        scrollPercentage: 91.4
    },
    {
        centerPosition: { x: 87.5, y: 667.5 },
        scrollPercentage: 91.9
    },
    {
        centerPosition: { x: 87.5, y: 667.5 },
        scrollPercentage: 92.4
    },
    {
        centerPosition: { x: 103.5, y: 741.5 },
        scrollPercentage: 92.9
    },
    {
        centerPosition: { x: 290.5, y: 711.5 },
        scrollPercentage: 93.4
    },
    {
        centerPosition: { x: 469.5, y: 590.5 },
        scrollPercentage: 93.9
    },
    {
        centerPosition: { x: 595.5, y: 502.5 },
        scrollPercentage: 94.4
    },
    {
        centerPosition: { x: 696.5, y: 399.5 },
        scrollPercentage: 94.9
    },
    {
        centerPosition: { x: 736.5, y: 295.5 },
        scrollPercentage: 95.4
    },
    {
        centerPosition: { x: 738.5, y: 170.5 },
        scrollPercentage: 95.89
    },
    {
        centerPosition: { x: 591.5, y: 230.5 },
        scrollPercentage: 96.39
    },
    {
        centerPosition: { x: 387.5, y: 296.5 },
        scrollPercentage: 96.89
    },
    {
        centerPosition: { x: 213.5, y: 388.5 },
        scrollPercentage: 97.39
    },
    {
        centerPosition: { x: 159.5, y: 520.5 },
        scrollPercentage: 97.89
    },
    {
        centerPosition: { x: 161.5, y: 605.5 },
        scrollPercentage: 98.39
    },
    {
        centerPosition: { x: 274.5, y: 610.5 },
        scrollPercentage: 98.89
    },
    {
        centerPosition: { x: 485.5, y: 462.5 },
        scrollPercentage: 99.39
    },
    {
        centerPosition: { x: 929.5, y: 352.5 },
        scrollPercentage: 99.89
    }
];

const FloatingCircle: React.FC = () => {
    const circleRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Create arrays for x and y coordinates with their corresponding scroll percentages
    const scrollPoints = coordinatesList.map(coord => coord.scrollPercentage / 100);
    const xPoints = coordinatesList.map(coord => coord.centerPosition.x);
    const yPoints = coordinatesList.map(coord => coord.centerPosition.y);

    // Transform scroll progress to x and y positions with linear interpolation
    const x = useTransform(scrollYProgress, scrollPoints, xPoints);
    const y = useTransform(scrollYProgress, scrollPoints, yPoints);

    // Transform scroll progress to percentage display
    const displayPercentage = useTransform(scrollYProgress, [0, 1], [0, 100], {
        clamp: false
    });

    // Debug current position
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(value => {
            const scrollPercent = value * 100;
            console.log(`Scroll: ${scrollPercent.toFixed(2)}%`);
            if (circleRef.current) {
                const rect = circleRef.current.getBoundingClientRect();
                console.log(`Circle position: x: ${rect.x}, y: ${rect.y}`);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Function to scroll by percentage
    const scrollByPercentage = (percentage: number) => {
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollAmount = documentHeight * (percentage / 100);
        const currentScroll = window.scrollY;
        window.scrollTo({
            top: currentScroll + scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <motion.div 
                ref={circleRef}
                className="floating-circle"
                style={{
                    x,
                    y,
                }}
            >
                <img src="icon.avif" alt="Floating Icon" />
            </motion.div>
            <div className="scroll-controls">
                <div className="scroll-indicator">
                    <button 
                        className="scroll-button"
                        onClick={() => scrollByPercentage(-0.5)}
                    >
                        -0.5%
                    </button>
                    <motion.span className="scroll-value">
                        {useTransform(displayPercentage, value => `${value.toFixed(2)}%`)}
                    </motion.span>
                    <button 
                        className="scroll-button"
                        onClick={() => scrollByPercentage(0.5)}
                    >
                        +0.5%
                    </button>
                </div>
            </div>
        </>
    );
};

export default FloatingCircle; 