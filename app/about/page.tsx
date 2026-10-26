import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import MotionEffects from '../components/MotionEffects'
import Link from 'next/link'

export const metadata = {
  title: 'Our Story — French Toast · Kochi',
  description: 'Learn about French Toast café in Panampilly Nagar, Kochi. A cosy space for breakfast, brunch and great coffee.',
}

export default function AboutPage() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/pages.css" />
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">About Us</p>
            <h1>
              <em>A little nook</em>
              <br />
              of joy.
            </h1>
            <p>
              French Toast is more than just a café — it's a feeling. A cosy space where great food, good coffee and warm conversations come together.
            </p>
          </div>
        </header>

        {/* Opening Section */}
        <section className="about-opening">
          <div className="container">
            <div className="about-opening-inner">
              <div className="about-opening-text">
                <h2 className="about-nook-headline reveal">
                  A place that
                  <br />
                  feels like <em>home.</em>
                </h2>
                <p className="reveal">
                  French Toast started as a dream to create a place that felt genuinely welcoming — where the food was worth talking about and the atmosphere made you want to stay a little longer.
                </p>
                <p className="reveal">
                  Today it's a favourite gathering spot in Panampilly Nagar for food lovers, early risers and anyone who believes a good meal is worth slowing down for.
                </p>
                <p className="reveal">Every dish is made fresh, every morning. Nothing processed, nothing rushed.</p>
              </div>
              <div className="about-opening-image reveal reveal-delay-1">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=85"
                    alt="The French Toast café interior"
                    loading="lazy"
                    width="700"
                    height="875"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="container">
            <div className="about-story-inner">
              <div className="about-story-text reveal">
                <p className="eyebrow">How it started</p>
                <h2>
                  Born from a love
                  <br />
                  for <em>honest food</em>
                </h2>
                <p>
                  The idea was simple: take the things people love most about breakfast — warmth, generosity, comfort — and make them into something worth getting out of bed for.
                </p>
                <p>
                  French toast seemed like the perfect starting point. An everyday ingredient transformed by a little care and attention. That became the philosophy for everything on the menu.
                </p>
                <Link href="/menu" className="btn btn--ghost-light" style={{ marginTop: 'var(--sp-4)' }}>
                  Explore the Menu
                </Link>
              </div>
              <div className="about-story-image reveal reveal-delay-1">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=700&q=85"
                    alt="Shakshuka dish at French Toast"
                    loading="lazy"
                    width="700"
                    height="875"
                  />
                </div>
                <div className="story-float-label">
                  Same place,
                  <br />
                  new stories every day.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="about-pillars" aria-labelledby="pillars-heading">
          <div className="container">
            <p className="section-eyebrow reveal" style={{ marginBottom: 'var(--sp-10)' }} id="pillars-heading">
              What we stand for
            </p>
            <div className="pillars-grid">
              <div className="pillar reveal">
                <h3 className="pillar-title">Fresh Ingredients</h3>
                <p>Sourced locally where possible, prepped daily, never frozen. Taste the difference in every bite.</p>
              </div>
              <div className="pillar reveal reveal-delay-1">
                <h3 className="pillar-title">Warm Ambiance</h3>
                <p>A space designed for staying, not rushing. Comfortable seating, natural light and a genuine welcome.</p>
              </div>
              <div className="pillar reveal reveal-delay-2">
                <h3 className="pillar-title">Great Coffee</h3>
                <p>Single origins, careful brewing, served exactly as they should be. Your flat white will be worth the wait.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      <MotionEffects />
    </>
  )
}
