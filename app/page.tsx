'use client'

import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import FadeIn from './components/FadeIn'
import SlideIn from './components/SlideIn'
import ScrollReveal from './components/ScrollReveal'
import SplitText from './components/SplitText'
import TextLoop from './components/TextLoop'
import InfiniteMarquee from './components/InfiniteMarquee'
import HoverCard from './components/HoverCard'
import ImageCarousel from './components/ImageCarousel'
import SplitFlapText from './components/SplitFlapText'
import Link from 'next/link'
import { BUSINESS_INFO } from '@/config/business'
import dynamic from 'next/dynamic'
import './home.css'

const PaperCrumple = dynamic(() => import('./components/PaperCrumple'), { ssr: false })

export default function Home() {
  const hasMultipleLocations = BUSINESS_INFO.locations.filter(loc => loc.verified).length > 1
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [paperLoaded, setPaperLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Give the paper component 2 seconds to load
    const timer = setTimeout(() => setPaperLoaded(true), 500)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Nav transparent onDark />

      <main>
        {/* Hero Section */}
        <section className="hero" aria-label="Welcome to French Toast">
          <div className="hero-visual" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1400&q=85"
              alt="French Toast signature dish with fresh berries and cream"
              fetchPriority="high"
              width="1400"
              height="933"
            />
          </div>

          <div className="hero-content">
            <FadeIn delay={0.2}>
              <p className="hero-eyebrow">{hasMultipleLocations ? 'Kochi' : 'Panampilly Nagar, Kochi'}</p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="hero-headline">
                Good mornings<br />
                start <em>here.</em>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="hero-sub">
                A cosy nook for slow breakfasts, spontaneous brunches and very good coffee.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="hero-actions">
                <Link href="/menu" className="btn btn--light">Explore the Menu</Link>
                <Link href="/visit" className="btn btn--ghost-light">{hasMultipleLocations ? 'Find a Location' : 'Find Us'}</Link>
              </div>
            </FadeIn>

            <FadeIn delay={1.0}>
              <ul className="hero-meta" aria-label="Dining options">
                <li className="hero-meta-item">Dine-In</li>
                <li className="hero-meta-item">Takeaway</li>
                <li className="hero-meta-item">Delivery</li>
              </ul>
            </FadeIn>
          </div>

          <div className="hero-scroll" aria-hidden="true">
            <div className="hero-scroll-line"></div>
            Scroll
          </div>
        </section>

        {/* ── Crumplable Paper Story ─────────────────────────────────────────── */}
        {mounted && (
          <section
            className="story-paper-crumple"
            aria-label="Our story — hold the paper to crumple it"
            style={{
              background: 'var(--warm-white)',
              padding: 'clamp(3rem, 8vw, 6rem) var(--margin-h)',
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ 
              width: '100%', 
              maxWidth: isMobile ? '90vw' : 'min(90vw, 1100px)', 
              margin: '0 auto', 
              textAlign: 'center' 
            }}>
              <ScrollReveal y={40}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xxs)',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-light)',
                  marginBottom: 'clamp(1rem, 3vw, 2rem)',
                }}>
                  Hold to crumple · drag to move
                </p>
                {!paperLoaded && (
                  <div style={{ 
                    width: isMobile ? '340px' : '850px',
                    height: isMobile ? '480px' : '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #fef9f0 0%, #f7f0e2 100%)',
                    borderRadius: '12px',
                    gap: '2rem',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  }}>
                    <SplitFlapText
                      words={['FRENCH TOAST', 'GOOD MORNINGS', 'START HERE']}
                      flipDuration={0.14}
                      stagger={0.08}
                      cycleDelay={1800}
                      charset="alpha"
                      flipsPerChar={12}
                      order="center"
                      align="center"
                      tileStyle="board"
                      tileColor="#8B7355"
                      textColor="#fef9f0"
                      glare={0.6}
                      depth={0.8}
                      tileRadius={6}
                      gap={4}
                      fontSize={isMobile ? 28 : 42}
                      loop
                      padTo={13}
                      intro
                    />
                    <p style={{ 
                      fontSize: isMobile ? '0.7rem' : '0.85rem', 
                      color: '#8B7355', 
                      opacity: 0.6,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600
                    }}>
                      Loading our story...
                    </p>
                  </div>
                )}
                {paperLoaded && (
                  <PaperCrumple
                    src="/our-story-paper.svg"
                    alt="Our Story — handwritten on paper"
                    width={isMobile ? 340 : 850}
                    height={isMobile ? 480 : 1100}
                    sceneHeight={isMobile ? 520 : 1150}
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
                    dragRadius={isMobile ? 80 : 200}
                    returnToOrigin={true}
                    seed={13}
                    detail={64}
                    style={{ 
                      background: 'transparent',
                      width: '100%',
                      height: 'auto',
                    }}
                  />
                )}
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* Signature Dishes */}
        <section className="signatures section" aria-labelledby="sig-heading">
          <div className="container">
            <ScrollReveal>
              <div className="signatures-header">
                <h2 className="signatures-headline" id="sig-heading">
                  The dishes people<br /><em>come back for</em>
                </h2>
                <Link href="/menu" className="link-underline">See the full menu</Link>
              </div>
            </ScrollReveal>

            <div className="dish-grid">
              {/* Dish cards with 3D hover effect */}
              <ScrollReveal delay={0.1}>
                <HoverCard tiltAmount={5} scaleAmount={1.02}>
                  <article className="dish-card">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=85"
                    alt="Strawberry French Toast with cream"
                    loading="lazy"
                    width="800"
                    height="1066"
                  />
                </div>
                <div className="dish-info" aria-hidden="true">
                  <p className="dish-info-name">
                    Strawberry French Toast
                    <span className="dish-price-inline">₹ 475</span>
                  </p>
                  <p className="dish-info-desc">French toast with fresh strawberry sauce, served with pouring cream.</p>
                </div>
                <div className="dish-static">
                  <p className="dish-static-name">Strawberry French Toast</p>
                  <p className="dish-static-price">₹ 475</p>
                </div>
              </article>
                </HoverCard>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <HoverCard tiltAmount={5} scaleAmount={1.02}>
              <article className="dish-card">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1568051243858-533a607809a5?w=600&q=85"
                    alt="Banoffee French Toast with caramelized banana"
                    loading="lazy"
                    width="600"
                    height="450"
                  />
                </div>
                <div className="dish-info" aria-hidden="true">
                  <p className="dish-info-name">
                    Banoffee
                    <span className="dish-price-inline">₹ 418</span>
                  </p>
                  <p className="dish-info-desc">Caramelised banana and toffee sauce, served with pouring cream.</p>
                </div>
                <div className="dish-static">
                  <p className="dish-static-name">Banoffee</p>
                  <p className="dish-static-price">₹ 418</p>
                </div>
              </article>
                </HoverCard>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <HoverCard tiltAmount={5} scaleAmount={1.02}>
              <article className="dish-card">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=85"
                    alt="Classic French Toast"
                    loading="lazy"
                    width="600"
                    height="450"
                  />
                </div>
                <div className="dish-info" aria-hidden="true">
                  <p className="dish-info-name">
                    Classic French Toast
                    <span className="dish-price-inline">₹ 303</span>
                  </p>
                  <p className="dish-info-desc">Brioche with seasonal fruits, served with pouring cream.</p>
                </div>
                <div className="dish-static">
                  <p className="dish-static-name">Classic French Toast</p>
                  <p className="dish-static-price">₹ 303</p>
                </div>
              </article>
                </HoverCard>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <HoverCard tiltAmount={5} scaleAmount={1.02}>
              <article className="dish-card">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=600&q=85"
                    alt="Herb Poached Chicken sandwich"
                    loading="lazy"
                    width="600"
                    height="450"
                  />
                </div>
                <div className="dish-info" aria-hidden="true">
                  <p className="dish-info-name">
                    Herb Poached Chicken
                    <span className="dish-price-inline">₹ 475</span>
                  </p>
                  <p className="dish-info-desc">Basil pesto, olives, oven-dried tomatoes and mozzarella on sourdough.</p>
                </div>
                <div className="dish-static">
                  <p className="dish-static-name">Herb Poached Chicken</p>
                  <p className="dish-static-price">₹ 475</p>
                </div>
              </article>
                </HoverCard>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <HoverCard tiltAmount={5} scaleAmount={1.02}>
              <article className="dish-card">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?w=600&q=85"
                    alt="Mac N Cheese with fried chicken"
                    loading="lazy"
                    width="600"
                    height="450"
                  />
                </div>
                <div className="dish-info" aria-hidden="true">
                  <p className="dish-info-name">
                    Mac N Cheese With Fried Chicken
                    <span className="dish-price-inline">₹ 475</span>
                  </p>
                  <p className="dish-info-desc">Three-cheese mac, Parmesan dust and fried chicken.</p>
                </div>
                <div className="dish-static">
                  <p className="dish-static-name">Mac N Cheese With Fried Chicken</p>
                  <p className="dish-static-price">₹ 475</p>
                </div>
              </article>
                </HoverCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Social Proof / Reviews */}
        <section className="proof section" aria-labelledby="proof-heading">
          <div className="container">
            <ScrollReveal>
              <p className="section-eyebrow">Loved in Kochi</p>
              <h2 id="proof-heading">
                What Kochi <em>says about us.</em>
              </h2>
            </ScrollReveal>

            <div className="proof-stats">
              <div className="proof-stat">
                <p className="proof-num">₹200–1,000</p>
                <p className="proof-label">Per person</p>
              </div>
            </div>
          </div>

          <div className="proof-marquee" aria-label="Guest reviews">
            <ul className="proof-track">
              <li className="proof-card"><p>"Best French toast I've ever had. The Nutella French toast is absolutely incredible. Staff are very nice and welcoming."</p><span>Priya M. · ★★★★★</span></li>
              <li className="proof-card"><p>"Every single dish was fresh and filled with flavor. The Dubai French toast was crazy tasty! Great to see the owner helping out."</p><span>Arjun K. · ★★★★★</span></li>
              <li className="proof-card"><p>"Outstanding service, warm environment and delicious food! The chicken and waffles were exceptional. A hidden gem!"</p><span>Anjali R. · ★★★★★</span></li>
              <li className="proof-card"><p>"Delicious food and very kind staff! They sat us quickly and were fast with orders. Best link sausages I've ever had."</p><span>Rohan S. · ★★★★★</span></li>
              <li className="proof-card"><p>"SUPER nice staff and DELICIOUS food. They even had gluten free options. The egg whites omelet was amazing. 10/10!"</p><span>Maya T. · ★★★★★</span></li>
              <li className="proof-card"><p>"Fantastic brunch options with excellent service. The sense of community keeps us coming back. Great atmosphere!"</p><span>Vikram P. · ★★★★★</span></li>
              {/* Duplicated for seamless loop */}
              <li className="proof-card" aria-hidden="true"><p>"Best French toast I've ever had. The Nutella French toast is absolutely incredible. Staff are very nice and welcoming."</p><span>Priya M. · ★★★★★</span></li>
              <li className="proof-card" aria-hidden="true"><p>"Every single dish was fresh and filled with flavor. The Dubai French toast was crazy tasty! Great to see the owner helping out."</p><span>Arjun K. · ★★★★★</span></li>
              <li className="proof-card" aria-hidden="true"><p>"Outstanding service, warm environment and delicious food! The chicken and waffles were exceptional. A hidden gem!"</p><span>Anjali R. · ★★★★★</span></li>
              <li className="proof-card" aria-hidden="true"><p>"Delicious food and very kind staff! They sat us quickly and were fast with orders. Best link sausages I've ever had."</p><span>Rohan S. · ★★★★★</span></li>
              <li className="proof-card" aria-hidden="true"><p>"SUPER nice staff and DELICIOUS food. They even had gluten free options. The egg whites omelet was amazing. 10/10!"</p><span>Maya T. · ★★★★★</span></li>
              <li className="proof-card" aria-hidden="true"><p>"Fantastic brunch options with excellent service. The sense of community keeps us coming back. Great atmosphere!"</p><span>Vikram P. · ★★★★★</span></li>
            </ul>
          </div>

          <p className="proof-link">
            <a className="link-underline" href="https://maps.google.com/?q=French+Toast+Panampilly+Nagar+Kochi" target="_blank" rel="noopener noreferrer">
              Read all reviews on Google →
            </a>
          </p>
        </section>

        {/* Infinite Text Banner */}
        <div style={{ 
          padding: '2rem 0', 
          background: 'var(--color-dark, #1a1a1a)', 
          color: 'var(--color-light, #fff)',
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 'bold',
          overflow: 'hidden'
        }}>
          <TextLoop 
            text="Fresh Ingredients Daily • Handcrafted with Love • Open 7 Days a Week • Best Breakfast in Kochi" 
            speed={40}
          />
        </div>

        {/* Moment Section */}
        <section className="moment" aria-labelledby="moment-heading">
          <div className="moment-bg" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1600&q=80"
              alt=""
              loading="lazy"
              width="1600"
              height="900"
            />
          </div>
          <div className="moment-content">
            <FadeIn delay={0.2}>
              <blockquote className="moment-quote" id="moment-heading">
                "The best mornings<br />have no <strong>agenda.</strong>"
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.4}>
              <ul className="moment-details" aria-label="What makes us special">
                <li className="moment-detail">Fresh ingredients daily</li>
                <li className="moment-detail">Cosy indoor seating</li>
                <li className="moment-detail">Mon–Fri 9am–10pm • Sat–Sun 8am–10pm</li>
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* Menu Preview */}
        <section className="menu-preview section" aria-labelledby="menu-preview-heading">
          <div className="container">
            <div className="menu-preview-inner">
              <ScrollReveal>
                <div className="menu-preview-text">
                  <p className="ghost-label" aria-hidden="true">
                    Menu
                  </p>
                  <p className="section-eyebrow">Our Menu</p>
                  <h2 id="menu-preview-heading">
                    Freshly made,
                    <br />
                    always.
                  </h2>
                  <p>From golden French toast and hearty sandwiches to rich pastas and indulgent desserts — every dish is made to order, with care.</p>
                  <nav className="category-chips" aria-label="Menu categories">
                    <Link href="/menu#french-toast" className="category-chip">
                      French Toast
                    </Link>
                    <Link href="/menu#eggs" className="category-chip">
                      Eggs
                    </Link>
                    <Link href="/menu#sandwiches" className="category-chip">
                      Sandwiches
                    </Link>
                    <Link href="/menu#pizza-pasta" className="category-chip">
                      Pizza &amp; Pasta
                    </Link>
                    <Link href="/menu#burgers" className="category-chip">
                      Burgers
                    </Link>
                    <Link href="/menu#pancakes-cakes" className="category-chip">
                      Pancakes &amp; Cakes
                    </Link>
                  </nav>
                  <Link href="/menu" className="btn btn--primary">
                    View Full Menu
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="menu-preview-image">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=700&q=85"
                    alt="French toast with berries and cream — menu highlight"
                    loading="lazy"
                    width="700"
                    height="875"
                  />
                </div>
                <p className="menu-preview-annotation vertical-label" aria-hidden="true">
                  Made with love · Every morning
                </p>
              </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Atmosphere/Collage */}
        <section className="atmosphere section" aria-labelledby="atm-heading">
          <div className="container">
            <ScrollReveal>
              <div className="atmosphere-header">
                <div>
                  <p className="section-eyebrow">The Space</p>
                  <h2 id="atm-heading">
                    A place worth
                    <br />
                    <em>lingering in</em>
                  </h2>
                </div>
                <Link href="/gallery" className="link-underline">
                  View the gallery
                </Link>
              </div>
            </ScrollReveal>

            <div className="collage" aria-label="Gallery of French Toast café">
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=80" alt="Café dining area" loading="lazy" width="700" height="560" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80" alt="Coffee pour over" loading="lazy" width="500" height="400" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&q=80" alt="Eggs Benedict" loading="lazy" width="500" height="400" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700&q=80" alt="Chocolate cake dessert" loading="lazy" width="700" height="560" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80" alt="Tiramisu" loading="lazy" width="500" height="400" />
              </div>
              <div className="collage-item">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80" alt="Flat white coffee" loading="lazy" width="500" height="400" />
              </div>
            </div>
          </div>
        </section>

        {/* Story Teaser with Carousel */}
        <section className="story-teaser section" aria-labelledby="story-heading">
          <div className="container">
            <div className="story-teaser-inner">
              <div className="story-teaser-img" style={{ position: 'relative', height: '500px', borderRadius: '1rem', overflow: 'hidden' }}>
                <ImageCarousel
                  images={[
                    'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=700&q=85',
                    'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=85',
                    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=85',
                    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85'
                  ]}
                  autoplay={true}
                  interval={5000}
                />
              </div>

              <div className="story-teaser-content">
                <p className="eyebrow">Our Story</p>
                <h2 id="story-heading">
                  A little nook
                  <br />
                  of <em>joy</em>
                </h2>
                <p>
                  French Toast started as a simple dream — to make people feel at home over a beautifully made breakfast. Today it's a favourite gathering spot for food lovers, early risers and anyone who believes a good meal is worth slowing down for.
                </p>
                <Link href="/about" className="btn btn--ghost-light">
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section className="visit section" aria-labelledby="visit-heading">
          <div className="container">
            <div className="visit-inner">
              <div className="visit-details">
                <p className="section-eyebrow">Find Us</p>
                <h2 id="visit-heading">Come say hello.</h2>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Address</p>
                    <p className="visit-info-value">
                      8th Cross Street B, Ambikupuram Rd,
                      <br />
                      Panampilly Nagar, Ernakulam,
                      <br />
                      Kerala 682036
                    </p>
                  </div>
                </div>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Hours</p>
                    <p className="visit-info-value">
                      Monday – Sunday
                      <br />
                      9:00 AM – 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Phone</p>
                    <p className="visit-info-value">
                      <a href="https://wa.me/919074870797">+91 90748 70797</a>
                    </p>
                  </div>
                </div>

                <div className="visit-actions">
                  <a href="https://maps.google.com/?q=French+Toast+Panampilly+Nagar+Kochi" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    Get Directions
                  </a>
                  <Link href="/contact" className="btn btn--outline">
                    Send a Message
                  </Link>
                </div>
              </div>

              <div className="visit-map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2621519284597!2d76.29561731478427!3d9.967013592834848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTgnMDEuMiJOIDc2wrAxNyc1MS4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="French Toast café location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Close */}
        <section className="cta-close" aria-labelledby="cta-heading">
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <p className="cta-close-eyebrow">Ready to visit?</p>
            <h2 className="cta-close-headline" id="cta-heading">
              See you soon.
            </h2>
            <div className="cta-close-actions">
              <Link href="/order" className="btn btn--primary">
                Order Online
              </Link>
              <Link href="/menu" className="btn btn--outline">
                Explore the Menu
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
