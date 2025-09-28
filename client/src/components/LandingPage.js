import React from 'react';
import './LandingPage.css';

const LandingPage = ({ connectWallet }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">BlockDrive</span>
              <br />
              Decentralized File Storage
            </h1>
            <p className="hero-subtitle">
              Store your files securely on the blockchain with IPFS integration. 
              Share, manage, and access your data with complete decentralization.
            </p>
            <div className="hero-actions">
              <button className="cta-btn gradient-btn" onClick={connectWallet}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get Started
              </button>
              <button className="learn-more-btn glass-btn">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H17V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="file-cards">
              <div className="file-card card-1">
                <div className="file-icon">📄</div>
                <div className="file-name">Document.pdf</div>
              </div>
              <div className="file-card card-2">
                <div className="file-icon">🖼️</div>
                <div className="file-name">Image.jpg</div>
              </div>
              <div className="file-card card-3">
                <div className="file-icon">🎵</div>
                <div className="file-name">Music.mp3</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="gradient-text">Why Choose</span> BlockDrive?
            </h2>
            <p className="section-subtitle">
              Experience the future of file storage with blockchain technology
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22S2 18 2 12V5L12 2L22 5V12C22 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Secure Storage</h3>
              <p className="feature-description">
                Your files are encrypted and stored on the decentralized IPFS network, 
                ensuring maximum security and privacy.
              </p>
            </div>
            
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Easy Sharing</h3>
              <p className="feature-description">
                Share your files with specific users by granting them access through 
                blockchain-based permissions.
              </p>
            </div>
            
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Decentralized</h3>
              <p className="feature-description">
                No single point of failure. Your data is distributed across multiple 
                nodes, ensuring 99.9% uptime and reliability.
              </p>
            </div>
            
            <div className="feature-card glass-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Experience blazing fast upload and download speeds with our 
                optimized IPFS network integration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">
                <span className="gradient-text">The Problem</span> We Solve
              </h2>
              <p className="about-description">
                Traditional cloud storage services like Google Drive, Dropbox, and OneDrive 
                have several critical issues:
              </p>
              <ul className="problem-list">
                <li className="problem-item">
                  <span className="problem-icon">🔒</span>
                  <span>Centralized control means your data can be accessed, modified, or deleted by the service provider</span>
                </li>
                <li className="problem-item">
                  <span className="problem-icon">💰</span>
                  <span>Recurring subscription fees that increase over time</span>
                </li>
                <li className="problem-item">
                  <span className="problem-icon">⚠️</span>
                  <span>Single point of failure - if the service goes down, you lose access to your files</span>
                </li>
                <li className="problem-item">
                  <span className="problem-icon">📊</span>
                  <span>Your personal data is mined for advertising and analytics</span>
                </li>
              </ul>
              <p className="solution-text">
                <strong>BlockDrive</strong> solves these problems by leveraging blockchain technology 
                and IPFS to create a truly decentralized, secure, and private file storage solution.
              </p>
            </div>
            
            <div className="about-visual">
              <div className="comparison-card">
                <div className="comparison-header">
                  <h3>Traditional vs Decentralized</h3>
                </div>
                <div className="comparison-content">
                  <div className="comparison-item">
                    <span className="comparison-label">Security</span>
                    <div className="comparison-bars">
                      <div className="bar traditional">60%</div>
                      <div className="bar decentralized">95%</div>
                    </div>
                  </div>
                  <div className="comparison-item">
                    <span className="comparison-label">Privacy</span>
                    <div className="comparison-bars">
                      <div className="bar traditional">30%</div>
                      <div className="bar decentralized">100%</div>
                    </div>
                  </div>
                  <div className="comparison-item">
                    <span className="comparison-label">Reliability</span>
                    <div className="comparison-bars">
                      <div className="bar traditional">85%</div>
                      <div className="bar decentralized">99.9%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
