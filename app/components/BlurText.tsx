'use client'

import { useEffect, useRef, ReactNode, ElementType } from 'react'
import { gsap } from 'gsap'

interface BlurTextProps {
  children: ReactNode
  delay?: number
  duration?: number
  stagger?: number
  as?: ElementType
  className?: string
}

export default function BlurText({
  children,
  delay = 0,
  duration = 0.8,
  stagger = 0.08,
  as: Tag = 'div',
  className = ''
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Split into words, wrap each in a span
    const text = el.innerText
    const words = text.split(' ')

    el.innerHTML = words
      .map((w) => `<span class="blur-word" style="display:inline-block;white-space:pre">${w} </span>`)
      .join('')

    const spans = el.querySelectorAll('.blur-word')

    gsap.fromTo(
      spans,
      {
        opacity: 0,
        filter: 'blur(12px)',
        y: 16,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
      }
    )
  }, [delay, duration, stagger])

  const Component = Tag as any
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  )
}
