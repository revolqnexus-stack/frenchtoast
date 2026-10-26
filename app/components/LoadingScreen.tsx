'use client'

import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const intervalTime = 20
    const steps = duration / intervalTime
    const increment = 100 / steps

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onComplete, 500)
          }, 300)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo">
          <h1 className="loading-title">french toast</h1>
          <p className="loading-subtitle">BAKERY, KITCHEN & STUDIO</p>
        </div>
        <div className="loading-bar-wrapper">
          <div 
            className="loading-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
