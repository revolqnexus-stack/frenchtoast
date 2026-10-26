'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'
import './PageLoader.css'

// Dynamically import PaperCrumple — it uses WebGL/Three.js, never runs on server
const PaperCrumple = dynamic(() => import('./PaperCrumple'), { ssr: false })

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [crumpleKey, setCrumpleKey] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const sub = subRef.current
    const card = cardRef.current
    if (!overlay || !sub || !card) return

    gsap.set([sub, card], { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      onComplete: () => {
        // After the card is visible, auto-crumple it
        setTimeout(() => {
          setCrumpleKey(1) // triggers a hold via resetKey change trick — we use onStateChange instead
        }, 200)

        // Slide the whole overlay up after a pause
        gsap.to(overlay, {
          yPercent: -100,
          duration: 1,
          delay: 2.8,
          ease: 'power4.inOut',
          onComplete: () => setVisible(false),
        })
      },
    })

    tl
      .to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
      .to(sub, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 0.5)

  }, [])

  if (!visible) return null

  return (
    <div ref={overlayRef} className="page-loader" aria-hidden="true">

      <div className="page-loader__inner">
        {/* PaperCrumple card — the main hero of the loader */}
        <div ref={cardRef} className="page-loader__card">
          <PaperCrumple
            src="/loader-card.svg"
            alt="French Toast café loading card"
            width={320}
            height={400}
            sceneHeight={440}
            paperColor="#1e110c"
            releaseBehavior="restore"
            crumpleAmount={0.82}
            crumpleDuration={0.6}
            releaseDuration={0.7}
            foldCount={7}
            foldSharpness={0.55}
            wrinkleDepth={0.7}
            lightIntensity={2.0}
            lightAngle={-40}
            shadow={true}
            shadowOpacity={0.18}
            draggable={true}
            returnToOrigin={true}
            seed={42}
            detail={64}
            resetKey={crumpleKey}
            style={{ background: 'transparent' }}
          />
        </div>

        <p ref={subRef} className="page-loader__sub">
          Hold to crumple · Panampilly Nagar, Kochi
        </p>
      </div>
    </div>
  )
}
