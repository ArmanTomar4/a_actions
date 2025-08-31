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
            <p>a_ACTION intercepts LLM function or tool calls,<br /> manages authentication, maps them to real- <br />world APIs, and ensures reliable execution.</p>
          </div>
          <div className="workplace-svg-img">
            <img src="./structure.svg" alt="error" />
          </div>
        </div>
      </div>
    
    </>
  )
}