# Animation & Interaction Features

This document describes the custom animations and object-driven UI patterns implemented in the portfolio.

## Features Implemented

### 1. Loading Screen
- **Location**: `app/components/LoadingScreen.tsx`
- **Functionality**: Terminal-style loading animation with progress bar
- **Transition**: Smooth fade-out when loading completes, followed by content fade-in
- **Usage**: Enabled on home page via `<PageLayout showLoading={true}>`

### 2. Staged Hero Animations
- **Location**: `app/page.tsx`
- **Sequence**:
  - Pills (tags) appear first (100ms delay)
  - Typewriter effect begins (200ms delay)
  - Main title reveals (300ms delay)
  - Description text (450ms delay)
  - Action buttons (600ms delay)
  - Stat cards (750ms delay)
- **Result**: Elegant cascading reveal that guides user attention

### 3. Enhanced AnimatedSection Component
- **Location**: `app/components/AnimatedSection.tsx`
- **New Features**:
  - Direction control: `up`, `down`, `left`, `right`
  - Configurable distance and delay
  - Automatic reduced-motion support
- **Usage**: Applied across all content pages (Projects, Skills, Work, Contact)

### 4. useReducedMotion Hook
- **Location**: `app/hooks/useReducedMotion.ts`
- **Purpose**: Detects user's motion preferences for accessibility
- **Integration**: Used in AnimatedSection to disable animations when user prefers reduced motion

### 5. Micro-Interactions
All interactive elements now include:
- **Buttons**: Hover lift effect (`-translate-y-0.5`) + enhanced glow
- **Cards**: Hover lift (`-translate-y-1`) + border color change + shadow increase
- **Skill chips**: Hover lift + border glow
- **Navigation links**: Already had smooth underline animation

### 6. Background Objects
- **Location**: `app/components/FloatingObjects.tsx`
- **Features**:
  - Three floating gradient orbs
  - Subtle, slow-moving animations
  - `pointer-events: none` - doesn't interfere with clicking
  - Respects reduced-motion preferences
  - Positioned with negative z-index

### 7. Data Architecture
- **Already Implemented**: All content centralized in `app/lib/data.ts`
- **Structure**:
  - `aboutMe`: Personal info, headlines, tagline
  - `contactLinks`: Social media and email
  - `experiences`: Work history
  - `projects`: Portfolio projects
  - `skillCategories`: Technical skills grouped by category
  - `navigation`: Nav menu items

## Accessibility

### Reduced Motion Support
When a user has `prefers-reduced-motion: reduce` enabled:
- All animations are disabled or simplified
- Transitions happen instantly or with minimal duration
- Content remains fully accessible
- Implemented in:
  - `AnimatedSection` component
  - `FloatingObjects` background animations
  - Global CSS (app/globals.css)
  - Home page staged animations

### Implementation
```typescript
const prefersReducedMotion = useReducedMotion();

const initial = prefersReducedMotion
  ? { opacity: 0 }
  : { opacity: 0, y: 20 };
```

## Performance Considerations

1. **CSS-based animations**: All floating objects use CSS keyframes, not JavaScript
2. **Viewport-based triggers**: AnimatedSection only animates when elements enter viewport
3. **Once-only animations**: Most animations run once (`viewport: { once: true }`)
4. **No heavy dependencies**: Uses existing Framer Motion library already in project
5. **Optimized rendering**: No forced re-renders or cascading state updates

## Browser Testing

All features tested and working in:
- Chrome/Chromium
- The build passes (`npm run build`)
- Lint passes (`npm run lint`)

## Usage Examples

### Simple scroll reveal
```tsx
<AnimatedSection>
  <YourContent />
</AnimatedSection>
```

### Custom direction and delay
```tsx
<AnimatedSection direction="left" delay={0.2}>
  <YourContent />
</AnimatedSection>
```

### Staggered list items
```tsx
{items.map((item, index) => (
  <AnimatedSection key={item.id} delay={index * 0.1}>
    <ItemCard item={item} />
  </AnimatedSection>
))}
```

## Files Changed/Added

### New Files
- `app/components/LoadingScreen.tsx` - Loading animation component
- `app/hooks/useReducedMotion.ts` - Accessibility hook for motion preferences

### Modified Files
- `app/components/AnimatedSection.tsx` - Enhanced with direction options and reduced-motion
- `app/components/shared/PageLayout.tsx` - Added loading screen support
- `app/page.tsx` - Added staged reveal animations
- `app/projects/page.tsx` - Added staggered card animations
- `app/skills/page.tsx` - Added staggered card animations with hover effects
- `app/work/page.tsx` - Added staggered experience card animations
- `app/contact/page.tsx` - Added staggered contact card animations

### Unchanged Files
- `app/lib/data.ts` - Already had proper object-driven structure
- `app/components/FloatingObjects.tsx` - Already implemented correctly
- `app/components/TypewriterHeadline.tsx` - Already working well
- `app/components/ScrollProgress.tsx` - Already implemented
- `app/globals.css` - Already had animation utilities

## Design Philosophy

1. **Subtle over flashy**: Animations enhance, don't distract
2. **Performance first**: No janky or slow animations
3. **Accessible by default**: Respects user preferences
4. **Consistent timing**: Coordinated delays create rhythm
5. **Object-driven**: Content separate from presentation
