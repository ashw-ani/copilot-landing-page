import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <motion.img
            src="/group47.svg"
            alt="Copilot Logo"
            className="nav-logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </a>
        <div className="nav-buttons">
          <button className="nav-button experience" onClick={() => window.location.href = 'https://copilot.app.hrs.com/register'}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;