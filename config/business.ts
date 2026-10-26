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
    // VERIFIED from placedigger.com
    phone: {
      display: '+91 81290 84545',
      tel: '+918129084545',
      whatsapp: '918129084545',
    },
    email: 'hello@thefrenchtoast.in',
    // Social media
    instagram: 'https://www.instagram.com/frenchtoastindia/',
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
      address: {
        line1: '8th Crossroad B, Ambikapuram Road',
        line2: 'Panampilly Nagar, Ernakulam',
        city: 'Kochi',
        state: 'Kerala',
        pincode: '682036',
        full: '8th Crossroad B, Ambikapuram Road, Panampilly Nagar, Ernakulam, Kerala 682036',
      },
      coordinates: {
        lat: 9.967014,
        lng: 76.295617,
      },
      mapsUrl: 'https://maps.google.com/?q=French+Toast+Panampilly+Nagar+Kochi',
    },
    {
      id: 'kacheripady',
      name: 'Kacheripady',
      isPrimary: false,
      // NOTE: Verified location from Times of India articles, but address details unavailable
      address: {
        line1: 'Kacheripady',
        city: 'Kochi',
        state: 'Kerala',
        full: 'Kacheripady, Kochi, Kerala',
      },
      note: 'Address details pending verification',
    },
  ],

  // ─── GOOGLE REVIEWS (UNVERIFIED) ─────────────────────────────────────────
  // WARNING: Could not verify actual review count or rating from Google
  // Remove or update with verified data before going live
  reviews: {
    verified: false,
    rating: null, // Was: 4.3
    count: null,  // Was: 5,321
    note: 'Review data pending verification from Google Business Profile',
  },
}

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

export function getPrimaryLocation() {
  return BUSINESS_INFO.locations.find(loc => loc.isPrimary) || BUSINESS_INFO.locations[0]
}

export function getWhatsAppLink(message?: string) {
  const phone = BUSINESS_INFO.contact.phone.whatsapp
  const encodedMessage = message 
    ? encodeURIComponent(message) 
    : encodeURIComponent("Hi, I'd like to know more about French Toast café")
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function getPhoneLink() {
  return `tel:${BUSINESS_INFO.contact.phone.tel}`
}

export function getEmailLink() {
  return `mailto:${BUSINESS_INFO.contact.email}`
}
