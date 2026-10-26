'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export default function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.8,
  distance = 100,
  className = ''
}: SlideInProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const fromVars: any = {
      opacity: 0,
    }

    switch (direction) {
      case 'left':
        fromVars.x = -distance
        break
      case 'right':
        fromVars.x = distance
        break
      case 'up':
        fromVars.y = -distance
        break
      case 'down':
        fromVars.y = distance
        break
    }

    gsap.fromTo(
      elementRef.current,
      fromVars,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power2.out',
      }
    )
  }, [direction, delay, duration, distance])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
