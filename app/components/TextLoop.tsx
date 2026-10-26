'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface TextLoopProps {
  text: string
  speed?: number
  className?: string
  separator?: string
}

export default function TextLoop({
  text,
  speed = 50,
  className = '',
  separator = ' • '
}: TextLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const firstChild = container.children[0] as HTMLElement
    if (!firstChild) return

    const width = firstChild.offsetWidth

    // Set initial position
    gsap.set(container.children, { x: 0 })

    // Create infinite loop animation
    animationRef.current = gsap.to(container.children, {
      x: -width,
      duration: width / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % width)
      }
    })

    return () => {
      animationRef.current?.kill()
    }
  }, [text, speed])

  const displayText = text + separator

  return (
    <div className={`text-loop-container ${className}`} style={{ 
      overflow: 'hidden',
      position: 'relative',
      whiteSpace: 'nowrap'
    }}>
      <div ref={containerRef} style={{ display: 'inline-flex', gap: 0 }}>
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{displayText}</span>
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{displayText}</span>
        <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>{displayText}</span>
      </div>
    </div>
  )
}
