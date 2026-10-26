import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Link from 'next/link'

export const metadata = {
  title: 'Order Online — French Toast · Kochi',
  description: 'Order your favourite French Toast dishes online for delivery or pickup.',
}

export default function OrderPage() {
  return (
    <>
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">Order Online</p>
            <h1>
              Your favourites,
              <br />
              <em>delivered.</em>
            </h1>
            <p>Order through your preferred delivery platform and enjoy French Toast at home.</p>
          </div>
        </header>

        {/* Delivery Partners */}
        <section className="order-partners section">
          <div className="container">
            <h2 className="reveal" style={{ textAlign: 'center', marginBottom: 'var(--sp-12)' }}>
              Available on
            </h2>

            <div className="partners-grid">
              <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer" className="partner-card reveal">
                <div className="partner-logo">
                  <span style={{ fontSize: '2rem', fontWeight: 700 }}>Swiggy</span>
                </div>
                <p className="partner-desc">Order delivery or pickup</p>
                <span className="partner-link">Order Now →</span>
              </a>

              <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer" className="partner-card reveal reveal-delay-1">
                <div className="partner-logo">
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: '#e23744' }}>Zomato</span>
                </div>
                <p className="partner-desc">Order delivery or pickup</p>
                <span className="partner-link">Order Now →</span>
              </a>

              <a href="https://wa.me/919074870797?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer" className="partner-card reveal reveal-delay-2">
                <div className="partner-logo">
                  <span style={{ fontSize: '2rem' }}>💬</span>
                </div>
                <p className="partner-desc">Order via WhatsApp</p>
                <span className="partner-link">Chat Now →</span>
              </a>
            </div>

            <div className="order-info reveal" style={{ marginTop: 'var(--sp-16)', textAlign: 'center' }}>
              <h3>Prefer to call?</h3>
              <p style={{ marginBottom: 'var(--sp-4)' }}>Call us directly to place your order for pickup.</p>
              <a href="tel:+914842025618" className="btn btn--primary">
                Call 0484 202 5618
              </a>
            </div>
          </div>
        </section>

        {/* Pickup Info */}
        <section className="order-pickup section" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <div className="order-pickup-inner">
              <div className="reveal">
                <h2>Pickup Orders</h2>
                <p>Skip the delivery fees and pick up your order fresh from our kitchen.</p>
                <ul style={{ marginTop: 'var(--sp-5)', marginBottom: 'var(--sp-8)', listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: 'var(--sp-2)' }}>✓ Ready in 20-30 minutes</li>
                  <li style={{ marginBottom: 'var(--sp-2)' }}>✓ No delivery fees</li>
                  <li style={{ marginBottom: 'var(--sp-2)' }}>✓ Packed fresh and hot</li>
                </ul>
                <Link href="/visit" className="btn btn--outline">
                  Get Directions
                </Link>
              </div>

              <div className="reveal reveal-delay-1">
                <div className="img-frame">
                  <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=700&q=85" alt="French Toast ready for pickup" loading="lazy" width="700" height="467" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
