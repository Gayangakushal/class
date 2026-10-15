Sinhala content is rendered by `src/components/site/SinhalaText.tsx` as
external SVG path references. Existing HTML containers, CSS typography,
colors, links, animations, metadata and structured content are retained.
Mixed English/Sinhala elements are outlined together. Existing photographs
and result artwork already containing image text are unchanged.

Run `npm run generate:sinhala` after editing Sinhala content. The generator
scans TypeScript/TSX text, shapes each script run with HarfBuzz and the pinned
original Noto Sans Sinhala faces in `scripts/fonts`, fails on missing glyphs,
and writes deduplicated vector sprites to `public/assets/sinhala-text`.
`inventory.json` records source strings and locations for review.

Word-sized runs preserve natural whitespace wrapping and inherited font size,
line height and color. Separate variants preserve the manifesto heading's
letter spacing and the FAQs' inherited letter spacing. Repeated glyph paths
are shared inside cacheable sprites; the two weights currently displayed
total approximately 110 KB with gzip. No runtime font shaping is required.

For browser verification, start `npm run dev -- --host 127.0.0.1 --port 5173`
and run `npm run test:sinhala` (install Chromium with `npx playwright install
chromium` first). It checks all four routes at 375, 768, 1024 and 1440 pixels,
compares outlined block geometry with the same content restored as native
text in the test browser, checks select-all output, and exercises the loader,
mobile navigation, FAQs and results gallery. Captures go to the ignored
`.sinhala-review` directory. `node scripts/review-sinhala.mjs before` can
capture a baseline before future conversions.

Image rendering prevents ordinary selection/copying of visible wording.
Accessible image labels intentionally retain the exact wording for screen
readers. Source content and accessibility attributes remain inspectable;
screenshots, OCR and determined extraction are still possible.
