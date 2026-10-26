import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Link from 'next/link'
import { BUSINESS_INFO, getPrimaryLocation, getPhoneLink, getEmailLink, getWhatsAppLink } from '@/config/business'

export const metadata = {
  title: 'Visit Us — French Toast · Kochi',
  description: 'Find French Toast café in Panampilly Nagar, Kochi. Get directions, opening hours and contact information.',
}

export default function VisitPage() {
  const location = getPrimaryLocation()

  return (
    <>
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">Visit Us</p>
            <h1>
              Come say
              <br />
              <em>hello.</em>
            </h1>
            <p>Open seven days a week for breakfast, brunch, lunch and everything in between.</p>
          </div>
        </header>

        {/* Visit Info */}
        <section className="visit">
          <div className="container">
            <div className="visit-inner">
              <div className="visit-details">
                <h2>Find us</h2>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Address</p>
                    <p className="visit-info-value">
                      {location.address.line1},
                      <br />
                      {location.address.line2},
                      <br />
                      {location.address.city}, {location.address.state} {location.address.pincode}
                    </p>
                  </div>
                </div>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Hours</p>
                    <p className="visit-info-value">
                      Monday – Friday
                      <br />
                      {BUSINESS_INFO.hours.weekday.open} – {BUSINESS_INFO.hours.weekday.close}
                      <br />
                      Saturday – Sunday
                      <br />
                      {BUSINESS_INFO.hours.weekend.open} – {BUSINESS_INFO.hours.weekend.close}
                    </p>
                  </div>
                </div>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Phone</p>
                    <p className="visit-info-value">
                      <a href={getPhoneLink()}>{BUSINESS_INFO.contact.phone.display}</a>
                    </p>
                  </div>
                </div>

                <div className="visit-info-row">
                  <div className="visit-info-content">
                    <p className="visit-info-label">Email</p>
                    <p className="visit-info-value">
                      <a href={getEmailLink()}>{BUSINESS_INFO.contact.email}</a>
                    </p>
                  </div>
                </div>

                <div className="visit-actions">
                  <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
                    Get Directions
                  </a>
                  <Link href="/menu" className="btn btn--outline">
                    View the Menu
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
                  title="French Toast café location map"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="visit-extras">
          <div className="container">
            <div className="visit-extras-grid">
              <div className="visit-extra-card">
                <h3>🅿️ Parking</h3>
                <p>Limited street parking available nearby. We recommend using ride-sharing apps or arriving early on weekends.</p>
              </div>

              <div className="visit-extra-card">
                <h3>♿ Accessibility</h3>
                <p>Ground floor seating with wheelchair access. Please let us know if you need any assistance.</p>
              </div>

              <div className="visit-extra-card">
                <h3>📱 WiFi</h3>
                <p>Free high-speed WiFi available for all guests. Perfect for remote work or catching up on emails.</p>
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
