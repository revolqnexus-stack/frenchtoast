import Link from 'next/link'
import { BUSINESS_INFO, getPrimaryLocation, getWhatsAppLink, getPhoneLink } from '@/config/business'

export default function Footer() {
  const location = getPrimaryLocation()
  const currentYear = new Date().getFullYear()

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
            <li><Link href="/visit">Visit Us</Link></li>
            <li><Link href="/order">Order Online</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Hours</h4>
          <address>
            Mon – Fri<br />
            {BUSINESS_INFO.hours.weekday.open} – {BUSINESS_INFO.hours.weekday.close}<br />
            Sat – Sun<br />
            {BUSINESS_INFO.hours.weekend.open} – {BUSINESS_INFO.hours.weekend.close}<br /><br />
            <a href={getPhoneLink()}>{BUSINESS_INFO.contact.phone.display}</a>
          </address>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <address>
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
    </footer>
  )
}
