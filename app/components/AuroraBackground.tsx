'use client'

import { useEffect, useRef } from 'react'

interface AuroraBackgroundProps {
  colorStops?: string[]
  amplitude?: number
  blend?: number
  speed?: number
}

export default function AuroraBackground({
  colorStops = ['#F5F1E8', '#EBC9A0', '#F2D98D'],
  amplitude = 0.8,
  blend = 0.6,
  speed = 0.4
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Cap DPR for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }
    
    resize()
    window.addEventListener('resize', resize)

    let time = 0

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 245, g: 241, b: 232 }
    }

    const colors = colorStops.map(hexToRgb)

    const animate = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      // Base background
      ctx.fillStyle = colorStops[0]
      ctx.fillRect(0, 0, w, h)

      // Create flowing gradients
      time += speed * 0.003

      for (let i = 0; i < 3; i++) {
        const offset = i * 2.1
        const x = w * (0.5 + Math.sin(time + offset) * amplitude * 0.3)
        const y = h * (0.5 + Math.cos(time * 0.7 + offset) * amplitude * 0.3)
        const radius = Math.min(w, h) * (0.4 + Math.sin(time * 0.5 + offset) * 0.2)

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        
        const color = colors[i % colors.length]
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${blend * 0.6})`)
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${blend * 0.3})`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [colorStops, amplitude, blend, speed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  )
}
