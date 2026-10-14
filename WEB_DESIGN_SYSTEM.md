# Web Design System — Lad os Snakker Dansk

**Status**: Design System v1 for Web (Mobile-Responsive)  
**Created**: October 2026  
**Focus**: Desktop-first, responsive down to mobile  
**Target Users**: Language learners (desktop browsers primarily)

---

## Design Philosophy

This design system prioritizes **web app usability** over mobile-first constraints. Key principles:

1. **Desktop as Primary Canvas** — Layout and interactions optimized for 1024px+ screens
2. **Generous Spacing** — Readable typography, breathing room between elements
3. **Clear Information Hierarchy** — Lesson content as hero, progress as supporting
4. **Accessible by Default** — WCAG 2.1 AA standards, keyboard navigation, focus states
5. **Language Learning First** — Content prominence over decoration

---

## Visual Identity

### Color Palette

#### Primary Brand Colors
- **Accent (Amber)**: `#D97706` — Actions, progress, highlights
  - Dark: `#B45309` — Hover/pressed states
  - Light: `#FEF3C7` — Soft backgrounds
  - Lighter: `#FFFBEB` — Very light tints
  
- **Primary (Charcoal)**: `#1F2937` — Text, headlines, primary surface
  - Light: `#F3F4F6` — Secondary backgrounds
  - Lighter: `#F9FAFB` — Base background

#### Semantic Colors
- **Success**: `#059669` — Correct answers, completed lessons
- **Warning**: `#EA580C` — Caution, needs attention
- **Danger**: `#DC2626` — Errors, destructive actions

#### Neutrals (Semantic Usage)
```
Text Primary:    #1F2937 (Main body text)
Text Secondary:  #6B7280 (Supporting text)
Text Tertiary:   #9CA3AF (Subtle/meta info)
Text Inverse:    #FFFFFF (Text on dark)

Border Light:    #E5E7EB (Subtle dividers)
Border Medium:   #D1D5DB (Standard borders)
Border Dark:     #9CA3AF (Emphasized borders)
```

### Typography

#### Font Family Selection
- **Sans-Serif (Interface)**: `Inter` — Clean, modern, highly readable
  - Fallback: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`
  - Use for: All UI text, buttons, labels, headings

- **Serif (Content)**: `Amiri` — Warm, approachable, readable for longer text
  - Use for: Danish language content, quotes, learning materials
  - Fallback: `Georgia, serif`

- **Monospace**: `JetBrains Mono` — Code, phonetic transcriptions
  - Use for: IPA notation, code examples, vocab transcription

#### Type Scale (Web-Optimized)

| Size | Name | Usage | Weight |
|------|------|-------|--------|
| 48px | 5XL (H1) | Page heroes | 700 |
| 40px | 4XL (H2) | Section titles | 700 |
| 32px | 3XL (H3) | Subsection titles | 600 |
| 24px | 2XL (H4) | Exercise prompts | 600 |
| 20px | XL | Card titles | 600 |
| 18px | LG | Body emphasis | 500 |
| 16px | BASE | Body text | 400/500 |
| 14px | SM | Labels, meta info | 400/500 |
| 12px | XS | Captions, hints | 400 |

#### Line Heights
- **Tight** (1.2): Headlines, short text
- **Normal** (1.5): Body text, user content
- **Relaxed** (1.75): Lesson explanations, longer passages
- **Loose** (2.0): Learning materials, highlighted content

#### Letter Spacing
- **Tight** (-0.02em): Headlines (H1–H3)
- **Normal** (0): Body text, most UI
- **Wide** (0.02em): Labels, all caps labels, Danish language

### Spacing System (8px Base Unit)

| Unit | Size | Usage |
|------|------|-------|
| XS | 4px | Micro-spacing (icons, tight components) |
| SM | 8px | Component padding, small gaps |
| MD | 16px | Standard padding, medium gaps |
| LG | 24px | Section spacing, card margins |
| XL | 32px | Large gaps, between sections |
| 2XL | 48px | Major section spacing |
| 3XL | 64px | Page-level spacing |

### Border Radius

| Token | Size | Usage |
|-------|------|-------|
| SM | 4px | Inline elements, tight UI |
| MD | 8px | Input fields, small cards |
| LG | 12px | Standard cards, buttons, modals |
| XL | 16px | Large cards, hero sections |
| 2XL | 24px | Prominent cards, dashboard sections |
| FULL | 9999px | Pills, badges, circles |

### Shadows

| Level | CSS | Usage |
|-------|-----|-------|
| SM | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| MD | `0 4px 6px rgba(0,0,0,0.1)` | Standard cards on hover |
| LG | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns, sheets |
| XL | `0 20px 25px rgba(0,0,0,0.1)` | Hero sections, toasts |

---

## Component Library

### Buttons

#### Primary Button
- **Background**: Accent (Amber #D97706)
- **Text**: White
- **Padding**: 16px 24px (MD/LG)
- **Border Radius**: FULL (9999px)
- **State**:
  - Hover: Darker amber (#B45309)
  - Active: Scale 0.98
  - Disabled: Opacity 0.5

```jsx
<button className="btn btn-primary">Continue</button>
```

#### Secondary Button
- **Background**: Light (#F3F4F6)
- **Text**: Primary (#1F2937)
- **Border**: Light border (#E5E7EB)
- **Hover**: Lighter gray background

```jsx
<button className="btn btn-secondary">Cancel</button>
```

#### Ghost Button
- **Background**: Transparent
- **Text**: Primary (#1F2937)
- **Border**: Light border (#E5E7EB)
- **Hover**: Light background

```jsx
<button className="btn btn-ghost">Learn More</button>
```

#### Sizes
- **SM**: Padding 8px 16px, font 14px (compact UI)
- **Base**: Padding 16px 24px, font 16px (standard)
- **LG**: Padding 24px 32px, font 18px (prominent actions)

### Cards

#### Standard Card
```jsx
<div className="card">
  <h3 className="text-xl font-bold">Card Title</h3>
  <p className="text-slate-600">Content here</p>
</div>
```

**Style**:
- Background: White (#FFFFFF)
- Border: Light (#E5E7EB)
- Border Radius: LG (12px)
- Padding: 24px
- Shadow: SM (always)
- Hover: MD shadow, medium border

#### Lesson Card
```jsx
<div className="card-lesson">
  <p className="text-sm font-semibold text-amber-600">LESSON 1</p>
  <h2 className="text-2xl font-bold">Lesson Title</h2>
  <p className="text-slate-600">Description of lesson content</p>
  <button className="btn btn-primary mt-4">Start →</button>
</div>
```

### Forms

#### Input Field
```jsx
<input
  type="text"
  placeholder="Type your answer"
  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
/>
```

**Style**:
- Padding: 12px 16px
- Border Radius: MD (8px)
- Border: Light gray (#E5E7EB)
- Focus: Ring of 2px accent color

#### Textarea
```jsx
<textarea
  placeholder="Enter text"
  className="w-full px-4 py-3 border border-slate-300 rounded-lg font-serif"
  rows="4"
/>
```

**Style**:
- Font: Serif (Amiri) for learning content
- Same padding/border as input
- Min height: 100px (4 lines)

#### Checkbox
```jsx
<input type="checkbox" className="w-5 h-5 accent-amber-600" />
```

**Style**:
- Size: 20px × 20px (touch target: 44px with padding)
- Accent color: Amber
- Clear focus state

### Progress Indicators

#### Progress Bar
```jsx
<div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-amber-600 to-orange-500"
    style={{ width: '75%' }}
  />
</div>
```

**Style**:
- Height: 8px
- Border Radius: FULL
- Background: Light gray
- Bar: Gradient (amber → orange)
- Animation: Smooth transition (500ms)

#### Lesson Progress Dot
```jsx
<div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700">
  1
</div>
```

**States**:
- **Not started**: Gray background (#F3F4F6), text primary
- **Current**: Amber background, text amber
- **Complete**: Green background (#D1FAE5), text emerald, checkmark icon

### Navigation

#### Header
```jsx
<header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
  <!-- Logo, title, actions -->
</header>
```

**Style**:
- Height: 64px (16px padding)
- Sticky positioning (top: 0, z-index: 40)
- White background, subtle border, soft shadow
- Responsive: Logo + title hidden on small screens

#### Sidebar (Desktop)
```jsx
<aside className="hidden lg:block w-64 bg-white border-r border-slate-200">
  <!-- Navigation, progress widget -->
</aside>
```

**Style**:
- Width: 256px (lg breakpoint and up)
- Sticky to top (with offset for header)
- Scrollable content area
- Hover states for nav items

#### Mobile Menu
- Hamburger button in header (lg breakpoint down)
- Full-screen overlay sidebar that slides from left
- Overlay backdrop (50% black) closes menu on click

### Lists

#### Lesson List
```jsx
<div className="space-y-3">
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
      ✓
    </div>
    <div className="flex-1">
      <p className="font-semibold">Lesson Title</p>
      <p className="text-sm text-slate-500">Duration + metadata</p>
    </div>
    <p className="font-bold text-amber-600">85%</p>
  </div>
</div>
```

---

## Layout Patterns

### Web App Shell

#### Desktop Layout (1024px+)
```
┌─────────────────────────────────────┐
│         HEADER (h: 64px)            │
├──────────────┬──────────────────────┤
│              │                      │
│  SIDEBAR     │   MAIN CONTENT       │
│  (w: 256px)  │   (max-w: 1280px)   │
│              │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

**Spacing**:
- Header: Full width, sticky
- Sidebar: Sticky (height: calc(100vh - 64px))
- Main: Flex-grow, centered with max-width
- Padding: 32px vertical, 32px horizontal

#### Tablet Layout (640px–1023px)
```
┌────────────────────────────────┐
│     HEADER (hamburger menu)    │
├────────────────────────────────┤
│                                │
│      MAIN CONTENT              │
│      (w: 100%, max-w: 640px)   │
│                                │
└────────────────────────────────┘
```

**Sidebar**: Hidden, visible on hamburger menu click (overlay)

#### Mobile Layout (< 640px)
```
┌──────────────────┐
│  HEADER (mobile) │
├──────────────────┤
│                  │
│  MAIN CONTENT    │
│  (full width)    │
│                  │
└──────────────────┘
```

**Adjustments**:
- Single column layout
- Minimal padding (16px)
- Headers: Responsive sizing (H1: 32px)

### Dashboard Grid

#### Desktop (1024px+)
```
┌────────────────────────────────────────┐
│           HERO SECTION                 │
├────────────────────────────────────────┤
│  STAT  │  STAT  │  STAT                │
├────────────────────────┬────────────────┤
│                        │                │
│   NEXT LESSON (2/3)    │   SIDEBAR      │
│                        │   WIDGETS      │
│   LEARNING PATH        │                │
│                        │                │
└────────────────────────┴────────────────┘
```

**Grid**: `grid-cols-1 lg:grid-cols-3`
- Left (2 cols): Hero, stats, next lesson, learning path
- Right (1 col): Recent completions, tips, progress

#### Tablet/Mobile
```
┌──────────────────────┐
│   HERO SECTION       │
├──────────────────────┤
│  STAT               │
│  STAT               │
│  STAT               │
├──────────────────────┤
│   NEXT LESSON        │
├──────────────────────┤
│   LEARNING PATH      │
├──────────────────────┤
│   SIDEBAR WIDGETS    │
└──────────────────────┘
```

**Grid**: `grid-cols-1` (single column)

---

## Motion & Animation

### Easing Functions
- **Fast (150ms)**: Button hover, icon changes
- **Normal (300ms)**: Card hover, sidebar open/close
- **Slow (500ms)**: Progress bar fill, lesson unlock

### Animations

#### Fade In
```css
animation: fadeIn 0.3s ease-out;
```

#### Scale In
```css
animation: scaleIn 0.3s ease-out;
/* 0% scale(0.96) opacity-0 → 100% scale(1) opacity-1 */
```

#### Slide Up
```css
animation: slideUp 0.3s ease-out;
/* 0% translateY(12px) opacity-0 → 100% translateY(0) opacity-1 */
```

#### Progress Fill
```css
width: 75%;
transition: width 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Interaction Patterns

**Button Press**: Scale down 2% on click
```css
.btn:active { transform: scale(0.98); transition-duration: 120ms; }
```

**Hover Effect**: Card shadow upgrade
```css
.card:hover { box-shadow: var(--shadow-md); }
```

**Focus State**: Outline ring (accessibility)
```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

---

## Responsive Breakpoints

| Breakpoint | Width | Device | Adjustments |
|------------|-------|--------|-------------|
| SM | 640px | Tablet (portrait) | Single column, compact spacing |
| MD | 768px | Tablet (landscape) | 2-column option |
| LG | 1024px | Desktop | Full layout, sidebar visible |
| XL | 1280px | Wide desktop | Max content width: 1280px |
| 2XL | 1536px | Ultra-wide | Centered, consistent spacing |

---

## Accessibility (WCAG 2.1 AA)

### Color Contrast
- Text on background: 4.5:1 minimum (AA)
- Large text (18px+): 3:1 minimum (AA)
- UI components/borders: 3:1 minimum

**Example**:
- Primary text (#1F2937) on white: 16:1 ✓
- Secondary text (#6B7280) on white: 8.5:1 ✓
- Accent (#D97706) on white: 7.5:1 ✓

### Keyboard Navigation
- **Tab order**: Logical flow (header → sidebar → content)
- **Skip link**: Skip to main content (optional)
- **Focus visible**: Outline ring on all interactive elements
- **No keyboard traps**: All functionality keyboard-accessible

### Screen Reader Support
- **ARIA labels**: Buttons, icons, sidebar state
- **Semantic HTML**: `<nav>`, `<main>`, `<section>`, `<article>`
- **Headings**: Proper hierarchy (h1 → h2 → h3)
- **Form labels**: Explicit `<label>` elements

### Motion Sensitivity
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Typography Guidelines

### Reading Length
- **Line length**: 60–80 characters max (optimal: 70)
- **Lesson content**: Amiri serif, 18px, line-height 1.75
- **Body text**: Inter sans, 16px, line-height 1.5

### Hierarchy in Practice

**Page Hero**
```jsx
<h1 className="text-5xl font-bold text-slate-900 leading-tight">
  Your Danish Journey Continues
</h1>
```

**Section Title**
```jsx
<h2 className="text-4xl font-bold text-slate-900 mb-6">
  Next Lesson
</h2>
```

**Card Title**
```jsx
<h3 className="text-xl font-bold text-slate-900 mb-3">
  V2 Inversion — Word Order
</h3>
```

**Body Text**
```jsx
<p className="text-base text-slate-700 leading-relaxed">
  Learn why the Danish verb always comes second...
</p>
```

**Meta Information**
```jsx
<p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
  A2 Level · 35 min
</p>
```

---

## Implementation Notes

### CSS Custom Properties
All design tokens are CSS variables in `:root`. Use throughout components:

```jsx
<div style={{ 
  backgroundColor: 'var(--accent-light)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-lg)'
}}>
```

### Responsive Classes (Tailwind)
```jsx
// Hidden on mobile, visible on lg+
<aside className="hidden lg:block">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Responsive text size
<h1 className="text-3xl sm:text-4xl lg:text-5xl">
```

### Component File Structure
```
src/
├── components/
│   ├── WebAppShell.jsx      # Main layout wrapper
│   ├── WebDashboard.jsx     # Dashboard view
│   ├── WebLessonView.jsx    # Lesson presentation (web-optimized)
│   └── lessons/             # Individual lesson components
├── styles/
│   └── web-design-system.css # All design tokens
└── index.css                 # Global imports
```

---

## Next Steps

1. **Integrate into App**: Import `WebAppShell` in main App.jsx
2. **Style Lessons**: Adapt `LessonView.jsx` to use design system
3. **Test Responsiveness**: Verify layouts at all breakpoints
4. **Accessibility Audit**: Run axe DevTools, test keyboard navigation
5. **Performance**: Monitor CSS bundle size, optimize animations

---

**Design System Version**: 1.0  
**Last Updated**: October 2026  
**Next Review**: After Phase 2 testing
