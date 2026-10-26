'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './PageLoader.css'

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const timer = setTimeout(() => {
      setIsComplete(true)
    }, prefersReduced ? 1000 : 1800)

    return () => clearTimeout(timer)
  }, [])

  if (isComplete) return null

  const prefersReduced = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  if (prefersReduced) {
    return (
      <motion.div 
        className="sign-loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <div className="sign-board">
          <div className="toast-icon">
            <img src="/logo-toast.svg" alt="" />
          </div>
          <div className="sign-wordmark">french toast</div>
          <div className="sign-subline">BAKERY , KITCHEN & STUDIO</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className="sign-loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.4, duration: 0.4 }}
    >
      <motion.div 
        className="sign-board"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Toast icon */}
        <motion.div 
          className="toast-icon"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3, ease: 'backOut' }}
        >
          <img src="/logo-toast.svg" alt="" />
        </motion.div>

        {/* Wordmark with clip reveal */}
        <div className="wordmark-wrapper">
          <motion.div
            className="sign-wordmark"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeInOut' }}
          >
            french toast
          </motion.div>
        </div>

        {/* Subline */}
        <motion.div
          className="sign-subline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          BAKERY , KITCHEN & STUDIO
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
