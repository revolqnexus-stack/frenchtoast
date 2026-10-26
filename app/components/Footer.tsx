import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="wordmark">
            French<br />Toast
          </Link>
          <p>A cosy breakfast café in Panampilly Nagar, Kochi. Good food, great coffee, warm conversations.</p>
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
            Mon – Sun<br />
            8:00 AM – 10:00 PM<br /><br />
            <a href="tel:+914842025618">0484 202 5618</a>
          </address>
        </div>
        <div className="footer-col">
          <h4>Visit</h4>
          <address>
            8th Cross Street B,<br />
            Ambikupuram Rd,<br />
            Panampilly Nagar,<br />
            Ernakulam, Kerala 682036
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 French Toast, Kochi. All rights reserved.</p>
        <div className="footer-social">
          <a
            href="https://www.instagram.com/frenchtoastindia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/919074870797"
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
