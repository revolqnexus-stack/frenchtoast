import Link from 'next/link'
import Nav from './components/Nav'
import Footer from './components/Footer'

export default function NotFound() {
  return (
    <>
      <link rel="stylesheet" href="/assets/css/pages.css" />
      <Nav />
      
      <main>
        <header className="page-hero">
          <div className="page-hero-inner">
            <h1>
              <em>404</em>
              <br />
              Page not found.
            </h1>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <div style={{ marginTop: 'var(--sp-8)' }}>
              <Link href="/" className="btn btn--primary">
                Back to Home
              </Link>
            </div>
          </div>
        </header>
      </main>
      
      <Footer />
    </>
  )
}
