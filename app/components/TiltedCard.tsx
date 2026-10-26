'use client'

import { useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface TiltedCardProps {
  children: ReactNode
  tiltAmount?: number
  scaleAmount?: number
  glare?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function TiltedCard({
  children,
  tiltAmount = 12,
  scaleAmount = 1.03,
  glare = true,
  className = '',
  style
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    const rotateX = ((y - cy) / cy) * -tiltAmount
    const rotateY = ((x - cx) / cx) * tiltAmount

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: scaleAmount,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 900,
    })

    // Glare follows mouse
    if (glare && glareRef.current) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      gsap.to(glareRef.current, {
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 65%)`,
        duration: 0.3,
      })
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.7)',
    })

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 100%)',
        duration: 0.4,
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className={`tilted-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}
    </div>
  )
}
