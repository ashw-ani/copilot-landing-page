import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

interface NavbarProps {
  onGetStarted: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onGetStarted }) => {
  return (
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
};

export default Navbar;