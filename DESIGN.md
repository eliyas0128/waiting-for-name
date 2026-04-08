# Design Brief: Perfect Designing Hub

## Tone & Purpose
Premium corporate tech aesthetic for professional engineering consultancy. Credibility through clarity, geometric precision, and refined restraint. ISO certification and 8-year history prominently positioned.

## Color Palette (OKLCH)
| Role | Light | Dark |
|------|-------|------|
| Primary (Teal) | 0.58 0.16 226 | 0.68 0.15 226 |
| Secondary (Navy) | 0.15 0.01 0 | 0.2 0.01 0 |
| Foreground | 0.15 0.01 0 | 0.95 0.01 0 |
| Background | 0.985 0.005 0 | 0.12 0.01 0 |
| Muted | 0.92 0.01 0 | 0.2 0.01 0 |
| Border | 0.88 0.01 0 | 0.24 0.01 0 |

## Typography
- **Display**: Fraunces (serif) — headers, section titles, brand presence
- **Body**: GeneralSans (sans-serif) — content, UI copy, readability at all sizes
- **Mono**: JetBrainsMono (monospace) — code blocks, technical content

## Shape Language
- Border radius: 0.375rem (sharp, modern) — minimal softness for corporate feel
- No rounded buttons; prefer clean rectangles and geometric shapes
- Geometric triangle accents (dark navy) in section corners as differentiation

## Structural Zones
| Zone | Treatment |
|------|-----------|
| Header | Dark navy background (--secondary), white text, teal accent bar bottom |
| Hero | White background with elevated card surface, shadow-elevated |
| Content Sections | Alternating white and off-white (muted/40) backgrounds |
| Cards | White/card color with shadow-card (subtle), border-accent-teal left 2px |
| Sidebar TOC | Dark navy background, teal section markers, fixed sticky positioning |
| Footer | Dark navy background, teal accent bar top, white text |

## Component Patterns
- **Buttons**: Primary = teal bg, navy hover; Secondary = navy outline, teal text
- **Inputs**: Light muted background, navy text, teal focus ring
- **Cards**: White surface, 1px border-accent-teal left edge, shadow-card, no radius
- **Badges**: Teal background, navy text, 2px radius
- **Links**: Teal text, navy underline on hover, smooth transition
- **Section Markers**: 2px solid teal left border with "→" arrow in teal

## Motion
- **Smooth transition**: All interactive elements use 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Hover states**: Subtle elevation (shadow-elevated), text color shift
- **Scroll**: Page scroll triggers TOC sticky positioning and section highlight updates
- **No animation**: No bouncing, floating, or distracting entrance animations

## Special Elements
- **Geometric triangles**: Dark navy 60×60px right-angle triangles in top-left of each section (pseudo-element)
- **ISO badge**: White text on dark navy background, center-positioned in Company Profile
- **Teal accents**: Used sparingly for section markers, borders, hover states, and CTAs
- **WhatsApp button**: Floating fixed button, teal background, white icon, bottom-right corner
- **Map**: Embedded full-width section with responsive height, subtle border

## Accessibility
- Foreground on background contrast ≥4.5:1 (AA+)
- Focus indicators: 2px solid teal ring (--ring)
- All interactive elements keyboard accessible
- Alt text for all images and section illustrations

## Constraints
- No gradients except subtle linear gradients on CTAs (135deg, 0% to 100% opacity)
- No glow or neon effects — keep professional
- No default Tailwind colors — all tokens use OKLCH
- Font stack fallbacks but primary fonts loaded from /assets/fonts/
