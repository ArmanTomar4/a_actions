import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './Navbar.css'
import { useModal } from '../contexts/ModalContext'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Navbar = () => { 
    const [activeSection, setActiveSection] = useState('hero')
    const { openModal } = useModal()
    const [navTheme, setNavTheme] = useState('dark') // 'light' for black text, 'dark' for white text
    const indicatorRef = useRef(null)
    const navItemsRef = useRef([])

    // Section mapping - hero not in nav menu but still tracked for theming
    const sections = [
        { id: 'opening', name: 'FEATURES', theme: 'dark' },
        { id: 'cards', name: 'APPLICATIONS', theme: 'dark' },
        { id: 'connect-anything', name: 'HOW IT WORKS', theme: 'light' },
        { id: 'workplace', name: 'STATS', theme: 'dark' }
    ]
    
    // All sections including hero for scroll detection
    const allSections = [
        { id: 'hero', theme: 'dark' }, // white text on hero
        ...sections
    ]

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.querySelector(`.${
            sectionId === 'hero' ? 'hero-container' :
            sectionId === 'opening' ? 'page-openingO' : 
            sectionId === 'cards' ? 'cards-container' : 
            sectionId === 'connect-anything' ? 'connect-anything-container' : 
            'workplace-container'
        }`)
        if (element) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: element, offsetY: 70 },
                ease: "power2.inOut"
            })
        }
    }

    // Update active indicator position
    const updateIndicator = (index) => {
        if (indicatorRef.current && navItemsRef.current[index]) {
            const navItem = navItemsRef.current[index]
            const navMenu = navItem.parentElement
            const itemRect = navItem.getBoundingClientRect()
            const menuRect = navMenu.getBoundingClientRect()
            
            const offsetLeft = itemRect.left - menuRect.left - 10 // 10px to the left of the item
            
            gsap.to(indicatorRef.current, {
                duration: 0.6,
                x: offsetLeft,
                ease: "power2.inOut"
            })
        }
    }

    useEffect(() => {
        // Set up scroll triggers for all sections including hero
        const triggers = allSections.map((section, index) => {
            const className = section.id === 'hero' ? '.hero-container' :
                            section.id === 'opening' ? '.page-openingO' : 
                            section.id === 'cards' ? '.cards-container' :
                            section.id === 'connect-anything' ? '.connect-anything-container' :
                            '.workplace-container'
            
            return ScrollTrigger.create({
                trigger: className,
                start: "top 100px",
                end: "bottom 100px",
                onEnter: () => {
                    setActiveSection(section.id)
                    setNavTheme(section.theme)
                    // Only update indicator for nav menu items (not hero)
                    if (section.id !== 'hero') {
                        const navIndex = sections.findIndex(s => s.id === section.id)
                        updateIndicator(navIndex)
                    }
                },
                onEnterBack: () => {
                    setActiveSection(section.id)
                    setNavTheme(section.theme)
                    // Only update indicator for nav menu items (not hero)
                    if (section.id !== 'hero') {
                        const navIndex = sections.findIndex(s => s.id === section.id)
                        updateIndicator(navIndex)
                    }
                }
            })
        })

        // Initial indicator position
        setTimeout(() => updateIndicator(0), 100)

        return () => {
            triggers.forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div className={`nav-container nav-theme-${navTheme}`}>
            <div className='nav-section-left'>
                <div className='logo'>
                    <p>A_Action</p>
                </div>
                <div className="nav-divider"></div>
            </div>
            <div className='nav-section-center'>
                <ul className='nav-menu'>
                    <div className='nav-indicator' ref={indicatorRef}></div>
                    {sections.map((section, index) => (
                        <li 
                            key={section.id}
                            className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                            ref={el => navItemsRef.current[index] = el}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='nav-section-right'>
            <div className="nav-divider"></div>

                <button className='nav-button' onClick={() => openModal('Access')}>
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
