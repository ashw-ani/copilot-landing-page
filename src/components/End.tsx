import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './End.css';
// import './FloatingIcon.css';

interface EndProps {
    onGetStarted: () => void;
}

const End: React.FC<EndProps> = ({ onGetStarted }) => {
    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    // Laptop Version (Unchanged)
    const LaptopEnd = () => (
        <div className="end-section">
                <div className="end-content">
                    <div className="end-content-text"><h2>You are the pilot – and we're your Copilot</h2>
                <motion.img
                    src="/frame1.svg"
                    alt="Copilot Logo"
                            className="hero-logo-end"
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
                    </div>
                    
                    <p>Ready to step into the future of corporate travel?</p>
                    <div className="action-buttons">
                        <button className="get-started" onClick={onGetStarted}>
                            Get started
                        </button>
                        {/* <button className="contact-sales">Contact Us</button> */}
                </div>
            </div>
            <div className="footer-links">
                <p className="trust-text">HRS. Trusted by Fortune 500 companies</p>
                <div className="links">
                    <a href="https://www.hrs.com/enterprise/data-protection-security/">Data Protection & Security</a>
                    <a href="https://www.hrs.com/enterprise/cookie-policy/">Cookie Policy</a>
                    <a href="https://www.hrs.com/enterprise/imprint/">Imprint</a>
                   
                </div>
            </div>
        </div>
    );

    // Tablet Version
    const TabletEnd = () => (
        <div className="end-section-tablet">
            
            <div className="end-content-tablet">
                    <div className="end-content-text-tablet"><h2>You are the pilot – and we're your Copilot</h2>
                    <motion.img
                            src="/frame1.svg"
                            alt="Copilot Logo"
                            className="hero-logo-end-tablet"
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
                    </div>
                    
                    <p>Ready to step into the future of corporate travel?</p>
                    <div className="action-buttons-tablet">
                        <button className="get-started-tablet" onClick={onGetStarted}>
                            Get started
                        </button>
                        {/* <button className="contact-sales-tablet">Contact Us</button> */}
                    </div>
                </div>
            
            <div className="footer-links-tablet">
                <p className="trust-text-tablet">HRS. Trusted by Fortune 500 companies</p>
                <div className="links-tablet">
                <a href="https://www.hrs.com/enterprise/data-protection-security/">Data Protection & Security</a>
                    <a href="https://www.hrs.com/enterprise/cookie-policy/">Cookie Policy</a>
                    <a href="https://www.hrs.com/enterprise/imprint/">Imprint</a>
                </div>
            </div>
        </div>
    );

    // Mobile Version
    const MobileEnd = () => (
        <div className="end-section-mobile">
            <div style={{ position: 'relative', width: '100%' }}>
            <div className="end-content-mobile">
                    <div className="end-content-text-mobile"><h2>You are the pilot  <br /> and we're your <br /> </h2><h2>Copilot<motion.img
                            src="/frame1.svg"
                            alt="Copilot Logo"
                            className="hero-logo-end-mobile"
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
                        /></h2>
                    
                    </div>
                    
                    <p>Ready to step into the future of corporate travel?</p>
                    <div className="action-buttons-mobile">
                        <button className="get-started-mobile" onClick={onGetStarted}>
                            Get started
                        </button>
                        {/* <button className="contact-sales-mobile">Contact Us</button> */}
                    </div>
                </div>
            </div>
            <div className="footer-links-mobile">
                <p className="trust-text-mobile">HRS. Trusted by Fortune 500 companies</p>
                <div className="links-mobile">
                <a href="https://www.hrs.com/enterprise/data-protection-security/">Data Protection & Security</a>
                    <a href="https://www.hrs.com/enterprise/cookie-policy/">Cookie Policy</a>
                    <a href="https://www.hrs.com/enterprise/imprint/">Imprint</a>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {isLaptop && <LaptopEnd />}
            {isTablet && <TabletEnd />}
            {isMobile && <MobileEnd />}
        </>
    );
};

export default End; 