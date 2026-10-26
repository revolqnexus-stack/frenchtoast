# French Toast Café - Next.js Website

A beautiful, fully-animated restaurant website built with Next.js 16, TypeScript, and preserving all original CSS animations and interactions.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## 📦 Tech Stack

- **Next.js 16.4** - React framework with App Router
- **TypeScript** - Type safety
- **CSS** - Custom CSS (no Tailwind, preserves original animations)
- **Vercel** - Deployment platform

## 🎨 Features

- ✨ **Smooth scroll animations** - All reveal and parallax effects preserved
- 🎯 **Dynamic menu system** - Filter by category, search dishes
- 📱 **Fully responsive** - Mobile-first design with animated mobile menu
- 🖼️ **Gallery with lightbox** - Click to expand images
- 📧 **Contact form** - Client-side validation
- ⭐ **Reviews marquee** - Infinite scrolling testimonials
- 🍔 **Sticky navigation** - Glass morphism effect on scroll

## 📁 Project Structure

```
├── app/
│   ├── components/         # Reusable React components
│   │   ├── Nav.tsx        # Navigation with scroll effects
│   │   ├── Footer.tsx     # Footer component
│   │   └── WhatsAppButton.tsx
│   ├── page.tsx           # Home page
│   ├── menu/page.tsx      # Menu page
│   ├── about/page.tsx     # About page (TODO)
│   ├── gallery/page.tsx   # Gallery page (TODO)
│   ├── visit/page.tsx     # Visit Us page (TODO)
│   ├── contact/page.tsx   # Contact page (TODO)
│   └── layout.tsx         # Root layout
├── public/
│   └── assets/
│       ├── css/           # All stylesheets (preserved)
│       ├── js/            # Interaction scripts
│       └── data/          # Menu data
```

## 🎯 What's Working

- ✅ Home page with hero, dishes, reviews
- ✅ Menu page with filtering and search
- ✅ Navigation (desktop + mobile drawer)
- ✅ All CSS animations (reveals, parallax, hovers)
- ✅ Scroll effects
- ✅ WhatsApp floating button

## 🔨 To Complete

See [NEXTJS_CONVERSION.md](./NEXTJS_CONVERSION.md) for detailed conversion progress.

**Remaining pages to convert:**
- About page
- Gallery page (with lightbox)
- Visit Us page
- Contact page (with form)
- Order page

Each page conversion is straightforward - copy the HTML structure from the original `.html` file and convert to JSX in a new `page.tsx`.

## 🚢 Deployment

This project is ready to deploy to Vercel:

```bash
npm run build
```

Or push to GitHub and connect to Vercel for automatic deployments.

## 📝 Key Notes

- **All animations preserved** - Original motion.js handles scroll reveals
- **No style changes** - CSS files are identical to original
- **Client-side interactions** - JavaScript files loaded for menus, forms, galleries
- **Static + Dynamic** - Home and menu pages work, others need conversion

## 🤝 Contributing

To add a new page:

1. Create `app/[pagename]/page.tsx`
2. Copy HTML from original `[pagename].html`
3. Convert to JSX (className, self-closing tags, etc.)
4. Import Nav, Footer, WhatsAppButton components
5. Add page-specific CSS imports if needed
6. Test all interactions

---

Built with ❤️ for French Toast Café, Kochi
