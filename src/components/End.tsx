import React from 'react';
import { motion } from 'framer-motion';
import './End.css';
// import './FloatingIcon.css';

interface EndProps {
    onGetStarted: () => void;
}

const End: React.FC<EndProps> = ({ onGetStarted }) => {
    return (
        <div className="end-section">
            <div style={{ position: 'relative', width: '100%' }}>
                
                <div className="end-content">
                <motion.img
                    src="/frame1.svg"
                    alt="Copilot Logo"
                    className="hero-logo"
                    style={{ 
                        perspective: 1000,
                        transformStyle: "preserve-3d"
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1,
                        y: [0, -10, 0, -10, 0, 0, 0],
                        rotateY: [0, 0, 0, 0, 0, 360, 360],
                        scale: [1, 1, 1, 1, 1, 1.1, 1],
                        transition: {
                            opacity: {
                                duration: 0.6,
                                delay: 0.3
                            },
                            y: {
                                times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            rotateY: {
                                times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            },
                            scale: {
                                times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }
                    }}
                />
                    <h2>You are the pilot – and we're your Copilot</h2>
                    <p>Ready to step into the future of corporate travel?</p>
                    <div className="action-buttons">
                        <button 
                            className="get-started" 
                            onClick={onGetStarted}
                        >
                            Get started
                        </button>
                        <button className="contact-sales">Contact Us</button>
                    </div>
                </div>
            </div>
            <div className="footer-links">
                <p className="trust-text">HRS. Trusted by over 500 global enterprises</p>
                <div className="links">
                    <a href="https://copilot.app.hrs.com/register">About HRS</a>
                    <a href="https://copilot.app.hrs.com/register">Careers</a>
                    <a href="https://copilot.app.hrs.com/register">Privacy policy</a>
                    <a href="https://copilot.app.hrs.com/register">Terms and conditions</a>
                </div>
            </div>
        </div>
    );
};

export default End; 