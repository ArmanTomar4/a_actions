import React from 'react';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-container {
          min-height: 100vh;
          background-color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 32px;
          font-family: "Alliance No.2", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: relative;
        }

        .quote-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-bottom: 80px;
          max-width: 800px;
        }

        .quote-text {
          font-size: 32px;
          font-weight: 600;
          color: #e0e0e0;
          line-height: 1.4;
          margin-bottom: 20px;
          position: relative;
        }

        .quote-attribution {
          font-size: 10px;
          color: #999;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .apparatus-section {
          text-align: center;
          width: 100% !important;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          bottom: 0;
        }

        .apparatus-logo {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          padding-left: 20px;
          padding-right: 20px;
        }

        @media (max-width: 480px) {
          .footer-container {
            height: 100vh;
            min-height: 100vh;
            padding: 0;
            display: flex;
            flex-direction: row;
            overflow: hidden;
          }

          .quote-section {
            width: 80%;
            height: 100%;
            margin: 0;
            margin-bottom: 0;
            text-align: left;
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            z-index: 2;
          }

          .quote-text {
            font-size: 28px;
            line-height: 1.35;
            margin-bottom: 20px;
          }

          .apparatus-section {
            width: 20%;
            height: 100%;
            margin: 0;
            margin-top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .apparatus-logo {
            position: absolute;
            right: 25%;
            top: 50%;
            transform: translate(50%, -50%) rotate(-90deg);
            transform-origin: center;
            height: 6%;
            width: auto;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            opacity: 0.9;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="quote-section">
          <div className="quote-text">
            " The goal is to turn data into information, and information into insight "
          </div>
          <div className="quote-attribution">
            CARLY FIORINA,<br /> FORMER CEO OF HP
          </div>
        </div>
        
        <div className="apparatus-section">
          <img src="/Union.svg" alt="APPARATUS" className="apparatus-logo" />
        </div>
      </div>
    </>
  );
};

export default Footer;