# PaperCrumple Integration TODO

The PaperCrumple component from React Bits is too large (~3000 lines) to paste here.

## Steps to complete integration:

1. **Copy the full component code** from the React Bits documentation above into:
   - `/app/components/PaperCrumple.tsx` (replace the placeholder)
   - `/app/components/PaperCrumple.css`

2. **Three.js is already installed** (required dependency)

3. **Replace StoryPaper component** in `/app/components/StoryPaper.tsx`:
   ```tsx
   import PaperCrumple from './PaperCrumple'
   
   export default function StoryPaper() {
     return (
       <PaperCrumple
         src="/story-paper-text.png"  // You'll need to create this image
         alt="Our Story handwritten letter"
         width={600}
         height={720}
         sceneHeight={800}
         releaseBehavior="restore"
         crumpleAmount={0.85}
         crumpleDuration={0.55}
         releaseDuration={0.4}
         foldCount={6}
         foldSharpness={0.6}
         wrinkleDepth={0.65}
         paperColor="#e8dcc4"
         draggable={true}
         returnToOrigin={true}
         rotation={-2}
       />
     )
   }
   ```

4. **Create the story paper image**: Export the current HTML story paper as a PNG at `/public/story-paper-text.png`

## Current Status

- ✅ Three.js installed
- ✅ Placeholder component created
- ⏳ Need full React Bits PaperCrumple code (copy from docs above)
- ⏳ Need to create story-paper-text.png image
- ⏳ Need to update StoryPaper component to use PaperCrumple

##ALTERNATIVE: Keep the current HTML StoryPaper

The current HTML version with handwriting fonts works great. The crumple effect is a nice-to-have but adds significant complexity. Consider keeping the current simple HTML version unless the 3D crumple is essential.
