'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface SplitTextProps {
  text: string
  delay?: number
  duration?: number
  className?: string
  stagger?: number
}

export default function SplitText({
  text,
  delay = 0,
  duration = 0.6,
  className = '',
  stagger = 0.03
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char')
    
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power2.out',
      }
    )
  }, [delay, duration, stagger])

  const splitChars = text.split('').map((char, index) => (
    <span key={index} className="char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {splitChars}
    </div>
  )
}
