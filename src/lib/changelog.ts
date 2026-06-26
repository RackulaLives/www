// Build-time changelog: fetch GitHub Releases, fall back to a committed JSON file,
// and render release bodies as ESCAPED plain text (no HTML injection possible).

export interface Release {
  name: string | null;
  tag_name: string;
  published_at: string;
  html_url: string;
  body: string | null;
}

const REPO = 'RackulaLives/Rackula';
const FALLBACK_URL = new URL('../data/changelog-fallback.json', import.meta.url);

export async function getReleases(limit = 20): Promise<Release[]> {
  let releases: Release[];
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=${limit}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'rackula-www' },
    });
    if (!res.ok) throw new Error(`GH releases ${res.status}`);
    releases = await res.json() as Release[];
  } catch {
    // Offline / rate-limited / no network at build time → use committed fallback.
    const fallback = await fetch(FALLBACK_URL);
    releases = await fallback.json() as Release[];
  }
  return releases.slice(0, limit);
}

// Escape every HTML-significant character. Converts the markdown body to safe
// text, preserving line breaks. No raw HTML from the release body can reach the page.
export function escapeReleaseBody(body: string | null): string {
  if (!body) return '';
  const escaped = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  // Paragraph breaks + line breaks for readability
  return escaped
    .split(/\n{2,}/)
    .map((para) => `<p>${para.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

export function releaseDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-CA', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return iso;
  }
}