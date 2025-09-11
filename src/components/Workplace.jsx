import React from 'react'
import './Workplace.css'
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
            <img src="/structure.svg" alt="error" />
          </div>
        </div>
      </div>
    
    </> 
  )
}