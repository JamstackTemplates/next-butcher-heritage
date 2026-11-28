# Saltbush & Cleaver Butchery

A static Next.js website and the Heritage butcher design for the Jamstacks gallery. Saltbush &
Cleaver, its story, prices and contact details are fictitious. The Adelaide Central Market is the
public landmark used for the demo.

## Preview locally

Use Node 24 or later. Run `npm ci` to install, `npm run dev` for local editing, and
`npm run check` followed by `npm start` to preview the production export at
`http://localhost:3000/`. The production export uses Next.js’s bundled Webpack.

| Route | Purpose |
| --- | --- |
| `/` | Featured specials, cut chart, packs, Christmas and market hours |
| `/specials/` | Weekly board with shareable animal filters and a print view |
| `/packs/` | Pack contents, weights, serving counts and price tickets |
| `/cuts/` | Beef, lamb and pork chart and six linked cooking guides |
| `/christmas/` | Calendar, collection hours, printable list and enquiry steps |
| `/contact/` | Hosted enquiry form when configured, with email and phone |
| `/404.html` | Themed static error page |

## Update the shop content

| File | Owner-editable values |
| --- | --- |
| `content/business.ts` | Wordmark, year, story, public contact details, address, map query, directions, geographic coordinates and weekly hours |
| `content/specials.ts` | Board dates, item copy, animal, prices, unit, availability, featured and selling-fast flags |
| `content/packs.ts` | Collection notice, serving counts, contents, total prices and availability |
| `content/christmas.ts` | Opening and closing dates for enquiries, collection dates and hours, closures, sizes, prices and availability |
| `content/cuts.ts`, `content/chart-art.ts`, `content/guides.ts` | Primals, illustrated regions, cooking methods, linked cuts, guide timings and steps |
| `app/page.tsx`, `app/<route>/page.tsx` | Page-specific headings, text and button labels in display order |
| `site.config.json` | Public name, description, hostname, IANA time zone and Jamstacks integration |

### Change the weekly board

Edit `weekOf` to the Tuesday and `validUntil` to the following Saturday, in `YYYY-MM-DD` format.
For example, use `2026-12-01` and `2026-12-05` for the next board. Set the rib eye's
`priceCents` to `5190` for $51.90, and mark `saltbush-lamb-cutlets` unavailable with
`available: false` to show its sold-out stamp. Leave `featured: true` on exactly four specials.
The same edit updates Home and Specials. Run `npm run check` to validate and rebuild.

### Edit packs, Christmas and guides

- Keep IDs stable, unique within their collection and lowercase with hyphens. Guide and pack IDs
  are used in public anchors. Keep primal region IDs aligned with the SVG artwork and guide IDs
  aligned with the cooking guides.
- Prices are positive integer AUD cents. A special's optional `wasCents` must exceed its current
  price. Units are `kg`, `pack` or `each` for specials and `kg` or `each` for Christmas items.
  Availability is a boolean.
- Each pack needs at least three entries. `quantity` is the number of pieces or containers.
  Optional `weightGrams` is the total for that line. `noticeDays` applies to all packs.
- For each Christmas season, set `enquiriesOpen`, `enquiriesClose`, `collectionDays`,
  `collectionHours` and `closedDays` together. Collection days follow the closing date and
  each uses a same-day 24-hour `HH:MM` interval. Holiday dates override regular trading hours.
  Enquiries close at the end of the listed Adelaide date.
- Guides have three to six steps, linked `cutIds`, elapsed and active minutes, heat and optional
  core temperature, and resting minutes. Elapsed time includes resting and preparation waits.

### Move or rename the shop

Update the display name in both `content/business.ts` and `site.config.json`. For phone edits,
set `phone` for display and `telephone` for the international dial link. Update `address`,
`mapQuery`, `geo` and `directions` together. `showMap: false` hides the optional Google Maps
disclosure. The directions link remains available.

Weekly `hours` use local 24-hour `HH:MM` and omit both times for a closed day. The browser
refreshes status every minute in the configured IANA zone. The static export provides the weekly
schedule and fixed seasonal dates. The hours model supports intervals within one day.

## Appearance

The header, footer and glass panels use gilt and enamel tile. The counter uses marble and
butcher paper, with chalkboard rows, scalloped tickets, wrapped parcels and engraved chart
illustrations. The theme is in `app/tailwind.input.css` and illustrations are in `components/art/`.
The home hero is a painted view along the counter, with a matching light and dark version in
`public/hero/` (`counter-light-*.webp`, `counter-dark-*.webp`, 1376 and 800 px wide).
`components/home-hero.tsx` picks the one that matches the visitor's theme. To replace it, keep the
same file names, keep the left side calm and close to the page background (`#F4EEDF` light,
`#141A17` dark) so the headline stays readable, and keep both versions in the same composition.
The beef, lamb and pork chart drawings live in `content/chart-art.ts`; each cut region is clipped
to the animal's outline, so a region only needs a rough dividing polygon.
The Jamstacks theme control offers system, light and dark preferences. Holtwood One SC, Besley and
Kaushan Script are bundled locally through Fontsource. The SIL Open Font License is in each
installed font package.

# Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

This gallery demo uses `next-butcher-heritage.jamstacks.net` and `Australia/Adelaide`. Replace the demo domain and time zone when adapting it for a different business.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover configuration, the embed, collection validation, Adelaide daylight saving, holiday hours
and structured data. The export check scans the built pages for enquiry wording, canonical URLs,
embed placement and broken anchors.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

The customer website uses `app/`, `components/`, `content/`, `lib/`, `public/` and `types/`.
`scripts/` serves and checks the export. `tests/` covers owner edits, hours and configuration.
`jamstacks/` holds removable gallery metadata, captures and the SVG source for `public/og.png`.
The social image uses stable shop copy and is 1200 × 630.

After a fresh normal build, refresh the gallery screenshots using the portal tool and validate them.

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template "$PWD" --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

After reviewing the site, `plan/` and `.claude/skills/` can be removed. The site is self-contained
and builds without the planning folder, gallery assets or the portal checkout.