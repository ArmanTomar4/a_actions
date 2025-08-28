import React, { useState, useEffect, useRef } from 'react'
import './Cards.css'

function Cards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const cards = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
          <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
          <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
        </svg>
      ),
      title: "Enhanced Efficiency",
      description: "Automate routine tasks, clear bottlenecks, and free your team to focus on game-changing projects."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
          <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
          <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
        </svg>
      ),
      title: "Greater Accuracy",
      description: "Standardized workflows ensure flawless execution across every process, every time."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
          <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
          <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
        </svg>
      ),
      title: "Scalable Customization",
      description: "Tailor automation to fit your business. Stay flexible, adapt fast, and unlock better outcomes at scale."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
          <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
          <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
        </svg>
      ),
      title: "Collaboration. Elevated.",
      description: "Design, refine, and deploy. Visual-first automation lets your team put AI to work—smarter and faster."
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Auto-swipe functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % cards.length);
      }, 2500); // 2.5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, cards.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleManualNavigation = (action) => {
    setIsPaused(true);
    action();
    // Resume auto-swipe after 5 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  return (
    <>
      <div className="cards-container">
        <div className="cards-header">
          <div className="cards-header-title">
            Workplace AI.
            <br />
            Minus the data exposure risks.
          </div>
          <div className="cards-header-subtitle">
            Keep all your data within your own private environment for maximum security and compliance.
          </div>
        </div>
        
        {/* Mobile Carousel */}
        <div className="mobile-carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button className="carousel-btn prev-btn" onClick={() => handleManualNavigation(prevCard)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="carousel-container">
            <div className="carousel-track">
              {cards.map((card, index) => (
                <div key={index} className={`card carousel-card ${index === currentCard ? 'active' : index < currentCard ? 'prev' : ''}`}>
                  <div className="card-content">
                    <div className="card-icon">
                      {card.icon}
                    </div>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="carousel-btn next-btn" onClick={() => handleManualNavigation(nextCard)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="carousel-dots">
            {cards.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentCard ? 'active' : ''}`}
                onClick={() => handleManualNavigation(() => setCurrentCard(index))}
              />
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="cards-grid">
          <div className="card">
            <div className="card-content">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
                  <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
                  <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
                </svg>
              </div>
              <h3 className="card-title">Enhanced Efficiency</h3>
              <p className="card-description">
                Automate routine tasks, clear bottlenecks, and free your team to focus on game-changing projects.
              </p>
            </div>
          </div>

          <div className="card">
            
            <div className="card-content">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
                  <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
                  <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
                </svg>
              </div>
              <h3 className="card-title">Greater Accuracy</h3>
              <p className="card-description">
                Standardized workflows ensure flawless execution across every process, every time.
              </p>
            </div>
          </div>

          <div className="card">
           
            <div className="card-content">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
                  <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
                  <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
                </svg>
              </div>
              <h3 className="card-title">Scalable Customization</h3>
              <p className="card-description">
                Tailor automation to fit your business. Stay flexible, adapt fast, and unlock better outcomes at scale.
              </p>
            </div>
          </div>

          <div className="card">
            
            <div className="card-content">
              <div className="card-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="8" width="32" height="32" rx="4" fill="#4CAF50"/>
                  <rect x="12" y="12" width="24" height="24" rx="2" fill="#81C784"/>
                  <rect x="16" y="16" width="16" height="16" rx="1" fill="#A5D6A7"/>
                </svg>
              </div>
              <h3 className="card-title">Collaboration. Elevated.</h3>
              <p className="card-description">
                Design, refine, and deploy. Visual-first automation lets your team put AI to work—smarter and faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cards