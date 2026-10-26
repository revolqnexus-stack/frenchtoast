'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  height?: string
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.5,
  className = '',
  height = '400px'
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      const yOffset = (scrollProgress - 0.5) * 100 * speed

      gsap.to(imageRef.current, {
        y: yOffset,
        duration: 0.1,
        ease: 'none'
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div
      ref={containerRef}
      className={`parallax-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        height
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '120%',
          objectFit: 'cover'
        }}
      />
    </div>
  )
}
