import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="footer-shapes">
          <div className="footer-shape shape-1"></div>
          <div className="footer-shape shape-2"></div>
          <div className="footer-shape shape-3"></div>
        </div>
      </div>
      
      <div className="footer-content">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="logo-text">BlockDrive</span>
              </div>
              <p className="footer-description">
                The future of decentralized file storage. Secure, private, and completely 
                under your control.
              </p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/preetham-a-k-18b97931b" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C18.2091 8 20 9.79086 20 12V21H16V12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12V21H10V8H14V9.5C14.5523 9.5 15 9.05228 15 8.5C15 7.94772 14.5523 7.5 14 7.5H10C8.89543 7.5 8 8.39543 8 9.5V21H4V8H8V9.5C8.55228 9.5 9 9.05228 9 8.5C9 7.94772 8.55228 7.5 8 7.5H4C2.89543 7.5 2 8.39543 2 9.5V21C2 22.1046 2.89543 23 4 23H20C21.1046 23 22 22.1046 22 21V12C22 9.79086 20.2091 8 18 8H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="mailto:preethamak07@gmail.com" className="social-link" aria-label="Email">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <div className="footer-column">
                <h3 className="footer-title">Product</h3>
                <ul className="footer-list">
                  <li><a href="#features" className="footer-link">Features</a></li>
                  <li><a href="#about" className="footer-link">About</a></li>
                  <li><a href="#" className="footer-link">Documentation</a></li>
                  <li><a href="#" className="footer-link">API</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3 className="footer-title">Support</h3>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Community</a></li>
                  <li><a href="#" className="footer-link">Status</a></li>
                  <li><a href="#" className="footer-link">Contact</a></li>
                </ul>
              </div>
              
              <div className="footer-column">
                <h3 className="footer-title">Legal</h3>
                <ul className="footer-list">
                  <li><a href="#" className="footer-link">Privacy Policy</a></li>
                  <li><a href="#" className="footer-link">Terms of Service</a></li>
                  <li><a href="#" className="footer-link">Cookie Policy</a></li>
                  <li><a href="#" className="footer-link">GDPR</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="developer-info">
              <div className="developer-card glass-card">
                <div className="developer-avatar">
                  <div className="avatar-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div className="developer-details">
                  <h4 className="developer-name">
                    <span className="gradient-text">Preetham AK</span>
                  </h4>
                  <p className="developer-title">AI & Blockchain Engineer</p>
                  <div className="developer-skills">
                    <span className="skill-tag">Blockchain</span>
                    <span className="skill-tag">AI/ML</span>
                    <span className="skill-tag">Web3</span>
                    <span className="skill-tag">Smart Contracts</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-copyright">
              <p>&copy; 2025 BlockDrive. All rights reserved.</p>
              <p className="copyright-subtitle">
                Built with ❤️ by Preetham AK
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
