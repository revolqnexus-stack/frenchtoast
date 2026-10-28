'use client'

import Link from 'next/link'
import { useState } from 'react'
import MadeByRevolq from './MadeByRevolq'
import { BUSINESS_INFO, getPrimaryLocation, getWhatsAppLink } from '@/config/business'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const location = getPrimaryLocation()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // Simulate submission — wire to real service when ready
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <footer className="site-footer">

      {/* ── Newsletter banner ─────────────────────────────────────────────── */}
      <div className="footer-newsletter">
        {/* Breakfast illustration — left decorative */}
        <img
          src="/footer/footer.png"
          alt=""
          aria-hidden="true"
          className="footer-nl-art footer-nl-art--left"
        />

        <div className="footer-nl-body">
          <p className="footer-nl-handwrite">good mornings, warm toasts, and zero bad coffee</p>
          <h2 className="footer-nl-headline">
            stay in the loop <em>with us.</em>
          </h2>
          <p className="footer-nl-sub">specials, new dishes, and the occasional good morning</p>

          {submitted ? (
            <p className="footer-nl-thanks">thanks — see you at the café ☕</p>
          ) : (
            <form className="footer-nl-form" onSubmit={handleSubscribe} noValidate>
              <span className="footer-nl-star" aria-hidden="true">✦</span>
              <input
                type="email"
                placeholder="your e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email address"
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? '...' : 'subscribe'}
              </button>
              <span className="footer-nl-star" aria-hidden="true">✦</span>
            </form>
          )}
        </div>

        {/* Pastry scatter — right decorative */}
        <img
          src="/footer/footer1.png"
          alt=""
          aria-hidden="true"
          className="footer-nl-art footer-nl-art--right"
        />
      </div>

      {/* ── Three-column links ────────────────────────────────────────────── */}
      <div className="footer-cols">

        {/* Col 1 — Explore */}
        <div className="footer-col">
          <h3 className="footer-col__heading">Explore</h3>
          <nav aria-label="Footer navigation">
            <ul className="footer-col__list">
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/about">Our story</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/visit">Find us</Link></li>
              <li><Link href="/order">Order online</Link></li>
            </ul>
          </nav>
        </div>

        {/* Col 2 — Come By */}
        <div className="footer-col">
          <h3 className="footer-col__heading">Come By</h3>
          <address className="footer-col__address">
            <p>{location.address.line1}</p>
            <p>{location.address.line2}</p>
            <p>{location.address.city}, {location.address.state} {location.address.pincode}</p>
          </address>
          <ul className="footer-col__list footer-col__list--spaced">
            <li>
              <span className="footer-col__label">Mon – Fri</span>
              <span className="footer-col__val">{location.hours.weekday.open} – {location.hours.weekday.close}</span>
            </li>
            <li>
              <span className="footer-col__label">Sat – Sun</span>
              <span className="footer-col__val">{location.hours.weekend.open} – {location.hours.weekend.close}</span>
            </li>
          </ul>
          <a
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-col__cta"
            aria-label="Get directions on Google Maps"
          >
            Get directions ↗
          </a>
        </div>

        {/* Col 3 — Say Hello */}
        <div className="footer-col">
          <h3 className="footer-col__heading">Say Hello</h3>

          {/* Café storefront illustration */}
          <div className="footer-col__illustration" aria-hidden="true">
            <img src="/footer/footer2.png" alt="" width="160" height="160" />
          </div>

          <ul className="footer-col__list">
            <li>
              <a
                href={BUSINESS_INFO.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp ↗
              </a>
            </li>
            <li>
              <a href={location.contact.phone.tel}>
                {location.contact.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS_INFO.contact.email}`}>
                {BUSINESS_INFO.contact.email}
              </a>
            </li>
            <li><Link href="/contact">Contact form</Link></li>
          </ul>
        </div>

      </div>

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className="footer-divider" aria-hidden="true" />

      {/* ── Closing wordmark ──────────────────────────────────────────────── */}
      <div className="footer-closing">
        <Link href="/" className="footer-wordmark" aria-label="French Toast — back to home">
          French Toast
        </Link>
      </div>

      {/* ── Legal bar ─────────────────────────────────────────────────────── */}
      <div className="footer-legal">
        <span>© {currentYear} French Toast, Kochi.</span>
        <span className="footer-legal-sep" aria-hidden="true">·</span>
        <MadeByRevolq />
      </div>

    </footer>
  )
}
