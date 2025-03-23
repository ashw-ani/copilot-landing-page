import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import './Navbar.css';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Laptop Version (Original)
  const LaptopNavbar = () => (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="https://www.hrs.com/enterprise/homepage/" className="navbar-logo">
          <motion.img
            src="/HRSlogo.png"
            alt="Copilot Logo"
            className="nav-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </a>
        <div className="nav-buttons">
          <button 
            className="nav-button experience" 
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );

  // Tablet Version
  const TabletNavbar = () => (
    <nav className="navbar navbar-tablet">
      <div className="navbar-container navbar-container-tablet">
        <a href="https://www.hrs.com/enterprise/homepage/" className="navbar-logo navbar-logo-tablet">
          <motion.img
            src="/HRSlogo.png"
            alt="Copilot Logo"
            className="nav-logo nav-logo-tablet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </a>
        <div className="nav-buttons nav-buttons-tablet">
          <button 
            className="nav-button experience nav-button-tablet" 
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );

  // Mobile Version
  const MobileNavbar = () => (
    <nav className="navbar navbar-mobile">
      <div className="navbar-container navbar-container-mobile">
        <a href="https://www.hrs.com/enterprise/homepage/" className="navbar-logo navbar-logo-mobile">
          <motion.img
            src="/HRSlogo.png"
            alt="Copilot Logo"
            className="nav-logo nav-logo-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </a>
        <div className="nav-buttons nav-buttons-mobile">
          <button 
            className="nav-button experience nav-button-mobile" 
            onClick={onGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {isLaptop && <LaptopNavbar />}
      {isTablet && <TabletNavbar />}
      {isMobile && <MobileNavbar />}
    </>
  );
};

export default Navbar;