import React from 'react'
import './Workplace.css'
import structureSvg from '/structure.svg'
export default function Workplace() {
  return (
    <>
      <div className='workplace-container'>
        <div className='workplace-content'>
          <div className='workplace-header'>
            <h1>Workplace AI.</h1>
          </div>
          <div className='workplace-sub-header'>
            <p>APARATUS TECHNOLOGIES<br/>ESTD 2024</p>
            <p className='workplace-sub-header-p1'>Convert Discord thread bugs into,<br />GitHub issues and keep them in <br />sync with Calendar events.</p>
            <p className='workplace-sub-header-p2'>a_ACTION intercepts LLM function or tool calls,<br />manages authentication, maps them to real- <br />world APIs, and ensures reliable execution.</p>
            <p className='workplace-sub-header-p3'>Integrate with over 25 agentic frameworks, giving<br/>AI agents the ability to plan, coordinate,<br/>and execute actions across tools,<br />with execution handled automatically.</p>
          </div>
          <div className="workplace-svg-img">
            <img 
              src={structureSvg} 
              alt="Workplace Structure Diagram" 
              style={{
                width: '100vw',
                maxHeight: '95%',
                height: 'auto',
                position: 'absolute',
                bottom: 0,
                transform: 'scale(1.2)',
                border: '1px solid red' // Debug border
              }}
              onError={(e) => {
                console.error('Failed to load structure.svg:', e);
                e.target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Successfully loaded structure.svg');
              }}
            />
          </div>
        </div>
      </div>
    
    </> 
  )
}