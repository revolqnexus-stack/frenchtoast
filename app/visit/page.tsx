import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Link from 'next/link'
import { BUSINESS_INFO, getAllLocations } from '@/config/business'

export const metadata = {
  title: 'Visit Us — French Toast · Kochi',
  description: 'Find French Toast café locations in Kochi. Visit us at Panampilly Nagar or Kacheripady for breakfast, brunch and great coffee.',
}

export default function VisitPage() {
  const locations = getAllLocations()
  const hasMultiple = locations.length > 1

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

        {/* Locations Section */}
        <section className="visit">
          <div className="container">
            {hasMultiple && (
              <div className="visit-intro">
                <h2>
                  Find us at <em>two locations</em> in Kochi
                </h2>
                <p>Both outlets serve the same menu with the same quality and care.</p>
              </div>
            )}

            {locations.map((location, index) => (
              <div 
                key={location.id}
                className="visit-location-block"
                style={{ 
                  marginTop: index > 0 ? 'var(--sp-16)' : 0,
                  paddingTop: index > 0 ? 'var(--sp-16)' : 0,
                  borderTop: index > 0 ? '1px solid var(--border)' : 'none'
                }}
              >
                <div className="visit-inner">
                  <div className="visit-details">
                    <h2>{location.name}</h2>

                    <div className="visit-info-row">
                      <div className="visit-info-content">
                        <p className="visit-info-label">Address</p>
                        <p className="visit-info-value">
                          {location.address.line1}
                          <br />
                          {location.address.line2}
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
                          {location.hours.weekday.open} – {location.hours.weekday.close}
                          <br />
                          Saturday – Sunday
                          <br />
                          {location.hours.weekend.open} – {location.hours.weekend.close}
                        </p>
                        {location.hours.note && (
                          <p className="visit-info-note">
                            {location.hours.note}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="visit-info-row">
                      <div className="visit-info-content">
                        <p className="visit-info-label">Phone</p>
                        <p className="visit-info-value">
                          <a href={`tel:${location.contact.phone.tel}`}>
                            {location.contact.phone.display}
                          </a>
                        </p>
                        {location.contact.alternatePhone && (
                          <>
                            <p className="visit-info-value">
                              <a href={`tel:${location.contact.alternatePhone.tel}`}>
                                {location.contact.alternatePhone.display}
                              </a>
                            </p>
                            {location.contact.alternatePhone.note && (
                              <p className="visit-info-note">
                                {location.contact.alternatePhone.note}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {location.features && location.features.length > 0 && (
                      <div className="visit-info-row">
                        <div className="visit-info-content">
                          <p className="visit-info-label">Features</p>
                          <p className="visit-info-value">
                            {location.features.join(' • ')}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="visit-actions">
                      <a 
                        href={location.mapsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn--primary"
                      >
                        Get Directions
                      </a>
                      <a 
                        href={`https://wa.me/${location.contact.phone.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to know more about French Toast ${location.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--outline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="visit-map">
                    <iframe
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.2621519284597!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTgnMDEuMiJOIDc2wrAxNyc1MS4wIkU!5e0!3m2!1sen!2sin!4v1234567890`}
                      width="600"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`French Toast ${location.name} location map`}
                    ></iframe>
                  </div>
                </div>
              </div>
            ))}
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
