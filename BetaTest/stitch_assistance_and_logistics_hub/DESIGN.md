---
name: Kinetic Utility Dark
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#ffb690'
  on-secondary: '#552100'
  secondary-container: '#ec6a06'
  on-secondary-container: '#4a1c00'
  tertiary: '#ffb784'
  on-tertiary: '#4f2500'
  tertiary-container: '#a15100'
  on-tertiary-container: '#ffe0cd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

This design system is built for high-performance developer tools, technical SaaS, and data-heavy environments. The brand personality is precise, efficient, and technologically advanced. It evokes a sense of "quiet power"—a workspace that stays out of the way while providing maximum clarity for complex tasks.

The aesthetic follows a **Modern Corporate** style with **Minimalist** influences. By shifting to a dark mode foundation, the system reduces eye strain for long-duration work sessions. The UI relies on a structured grid, high-quality typography, and purposeful use of vibrant accents to guide the user's attention through dense information architectures.

## Colors

The palette is anchored by deep, nocturnal tones to provide a stable foundation for technical work. The primary surface uses a charcoal navy, while nested containers utilize a slightly elevated blue-gray to create subtle visual grouping without relying on heavy borders.

- **Primary (#7c3aed):** A vivid purple used for primary actions and active states.
- **Secondary (#f97316):** A high-energy orange used for warnings, notifications, or secondary highlights.
- **Base Surfaces:** All main viewports use #0f172a. Component surfaces like cards and sidebars use #1e293b.
- **Typography:** Headlines and body text utilize the #f8fafc slate-white for maximum legibility.

## Typography

The system utilizes **Geist** for its core communication due to its technical precision and exceptional legibility in dark environments. For data displays, code snippets, and metadata, **Space Mono** is used to provide a "developer-first" feel.

Typography is treated with a strict hierarchy. Large headlines use tighter letter spacing and heavier weights to command attention, while body text is optimized for long-form reading with generous line heights. Labels are always uppercase when using the monospaced font to differentiate them from interactive text.

## Layout & Spacing

The design system employs a **Fluid Grid** model based on an 8px rhythm. This ensures that all components align to a predictable spatial frequency, creating a sense of order and reliability.

- **Desktop:** 12-column grid with 24px gutters. Content is centered with a max-width of 1440px.
- **Tablet:** 8-column grid with 16px gutters.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Internal spacing within components follows a strict hierarchy where padding is always larger than the gap between internal elements (e.g., a card has 24px padding, but the title-to-body gap is 8px).

## Elevation & Depth

In this dark-themed design system, depth is communicated through **Tonal Layers** rather than heavy shadows. 

1. **Floor (Level 0):** #0f172a - The main canvas.
2. **Surface (Level 1):** #1e293b - Used for cards, panels, and sidebars. 
3. **Overlay (Level 2):** #334155 - Used for modals, tooltips, and floating menus.

To enhance the "kinetic" feel, thin 1px borders using #334155 are applied to Level 1 and Level 2 surfaces. This provides crisp definition between layers that might otherwise bleed together in a dark UI. Shadows, when used for modals, are large, highly diffused, and tinted with the primary purple at 20% opacity to create a subtle glow effect.

## Shapes

The shape language is **Soft** and professional. This prevents the UI from feeling too aggressive (sharp corners) or too consumer-focused (pill shapes). 

- **Standard Elements:** 0.25rem (4px) for inputs, small buttons, and checkboxes.
- **Containers:** 0.5rem (8px) for cards and modals.
- **Large Components:** 0.75rem (12px) for hero sections or prominent feature blocks.

This subtle rounding maintains the technical, "engineered" feel while providing enough modern polish to feel approachable.

## Components

### Buttons
Primary buttons use a solid purple (#7c3aed) background with white text. Secondary buttons use a transparent background with a 1px border of #334155. Hover states for all buttons involve a subtle brightening of the background color or a low-opacity fill.

### Input Fields
Fields use the #1e293b container color with a 1px border of #334155. On focus, the border transitions to the primary purple with a 2px outer glow. Placeholder text uses #64748b.

### Cards
Cards are the primary organizational unit. They use #1e293b as the background. Header sections within cards should be separated by a subtle 1px line (#334155) if the content is complex.

### Chips & Tags
Chips use a low-opacity version of the primary or secondary color (e.g., purple at 15% opacity) with a fully opaque label. This allows them to stand out without competing with primary action buttons.

### Selection Controls
Checkboxes and radio buttons utilize the primary purple for the "checked" state. In the "unchecked" state, they use a thick 2px border (#475569) to remain visible against the dark background.