'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Car, Accessibility, Wifi, Clock, Calendar, CreditCard } from 'lucide-react'
import { useState } from 'react'

interface VisitInfoCardProps {
  icon: 'parking' | 'accessibility' | 'wifi' | 'clock' | 'calendar' | 'credit-card'
  title: string
  description: string
  delay?: number
}

const iconMap = {
  'parking': Car,
  'accessibility': Accessibility,
  'wifi': Wifi,
  'clock': Clock,
  'calendar': Calendar,
  'credit-card': CreditCard,
}

export default function VisitInfoCard({ icon, title, description, delay = 0 }: VisitInfoCardProps) {
  const IconComponent = iconMap[icon]
  const shouldReduceMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={shouldReduceMotion ? {} : { 
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: '#fffdf9',
        border: `1px solid ${isHovered ? 'rgba(255, 139, 89, 0.3)' : 'rgba(53, 37, 31, 0.08)'}`,
        borderRadius: '24px',
        padding: 'clamp(2rem, 4vw, 2.5rem)',
        transition: 'all 0.3s ease',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(53, 37, 31, 0.08), 0 8px 16px rgba(53, 37, 31, 0.06)'
          : '0 4px 12px rgba(53, 37, 31, 0.04), 0 2px 6px rgba(53, 37, 31, 0.02)',
        cursor: 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Icon Container */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          scale: isHovered ? 1.08 : 1,
          rotate: isHovered ? 3 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(255, 139, 89, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <IconComponent 
          size={28} 
          strokeWidth={1.5}
          style={{ color: 'var(--color-primary)' }}
        />
      </motion.div>

      {/* Content */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.375rem)',
          fontWeight: 400,
          lineHeight: 1.3,
          color: 'var(--color-text)',
          marginBottom: '0.75rem',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9375rem, 2vw, 1rem)',
          lineHeight: 1.6,
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
