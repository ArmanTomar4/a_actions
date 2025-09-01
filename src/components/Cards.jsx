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
        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="85" viewBox="0 0 96 85" fill="none">
        <defs>
          <mask id="mask0_2170_23114" maskUnits="userSpaceOnUse" x="0" y="8" width="41" height="77">
            <path d="M0 23.5C0 10.5213 9.11172 5.26065 20.3516 11.75C31.5915 18.2393 40.7032 34.0213 40.7032 47V85L0 61.5V23.5Z" fill="white"/>
          </mask>
          <mask id="mask1_2170_23114" maskUnits="userSpaceOnUse" x="55" y="8" width="41" height="77">
            <path d="M55 47C55 34.0213 64.1117 18.2393 75.3516 11.75C86.5915 5.26065 95.7032 10.5213 95.7032 23.5V61.5L55 85V47Z" fill="white"/>
          </mask>
        </defs>
        
        <g mask="url(#mask0_2170_23114)">
          <path d="M10.3926 17.5C10.3926 4.52131 19.5043 -0.739346 30.7442 5.75C41.9841 12.2393 51.0958 28.0213 51.0958 41V79L10.3926 55.5V17.5Z" fill="#EAEAEA"/>
          <rect width="47" height="12" transform="matrix(0.866025 0.5 -0.866025 0.5 10.3926 55.5)" fill="#84D04D"/>
          <path d="M0 61.5005V23.5005C0 17.2707 2.09934 12.8192 5.5257 10.5918L15.918 4.5918C12.4916 6.8192 10.3923 11.2707 10.3923 17.5005V55.5005L0 61.5005Z" fill="#69AD38"/>
        </g>
        
        <g mask="url(#mask1_2170_23114)">
          <path d="M44.6079 41C44.6079 28.0213 53.7196 12.2393 64.9595 5.75C76.1994 -0.739346 85.3111 4.52131 85.3111 17.5V55.5L44.6079 79V41Z" fill="#EAEAEA"/>
          <rect width="47" height="12" transform="matrix(0.866025 -0.5 0.866025 0.5 44.6079 79)" fill="#69AD38"/>
          <path d="M95.7032 61.5005V23.5005C95.7032 17.2707 93.6038 12.8192 90.1775 10.5918L79.7852 4.5918C83.2115 6.8192 85.3109 11.2707 85.3109 17.5005V55.5005L95.7032 61.5005Z" fill="#84D04D"/>
        </g>
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
              <svg 
      width="68"
      height="82" 
      viewBox="0 0 68 82" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M18.2705 10.7151C18.2705 6.39051 21.3066 4.63764 25.0517 6.79992L51.0465 21.808C54.7917 23.9703 57.8277 29.2289 57.8277 33.5535V63.5696C57.8277 67.8942 54.7917 69.647 51.0465 67.4848L25.0518 52.4767C21.3066 50.3144 18.2705 45.0558 18.2705 40.7312V10.7151Z" 
        fill="#E9ECE7"
      />
      <rect 
        width="11.7455" 
        height="30.0162" 
        transform="matrix(0.866025 -0.5 0 1 57.8281 33.5527)" 
        fill="#69AD38"
      />
      <rect 
        width="30.0162" 
        height="11.7455" 
        transform="matrix(0.866025 0.5 -0.866025 0.5 35.2241 0.925781)" 
        fill="#84D04D"
      />
      <path 
        d="M20.2568 6.32435C21.581 5.55988 23.3164 5.79737 25.0519 6.79935L35.2238 0.926622C33.4883 -0.0753553 31.7528 -0.312852 30.4287 0.451626L20.2568 6.32435Z" 
        fill="#84D04D"
      />
      <path 
        d="M57.8281 33.5537C57.8281 29.2292 54.7921 23.9706 51.0469 21.8083L61.2187 15.9355C64.9639 18.0978 68 23.3564 68 27.681L57.8281 33.5537Z" 
        fill="#69AD38"
      />
      <path 
        d="M55.8418 67.9582C57.1659 67.1937 57.828 65.572 57.828 63.568L67.9998 57.6953C67.9998 59.6993 67.3378 61.321 66.0137 62.0854L55.8418 67.9582Z" 
        fill="#69AD38"
      />
      <path 
        d="M0 21.1545C0 16.83 3.03607 15.0771 6.78124 17.2394L32.776 32.2474C36.5212 34.4097 39.5572 39.6683 39.5572 43.9929V74.0091C39.5572 78.3336 36.5212 80.0865 32.776 77.9242L6.78124 62.9161C3.03607 60.7539 0 55.4952 0 51.1707V21.1545Z" 
        fill="#EAEAEA"
      />
      <rect 
        width="11.7455" 
        height="30.0162" 
        transform="matrix(0.866025 -0.5 0 1 39.5576 43.9941)" 
        fill="#69AD38"
      />
      <rect 
        width="30.0162" 
        height="11.7455" 
        transform="matrix(0.866025 0.5 -0.866025 0.5 16.9536 11.3672)" 
        fill="#84D04D"
      />
      <path 
        d="M1.98633 16.7638C3.31044 15.9993 5.04591 16.2368 6.78138 17.2388L16.9532 11.3661C15.2178 10.3641 13.4823 10.1266 12.1582 10.8911L1.98633 16.7638Z" 
        fill="#84D04D"
      />
      <path 
        d="M39.5571 43.9932C39.5571 39.6686 36.5211 34.41 32.7759 32.2477L42.9477 26.375C46.6929 28.5373 49.729 33.7959 49.729 38.1205L39.5571 43.9932Z" 
        fill="#69AD38"
      />
      <path 
        d="M37.5713 78.3996C38.8954 77.6351 39.5575 76.0134 39.5575 74.0094L49.7293 68.1367C49.7293 70.1407 49.0673 71.7624 47.7432 72.5269L37.5713 78.3996Z" 
        fill="#69AD38"
      />
      <path 
        d="M15.2081 47.4815L14.6119 47.1373C12.6845 46.0245 11.7208 45.4681 11.31 44.4971C10.8992 43.5263 11.2906 42.73 12.0734 41.1375L14.4268 36.3499C15.1385 34.9019 15.4944 34.178 16.1848 34.0558C16.8751 33.9336 17.7513 34.4394 19.5038 35.4512L22.218 37.0183C24.3469 38.2474 25.4113 38.8619 25.8127 39.8967C26.2143 40.9316 25.6862 41.6995 24.63 43.2352L23.2375 45.2597C22.7125 46.0232 22.4499 46.4049 22.4536 46.8436C22.4584 47.4137 22.7196 48.0872 23.1417 48.617C23.4664 49.0249 23.9955 49.3304 25.0538 49.9414C26.3917 50.7138 27.0607 51.1001 27.4091 51.5687C27.8617 52.1774 28.0987 52.9358 28.0157 53.5103C27.9517 53.9525 27.5018 54.2672 26.6018 54.8968L19.4115 59.9264C17.9992 60.9143 17.293 61.4082 16.8188 60.8492C16.3446 60.2899 16.5723 59.232 17.0277 57.116L17.9199 52.9712C18.2666 51.36 18.4401 50.5544 18.0231 49.7102C17.6061 48.866 16.8067 48.4045 15.2081 47.4815Z" 
        stroke="#141B34" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
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
              <svg 
      width="75" 
      height="94" 
      viewBox="0 0 75 94" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle 
        cx="28" 
        cy="28" 
        r="28" 
        transform="matrix(0.866025 0.5 0 1 17.6724 0.5)" 
        fill="#EAEAEA"
      />
      <path 
        d="M24.7744 12.8024C29.5093 10.0688 35.715 10.918 41.9208 14.501L50.5811 9.50096C44.3753 5.91804 38.1695 5.06879 33.4347 7.80245L24.7744 12.8024Z" 
        fill="#84D04D"
      />
      <path 
        d="M66.1696 56.5C66.1696 41.036 55.3131 22.232 41.9209 14.5L50.5812 9.5C63.9733 17.232 74.8299 36.036 74.8299 51.5L66.1696 56.5Z" 
        fill="#69AD38"
      />
      <path 
        d="M59.0674 72.1985C63.8022 69.4648 66.1696 63.6658 66.1696 56.5L74.8299 51.5C74.8299 58.6658 72.4625 64.4648 67.7276 67.1985L59.0674 72.1985Z" 
        fill="#69AD38"
      />
      <circle 
        cx="28" 
        cy="28" 
        r="28" 
        transform="matrix(0.866025 0.5 0 1 0.401855 9.93945)" 
        fill="#EAEAEA"
      />
      <path 
        d="M7.50391 22.2419C12.2387 19.5082 18.4445 20.3575 24.6503 23.9404L33.3106 18.9404C27.1048 15.3575 20.899 14.5082 16.1642 17.2419L7.50391 22.2419Z" 
        fill="#84D04D"
      />
      <path 
        d="M48.8991 65.9395C48.8991 50.4755 38.0426 31.6714 24.6504 23.9395L33.3106 18.9395C46.7028 26.6714 57.5594 45.4755 57.5594 60.9395L48.8991 65.9395Z" 
        fill="#69AD38"
      />
      <path 
        d="M41.7969 81.6379C46.5317 78.9043 48.8991 73.1053 48.8991 65.9395L57.5594 60.9395C57.5594 68.1053 55.192 73.9043 50.4571 76.6379L41.7969 81.6379Z" 
        fill="#69AD38"
      />
      <path 
        d="M36.5789 59.5C36.5789 51.2157 30.7629 41.1421 23.5885 37C16.4141 32.8579 10.5981 36.2157 10.5981 44.5C10.5981 52.7842 16.4141 62.8579 23.5885 67C30.7629 71.1421 36.5789 67.7842 36.5789 59.5Z" 
        stroke="#141B34" 
        strokeWidth="1.5"
      />
      <path 
        d="M23.583 51.9961L23.5947 52.0028" 
        stroke="#141B34" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M23.5884 37V43" 
        stroke="#141B34" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M36.579 59.5L31.3828 56.5" 
        stroke="#141B34" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M23.5884 61V67" 
        stroke="#141B34" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M15.7943 47.5L10.5981 44.5" 
        stroke="#141B34" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
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
              <svg 
      width="42" 
      height="88" 
      viewBox="0 0 42 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="mask0_2170_23103" maskUnits="userSpaceOnUse" x="0" y="0" width="42" height="88">
          <rect 
            width="48" 
            height="64" 
            transform="matrix(0.866025 0.5 0 1 0 0)" 
            fill="white"
          />
        </mask>
        <clipPath id="clip0_2170_23103">
          <rect 
            width="31.7046" 
            height="31.7046" 
            fill="white" 
            transform="matrix(0.866025 0.5 0 1 14 17)"
          />
        </clipPath>
      </defs>
      
      <g mask="url(#mask0_2170_23103)">
        <rect 
          width="12" 
          height="64" 
          transform="matrix(0.866025 -0.5 0 1 0 0)" 
          fill="#69AD38"
        />
        <rect 
          width="48" 
          height="12" 
          transform="matrix(0.866025 0.5 -0.866025 0.5 10.3926 58)" 
          fill="#84D04D"
        />
        <rect 
          width="48" 
          height="64" 
          transform="matrix(0.866025 0.5 0 1 10.3926 -6)" 
          fill="#EAEAEA"
        />
      </g>
      
      <g clipPath="url(#clip0_2170_23103)">
        <path 
          d="M28.8492 27.0744C28.8492 27.0744 23.6969 23.566 22.8578 24.0504C22.0187 24.5348 22.4811 30.7511 22.4811 30.7511" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M28.8492 53.781C28.8492 53.781 23.6969 51.3402 22.8578 49.8869C22.0187 48.4335 22.4811 42.7511 22.4811 42.7511" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M39.2417 33.0744C39.2417 33.0744 44.3941 35.5154 45.2331 36.9687C46.0722 38.4219 45.6098 44.1044 45.6098 44.1044" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M39.2417 59.781C39.2417 59.781 44.3941 63.2896 45.2331 62.8052C46.0722 62.3206 45.6098 56.1044 45.6098 56.1044" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M36.6577 41.935L44.5191 37.3962" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M31.4434 44.9281L23.1851 49.7276" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M31.4438 38.9305L23.4526 25.1016" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M36.6167 47.916L45.1233 62.5712" 
          stroke="black" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
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
              <div className="card-icon"> <img src="./fourth.svg" alt="error" />
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