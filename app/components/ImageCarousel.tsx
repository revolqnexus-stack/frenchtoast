'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface ImageCarouselProps {
  images: string[]
  autoplay?: boolean
  interval?: number
  className?: string
}

export default function ImageCarousel({
  images,
  autoplay = true,
  interval = 4000,
  className = ''
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToSlide = (index: number) => {
    if (index < 0 || index >= images.length) return
    
    const container = containerRef.current
    if (!container) return

    const slides = container.querySelectorAll('.carousel-slide')
    const currentSlide = slides[currentIndex]
    const nextSlide = slides[index]

    // Animate out current slide
    gsap.to(currentSlide, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
      ease: 'power2.in'
    })

    // Animate in next slide
    gsap.fromTo(
      nextSlide,
      {
        opacity: 0,
        scale: 1.05
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.2
      }
    )

    setCurrentIndex(index)
  }

  const next = () => {
    goToSlide((currentIndex + 1) % images.length)
  }

  const prev = () => {
    goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }

  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(next, interval)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoplay, interval, currentIndex])

  return (
    <div 
      ref={containerRef}
      className={`image-carousel ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-slide"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: index === currentIndex ? 1 : 0,
            pointerEvents: index === currentIndex ? 'auto' : 'none'
          }}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
        </div>
      ))}

      {/* Navigation Dots */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        zIndex: 10
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: currentIndex === index ? '2rem' : '0.5rem',
              height: '0.5rem',
              borderRadius: '0.25rem',
              border: 'none',
              background: currentIndex === index ? '#fff' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          cursor: 'pointer',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>

      <button
        onClick={next}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '2.5rem',
          height: '2.5rem',
          cursor: 'pointer',
          fontSize: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  )
}
