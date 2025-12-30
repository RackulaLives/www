# Rackula Marketing Site (www.racku.la)

Marketing homepage for Rackula — a FOSS rack layout designer for homelabbers.

## Quick Links

- **Live app**: https://count.racku.la
- **GitHub**: https://github.com/RackulaLives/Rackula
- **Brand guide**: `/Users/gvns/notes/gVault/01-PROJECTS/rackula/brand-guide.md`

## Stack

- Astro 5.x (static site)
- No CSS framework — use Dracula colour tokens from brand guide
- No client-side JS unless necessary

## Project Structure

```
src/
  pages/       # Astro pages (file-based routing)
  components/  # Reusable .astro components
  layouts/     # Page layouts (create as needed)
  styles/      # Global CSS with Dracula tokens
public/        # Static assets (favicon, images, og images)
```

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Brand Essentials

### Colours (Dracula Dark — default)

| Token | Hex | Use |
|-------|-----|-----|
| `--colour-bg-primary` | `#282A36` | Page background |
| `--colour-text-primary` | `#F8F8F2` | Body text |
| `--colour-purple` | `#BD93F9` | Brand primary, links |
| `--colour-cyan` | `#8BE9FD` | CTAs, interactive |
| `--colour-pink` | `#FF79C6` | Accent |

Light mode (Alucard) uses `[data-theme="light"]` — see brand guide for full palette.

### Typography

- **Lockup/Brand**: `'Space Grotesk'` (`--font-display`) — for "Rackula" wordmark and hero titles
- **Headings**: `'JetBrains Mono', monospace` — semibold
- **Body**: `'Inter', system-ui, sans-serif` — regular
- **Code/UI**: `'JetBrains Mono', monospace`

### Voice

- Direct, no marketing fluff
- Technical — assume competence
- Dry wit, vampire puns encouraged

Examples:
- Good: "Plan your homelab rack layout."
- Bad: "The ultimate solution for all your rack planning needs!"

### Spelling

Use **Canadian/British spelling** throughout:
- colour (not color)
- visualise (not visualize)
- organise (not organize)
- centre (not center)
- behaviour (not behavior)

## SEO Requirements

Every page needs:
- Unique `<title>` with "Rackula" brand
- `<meta name="description">` (150-160 chars)
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Canonical URL

## Conventions

- Use Astro Image component for all images
- Prefer CSS custom properties from brand guide
- Mobile-first responsive design
- Support dark (default) and light themes
- No external analytics scripts (we use self-hosted Umami at t.racku.la)

## Logo & Lockup

### The Mark

Sharp-cornered rectangle with three horizontal slots (server rack abstraction). Geismar-style geometric minimalism.

| Variant | Use Case | Colour |
|---------|----------|--------|
| Solid purple | Favicon, UI icon | `#BD93F9` (dark) / `#644AC9` (light) |
| Gradient | Marketing, hero (64px+) | Purple → Pink → Cyan diagonal |

### Logo Lockup

Mark + wordmark combination for headers, marketing, and documentation.

**Specifications:**
- Wordmark font: Space Grotesk, weight 500-600
- Spacing: 12px gap between mark and wordmark
- Alignment: Vertically centred

**Variants:**

| File | Use Case |
|------|----------|
| `rackula-lockup.png` | Static, dark backgrounds |
| `rackula-lockup-light.png` | Static, light backgrounds |
| `rackula-lockup-staggered-dark.svg` | Animated (SMIL), dark mode |
| `rackula-lockup-staggered-light.svg` | Animated (SMIL), light mode |

### Animated Lockup

For contexts supporting SMIL animation (GitHub README, marketing). Each slot pulses independently with staggered timing.

- Animation: 4s cycle, 0.5s stagger between slots
- Slot colours (top → bottom): Cyan, Green, Pink
- Frame/wordmark: Static purple

### Gradient Definitions

**Dark (Dracula):**
```svg
<linearGradient id="dracula-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#BD93F9"/>
  <stop offset="50%" stop-color="#FF79C6"/>
  <stop offset="100%" stop-color="#8BE9FD"/>
</linearGradient>
```

**Light (Alucard):**
```svg
<linearGradient id="alucard-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#644AC9"/>
  <stop offset="50%" stop-color="#A3144D"/>
  <stop offset="100%" stop-color="#036A96"/>
</linearGradient>
```
