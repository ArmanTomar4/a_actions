import { col } from 'framer-motion/client'
import React from 'react'
import { useModal } from '../contexts/ModalContext'
import arrowPattern from '../assets/arrow-pattern.svg'

function Hero() {
  const { openModal } = useModal();

  return (
    <div className="hero-container">
      <div className="hero-content">
        <div className="hero-left-section">
          <h1 style={{ color: '#fff' }}>a_Action</h1>
          <h1 style={{ color: '#84D04D' }}>We are creating that layer that lets intelligence build intuition</h1>
            <button onClick={() => openModal('Action')}>
              <p>Request Access</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.833933 13.6665C0.521501 13.3541 0.521501 12.8475 0.833933 12.5352L11.4683 1.90078H4.59961C4.15779 1.90078 3.79961 1.54261 3.79961 1.10078C3.79961 0.658957 4.15779 0.300781 4.59961 0.300781H13.3996C13.6118 0.300781 13.8153 0.385069 13.9654 0.535101C14.1153 0.685133 14.1996 0.888605 14.1996 1.10078V9.9008C14.1996 10.3426 13.8414 10.7008 13.3996 10.7008C12.9579 10.7008 12.5996 10.3426 12.5996 9.9008V3.03216L1.96529 13.6665C1.65288 13.9789 1.14635 13.9789 0.833933 13.6665Z" fill="#1C2024" />
            </svg>
            </button> 
        </div>
        <div className="hero-right-section">
          <img 
            src={arrowPattern} 
            alt="arrows" 
            style={{ 
              width: '100%', 
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              maxWidth: '100%',
              maxHeight: '100%',
              position: 'relative',
              zIndex: 1
            }} 
            onError={(e) => {
              console.error('Failed to load arrow-pattern.svg:', e);
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
      {/* Bottom Info */}
      <div className="bottom-info">
        <div className="bottom-section">
          <div className="info-label" style={{ margin: '1px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="white" />
              </svg></div>
            <div> SCROLL DOWN</div>
          </div>
          <div className="info-value" style={{ color: '#ffffff00' }}>.</div>

        </div>

        <div className="bottom-section">
          <div className="info-label">TAGLINE</div>
          <div className="info-value">ANY DATA TO INTELLIGENCE</div>
        </div>

        <div className="bottom-section">
          <div className="info-label">PARENT COMPANY</div>
          <div className="info-value">A_PARATUS</div>
        </div>

        <div className="bottom-section">
          <div className="info-label">ESTD</div>
          <div className="info-value">2024 -</div>
        </div>
      </div>
    </div>
  )
}

export default Hero
