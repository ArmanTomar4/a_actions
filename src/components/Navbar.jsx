import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-section-left'>
                <div className='logo'>
                    <p>A_Action</p>
                </div>
                <div className="nav-divider"></div>
            </div>
            <div className='nav-section-center'>
                <ul className='nav-menu'>
                    <li className='nav-item'>FEATURES</li>
                    <li className='nav-item'>APPLICATIONS</li>
                    <li className='nav-item'>HOW IT WORKS</li>
                    <li className='nav-item'>STATS</li>
                </ul>
            </div>
            <div className='nav-section-right'>
            <div className="nav-divider"></div>

                <button className='nav-button'>
                    Request Access
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.889614 9.10972C0.681326 8.9014 0.681326 8.5637 0.889614 8.35548L7.97916 1.26589H3.40007C3.10552 1.26589 2.86673 1.0271 2.86673 0.732552C2.86673 0.438003 3.10552 0.199219 3.40007 0.199219H9.26673C9.40817 0.199219 9.54385 0.255411 9.64391 0.355432C9.74385 0.455453 9.80007 0.591101 9.80007 0.732552V6.59923C9.80007 6.89378 9.56124 7.13256 9.26673 7.13256C8.97223 7.13256 8.7334 6.89378 8.7334 6.59923V2.02014L1.64385 9.10972C1.43558 9.31794 1.09789 9.31794 0.889614 9.10972Z" fill="#000000"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Navbar
