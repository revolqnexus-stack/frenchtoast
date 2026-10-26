'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import './PageLoader.css'

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const animate = async () => {
      if (prefersReduced) {
        // Simple fade for reduced motion
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsComplete(true)
        return
      }

      // Full animation sequence
      await new Promise(resolve => setTimeout(resolve, 2400))
      await controls.start({
        opacity: 0,
        scale: 1.04,
        transition: { duration: 0.5, ease: 'easeOut' }
      })
      setIsComplete(true)
    }

    animate()
  }, [controls])

  if (isComplete) return null

  return (
    <motion.div 
      className="storefront-loader"
      initial={{ opacity: 1 }}
      animate={controls}
    >
      {/* String lights */}
      <div className="string-lights">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="light-bulb"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0.8, 1],
              scale: [0.8, 1, 0.9, 1]
            }}
            transition={{
              delay: 0.08 * i,
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeOut'
            }}
            style={{ left: `${8 + i * 8}%` }}
          />
        ))}
      </div>

      {/* Pergola beams */}
      <div className="pergola-beams">
        <div className="beam beam-1" />
        <div className="beam beam-2" />
        <div className="beam beam-3" />
      </div>

      {/* Vine leaves */}
      <motion.div 
        className="vine-leaf vine-left"
        animate={{ 
          rotate: [-2, 2, -2]
        }}
        transition={{
          delay: 2,
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div 
        className="vine-leaf vine-right"
        animate={{ 
          rotate: [2, -2, 2]
        }}
        transition={{
          delay: 2.2,
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Sign panel */}
      <motion.div
        className="sign-panel"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Toast logo icon */}
        <motion.div
          className="toast-logo"
          initial={{ scale: 0.6, rotate: 0, opacity: 0 }}
          animate={{ 
            scale: [0.6, 1.05, 1],
            rotate: 8,
            opacity: 1
          }}
          transition={{ delay: 1.3, duration: 0.5, ease: 'backOut' }}
        >
          <motion.img 
            src="/logo-toast.svg" 
            alt="" 
            animate={{ rotate: [8, 10, 8] }}
            transition={{
              delay: 1.8,
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        {/* Wordmark with clip reveal */}
        <div className="wordmark-container">
          <motion.div
            className="wordmark"
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: 'inset(0 0% 0 0)' }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'easeOut' }}
          >
            <motion.span
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              french toast
            </motion.span>
          </motion.div>
        </div>

        {/* Subline */}
        <motion.p
          className="subline"
          initial={{ opacity: 0, letterSpacing: '0.35em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ delay: 1.6, duration: 0.5, ease: 'easeOut' }}
        >
          BAKERY , KITCHEN & STUDIO
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
