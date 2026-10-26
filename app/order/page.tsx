import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import OnlineOrderingSection from '../components/OnlineOrderingSection'
import Link from 'next/link'

export const metadata = {
  title: 'Order Online — French Toast · Kochi',
  description: 'Order your favourite French Toast dishes online for delivery or pickup via Swiggy and Zomato.',
}

export default function OrderPage() {
  return (
    <>
      <Nav />

      <main>
        {/* Online Ordering Section */}
        <OnlineOrderingSection />

        {/* Additional Info */}
        <section className="section" style={{ 
          background: 'var(--warm-white)', 
          textAlign: 'center',
          padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 2rem)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              marginBottom: '1.5rem',
              fontWeight: 400
            }}>
              Prefer to dine in?
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              marginBottom: '2rem', 
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6
            }}>
              Visit us at Panampilly Nagar or Kacheripady for the full French Toast experience. Fresh food, warm ambience, and great conversations.
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center', 
              flexWrap: 'wrap' 
            }}>
              <Link href="/visit" className="btn btn--primary">
                Find Locations
              </Link>
              <Link href="/menu" className="btn btn--outline">
                View Menu
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
