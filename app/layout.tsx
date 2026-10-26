import type { Metadata } from 'next'
import Script from 'next/script'
import PageLoader from './components/PageLoader'
import SchemaMarkup from './components/SchemaMarkup'
import GoogleAnalytics from './components/GoogleAnalytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'French Toast — Breakfast, Brunch & Beyond · Panampilly Nagar, Kochi',
  description: 'French Toast is a beloved breakfast café in Panampilly Nagar, Kochi. Freshly made French toast, creative brunch dishes, coffee and sweets — a cosy nook of joy. Rated 4.3★ by 5,324+ customers.',
  keywords: ['French Toast Kochi', 'breakfast cafe Kochi', 'brunch Panampilly Nagar', 'best French toast Kochi', 'cafe Ernakulam', 'breakfast restaurant Kerala', 'French Toast Panampilly Nagar'],
  authors: [{ name: 'French Toast Kochi' }],
  creator: 'French Toast',
  publisher: 'French Toast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'French Toast — Kochi\'s Favourite Breakfast Café',
    description: 'A cosy spot for French toast, brunch, coffee and sweets in Panampilly Nagar, Kochi. Rated 4.3★ by 5,324+ happy customers.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://thefrenchtoast.in/',
    siteName: 'French Toast',
    images: [{
      url: 'https://thefrenchtoast.in/images/french1.webp',
      width: 1200,
      height: 800,
      alt: 'French Toast café interior - cozy breakfast spot in Kochi',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'French Toast — Kochi\'s Favourite Breakfast Café',
    description: 'Cosy breakfast café in Panampilly Nagar. Fresh French toast, brunch & coffee. 4.3★ rated.',
    images: ['https://thefrenchtoast.in/images/french1.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup page="home" />
        <GoogleAnalytics />
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Manrope:wght@300;400;500;600;700&family=Caveat:wght@400;600;700&display=swap" />
        <meta name="theme-color" content="#35251F" />
      </head>
      <body>
        <PageLoader />
        {children}
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        {/* Motion.js temporarily disabled - was causing content to disappear/reappear */}
        {/* <Script src="/assets/js/motion.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  )
}
