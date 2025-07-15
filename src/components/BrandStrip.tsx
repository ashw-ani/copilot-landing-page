import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import './BrandStrip.css';

const BrandStrip: React.FC = () => {
    const isLaptop = useMediaQuery({ minWidth: 1024 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    // Laptop Version
    const LaptopBrandStrip = () => (
        <div className="brand-strip">
            <div className="brand-strip-container">
                <h2 className="brand-strip-heading">Leading Enterprises Trust Copilot</h2>
                <motion.div 
                    className="brand-logos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/dhl.png" alt="Brand Logo" className="brand-logo" />
                    {/* <img src="/allianz.png" alt="Brand Logo" className="brand-logo" /> */}
                    <img src="/deloitte.png" alt="Brand Logo" className="brand-logo" />
                    <img src="/siemens.png" alt="Brand Logo" className="brand-logo" />
                    
                </motion.div>
            </div>
        </div>
    );

    // Tablet Version
    const TabletBrandStrip = () => (
        <div className="brand-strip-tablet">
            <div className="brand-strip-container-tablet">
                <h2 className="brand-strip-heading-tablet">Leading Enterprises Trust Copilot</h2>
                <motion.div 
                    className="brand-logos-tablet"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/dhl.png" alt="Brand Logo" className="brand-logo-tablet" />
                    {/* <img src="/allianz.png" alt="Brand Logo" className="brand-logo-tablet" /> */}
                    <img src="/deloitte.png" alt="Brand Logo" className="brand-logo-tablet" />
                    <img src="/siemens.png" alt="Brand Logo" className="brand-logo-tablet" />
                </motion.div>
            </div>
        </div>
    );

    // Mobile Version
    const MobileBrandStrip = () => (
        <div className="brand-strip-mobile">
            <div className="brand-strip-container-mobile">
                <h2 className="brand-strip-heading-mobile">Leading Enterprises Trust Copilot</h2>
                <motion.div 
                    className="brand-logos-mobile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/dhl.png" alt="Brand Logo" className="brand-logo-mobile" />
                    {/* <img src="/allianz.png" alt="Brand Logo" className="brand-logo-mobile" /> */}
                    <img src="/deloitte.png" alt="Brand Logo" className="brand-logo-mobile" />
                    <img src="/siemens.png" alt="Brand Logo" className="brand-logo-mobile" />
                </motion.div>
            </div>
        </div>
    );

    return (
        <>
            {isLaptop && <LaptopBrandStrip />}
            {isTablet && <TabletBrandStrip />}
            {isMobile && <MobileBrandStrip />}
        </>
    );
};

export default BrandStrip; 