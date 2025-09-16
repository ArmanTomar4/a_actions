import React, { useState, useEffect, useRef } from 'react'
import './Cards.css'

function Cards() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const cards = [
    {
      icon: (
        <img 
          src="/first.svg" 
          alt="Enhanced Efficiency Icon" 
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      ),
      title: "Enhanced Efficiency",
      description: "Automate routine tasks, clear bottlenecks, and free your team to focus on game-changing projects."
    },
    {
      icon: (
        <img 
          src="/second.svg" 
          alt="Greater Accuracy Icon" 
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      ),
      title: "Greater Accuracy",
      description: "Standardized workflows ensure flawless execution across every process, every time."
    },
    {
      icon: (
        <img 
          src="/third.svg" 
          alt="Scalable Customization Icon" 
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
            display: 'block'
          }}
        />
      ),
      title: "Scalable Customization",
      description: "Tailor automation to fit your business. Stay flexible, adapt fast, and unlock better outcomes at scale."
    },
    {
      icon: (
        <img 
          src="/fourth.svg" 
          alt="Collaboration Elevated Icon" 
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
            display: 'block'
          }}
        />
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

  // Swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleManualNavigation(nextCard);
    } else if (isRightSwipe) {
      handleManualNavigation(prevCard);
    }
  };

  return (
    <>
      <div id="features-section" className="cards-container">
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
        <div 
          className="mobile-carousel" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
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
              <img 
                src="/first.svg" 
                alt="Enhanced Efficiency Icon" 
                style={{
                  width: '68px',
                  height: '82px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
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
              <img 
                src="/second.svg" 
                alt="Greater Accuracy Icon" 
                style={{
                  width: '75px',
                  height: '94px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
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
              <img 
                src="/third.svg" 
                alt="Scalable Customization Icon" 
                style={{
                  width: '42px',
                  height: '88px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
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
                <img 
                  src="/fourth.svg" 
                  alt="Collaboration Elevated Icon" 
                  style={{
                    width: '96px',
                    height: '85px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                  onError={(e) => {
                    console.error('Failed to load fourth.svg:', e);
                    e.target.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Successfully loaded fourth.svg');
                  }}
                />
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