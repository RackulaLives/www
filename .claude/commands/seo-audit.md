# SEO Audit

Check all pages for SEO completeness. Run before deployment to ensure no page ships with missing meta tags.

**Arguments:** `$ARGUMENTS` (optional: specific page file to check, defaults to all pages in `src/pages/`)

---

## What This Checks

| Requirement | Status | Notes |
|-------------|--------|-------|
| Title tag | Required | Must include "Rackula" |
| Meta description | Required | 150-160 characters |
| Canonical URL | Required | Absolute URL |
| OG title | Required | Can match title |
| OG description | Required | Can match meta description |
| OG image | Required | Absolute URL, 1200x630 recommended |
| OG type | Required | Usually "website" |
| Twitter card | Required | "summary_large_image" |
| Heading hierarchy | Required | Single h1, proper nesting |
| Image alt text | Required | All images need alt |
| Lang attribute | Required | `<html lang="en">` |

---

## Execution

### Step 1: Find All Pages

```bash
# Find all page files
find src/pages -name "*.astro" -type f
```

If `$ARGUMENTS` provided, check only that specific file.

### Step 2: For Each Page, Check SEO Elements

Read each page file and its layout (follow imports to find BaseLayout usage).

#### Title Check

```
✓ Title exists
✓ Title includes "Rackula"
✓ Title is unique (not duplicated across pages)
✓ Title length: 50-60 characters recommended
```

**Flags:**
- Missing title
- Title doesn't include "Rackula"
- Title too long (>60 chars) or too short (<30 chars)

#### Meta Description Check

```
✓ Meta description exists
✓ Length: 150-160 characters
✓ Unique per page
✓ Contains relevant keywords
```

**Flags:**
- Missing description
- Too short (<120 chars)
- Too long (>160 chars)

#### Open Graph Check

Required OG tags:
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.racku.la/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://www.racku.la/og-image.png" />
<meta property="og:site_name" content="Rackula" />
```

**Flags:**
- Any missing OG tag
- Relative URL in og:url or og:image (must be absolute)
- og:image missing or placeholder

#### Twitter Card Check

Required Twitter tags:
```html
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="..." />
<meta property="twitter:title" content="..." />
<meta property="twitter:description" content="..." />
<meta property="twitter:image" content="..." />
```

**Flags:**
- Missing twitter:card
- Wrong card type (should be summary_large_image for marketing)

#### Canonical URL Check

```html
<link rel="canonical" href="https://www.racku.la/..." />
```

**Flags:**
- Missing canonical
- Relative URL (must be absolute)
- URL doesn't match expected pattern

#### Heading Hierarchy Check

```
✓ Exactly one <h1> per page
✓ h2 follows h1 (no skipping levels)
✓ h3 follows h2, etc.
```

**Flags:**
- Multiple h1 tags
- Missing h1
- Skipped heading levels (h1 → h3)

#### Image Alt Text Check

For each `<img>` or Astro `<Image>`:
```
✓ alt attribute present
✓ alt is not empty or just whitespace
✓ alt is descriptive (not "image" or "photo")
```

**Flags:**
- Missing alt attribute
- Empty alt (unless decorative with role="presentation")
- Generic alt text ("image", "photo", "screenshot")

#### Lang Attribute Check

```html
<html lang="en">
```

**Flags:**
- Missing lang attribute
- Wrong language code

### Step 3: Output Report

```markdown
## SEO Audit Results

### Summary
- Pages scanned: N
- Issues found: N
- Status: [PASS | WARNINGS | FAILS]

### Page: /index.astro
| Check | Status | Details |
|-------|--------|---------|
| Title | ✓ | "Rackula — Plan Your Homelab Rack" (43 chars) |
| Description | ✓ | 156 chars |
| OG Tags | ✓ | Complete |
| Twitter | ✓ | Complete |
| Canonical | ✓ | https://www.racku.la/ |
| Headings | ✓ | 1x h1, 3x h2 |
| Images | ⚠ | 1 image missing alt |
| Lang | ✓ | en |

### Page: /features.astro
...

### Issues to Fix
| Page | Issue | Severity | Fix |
|------|-------|----------|-----|
| /features | Missing og:image | High | Add og:image prop to BaseLayout |
| /about | Description too short | Medium | Expand to 150+ chars |
```

---

## Exit Conditions

| Result | Criteria | Action |
|--------|----------|--------|
| **PASS** | All checks pass | Ready to deploy |
| **WARNINGS** | Minor issues (length, generic alt) | Review before deploy |
| **FAILS** | Missing required tags | Must fix before deploy |

---

## Integration with BaseLayout

The `BaseLayout.astro` component handles most SEO tags. Verify pages pass required props:

```astro
<BaseLayout
  title="Page Title | Rackula"      <!-- Required -->
  description="150-160 char desc"    <!-- Required -->
  ogImage="/og-image.png"            <!-- Optional, has default -->
  canonicalUrl="..."                 <!-- Optional, auto-generated -->
>
```

If a page is missing SEO, check if it's:
1. Not using BaseLayout
2. Missing required props
3. Using wrong prop names

---

## Notes

- Run this before every deployment
- OG images should be 1200x630 for best social sharing
- Test with https://www.opengraph.xyz/ for live preview
- Reference: CLAUDE.md SEO Requirements section
