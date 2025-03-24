import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Popup.css';
import DynamicsForm from './DynamicsForm';
interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string, companyName: string) => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, onSubmit }) => {
    // const [email, setEmail] = useState('');
    // const [companyName, setCompanyName] = useState('');
    // const [emailError, setEmailError] = useState('');
    // const [companyError, setCompanyError] = useState('');

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
        
    //     // Reset errors
    //     setEmailError('');
    //     setCompanyError('');

    //     // Validate
    //     let isValid = true;
    //     if (!email) {
    //         setEmailError('Email is required');
    //         isValid = false;
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         setEmailError('Please enter a valid email');
    //         isValid = false;
    //     }

    //     if (!companyName) {
    //         setCompanyError('Company name is required');
    //         isValid = false;
    //     }

    //     if (isValid) {
    //         onSubmit(email, companyName);
    //         setEmail('');
    //         setCompanyName('');
    //         onClose();
    //     }
    // };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="popup-backdrop"
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1 }}
                        // exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div 
                        className="popup-content"
                        // initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        // animate={{ opacity: 1, scale: 1, y: 0 }}
                        // exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        // transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    > 
                        <motion.div 
                            className="popup-floating-icon"
                            // initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                                opacity: 1,
                                // y: [0, -10, 0],
                                // rotateY: [0, 360, 360],
                                // scale: [1, 1.1, 1],
                            }}
                            
                        >
                            <img src="/frame1.svg" alt="Copilot Logo" />
                        </motion.div>
                        <div className="popup-header">
                            <h2>Get Started</h2>
                            <button 
                                className="popup-close"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <svg viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                </svg>
                            </button>
                        </div>
                        {/* <form onSubmit={handleSubmit} className="popup-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={emailError ? 'error' : ''}
                                />
                                {emailError && <span className="error-message">{emailError}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="company">Company Name</label>
                                <input
                                    type="text"
                                    id="company"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Enter your company name"
                                    className={companyError ? 'error' : ''}
                                />
                                {companyError && <span className="error-message">{companyError}</span>}
                            </div>
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form> */}
                        <DynamicsForm />
                        
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Popup; 