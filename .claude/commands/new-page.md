# New Page Scaffolder

Create a new page with proper structure, SEO, and brand-compliant placeholder content.

**Arguments:** `$ARGUMENTS` (required: page name, e.g., "features", "about", "docs")

---

## What This Creates

1. Page file in `src/pages/`
2. Proper BaseLayout usage with SEO props
3. Semantic HTML structure
4. Brand-compliant placeholder content
5. Scoped styles using design tokens

---

## Execution

### Step 1: Validate Arguments

```
Page name: $ARGUMENTS
```

**Validation:**
- Required: page name must be provided
- Format: lowercase, kebab-case (e.g., "about", "getting-started")
- Check: file doesn't already exist

If validation fails, report error and exit.

### Step 2: Determine Page Type

Based on the page name, select appropriate template:

| Page Name Pattern | Template Type |
|-------------------|---------------|
| `features` | Feature showcase |
| `about` | About/team page |
| `docs` | Documentation link page |
| `changelog` | Changelog/releases page |
| `pricing` | Pricing tiers (if applicable) |
| `*` (default) | Generic content page |

### Step 3: Generate Page Content

#### Page Metadata

```
Title: "{PageName} | Rackula"
Description: "..." (generate 150-160 char description based on page type)
```

#### Template: Features Page

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="Features | Rackula"
  description="Drag-and-drop rack planning, collision detection, multiple export formats, and more. Everything you need to plan your homelab rack."
>
  <main class="features">
    <header class="hero">
      <h1>Features</h1>
      <p class="lead">Everything you need to plan your homelab rack.</p>
    </header>

    <section class="feature-grid">
      <article class="feature">
        <h2>Drag-and-Drop Planning</h2>
        <p>Place devices in your rack with intuitive drag-and-drop. Move, resize, and organise until it's perfect.</p>
      </article>

      <article class="feature">
        <h2>Collision Detection</h2>
        <p>Automatic detection prevents overlapping devices. Plan with confidence.</p>
      </article>

      <article class="feature">
        <h2>Multiple Export Formats</h2>
        <p>Export to PNG, SVG, or PDF. Share with your team or print for reference.</p>
      </article>

      <article class="feature">
        <h2>Device Library</h2>
        <p>Pre-configured devices from common manufacturers. Add custom devices for your specific gear.</p>
      </article>

      <article class="feature">
        <h2>Dark & Light Themes</h2>
        <p>Dracula dark mode by default. Alucard light mode for bright environments.</p>
      </article>

      <article class="feature">
        <h2>Self-Hostable</h2>
        <p>Run on your own infrastructure with Docker. Your data stays yours.</p>
      </article>
    </section>

    <section class="cta">
      <h2>Ready to plan your rack?</h2>
      <a href="https://count.racku.la" class="btn btn-primary">Open App</a>
    </section>
  </main>
</BaseLayout>

<style>
  .features {
    padding: var(--space-8) var(--space-6);
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .lead {
    font-size: var(--text-xl);
    color: var(--colour-text-secondary);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }

  .feature {
    background: var(--colour-bg-light);
    padding: var(--space-6);
    border-radius: var(--radius-md);
    border: var(--border-thin) solid var(--colour-border);
  }

  .feature h2 {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
    color: var(--colour-cyan);
  }

  .feature p {
    color: var(--colour-text-secondary);
    margin: 0;
  }

  .cta {
    text-align: center;
    padding: var(--space-8);
    background: var(--colour-bg-darker);
    border-radius: var(--radius-lg);
  }

  .cta h2 {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-4);
  }

  .btn {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    transition: all var(--duration-normal) var(--ease-default);
    display: inline-block;
  }

  .btn-primary {
    background-color: var(--colour-cyan);
    color: var(--colour-bg-primary);
    box-shadow: var(--glow-sm);
  }

  .btn-primary:hover {
    background-color: var(--colour-green);
    box-shadow: var(--glow-md);
    transform: translateY(-2px);
  }
</style>
```

#### Template: About Page

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="About | Rackula"
  description="Rackula is a free, open-source rack layout designer built for homelabbers. Plan your equipment arrangement before mounting."
>
  <main class="about">
    <header class="hero">
      <h1>About Rackula</h1>
      <p class="lead">Free, open-source rack planning for homelabbers.</p>
    </header>

    <section class="content">
      <h2>Why Rackula?</h2>
      <p>
        Planning a homelab rack shouldn't require expensive software or complex CAD tools.
        Rackula is a lightweight web app designed specifically for the homelab community.
      </p>

      <h2>Open Source</h2>
      <p>
        Rackula is MIT licensed and open source. Self-host it, fork it, contribute to it.
        Your rack plans stay on your infrastructure.
      </p>

      <h2>Built for Homelabbers</h2>
      <p>
        No enterprise features you don't need. No subscription pricing. Just a straightforward
        tool that helps you plan your rack layout before mounting gear.
      </p>
    </section>

    <section class="links">
      <a href="https://github.com/RackulaLives/Rackula" class="link-card">
        <h3>GitHub</h3>
        <p>View source, report issues, contribute</p>
      </a>
      <a href="https://count.racku.la" class="link-card">
        <h3>Try the App</h3>
        <p>Start planning your rack layout</p>
      </a>
    </section>
  </main>
</BaseLayout>

<style>
  .about {
    padding: var(--space-8) var(--space-6);
    max-width: 800px;
    margin: 0 auto;
  }

  .hero {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .lead {
    font-size: var(--text-xl);
    color: var(--colour-text-secondary);
  }

  .content h2 {
    font-size: var(--text-xl);
    margin-top: var(--space-8);
    margin-bottom: var(--space-3);
    color: var(--colour-purple);
  }

  .content p {
    color: var(--colour-text-secondary);
    line-height: 1.7;
  }

  .links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--space-4);
    margin-top: var(--space-12);
  }

  .link-card {
    background: var(--colour-bg-light);
    padding: var(--space-6);
    border-radius: var(--radius-md);
    border: var(--border-thin) solid var(--colour-border);
    transition: all var(--duration-normal) var(--ease-default);
  }

  .link-card:hover {
    border-color: var(--colour-purple);
    box-shadow: 0 0 20px var(--colour-glow-purple);
  }

  .link-card h3 {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
    color: var(--colour-cyan);
  }

  .link-card p {
    color: var(--colour-text-secondary);
    margin: 0;
    font-size: var(--text-sm);
  }
</style>
```

#### Template: Generic Page

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="{PageName} | Rackula"
  description="TODO: Add 150-160 character description for {PageName} page."
>
  <main class="page">
    <header class="hero">
      <h1>{PageName}</h1>
      <p class="lead">TODO: Add lead paragraph.</p>
    </header>

    <section class="content">
      <p>TODO: Add page content.</p>
    </section>
  </main>
</BaseLayout>

<style>
  .page {
    padding: var(--space-8) var(--space-6);
    max-width: 800px;
    margin: 0 auto;
  }

  .hero {
    text-align: center;
    margin-bottom: var(--space-12);
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: var(--text-4xl);
    margin-bottom: var(--space-4);
  }

  .lead {
    font-size: var(--text-xl);
    color: var(--colour-text-secondary);
  }

  .content {
    color: var(--colour-text-secondary);
    line-height: 1.7;
  }
</style>
```

### Step 4: Write File

Write the generated content to `src/pages/{page-name}.astro`.

### Step 5: Output Report

```markdown
## Page Created

**File:** src/pages/{page-name}.astro
**Template:** {template-type}

### SEO Props
- Title: "{PageName} | Rackula"
- Description: "{generated-description}"

### Next Steps
1. Review and customise the placeholder content
2. Update the meta description if needed
3. Add page-specific OG image if desired
4. Run `/seo-audit` to verify completeness
5. Run `/brand-check` before committing

### Preview
```bash
npm run dev
# Visit http://localhost:4321/{page-name}
```
```

---

## Error Handling

| Error | Action |
|-------|--------|
| No page name provided | Report error, show usage |
| File already exists | Report and ask to overwrite or abort |
| Invalid page name | Report allowed format |
| Write failed | Report error with details |

---

## Notes

- All templates use Canadian spelling
- All templates follow brand voice guidelines
- Templates include proper CSS token usage
- Generated descriptions may need refinement
- Run `/brand-check` after customising content
