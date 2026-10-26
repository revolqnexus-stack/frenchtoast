'use client'

import { useEffect } from 'react'

export default function MainScripts() {
  useEffect(() => {
    // Copy the main.js functionality
    const script = document.createElement('script')
    script.src = '/assets/js/main.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return null
}
