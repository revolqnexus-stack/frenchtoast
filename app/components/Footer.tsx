import Link from 'next/link'
import MadeByRevolq from './MadeByRevolq'
import { BUSINESS_INFO, getPrimaryLocation, getWhatsAppLink } from '@/config/business'

export default function Footer() {
  const location = getPrimaryLocation()
  const currentYear = new Date().getFullYear()
  const hasMultipleLocations = BUSINESS_INFO.locations.filter(loc => loc.verified).length > 1

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            French<br />Toast
          </Link>
          <p>{BUSINESS_INFO.tagline} {BUSINESS_INFO.description}</p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/menu">Menu</Link></li>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/visit">{hasMultipleLocations ? 'Locations' : 'Visit Us'}</Link></li>
            <li><Link href="/order">Order Online</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>{hasMultipleLocations ? 'Locations' : 'Hours'}</h4>
          {hasMultipleLocations ? (
            <address>
              <Link href="/visit" style={{ textDecoration: 'underline' }}>
                View all locations →
              </Link>
              <br /><br />
              {location.name}:<br />
              <a href={`tel:${location.contact.phone.tel}`}>{location.contact.phone.display}</a>
            </address>
          ) : (
            <address>
              Mon – Fri<br />
              {location.hours.weekday.open} – {location.hours.weekday.close}<br />
              Sat – Sun<br />
              {location.hours.weekend.open} – {location.hours.weekend.close}<br /><br />
              <a href={`tel:${location.contact.phone.tel}`}>{location.contact.phone.display}</a>
            </address>
          )}
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <address>
            {hasMultipleLocations && <><strong>{location.name}</strong><br /></>}
            {location.address.line1},<br />
            {location.address.line2},<br />
            {location.address.city}, {location.address.state} {location.address.pincode}
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {currentYear} French Toast, Kochi. All rights reserved.</p>
        <div className="footer-social">
          <a
            href={BUSINESS_INFO.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            Instagram
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="footer-bottom--bar">
        <MadeByRevolq />
      </div>
    </footer>
  )
}
