'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  threshold?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 50,
  threshold = 0.2,
  className = ''
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!elementRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            gsap.fromTo(
              entry.target,
              {
                opacity: 0,
                y,
              },
              {
                opacity: 1,
                y: 0,
                duration,
                delay,
                ease: 'power2.out',
              }
            )
          }
        })
      },
      { threshold }
    )

    observer.observe(elementRef.current)

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay, duration, y, threshold])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
