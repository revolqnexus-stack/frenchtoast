'use client'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import BlurText from '../components/BlurText'
import StaggerReveal from '../components/StaggerReveal'
import { useEffect } from 'react'

export default function GalleryPage() {
  useEffect(() => {
    // Gallery filter and lightbox functionality
    const filterBtns = document.querySelectorAll('.filter-pill[data-filter]')
    const tiles = document.querySelectorAll('.gallery-tile[data-category]')

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active')
          b.setAttribute('aria-pressed', 'false')
        })
        btn.classList.add('active')
        btn.setAttribute('aria-pressed', 'true')

        const filter = btn.getAttribute('data-filter')
        tiles.forEach((tile) => {
          const match = filter === 'all' || tile.getAttribute('data-category') === filter
          ;(tile as HTMLElement).style.display = match ? '' : 'none'
        })
      })
    })

    // Lightbox
    const lightbox = document.getElementById('lightbox')
    const lbImg = document.getElementById('lightbox-img') as HTMLImageElement
    const lbClose = document.getElementById('lightbox-close')
    let lastFocus: HTMLElement | null = null

    tiles.forEach((tile) => {
      const img = tile.querySelector('img')
      if (!img) return
      tile.setAttribute('tabindex', '0')
      tile.setAttribute('role', 'button')
      tile.setAttribute('aria-label', 'View: ' + img.alt)

      tile.addEventListener('click', () => {
        lbImg.src = img.src.replace('w=600', 'w=1200').replace('w=700', 'w=1200').replace('w=800', 'w=1200')
        lbImg.alt = img.alt
        lightbox?.classList.add('open')
        document.body.style.overflow = 'hidden'
        lastFocus = tile as HTMLElement
        lbClose?.focus()
      })

      tile.addEventListener('keydown', (e) => {
        const event = e as KeyboardEvent
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          tile.dispatchEvent(new Event('click'))
        }
      })
    })

    function closeLightbox() {
      lightbox?.classList.remove('open')
      document.body.style.overflow = ''
      lastFocus?.focus()
    }

    lbClose?.addEventListener('click', closeLightbox)
    lightbox?.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox()
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox()
    })
  }, [])

  return (
    <>
      <Nav />

      <main>
        {/* Page Hero */}
        <header className="page-hero">
          <div className="page-hero-inner">
            <BlurText as="p" className="eyebrow" delay={0.1} duration={0.6} stagger={0.05}>Gallery</BlurText>
            <BlurText as="h1" delay={0.3} duration={0.9} stagger={0.1}>
              Good food, beautiful moments.
            </BlurText>
            <BlurText as="p" delay={0.6} duration={0.7} stagger={0.04}>
              A glimpse of the food, cosy corners and happy moments at French Toast.
            </BlurText>
          </div>
        </header>

        {/* Gallery */}
        <section className="gallery-body">
          <div className="container">
            {/* Filter */}
            <div className="filter-group reveal" role="group" aria-label="Filter gallery" style={{ marginBottom: 'var(--sp-10)' }}>
              <button className="filter-pill active" data-filter="all">
                All
              </button>
              <button className="filter-pill" data-filter="food">
                Food
              </button>
              <button className="filter-pill" data-filter="ambiance">
                Ambiance
              </button>
              <button className="filter-pill" data-filter="drinks">
                Drinks
              </button>
            </div>

            <StaggerReveal className="gallery-masonry" stagger={0.07} duration={0.6} y={30} id="gallery-grid">
              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=85" alt="Strawberry French Toast with whipped cream" loading="lazy" width="800" height="1066" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&q=80" alt="Cosy café interior with warm lighting" loading="lazy" width="700" height="525" />
              </div>

              <div className="gallery-tile" data-category="drinks">
                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80" alt="Iced coffee with milk" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile wide" data-category="food">
                <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80" alt="Classic French Toast with maple syrup" loading="lazy" width="1200" height="525" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1568051243858-533a607809a5?w=600&q=80" alt="Banoffee pie slice with caramel" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="drinks">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" alt="Pour over coffee being brewed" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&q=80" alt="Eggs Benedict with hollandaise sauce" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile gallery-tile-dark">
                <p className="wordmark-tile">
                  French
                  <br />
                  Toast
                </p>
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1481070555726-e2fe8357725c?w=600&q=80" alt="Gourmet club sandwich" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="drinks">
                <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80" alt="Flat white latte art" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?w=600&q=80" alt="Shakshuka with poached eggs" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80" alt="Restaurant interior with diners" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80" alt="Avocado toast with poached egg" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="drinks">
                <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80" alt="Cappuccino with foam art" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80" alt="Pancake stack with berries" loading="lazy" width="600" height="900" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80" alt="Café counter and barista" loading="lazy" width="600" height="450" />
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Lightbox */}
        <div id="lightbox" className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button id="lightbox-close" className="lightbox-close" aria-label="Close image viewer">
            ✕
          </button>
          <img id="lightbox-img" className="lightbox-img" src="" alt="" />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  )
}
