# Image Optimization Guide

## Current Status

Your images are mostly optimized, but a few large files need attention:

### Files to Optimize

1. **french toast family.png** (3.1MB) → Should be ~150KB
2. **food25.jpg** (404KB) → Should be ~80KB  
3. **food26.jpg** (352KB) → Should be ~70KB
4. **food20.jpg** (300KB) → Should be ~60KB
5. **food18.jpg** (192KB) → Should be ~40KB
6. **food14.jpg, food15.jpg** (176KB each) → Should be ~35KB each

## Optimization Methods

### Option 1: Online Tools (Easiest)
1. Go to https://squoosh.app/ or https://tinypng.com/
2. Upload the large images
3. Convert to WebP format
4. Set quality to 80-85%
5. Download and replace

### Option 2: Using Sharp (Best Quality)
```bash
npm install -g sharp-cli
sharp -i "public/images/french toast family.png" -o "public/images/french toast family.webp" --webp -q 85 resize 1200
```

### Option 3: ImageMagick (Advanced)
```bash
brew install imagemagick
convert "public/images/french toast family.png" -resize 1200x -quality 85 "public/images/french toast family.webp"
```

## Quick Wins

### 1. Convert PNG to WebP
The 3.1MB PNG should become a WebP file around 150KB:
```bash
# After installing sharp-cli
cd public/images
sharp -i "french toast family.png" -o "french toast family.webp" --webp -q 85
```

### 2. Batch Convert JPGs
```bash
# Convert all large JPGs to WebP
for img in food{14,15,18,20,25,26}.jpg; do
  sharp -i "$img" -o "${img%.jpg}.webp" --webp -q 80
done
```

## Next.js Image Component

Next.js automatically optimizes images if you use the `<Image />` component instead of `<img>`:

```tsx
import Image from 'next/image'

// Instead of:
<img src="/images/french1.webp" alt="..." />

// Use:
<Image 
  src="/images/french1.webp" 
  alt="..."
  width={800}
  height={600}
  quality={85}
  priority // for above-the-fold images
/>
```

### Benefits:
- Lazy loading by default
- Automatic format optimization (WebP/AVIF)
- Responsive image sizes
- Prevents Cumulative Layout Shift (CLS)

## Current Performance

✅ Good: Most images are 12-60KB (webp format)  
⚠️ Needs Work: 6 files are 150KB-3MB  
🎯 Target: All images under 100KB for fast loading

## Priority Actions

1. **High Priority**: Convert `french toast family.png` (3.1MB → 150KB)
2. **Medium Priority**: Optimize food25, food26, food20 (300-400KB → 60-80KB)
3. **Low Priority**: Update Next.js to use `<Image />` components site-wide

## Estimated Impact

Current total: ~5.5MB of images  
After optimization: ~2.5MB  
**Page load improvement: ~40-50% faster**

## Tools Used

- **sharp-cli**: Best quality, preserves detail
- **Squoosh**: Visual interface, good for manual optimization
- **TinyPNG**: Automated, works well for batch operations
- **Next.js Image**: Built-in optimization, no manual work needed
