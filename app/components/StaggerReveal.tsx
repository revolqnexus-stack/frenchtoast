'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface StaggerRevealProps {
  children: ReactNode
  stagger?: number
  duration?: number
  y?: number
  threshold?: number
  className?: string
  id?: string
}

/**
 * Wraps a list of children and animates them in with a staggered
 * scroll-triggered reveal. Each direct child animates independently.
 */
export default function StaggerReveal({
  children,
  stagger = 0.1,
  duration = 0.7,
  y = 40,
  threshold = 0.15,
  className = '',
  id,
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = Array.from(container.children) as HTMLElement[]

    // Set initial state
    gsap.set(items, { opacity: 0, y })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: 'power3.out',
            })
          }
        })
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [stagger, duration, y, threshold])

  return (
    <div ref={containerRef} className={className} id={id}>
      {children}
    </div>
  )
}
