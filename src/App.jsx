import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Opening from './components/Opening'
import Cards from './components/Cards'
import ConnectAnything from './components/ConnectAnything'
import Footer from './components/Footer'
import RequestAccess from './components/RequestAccess'
import FAQ from './components/FAQ'
import FAQmobile from './components/FAQmobile'
import Chatbot from './components/Chatbot'
import Workplace from './components/Workplace'
function Home() { 
  return (
    <>
   <Navbar />   
   <Hero />
   <Opening />
   <Cards />
   <ConnectAnything />
    
     <Workplace />
   <FAQ />
   <FAQmobile />
   <Chatbot />
   <RequestAccess />
   <Footer />
   </>
  )
}

function NotFound() {
  return (
    <main>
      <h2>404 - Not Found</h2>
      <Link to="/">Go Home</Link>
    </main>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      autoRaf: false,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LazyMotion>
  )
}
