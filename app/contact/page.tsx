'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import Link from 'next/link'
import { useEffect } from 'react'
import { BUSINESS_INFO } from '@/config/business'

export default function ContactPage() {
  useEffect(() => {
    // Load contact form script
    const script = document.createElement('script')
    script.src = '/assets/js/contact.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">Get In Touch</p>
            <h1>
              We'd love to
              <br />
              <em>hear from you.</em>
            </h1>
            <p>Have a question, feedback or a special request? Drop us a message — we're here to help.</p>
          </div>
        </header>

        {/* Contact Section */}
        <section className="contact-page section">
          <div className="container">
            <div className="contact-grid">
              {/* Form */}
              <div className="contact-form-col">
                <h2>Send a message.</h2>
                <p>Fill in the form below and we'll get back to you as soon as we can.</p>

                <form id="contact-form" className="contact-form" noValidate>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input type="text" id="name" name="name" className="form-input" placeholder="Your name" aria-label="Name" autoComplete="name" />
                    <p className="form-error" aria-live="polite"></p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="email" id="email" name="email" className="form-input" placeholder="your@email.com" aria-label="Email address" autoComplete="email" />
                    <p className="form-error" aria-live="polite"></p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="How can we help you?" aria-label="Message" rows={5}></textarea>
                    <p className="form-error" aria-live="polite"></p>
                  </div>

                  <div id="form-status" className="form-status" role="status" aria-live="polite"></div>

                  <button type="submit" className="btn btn--primary">
                    Send Message
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="contact-info-col">
                <div className="contact-card">
                  <h3>Reach Us</h3>

                  <div className="contact-detail">
                    <div className="contact-detail-content">
                      <p className="contact-detail-label">Email</p>
                      <p className="contact-detail-value">
                        <a href={`mailto:${BUSINESS_INFO.contact.email}`}>
                          {BUSINESS_INFO.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail-content">
                      <p className="contact-detail-label">Locations</p>
                      <p className="contact-detail-value">
                        <Link href="/visit" style={{ textDecoration: 'underline' }}>
                          View all locations & phone numbers →
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="contact-detail">
                    <div className="contact-detail-content">
                      <p className="contact-detail-label">Follow Us</p>
                      <p className="contact-detail-value">
                        <a 
                          href={BUSINESS_INFO.contact.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'underline' }}
                        >
                          @frenchtoastindia
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="contact-img-wrap" style={{ marginTop: 'var(--sp-4)' }}>
                  <div className="img-frame">
                    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=85" alt="Coffee at French Toast" loading="lazy" width="700" height="394" />
                  </div>
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
