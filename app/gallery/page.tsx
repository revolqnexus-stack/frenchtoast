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
                <img src="/images/food1.webp" alt="Strawberry French Toast with whipped cream" loading="lazy" width="800" height="1066" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/french1.webp" alt="Cosy café interior with warm lighting" loading="lazy" width="700" height="525" />
              </div>

              <div className="gallery-tile" data-category="drinks">
                <img src="/images/food10.webp" alt="Coffee and breakfast" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile wide" data-category="food">
                <img src="/images/food2.webp" alt="Classic French Toast with maple syrup" loading="lazy" width="1200" height="525" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food3.webp" alt="Delicious French toast" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/french4.webp" alt="Cafe seating area" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food4.webp" alt="Beautifully plated breakfast dish" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile gallery-tile-dark">
                <p className="wordmark-tile">
                  French
                  <br />
                  Toast
                </p>
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food5.webp" alt="Gourmet breakfast plate" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food6.webp" alt="Signature dish" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food7.webp" alt="Savory breakfast option" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/french5.webp" alt="Restaurant interior ambiance" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food8.webp" alt="Hearty breakfast plate" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food9.webp" alt="Delicious specialty dish" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food11.webp" alt="Creative breakfast creation" loading="lazy" width="600" height="900" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/cafe at night.jpg" alt="Café at night with warm lighting" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food13.webp" alt="Artisan breakfast dish" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food14.jpg" alt="Sandwich specialty" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food15.jpg" alt="Dessert selection" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/french7.webp" alt="Cozy cafe interior" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food17.jpg" alt="Pasta dish" loading="lazy" width="600" height="600" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food18.jpg" alt="Comfort food special" loading="lazy" width="600" height="450" />
              </div>

              <div className="gallery-tile" data-category="food">
                <img src="/images/food19.jpg" alt="Signature brunch item" loading="lazy" width="600" height="800" />
              </div>

              <div className="gallery-tile" data-category="ambiance">
                <img src="/images/french9.webp" alt="Restaurant decor and ambiance" loading="lazy" width="600" height="600" />
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
