'use client'

import { ReactNode } from 'react'
import './InfiniteMarquee.css'

interface InfiniteMarqueeProps {
  children: ReactNode
  speed?: number          // seconds to complete one full loop
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}

export default function InfiniteMarquee({
  children,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = ''
}: InfiniteMarqueeProps) {
  return (
    <div
      className={`im-root ${className}`}
      style={
        {
          '--im-duration': `${speed}s`,
          '--im-direction': direction === 'left' ? 'normal' : 'reverse',
        } as React.CSSProperties
      }
      data-pause={pauseOnHover ? 'true' : 'false'}
    >
      {/* Duplicate the track so the seam is invisible */}
      <div className="im-track" aria-hidden="false">{children}</div>
      <div className="im-track" aria-hidden="true">{children}</div>
    </div>
  )
}
