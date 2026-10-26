import { BUSINESS_INFO, getPrimaryLocation } from '@/config/business'

interface SchemaMarkupProps {
  page?: 'home' | 'menu' | 'about' | 'contact'
}

export default function SchemaMarkup({ page = 'home' }: SchemaMarkupProps) {
  const primaryLocation = getPrimaryLocation()
  const allLocations = BUSINESS_INFO.locations.filter(loc => loc.verified)

  // Base Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': 'https://thefrenchtoast.in/#restaurant',
    name: BUSINESS_INFO.name,
    alternateName: 'French Toast Café',
    description: BUSINESS_INFO.description,
    url: 'https://thefrenchtoast.in',
    logo: 'https://thefrenchtoast.in/assets/favicon.svg',
    image: [
      'https://thefrenchtoast.in/images/french1.webp',
      'https://thefrenchtoast.in/images/french%202.webp',
      'https://thefrenchtoast.in/images/french%203.webp',
    ],
    telephone: primaryLocation.contact.phone.display,
    email: BUSINESS_INFO.contact.email,
    priceRange: '₹₹',
    
    // Aggregate Rating
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS_INFO.reviews.rating,
      reviewCount: BUSINESS_INFO.reviews.count,
      bestRating: 5,
      worstRating: 1,
    },

    // Cuisine & Service Options
    servesCuisine: ['Breakfast', 'Brunch', 'Continental', 'French', 'Café'],
    hasMenu: 'https://thefrenchtoast.in/menu',
    acceptsReservations: false,
    
    // Service Options
    hasDeliveryMethod: [
      { '@type': 'DeliveryMethod', name: 'Dine-in' },
      { '@type': 'DeliveryMethod', name: 'Takeaway' },
      { '@type': 'DeliveryMethod', name: 'Delivery' },
    ],

    // Social Media
    sameAs: [
      BUSINESS_INFO.contact.instagram,
      BUSINESS_INFO.reviews.url,
    ],

    // Primary Location
    address: {
      '@type': 'PostalAddress',
      streetAddress: primaryLocation.address.line1,
      addressLocality: primaryLocation.address.city,
      addressRegion: primaryLocation.address.state,
      postalCode: primaryLocation.address.pincode,
      addressCountry: 'IN',
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: primaryLocation.coordinates.lat,
      longitude: primaryLocation.coordinates.lng,
    },

    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
  }

  // Additional locations if multi-location
  const additionalLocationsSchema = allLocations.length > 1 ? allLocations.slice(1).map(location => ({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: `${BUSINESS_INFO.name} - ${location.name}`,
    parentOrganization: {
      '@id': 'https://thefrenchtoast.in/#restaurant',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address.line1,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    telephone: location.contact.phone.display,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '22:00',
      },
    ],
  })) : []

  // Breadcrumb Schema (for navigation)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://thefrenchtoast.in',
      },
      ...(page !== 'home' ? [{
        '@type': 'ListItem',
        position: 2,
        name: page.charAt(0).toUpperCase() + page.slice(1),
        item: `https://thefrenchtoast.in/${page}`,
      }] : []),
    ],
  }

  // Menu Schema (only on menu page)
  const menuSchema = page === 'menu' ? {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'French Toast Menu',
    description: 'Breakfast, brunch, and café menu featuring French toast, eggs, sandwiches, pasta, and more',
    inLanguage: 'en-IN',
    provider: {
      '@id': 'https://thefrenchtoast.in/#restaurant',
    },
  } : null

  // FAQ Schema (for about page)
  const faqSchema = page === 'about' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are French Toast café opening hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Monday to Friday: 9:00 AM – 10:00 PM. Saturday and Sunday: 8:00 AM – 10:00 PM.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is French Toast café located in Kochi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `We have locations in ${allLocations.map(l => l.name).join(' and ')}. Our primary location is at ${primaryLocation.address.full}`,
        },
      },
      {
        '@type': 'Question',
        name: 'Do you accept reservations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We operate on a walk-in basis and do not accept reservations. We welcome guests during our opening hours.',
        },
      },
    ],
  } : null

  const schemas = [
    organizationSchema,
    ...additionalLocationsSchema,
    breadcrumbSchema,
    menuSchema,
    faqSchema,
  ].filter(Boolean)

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
