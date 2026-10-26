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
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const auroraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const text = textRef.current
    const line = lineRef.current
    const sub = subRef.current
    const aurora = auroraRef.current
    if (!overlay || !text || !line || !sub) return

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
      gsap.set([text, line, sub], { opacity: 1, y: 0 })
      tl.to({}, { duration: 0.8 })
    } else {
      // Full animation with Aurora fade-in
      gsap.set([text, line, sub], { opacity: 0 })
      gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
      if (aurora) gsap.set(aurora, { opacity: 0 })

      tl
        .to(aurora, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
        .to(text, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.1)
        .to(line, { opacity: 1, scaleX: 1, duration: 0.7, ease: 'power3.inOut' }, 0.55)
        .to(sub, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.8)
        .to({}, { duration: 0.8 })
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

      {/* Content (text) */}
      <div className="page-loader__inner">
        <div ref={textRef} className="page-loader__wordmark" style={{ transform: 'translateY(20px)' }}>
          french<br />toast
        </div>
        <div ref={lineRef} className="page-loader__line" />
        <p ref={subRef} className="page-loader__sub" style={{ transform: 'translateY(8px)' }}>
          BAKERY , KITCHEN & STUDIO
        </p>
      </div>
    </div>
  )
}
