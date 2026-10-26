import Nav from './components/Nav'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import MainScripts from './components/MainScripts'
import MotionEffects from './components/MotionEffects'
import Link from 'next/link'
import './home.css'

export default function Home() {
  return (
    <>
      <Nav transparent onDark />

      <main>
        {/* Hero Section */}
        <section className="hero" aria-label="Welcome to French Toast">
          <div className="hero-visual" aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1400&q=85"
              alt="Strawberry French Toast with whipped cream and maple syrup"
              fetchpriority="high"
              width="1400"
              height="933"
            />
          </div>

          <div className="hero-content">
            <p className="hero-eyebrow">Panampilly Nagar, Kochi</p>

            <h1 className="hero-headline">
              Good mornings<br />
              start <em>here.</em>
            </h1>

            <p className="hero-sub">
              A cosy nook for slow breakfasts, spontaneous brunches and very good coffee.
            </p>

            <div className="hero-actions">
              <Link href="/menu" className="btn btn--light">Explore the Menu</Link>
              <Link href="/visit" className="btn btn--ghost-light">Find Us</Link>
            </div>

            <ul className="hero-meta" aria-label="Dining options">
              <li className="hero-meta-item">Dine-In</li>
              <li className="hero-meta-item">Takeaway</li>
              <li className="hero-meta-item">Delivery</li>
            </ul>
          </div>

          <div className="hero-scroll" aria-hidden="true">
            <div className="hero-scroll-line"></div>
            Scroll
          </div>
        </section>

        {/* Signature Dishes */}
        <section className="signatures section" aria-labelledby="sig-heading">
          <div className="container">
            <div className="signatures-header reveal">
              <h2 className="signatures-headline" id="sig-heading">
                The dishes people<br /><em>come back for</em>
              </h2>
              <Link href="/menu" className="link-underline">See the full menu</Link>
            </div>

            <div className="dish-grid">
              {/* Dish cards - keeping the same structure */}
              <article className="dish-card reveal">
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

              <article className="dish-card reveal reveal-delay-1">
                <div className="img-frame">
                  <img
                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=85"
                    alt="Banoffee French Toast"
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

              <article className="dish-card reveal reveal-delay-2">
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

              <article className="dish-card reveal reveal-delay-1">
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

              <article className="dish-card reveal reveal-delay-2">
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
            </div>
          </div>
        </section>

        {/* Social Proof / Reviews */}
        <section className="proof section" aria-labelledby="proof-heading">
          <div className="container">
            <p className="section-eyebrow reveal">Loved in Kochi</p>
            <h2 id="proof-heading" className="reveal">
              What Kochi <em>says about us.</em>
            </h2>

            <div className="proof-stats">
              <div className="proof-stat">
                <p className="proof-num">
                  <span data-count="4.3" data-decimals="1">4.3</span>
                </p>
                <div className="proof-stars" style={{ '--rating': 4.3 } as React.CSSProperties} role="img" aria-label="Rated 4.3 out of 5"></div>
                <p className="proof-label">Google rating</p>
              </div>
              <div className="proof-stat">
                <p className="proof-num">
                  <span data-count="5321">5,321</span>
                </p>
                <p className="proof-label">Google reviews</p>
              </div>
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
            </ul>
          </div>

          <p className="proof-link">
            <a className="link-underline" href="https://maps.google.com/?q=French+Toast+Panampilly+Nagar+Kochi" target="_blank" rel="noopener noreferrer">
              Read all reviews on Google →
            </a>
          </p>
        </section>

        {/* Continue with remaining sections... */}
      </main>

      <Footer />
      <WhatsAppButton />
      <MainScripts />
      <MotionEffects />
    </>
  )
}
