import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-section left'>
                <div className='logo'>
                    <p>A_Action</p>
                </div>
            </div>
            <div className='nav-section center'>
                <ul className='nav-menu'>
                    <li className='nav-item'>Home</li>
                    <li className='nav-item'>About</li>
                    <li className='nav-item'>Contact</li>
                </ul>
            </div>
            <div className='nav-section right'>
                <button className='nav-button'>Request Access</button>
            </div>
        </div>
    )
}

export default Navbar
