# Brand Compliance Check

Validate content and code against the Rackula brand guide. Run this before commits to catch spelling, voice, and style issues.

**Arguments:** `$ARGUMENTS` (optional: specific file or directory to check, defaults to `src/`)

---

## What This Checks

| Category | What to Find | Action |
|----------|--------------|--------|
| **Spelling** | American spellings | Flag and suggest Canadian/British |
| **Voice** | Marketing fluff | Flag and suggest direct alternatives |
| **Colours** | Hardcoded hex values | Flag if should be CSS token |
| **Typography** | Wrong font for context | Flag misuse of brand fonts |
| **Terminology** | Inconsistent naming | Flag variations |

---

## Execution

### Step 1: Determine Scope

```
Target: $ARGUMENTS or src/ (default)
```

Read all `.astro`, `.css`, `.ts`, `.md` files in the target scope.

### Step 2: Spelling Check

Search for American spellings that should be Canadian/British:

| American | Canadian | Context |
|----------|----------|---------|
| `color` | `colour` | All contexts except code identifiers |
| `colors` | `colours` | All contexts |
| `center` | `centre` | Text content (CSS `center` is fine) |
| `behavior` | `behaviour` | All contexts |
| `organize` | `organise` | All contexts |
| `recognize` | `recognise` | All contexts |
| `customize` | `customise` | All contexts |
| `visualize` | `visualise` | All contexts |
| `utilize` | `utilise` | All contexts |
| `favorite` | `favourite` | All contexts |
| `honor` | `honour` | All contexts |
| `labor` | `labour` | All contexts |
| `neighbor` | `neighbour` | All contexts |
| `flavor` | `flavour` | All contexts |

**Exceptions:**
- CSS property values (`text-align: center`, `color:` as property name)
- JavaScript/TypeScript identifiers (variable names, imports)
- External library references

### Step 3: Voice Check

Flag marketing fluff patterns:

| Bad Pattern | Why | Better |
|-------------|-----|--------|
| "ultimate solution" | Hyperbolic | State what it does |
| "seamlessly" | Vague buzzword | Describe the actual integration |
| "revolutionary" | Overused | Be specific about what's new |
| "cutting-edge" | Cliché | Describe the actual technology |
| "state-of-the-art" | Meaningless | Specific capabilities |
| "leverage" (as verb) | Corporate speak | "use" |
| "synergy" | Buzzword | Describe actual benefit |
| "empower" | Vague | Specific action |
| "streamline" | Overused | Describe how |
| "robust" | Meaningless alone | Specific quality |
| "scalable" | Needs context | How/why it scales |
| "intuitive" | Subjective | Describe the UX |
| "best-in-class" | Unsubstantiated | Specific differentiator |
| "game-changing" | Hyperbolic | Actual impact |
| "next-generation" | Vague | What's actually new |

**Good voice examples (from brand guide):**
- "Plan your homelab rack layout." (direct, action-oriented)
- "Export to PNG, SVG, or PDF." (specific, no fluff)
- "Self-host with Docker." (technical, assumes competence)

### Step 4: Colour Token Check

Search for hardcoded hex values that should use CSS custom properties:

**Known Dracula tokens to check for:**
```
#282A36 → var(--colour-bg-primary)
#F8F8F2 → var(--colour-text-primary)
#6272A4 → var(--colour-text-secondary)
#BD93F9 → var(--colour-purple)
#FF79C6 → var(--colour-pink)
#8BE9FD → var(--colour-cyan)
#50FA7B → var(--colour-green)
#FFB86C → var(--colour-orange)
#FF5555 → var(--colour-red)
#F1FA8C → var(--colour-yellow)
#44475A → var(--colour-selection)
#191A21 → var(--colour-bg-darkest)
#21222C → var(--colour-bg-darker)
#343746 → var(--colour-bg-light)
#424450 → var(--colour-bg-lighter)
```

**Alucard (light mode) tokens:**
```
#FFFBEB → var(--colour-bg-primary) [light]
#1F1F1F → var(--colour-text-primary) [light]
#644AC9 → var(--colour-purple) [light]
#036A96 → var(--colour-cyan) [light]
#A3144D → var(--colour-pink) [light]
#14710A → var(--colour-green) [light]
```

**Exceptions:**
- SVG gradient definitions (these are correct as hex)
- Meta theme-color tags
- Comments/documentation

### Step 5: Typography Check

Verify font usage:

| Context | Expected Font | Flag If |
|---------|---------------|---------|
| Lockup/wordmark | Space Grotesk | JetBrains Mono, Inter |
| Headings | JetBrains Mono | Inter, Space Grotesk |
| Body text | Inter | JetBrains Mono |
| Code/UI labels | JetBrains Mono | Inter |

### Step 6: Output Report

Format findings as:

```markdown
## Brand Check Results

### Summary
- Files scanned: N
- Issues found: N
- Severity: [PASS | MINOR | MAJOR]

### Spelling Issues
| File | Line | Found | Should Be |
|------|------|-------|-----------|
| ... | ... | ... | ... |

### Voice Issues
| File | Line | Flagged Text | Suggestion |
|------|------|--------------|------------|
| ... | ... | ... | ... |

### Colour Token Issues
| File | Line | Hardcoded | Suggested Token |
|------|------|-----------|-----------------|
| ... | ... | ... | ... |

### Typography Issues
| File | Line | Context | Issue |
|------|------|---------|-------|
| ... | ... | ... | ... |
```

---

## Exit Conditions

| Result | Action |
|--------|--------|
| **PASS** (0 issues) | Report clean status |
| **MINOR** (warnings only) | Report issues, suggest fixes |
| **MAJOR** (critical issues) | Report issues, recommend fixing before commit |

---

## Notes

- This is a static analysis tool — it may have false positives
- Use judgement on exceptions (external code, technical identifiers)
- Reference: `/Users/gvns/notes/gVault/01-PROJECTS/rackula/brand-guide.md`
