'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useEffect } from 'react'

export default function MenuPage() {
  useEffect(() => {
    // Load menu data and scripts
    const menuScript = document.createElement('script')
    menuScript.src = '/assets/js/menu.js'
    menuScript.async = true
    document.body.appendChild(menuScript)

    const dataScript = document.createElement('script')
    dataScript.src = '/assets/data/menu.js'
    dataScript.async = true
    document.body.appendChild(dataScript)

    // Motion.js disabled - was causing disappearing content issues
    // const motionScript = document.createElement('script')
    // motionScript.src = '/assets/js/motion.js'
    // motionScript.async = true
    // document.body.appendChild(motionScript)

    return () => {
      document.body.removeChild(menuScript)
      document.body.removeChild(dataScript)
      // document.body.removeChild(motionScript)
    }
  }, [])

  return (
    <>
      <Nav />

      <main>
        <header className="page-hero">
          <div className="page-hero-inner">
            <p className="eyebrow">Menu</p>
            <h1>
              Freshly made,<br />
              <em>always.</em>
            </h1>
            <p>From golden French toast and hearty sandwiches to rich pastas and indulgent desserts — every dish is made to order, with care.</p>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="menu-filters-bar" role="navigation" aria-label="Filter menu by category">
          <div className="container">
            <div id="menu-filter-bar" className="filter-group" role="group" aria-label="Category filters"></div>
            <div className="menu-search-wrap">
              <label htmlFor="menu-search" className="sr-only">Search the menu</label>
              <input
                type="search"
                id="menu-search"
                className="menu-search"
                placeholder="Search dishes…"
                autoComplete="off"
                aria-label="Search the menu"
              />
              <button
                id="menu-search-clear"
                className="menu-search-clear"
                aria-label="Clear search"
                tabIndex={-1}
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <section className="menu-body">
          <div className="container">
            <div id="menu-root" aria-live="polite" aria-label="Menu items"></div>
          </div>
        </section>

        {/* Item Modal */}
        <div
          id="item-modal-backdrop"
          className="item-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-item-name"
        >
          <div id="item-modal" className="item-modal">
            <button
              id="item-modal-close"
              className="item-modal-close"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="item-modal-img" aria-hidden="true"></div>
            <div className="item-modal-info">
              <h2 id="modal-item-name" className="item-modal-name"></h2>
              <p className="item-modal-price"></p>
              <p className="item-modal-desc"></p>
              <div className="item-modal-tags"></div>
              <a href="/order" className="btn btn--primary">Order This</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
