import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'French Toast — Breakfast, Brunch & Beyond · Panampilly Nagar, Kochi',
  description: 'French Toast is a beloved breakfast café in Panampilly Nagar, Kochi. Freshly made French toast, creative brunch dishes, coffee and sweets — a cosy nook of joy.',
  keywords: ['French Toast', 'Kochi', 'breakfast', 'brunch', 'cafe', 'Panampilly Nagar'],
  openGraph: {
    title: 'French Toast — Kochi\'s Favourite Breakfast Café',
    description: 'A cosy spot for French toast, brunch, coffee and sweets in Panampilly Nagar, Kochi.',
    type: 'website',
    url: 'https://thefrenchtoast.in/',
    images: [{
      url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=1200&q=85',
      width: 1200,
      height: 800,
    }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Playfair+Display:wght@700&family=Manrope:wght@300;400;500;600;700&display=swap" />
        <meta name="theme-color" content="#35251F" />
      </head>
      <body>{children}</body>
    </html>
  )
}
