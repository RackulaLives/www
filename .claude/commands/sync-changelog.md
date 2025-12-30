# Sync Changelog

Fetch releases from the main Rackula GitHub repository and format them for the marketing site.

**Arguments:** `$ARGUMENTS` (optional: number of releases to fetch, defaults to 10)

---

## What This Does

1. Fetches releases from RackulaLives/Rackula via GitHub API
2. Formats release notes for marketing context
3. Outputs as Astro component or data file
4. Optionally filters/transforms technical details

---

## Execution

### Step 1: Fetch Releases

```bash
gh release list --repo RackulaLives/Rackula --limit ${ARGUMENTS:-10} --json tagName,name,publishedAt,body
```

This returns JSON with:
- `tagName`: Version (e.g., "v0.6.1")
- `name`: Release title
- `publishedAt`: ISO date
- `body`: Release notes markdown

### Step 2: Process Each Release

For each release:

#### Extract Version Info

```
Tag: v0.6.1 → Version: 0.6.1
Published: 2025-12-28T10:30:00Z → Date: December 28, 2025
```

#### Clean Release Notes

Transform the body for marketing context:

| Source Pattern | Transform |
|----------------|-----------|
| Technical implementation details | Summarise user-facing impact |
| PR/commit references (#123) | Remove or link |
| Internal notes | Remove |
| Breaking changes | Highlight prominently |
| New features | Lead with these |
| Bug fixes | Group together |

#### Categorise Changes

Parse the release body and categorise:

```markdown
## Features
- New feature description

## Improvements
- Enhancement description

## Fixes
- Bug fix description

## Breaking Changes
- What changed and migration path
```

### Step 3: Output Format

#### Option A: Astro Component Data

Create/update `src/data/releases.json`:

```json
{
  "lastUpdated": "2025-12-29T22:00:00Z",
  "releases": [
    {
      "version": "0.6.1",
      "date": "2025-12-28",
      "dateFormatted": "December 28, 2025",
      "title": "Bug fixes and performance improvements",
      "highlights": [
        "Fixed collision detection edge case",
        "Improved export performance"
      ],
      "categories": {
        "features": [],
        "improvements": ["Improved export performance"],
        "fixes": ["Fixed collision detection edge case"]
      },
      "url": "https://github.com/RackulaLives/Rackula/releases/tag/v0.6.1"
    }
  ]
}
```

#### Option B: Astro Content Collection

Create `src/content/releases/v0.6.1.md`:

```markdown
---
version: "0.6.1"
date: 2025-12-28
title: "Bug fixes and performance improvements"
---

## Highlights

- Fixed collision detection edge case
- Improved export performance

## Full Changelog

[View on GitHub](https://github.com/RackulaLives/Rackula/releases/tag/v0.6.1)
```

### Step 4: Create/Update Changelog Component

If not exists, create `src/components/Changelog.astro`:

```astro
---
import releases from '../data/releases.json';

interface Props {
  limit?: number;
}

const { limit = 5 } = Astro.props;
const displayReleases = releases.releases.slice(0, limit);
---

<section class="changelog">
  <h2>Recent Updates</h2>

  {displayReleases.map((release) => (
    <article class="release">
      <header>
        <span class="version">v{release.version}</span>
        <time datetime={release.date}>{release.dateFormatted}</time>
      </header>
      <h3>{release.title}</h3>
      <ul>
        {release.highlights.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <a href={release.url} class="release-link">
        View full release notes
      </a>
    </article>
  ))}
</section>

<style>
  .changelog {
    font-family: var(--font-sans);
  }

  .release {
    border-left: 2px solid var(--colour-purple);
    padding-left: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .version {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--colour-cyan);
    background: var(--colour-bg-light);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
  }

  time {
    font-size: var(--text-sm);
    color: var(--colour-text-secondary);
    margin-left: var(--space-2);
  }

  h3 {
    font-size: var(--text-lg);
    margin: var(--space-2) 0;
  }

  ul {
    color: var(--colour-text-secondary);
    padding-left: var(--space-4);
  }

  .release-link {
    font-size: var(--text-sm);
    color: var(--colour-link);
  }
</style>
```

---

## Output Report

```markdown
## Changelog Sync Results

### Summary
- Releases fetched: N
- Latest version: v0.6.1
- Date range: Dec 15, 2025 - Dec 28, 2025

### Releases Processed

| Version | Date | Highlights |
|---------|------|------------|
| v0.6.1 | Dec 28 | 2 fixes |
| v0.6.0 | Dec 20 | 3 features, 1 fix |
| v0.5.0 | Dec 15 | 5 features |

### Files Created/Updated
- src/data/releases.json (updated)
- src/components/Changelog.astro (created)

### Next Steps
1. Import Changelog component where needed
2. Consider adding to homepage or dedicated /changelog page
```

---

## Usage in Pages

After sync, use the component:

```astro
---
import Changelog from '../components/Changelog.astro';
---

<Changelog limit={3} />
```

Or access data directly:

```astro
---
import releases from '../data/releases.json';
const latest = releases.releases[0];
---

<p>Current version: v{latest.version}</p>
```

---

## Automation Notes

- Run manually when preparing a marketing update
- Could be automated via GitHub Actions on new releases
- Consider caching to avoid rate limits during development

---

## Error Handling

| Error | Action |
|-------|--------|
| No releases found | Report and exit |
| API rate limit | Wait and retry, or use cached data |
| Parse error | Log problematic release, continue with others |
| Write permission | Report and suggest fix |
