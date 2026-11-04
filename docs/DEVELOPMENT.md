# MicroMatrix

Bender's personal homepage. React + TypeScript + Vite, with a Bauhaus-inspired geometric layout, primary colors, and hand-drawn doodles.
Animations use Motion for React through the existing `framer-motion` package. Fonts are hosted locally; see
[public/fonts/README.md](../public/fonts/README.md) for sources, licenses and subsetting instructions.

## Development

Use Node.js 22.18+ (or 24+) and pnpm.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
```

## GitHub projects

The browser requests public repositories directly from the GitHub REST API. No
backend, API token, generated project JSON or scheduled builds are required.

`src/content/site.ts` contains the username, repository exclusion list and display
limit (5). The loader fetches all pages before filtering and ranking repositories.
Forks, archived/disabled/private repositories and excluded names are omitted.

- **Most stars (default)**: stars descending, then `updated_at` descending.
- **Recently updated**: `updated_at` descending, then stars descending.
- Each mode displays at most five repositories. Equal values use the name as a stable tie-breaker.
- Names, descriptions, primary languages, star/fork counts and website links come
  from GitHub. The update date is repository metadata's `updated_at`, not the last commit date.
- Successful responses are cached in `localStorage` for one hour. A visit after
  expiry requests new data; it does not require rebuilding the site.
- If a request fails, any previous cached list remains visible with a notice. If
  no cache exists, the page shows a retry action. Disabled browser storage does
  not prevent live loading.
- GitHub's anonymous rate limit is 60 requests per hour per originating IP. Never
  add a personal token to browser code or a `VITE_*` environment variable.

The automated tests cover pagination, both sort orders, filtering, the five-item
limit, malformed API responses, rate limits, storage corruption and safe links.

## Visual design and motion

The paper, ink, red, blue, and yellow tokens live in `src/styles/theme.css`.
`GeometricPoster` builds the hero artwork with CSS geometry and animated SVG strokes.
`StudioMotion` shares the animation preference across the page: the header toggle
pauses decorative motion and typing, and the system reduced-motion setting takes
precedence. Project rows animate their positions when the sort order changes.
Geometry and SVG strokes repeat a 2.4-second gesture with a 4-second rest.
Loops stop outside the viewport, and scroll reveals replay on re-entry.
Layouts switch to a single column below 760px. Existing GitHub data loading,
filtering, caching, and retry behavior are preserved.
