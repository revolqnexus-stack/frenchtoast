// ═══════════════════════════════════════════════════════════════════════════
// FRENCH TOAST — Business Information Configuration
// ═══════════════════════════════════════════════════════════════════════════
// Single source of truth for all contact details, hours, and locations.
// Update this file to propagate changes across the entire site.
// ═══════════════════════════════════════════════════════════════════════════

export const BUSINESS_INFO = {
  name: 'French Toast',
  tagline: 'A cosy breakfast café in Panampilly Nagar, Kochi.',
  description: 'Good food, great coffee, warm conversations.',

  // ─── CONTACT ─────────────────────────────────────────────────────────────
  contact: {
    // General business contact
    email: 'hello@thefrenchtoast.in',
    // Social media
    instagram: 'https://www.instagram.com/frenchtoastindia/',
    // Note: Each location has its own phone number - see locations array below
  },

  // ─── HOURS ───────────────────────────────────────────────────────────────
  // VERIFIED from placedigger.com
  hours: {
    weekday: { open: '9:00 AM', close: '10:00 PM' },
    weekend: { open: '8:00 AM', close: '10:00 PM' },
    display: {
      short: 'Mon–Fri: 9 AM – 10 PM • Sat–Sun: 8 AM – 10 PM',
      long: 'Monday – Friday: 9:00 AM – 10:00 PM\nSaturday – Sunday: 8:00 AM – 10:00 PM',
    },
  },

  // ─── LOCATIONS ───────────────────────────────────────────────────────────
  locations: [
    {
      id: 'panampilly-nagar',
      name: 'Panampilly Nagar',
      isPrimary: true,
      verified: true,
      address: {
        line1: '8th Cross, Street B, Ambikapuram Road',
        line2: 'Panampilly Nagar, Ernakulam',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682036',
        full: '8th Cross, Street B, Ambikapuram Road, Panampilly Nagar, Ernakulam, Kerala 682036',
      },
      contact: {
        // Multiple verified phone numbers found for this location
        phone: {
          display: '+91 484 406 1618',
          tel: '+914844061618',
          whatsapp: '914844061618',
        },
        alternatePhone: {
          display: '+91 81290 84545',
          tel: '+918129084545',
          note: 'Also verified from placedigger.com',
        },
      },
      hours: {
        weekday: { open: '9:00 AM', close: '10:00 PM' },
        weekend: { open: '8:00 AM', close: '10:00 PM' },
      },
      coordinates: {
        lat: 9.967014,
        lng: 76.295617,
      },
      mapsUrl: 'https://maps.app.goo.gl/2hqY5aRCUGAccKuZ6',
      features: ['Dine-In', 'Takeaway', 'WiFi', 'Outdoor Seating'],
    },
    {
      id: 'kacheripady',
      name: 'Kacheripady',
      isPrimary: false,
      verified: true,
      address: {
        line1: '41/3639, Chittoor Road',
        line2: 'Near Vimalalayam College, Kacheripady',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682018',
        full: '41/3639, Chittoor Road, Near Vimalalayam College, Kacheripady, Kochi, Kerala 682018',
      },
      contact: {
        phone: {
          display: '+91 484 405 1619',
          tel: '+914844051619',
          whatsapp: '914844051619',
        },
        alternatePhone: {
          display: '+91 97466 55355',
          tel: '+919746655355',
          note: 'Verified from placedigger.com',
        },
      },
      hours: {
        // Hours not verified for this location
        weekday: { open: '9:00 AM', close: '10:00 PM' },
        weekend: { open: '8:00 AM', close: '10:00 PM' },
        note: 'Hours assumed same as Panampilly Nagar - requires verification',
      },
      coordinates: {
        lat: 9.9805,
        lng: 76.2912,
      },
      mapsUrl: 'https://maps.google.com/?q=41/3639+Chittoor+Road+Kacheripady+Kochi',
      features: ['Dine-In', 'Takeaway'],
      verificationSource: 'latlong.net, placedigger.com, Times of India articles (2019)',
    },
  ],

  // ─── GOOGLE REVIEWS ───────────────────────────────────────────────────────
  reviews: {
    verified: true,
    rating: 4.3,
    count: 5324,
    url: 'https://maps.app.goo.gl/2hqY5aRCUGAccKuZ6',
  },
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

export function getPrimaryLocation() {
  return BUSINESS_INFO.locations.find(loc => loc.isPrimary) || BUSINESS_INFO.locations[0]
}

export function getWhatsAppLink(message?: string, locationId?: string) {
  const location = locationId 
    ? BUSINESS_INFO.locations.find(loc => loc.id === locationId)
    : getPrimaryLocation()
  
  const phone = location?.contact?.phone?.whatsapp || getPrimaryLocation().contact.phone.whatsapp
  const encodedMessage = message 
    ? encodeURIComponent(message) 
    : encodeURIComponent("Hi, I'd like to know more about French Toast café")
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function getPhoneLink(locationId?: string) {
  const location = locationId 
    ? BUSINESS_INFO.locations.find(loc => loc.id === locationId)
    : getPrimaryLocation()
  
  return `tel:${location?.contact?.phone?.tel || getPrimaryLocation().contact.phone.tel}`
}

export function getLocationPhone(locationId: string) {
  const location = BUSINESS_INFO.locations.find(loc => loc.id === locationId)
  return location?.contact?.phone
}

export function getAllLocations() {
  return BUSINESS_INFO.locations.filter(loc => loc.verified)
}

export function getEmailLink() {
  return `mailto:${BUSINESS_INFO.contact.email}`
}
