'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'

interface InfiniteMarqueeProps {
  children: ReactNode
  speed?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export default function InfiniteMarquee({
  children,
  speed = 50,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: InfiniteMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const track = container.querySelector('.marquee-track') as HTMLElement
    if (!track) return

    const firstChild = track.children[0] as HTMLElement
    if (!firstChild) return

    const width = firstChild.offsetWidth
    const moveDirection = direction === 'left' ? -width : width

    gsap.set(track.children, { x: 0 })

    animationRef.current = gsap.to(track.children, {
      x: moveDirection,
      duration: width / speed,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x) % width
          return direction === 'left' ? val : val
        })
      }
    })

    return () => {
      animationRef.current?.kill()
    }
  }, [speed, direction])

  const handleMouseEnter = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.pause()
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover && animationRef.current) {
      animationRef.current.resume()
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`infinite-marquee ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        overflow: 'hidden',
        position: 'relative',
        width: '100%'
      }}
    >
      <div className="marquee-track" style={{ display: 'flex', gap: 0 }}>
        <div style={{ display: 'flex', flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'flex', flexShrink: 0 }}>{children}</div>
        <div style={{ display: 'flex', flexShrink: 0 }}>{children}</div>
      </div>
    </div>
  )
}
