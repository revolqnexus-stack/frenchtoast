'use client'

import Link from 'next/link'
import { useState } from 'react'
import MadeByRevolq from './MadeByRevolq'
import { BUSINESS_INFO, getWhatsAppLink } from '@/config/business'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <footer className="site-footer">

      {/* ── Top: tagline + email signup ───────────────────────────────────── */}
      <div className="footer-top">
        <p className="footer-handwrite">
          good mornings, warm toasts,<br />
          and zero bad coffee
        </p>

        <div className="footer-toast-icon" aria-hidden="true">
          {/* Toast icon — inline SVG */}
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="10" width="54" height="58" rx="8" stroke="var(--paper)" strokeWidth="2.5" fill="none"/>
            <rect x="28" y="2" width="8" height="18" rx="4" stroke="var(--paper)" strokeWidth="2.5" fill="none"/>
            <rect x="54" y="2" width="8" height="18" rx="4" stroke="var(--paper)" strokeWidth="2.5" fill="none"/>
            <path d="M28 38 Q45 50 62 38" stroke="var(--butter)" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="35" cy="30" r="3" fill="var(--butter)" opacity="0.7"/>
            <circle cx="55" cy="30" r="3" fill="var(--butter)" opacity="0.7"/>
            <path d="M18 68 h54" stroke="var(--paper)" strokeWidth="1.5" opacity="0.3"/>
            <path d="M25 74 h40" stroke="var(--paper)" strokeWidth="1.5" opacity="0.2"/>
            <path d="M32 80 h26" stroke="var(--paper)" strokeWidth="1.5" opacity="0.1"/>
          </svg>
        </div>

        <h2 className="footer-cta-headline">
          we cook like we care: <em>always.</em>
        </h2>
        <p className="footer-cta-sub">follow along for daily specials & café moments</p>

        {submitted ? (
          <p className="footer-subscribe-thanks">thanks — see you at the café ☕</p>
        ) : (
          <form className="footer-subscribe" onSubmit={handleSubscribe}>
            <span className="footer-subscribe-asterisk" aria-hidden="true">✦</span>
            <input
              type="email"
              placeholder="your e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit">subscribe</button>
            <span className="footer-subscribe-asterisk footer-subscribe-asterisk--right" aria-hidden="true">✦</span>
          </form>
        )}
      </div>

      {/* ── Middle: three-column links ────────────────────────────────────── */}
      <div className="footer-links">
        <div className="footer-links-col">
          <h4>explore</h4>
          <ul>
            <li><Link href="/menu">menu</Link></li>
            <li><Link href="/about">our story</Link></li>
            <li><Link href="/gallery">gallery</Link></li>
            <li><Link href="/visit">find us</Link></li>
            <li><Link href="/order">order online</Link></li>
          </ul>
        </div>

        <div className="footer-links-col footer-links-col--center">
          <h4>connect</h4>
          <div className="footer-social-icons">
            <a
              href={BUSINESS_INFO.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              {/* Instagram */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
              </svg>
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              {/* WhatsApp */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
              </svg>
            </a>
            <a
              href={`mailto:${BUSINESS_INFO.contact.email}`}
              aria-label="Email us"
            >
              {/* Email */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-links-col footer-links-col--right">
          <h4>visit</h4>
          <ul>
            <li><Link href="/contact">contact</Link></li>
            <li>
              <a
                href="https://maps.app.goo.gl/2hqY5aRCUGAccKuZ6"
                target="_blank"
                rel="noopener noreferrer"
              >
                directions
              </a>
            </li>
            <li>
              <a href={`tel:+914844061618`}>call us</a>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                whatsapp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom: big wordmark + legal ──────────────────────────────────── */}
      <div className="footer-wordmark-row">
        <Link href="/" className="footer-wordmark" aria-label="French Toast home">
          French Toast
        </Link>
      </div>

      <div className="footer-legal">
        <span>© {currentYear} French Toast, Kochi.</span>
        <Link href="/contact">contact</Link>
        <span className="footer-legal-dot" aria-hidden="true">·</span>
        <MadeByRevolq />
      </div>

    </footer>
  )
}
