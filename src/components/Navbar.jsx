import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { smoothScrollTo } from '../utils/smoothScroll.js'
import { useModal } from '../contexts/ModalContext'

function Navbar() {
  const navigate = useNavigate()
  const { openModal } = useModal()
  const [isOverOpening, setIsOverOpening] = useState(false)
  const [isOverIntelligence, setIsOverIntelligence] = useState(false)
  const [isOverSolutions, setIsOverSolutions] = useState(false)
  const [isOverPipeline, setIsOverPipeline] = useState(false)
  const [isOverConnectAnything, setIsOverConnectAnything] = useState(false)
  const [activePage, setActivePage] = useState('0')
  const rafRef = useRef(null)

  useEffect(() => {
    const getEl = (sel) => document.querySelector(sel)

    const checkInViewAtY = (el, y = 80) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.top <= y && rect.bottom > y
    }

    const handleScroll = () => {
      // Cancel any pending rAF to throttle
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        // Selectors updated to match actual sections
        const openingSection = getEl('.page-openingO')
        const connectAnythingSection = getEl('#applications-section') || getEl('.connect-anything-container')
        const intelligenceSection = getEl('.intelligence-layer-container')
        const solutionsSection = getEl('.solutions-container')
        const pipelineSection = getEl('.pipeline-container')

        // Use viewport-based checks so GSAP pinning is respected
        const overOpening = checkInViewAtY(openingSection)
        const overConnectAnything = checkInViewAtY(connectAnythingSection)
        const overIntelligence = checkInViewAtY(intelligenceSection)
        const overSolutions = checkInViewAtY(solutionsSection)
        const overPipeline = checkInViewAtY(pipelineSection)

        setIsOverOpening(overOpening)
        // Track ConnectAnything separately from Solutions
        setIsOverConnectAnything(overConnectAnything)
        setIsOverSolutions(overSolutions)
        setIsOverIntelligence(overIntelligence)
        setIsOverPipeline(overPipeline)

        // Active page update (avoid churn)
        let nextActive = activePage
        if (overOpening || overIntelligence) nextActive = 'features'
        else if (overConnectAnything || overSolutions) nextActive = 'applications'
        else if (overPipeline) nextActive = 'how-it-works'
        if (nextActive !== activePage) setActivePage(nextActive)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // run once on mount
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [activePage])

  const handleNavClick = (page) => {
    setActivePage(page)

    // Scroll to appropriate section based on page
    switch (page) {
      case 'features':
        document.querySelector('#features-section')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'applications':
        document.querySelector('#applications-section')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'how-it-works':
        document.querySelector('#how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })
        break
      default:
        break
    }
  }

  const handleRequestAccess = () => {
    openModal('Access')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <nav className={`nav-container ${isOverOpening ? 'nav-over-opening' : ''} ${isOverIntelligence ? 'nav-over-intelligence' : ''} ${isOverConnectAnything ? 'nav-over-connect-anything' : ''} ${isOverSolutions ? 'nav-over-solutions' : ''} ${isOverPipeline ? 'nav-over-pipeline' : ''}`}>
      <div className="nav-section left">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>a_ACTIONS</div>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-divider desktop-only"></div>

      <div className="nav-section center desktop-only">
        <ul className="nav-menu">
          <li
            className={`nav-item ${activePage === 'features' ? 'active' : ''}`}
            onClick={() => handleNavClick('features')}
          >
            {activePage === 'features' && <span className="nav-indicator"></span>}
            Features
          </li>
          <li
            className={`nav-item ${activePage === 'applications' ? 'active' : ''}`}
            onClick={() => handleNavClick('applications')}
          >
            {activePage === 'applications' && <span className="nav-indicator"></span>}
            Applications
          </li>
          <li
            className={`nav-item ${activePage === 'how-it-works' ? 'active' : ''}`}
            onClick={() => handleNavClick('how-it-works')}
          >
            {activePage === 'how-it-works' && <span className="nav-indicator"></span>}
            How it works
          </li>
        </ul>
      </div>

      <div className="nav-divider desktop-only"></div>

      <div className="nav-section right desktop-only">
        <div className="nav-button-wrapper">
          <button className="nav-button" onClick={handleRequestAccess}>
            Request Access
            <svg className="button-arrow" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M0.889614 9.10972C0.681326 8.9014 0.681326 8.5637 0.889614 8.35548L7.97916 1.26589H3.40007C3.10552 1.26589 2.86673 1.0271 2.86673 0.732552C2.86673 0.438003 3.10552 0.199219 3.40007 0.199219H9.26673C9.40817 0.199219 9.54385 0.255411 9.64391 0.355432C9.74385 0.455453 9.80007 0.591101 9.80007 0.732552V6.59923C9.80007 6.89378 9.56124 7.13256 9.26673 7.13256C8.97223 7.13256 8.7334 6.89378 8.7334 6.59923V2.02014L1.64385 9.10972C1.43558 9.31794 1.09789 9.31794 0.889614 9.10972Z" fill="#000000"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Simple horizontal layout */}
      <div className="nav-section right mobile-only">
        <div className="nav-button-wrapper">
          <button className="nav-button mobile-nav-button" onClick={handleRequestAccess}>
            Request Access
            {/*<svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"> */}
              <rect width="24" height="24" transform="translate(0 0.5)" fill="white" fill-opacity="0.01" />
              <path fill-rule="evenodd" clipRule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.7008 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
            {/*</svg> */}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar