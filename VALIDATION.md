# Local verification

- The standard `npm run check` validates the typed content and builds the static site with
  Next.js’s bundled Webpack. The export checks cover enquiry wording, Contact host placement,
  titles, canonical URLs, anchor destinations, sitemap, robots and social image dimensions.
- The `/preview` export was built with and without a public site ID. Chromium verified repeated
  full-document navigation in both directions, the public email and phone, and a single bootstrap
  request on each configured Contact visit. The configured browser check exercised a blocked
  bootstrap and the email fallback.
- The documented owner edit was rebuilt in an isolated copy without the gallery or planning
  folders. Home and Specials both rendered the 1–5 December week, $51.90/kg rib eye and sold-out
  saltbush lamb cutlets.
- Chromium checked all seven routes in light and dark at 1440px and 390px, plus 360px overflow,
  skip-link focus, mobile menu, theme persistence, all filter counts and URL hashes, cut chart
  keyboard controls, guide anchors, copy email, map disclosures, print and no-JavaScript fallbacks.
- The homepage gallery captures and report pass `node --test jamstacks/config.test.mjs`.
  The social image was rendered at 1200 × 630 from the gallery SVG source.

## External checks

The site changes are local. Live Google Maps content and real enquiry delivery require the external
services. The local checks verified the map iframe source and the hosted form’s bootstrap and
fallback behavior.
