'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './PageLoader.css'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const text = textRef.current
    const line = lineRef.current
    const sub = subRef.current
    if (!overlay || !text || !line || !sub) return

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the whole overlay up and out
        gsap.to(overlay, {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => setVisible(false),
        })
      },
    })

    // Start hidden
    gsap.set([text, line, sub], { opacity: 0 })
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    tl
      // Wordmark fades + rises in
      .to(text, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.1)
      // Line draws across
      .to(line, {
        opacity: 1,
        scaleX: 1,
        duration: 0.7,
        ease: 'power3.inOut',
      }, 0.55)
      // Sub text fades in
      .to(sub, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.8)
      // Hold, then exit
      .to({}, { duration: 0.8 })

  }, [])

  if (!visible) return null

  return (
    <div ref={overlayRef} className="page-loader" aria-hidden="true">
      <div className="page-loader__inner">
        <div ref={textRef} className="page-loader__wordmark" style={{ transform: 'translateY(20px)' }}>
          french<br />toast
        </div>
        <div ref={lineRef} className="page-loader__line" />
        <p ref={subRef} className="page-loader__sub" style={{ transform: 'translateY(8px)' }}>
          Panampilly Nagar · Kochi
        </p>
      </div>
    </div>
  )
}
