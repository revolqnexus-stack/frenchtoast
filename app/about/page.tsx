import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BlurText from '../components/BlurText'
import ScrollReveal from '../components/ScrollReveal'
import TiltedCard from '../components/TiltedCard'
import Link from 'next/link'
import '../styles/handwriting.css'

export const metadata = {
  title: 'Our Story — French Toast Kochi | About Our Café',
  description: 'Learn about French Toast café in Kochi. A family-run breakfast spot serving fresh French toast, brunch & coffee since day one. Rated 4.3★ by thousands.',
  openGraph: {
    title: 'Our Story — French Toast Kochi',
    description: 'A family-run breakfast café in Panampilly Nagar, Kochi.',
    url: 'https://thefrenchtoast.in/about',
  },
}

export default function AboutPage() {
  return (
    <>
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero page-hero--image" aria-labelledby="about-heading">
          <div className="page-hero-visual" aria-hidden="true">
            <img
              src="/images/french toast family.png"
              alt="French Toast cafe family and team"
              fetchPriority="high"
              width="1600"
              height="900"
            />
          </div>
          <div className="page-hero-inner">
            <BlurText as="p" className="eyebrow" delay={0.1} duration={0.6} stagger={0.05}>About Us</BlurText>
            <BlurText as="h1" delay={0.3} duration={0.9} stagger={0.1}>
              A little nook of joy.
            </BlurText>
            <BlurText as="p" delay={0.6} duration={0.7} stagger={0.04}>
              French Toast is more than just a café — it's a feeling. A cosy space where great food, good coffee and warm conversations come together.
            </BlurText>
          </div>
        </header>

        {/* Opening Section */}
        <section className="about-opening">
          <div className="container">
            <div className="about-opening-inner">
              <ScrollReveal className="about-opening-text">
                <h2 className="about-nook-headline">
                  A place for
                  <br />
                  <em>good mornings.</em>
                </h2>
                <p>
                  French Toast is a breakfast and brunch café in Kochi, known for wholesome food, quality coffee, and a welcoming atmosphere.
                </p>
                <p>
                  With locations in Panampilly Nagar and Kacheripady, we've become a favourite spot for food lovers, early risers and anyone who believes a good meal is worth slowing down for.
                </p>
                <p>Every dish is made fresh, every morning. Nothing processed, nothing rushed.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="about-opening-image">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=85"
                    alt="The French Toast café interior"
                    loading="lazy"
                    width="700"
                    height="875"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story">
          <div className="container">
            <div className="about-story-inner">
              <ScrollReveal className="about-story-text">
                <p className="eyebrow">What we serve</p>
                <h2>
                  Made with care,
                  <br />
                  <em>served with warmth</em>
                </h2>
                <p>
                  Our menu features breakfast classics, all-day brunch options, fresh salads, hearty sandwiches, and of course — French toast prepared several ways.
                </p>
                <p>
                  We focus on fresh ingredients, quality preparation, and dishes that taste like they were made with attention. That's what brings people back.
                </p>
                <Link href="/menu" className="btn btn--ghost-light" style={{ marginTop: 'var(--sp-4)' }}>
                  Explore the Menu
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={0.2} className="about-story-image">
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
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
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
    </>
  )
}
