'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav({ transparent = false, onDark = false }) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    if (transparent) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [transparent])

  const navClass = `site-nav ${
    transparent && !isScrolled ? 'site-nav--transparent' : 'site-nav--solid'
  } ${onDark && !isScrolled ? 'site-nav--on-dark' : ''}`

  const isActive = (path: string) => pathname === path

  return (
    <>
      <nav className={navClass} aria-label="Primary navigation">
        <Link href="/" className="nav-wordmark" aria-label="French Toast — Home">
          french toast
        </Link>
        <ul className="nav-links" role="list">
          <li><Link href="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
          <li><Link href="/menu" className={isActive('/menu') ? 'active' : ''}>Menu</Link></li>
          <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>Our Story</Link></li>
          <li><Link href="/gallery" className={isActive('/gallery') ? 'active' : ''}>Gallery</Link></li>
          <li><Link href="/visit" className={isActive('/visit') ? 'active' : ''}>Visit Us</Link></li>
          <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
        </ul>
        <Link href="/order" className="nav-order">Order Online</Link>
        <button
          className="nav-toggle"
          aria-label="Open navigation"
          aria-expanded={drawerOpen}
          aria-controls="nav-drawer"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div
        className={`nav-drawer ${drawerOpen ? 'open' : ''}`}
        id="nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <p className="drawer-meta">Panampilly Nagar · Kochi</p>
        <nav className="drawer-links">
          <Link href="/" onClick={() => setDrawerOpen(false)}>Home</Link>
          <Link href="/menu" onClick={() => setDrawerOpen(false)}>Menu</Link>
          <Link href="/about" onClick={() => setDrawerOpen(false)}>Our Story</Link>
          <Link href="/gallery" onClick={() => setDrawerOpen(false)}>Gallery</Link>
          <Link href="/visit" onClick={() => setDrawerOpen(false)}>Visit Us</Link>
          <Link href="/contact" onClick={() => setDrawerOpen(false)}>Contact</Link>
        </nav>
        <Link href="/order" className="drawer-order" onClick={() => setDrawerOpen(false)}>
          Order Online
        </Link>
      </div>
    </>
  )
}
