'use client'

import { useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface HoverCardProps {
  children: ReactNode
  tiltAmount?: number
  scaleAmount?: number
  className?: string
}

export default function HoverCard({
  children,
  tiltAmount = 10,
  scaleAmount = 1.05,
  className = ''
}: HoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -tiltAmount
    const rotateY = ((x - centerX) / centerX) * tiltAmount

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: scaleAmount,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    })
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    })
  }

  return (
    <div
      ref={cardRef}
      className={`hover-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}
