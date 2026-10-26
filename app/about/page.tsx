'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BlurText from '../components/BlurText'
import ScrollReveal from '../components/ScrollReveal'
import TiltedCard from '../components/TiltedCard'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const PaperCrumple = dynamic(() => import('../components/PaperCrumple'), { ssr: false })

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <BlurText as="p" className="eyebrow" delay={0.1} duration={0.6} stagger={0.05}>
              About Us
            </BlurText>
            <BlurText as="h1" delay={0.3} duration={0.9} stagger={0.1}>
              A little nook of joy.
            </BlurText>
            <BlurText as="p" delay={0.6} duration={0.7} stagger={0.04}>
              French Toast is more than just a café — it's a feeling. A cosy space where great food, good coffee and warm conversations come together.
            </BlurText>
          </div>
        </header>

        {/* ── Crumplable Paper Story ─────────────────────────────────────── */}
        <section
          className="story-paper-crumple"
          aria-label="Our story — hold the paper to crumple it"
          style={{
            background: 'var(--warm-white)',
            padding: 'var(--sp-16) var(--margin-h)',
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <ScrollReveal y={40}>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xxs)',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-light)',
                marginBottom: 'var(--sp-6)',
              }}>
                Hold to crumple · drag to move
              </p>
              <PaperCrumple
                src="/our-story-paper.svg"
                alt="Our Story — handwritten on paper"
                width={520}
                height={720}
                sceneHeight={780}
                paperColor="#f7f0e2"
                releaseBehavior="restore"
                crumpleAmount={0.88}
                crumpleDuration={0.6}
                releaseDuration={0.5}
                foldCount={7}
                foldSharpness={0.5}
                wrinkleDepth={0.7}
                creaseStrength={0.2}
                roughness={0.95}
                paperTexture={0.12}
                lightIntensity={1.9}
                lightAngle={-30}
                shadow={true}
                shadowOpacity={0.1}
                draggable={true}
                dragRotation={8}
                dragRadius={160}
                returnToOrigin={true}
                seed={13}
                detail={64}
                style={{ background: 'transparent' }}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* ── Pillars ───────────────────────────────────────────────────────── */}
        <section className="about-pillars" aria-labelledby="pillars-heading">
          <div className="container">
            <ScrollReveal>
              <p className="section-eyebrow" style={{ marginBottom: 'var(--sp-10)' }} id="pillars-heading">
                What we stand for
              </p>
            </ScrollReveal>
            <div className="pillars-grid">
              <TiltedCard tiltAmount={8} glare>
                <div className="pillar">
                  <h3 className="pillar-title">Fresh Ingredients</h3>
                  <p>Sourced locally where possible, prepped daily, never frozen. Taste the difference in every bite.</p>
                </div>
              </TiltedCard>
              <TiltedCard tiltAmount={8} glare>
                <div className="pillar">
                  <h3 className="pillar-title">Warm Ambiance</h3>
                  <p>A space designed for staying, not rushing. Comfortable seating, natural light and a genuine welcome.</p>
                </div>
              </TiltedCard>
              <TiltedCard tiltAmount={8} glare>
                <div className="pillar">
                  <h3 className="pillar-title">Great Coffee</h3>
                  <p>Single origins, careful brewing, served exactly as they should be. Your flat white will be worth the wait.</p>
                </div>
              </TiltedCard>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="cta-close" aria-labelledby="about-cta">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <p className="cta-close-eyebrow">Come and visit us</p>
            <h2 className="cta-close-headline" id="about-cta">
              Meet us over breakfast.
            </h2>
            <div className="cta-close-actions">
              <Link href="/menu" className="btn btn--primary">
                View the Menu
              </Link>
              <Link href="/visit" className="btn btn--outline">
                Get Directions
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
