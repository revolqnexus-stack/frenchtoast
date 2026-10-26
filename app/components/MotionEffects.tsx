'use client'

import { useEffect } from 'react'

export default function MotionEffects() {
  useEffect(() => {
    // Copy the motion.js functionality
    const script = document.createElement('script')
    script.src = '/assets/js/motion.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
