'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
import './PageLoader.css'

// Lazy load Aurora with no SSR
const AuroraBackground = dynamic(() => import('./AuroraBackground'), { ssr: false })

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [showAurora, setShowAurora] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const logo = logoRef.current
    const aurora = auroraRef.current
    if (!overlay || !logo) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check WebGL support
    const canvas = document.createElement('canvas')
    const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    
    // Show Aurora only if motion is allowed and WebGL is available
    if (!prefersReduced && hasWebGL) {
      setShowAurora(true)
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlay, {
          yPercent: -100,
          duration: prefersReduced ? 0.3 : 0.9,
          ease: 'power4.inOut',
          onComplete: () => setVisible(false),
        })
      },
    })

    if (prefersReduced) {
      // Simple fade for reduced motion
      gsap.set(logo, { opacity: 1, y: 0 })
      tl.to({}, { duration: 0.8 })
    } else {
      // Full animation with Aurora fade-in
      gsap.set(logo, { opacity: 0, y: 20 })
      if (aurora) gsap.set(aurora, { opacity: 0 })

      tl
        .to(aurora, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
        .to(logo, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.2)
        .to({}, { duration: 1 })
    }
  }, [])

  if (!visible) return null

  return (
    <div ref={overlayRef} className="page-loader" aria-hidden="true">
      {/* Aurora background layer */}
      {showAurora && (
        <div ref={auroraRef} className="page-loader__aurora">
          <AuroraBackground
            colorStops={['#F5F1E8', '#EBC9A0', '#F2D98D']}
            amplitude={0.8}
            blend={0.6}
            speed={0.4}
          />
        </div>
      )}
      
      {/* Vignette overlay */}
      <div className="page-loader__vignette" />
      
      {/* Film grain */}
      <div className="page-loader__grain" />

      {/* Crumpled Paper Texture */}
      <div className="page-loader__paper-texture" />

      {/* Logo matching reference */}
      <div ref={logoRef} className="page-loader__logo">
        {/* Toast Icon (top-right) */}
        <svg 
          className="page-loader__toast-icon"
          viewBox="0 0 100 100" 
          fill="none"
        >
          {/* Back slice (darker) */}
          <path 
            d="M 58 25 C 58 20 60 15 65 13 C 70 11 75 12 78 15 L 85 50 C 86 55 84 60 80 63 C 76 66 70 66 65 64 L 58 25 Z" 
            fill="#E3A55A"
          />
          {/* Front slice (main yellow) */}
          <path 
            d="M 45 20 C 45 15 47 10 52 8 C 57 6 62 7 65 10 L 72 45 C 73 50 71 55 67 58 C 63 61 57 61 52 59 L 45 20 Z" 
            fill="#F2B94B"
          />
          {/* Crust edge highlight */}
          <path 
            d="M 47 19 C 47 16 48 13 51 11 C 53 10 56 10 58 12" 
            stroke="#FCD889" 
            strokeWidth="2" 
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Wordmark */}
        <div className="page-loader__wordmark">
          french toast
        </div>
        
        {/* Subline */}
        <div className="page-loader__subline">
          BAKERY & KITCHEN
        </div>
      </div>
    </div>
  )
}
