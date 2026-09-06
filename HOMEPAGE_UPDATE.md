# Homepage update

## Implemented

- Removed the conflicting portrait centring and vertical padding. The portrait
  and coral backdrop align to the section bottom; the portrait is last on mobile.
- Added an initial-session BS loader, bounded to 1.8 seconds, with a 1.2-second
  brand reveal before the asset-ready exit, scroll/focus restoration, session storage, timeout cleanup,
  and a reduced-motion exit under 300ms. It is absent from server markup so a
  JavaScript failure does not leave an overlay over the page.
- Added clearly labelled sample centres between the timetable and LMS sections,
  plus a sample results wall with keyboard-accessible Radix lightboxes.
- Added local sample illustrations to tickets, physical classes, online LMS,
  centres and results. See IMAGE_SOURCES.md. No student claims or map URLs invented.
- Replaced the favicon and added a BS social-preview graphic. Lovable build,
  error-reporting and editor configuration were preserved.
- Added centre/result footer links, brand description and the exact Novonex credit.
- Preserved the centralized LMS URL.

## Validation

- TypeScript validation passed after the implementation, including a final run
  using cmd.exe after PowerShell failed to initialize.
- Production build passed on 7 September 2026 (client, SSR and Cloudflare worker).
  The prior full-disk blocker is resolved. Existing toolchain notices remain about
  vite-tsconfig-paths and an ignored inlineDynamicImports option; neither fails the build.
- Browser checks passed at 360, 390, 768, 1024 and 1440px: no horizontal overflow,
  teacher and coral bottom gaps both 0px, and the original 2:3 portrait ratio retained.
  Desktop and mobile screenshots were visually inspected for the portrait and centres.
- Loader visibility was observed for approximately 1.15 seconds before its exit
  transition. It was removed from the DOM, restored scrolling and cleared inert.
  Reloading in the same session did not show it again. Reduced-motion cleanup passed.
- Result lightboxes opened, closed with Escape, and restored focus to their triggers
  at every tested width. No browser runtime errors were reported.
- Every rendered image URL returned successfully. All new lazy-loaded covers and
  result images decoded successfully in mobile and desktop checks.
- Sample cards and disabled location actions were confirmed. All homepage LMS
  links matched the centralized URL. No public Lovable branding was found.
- The live Lovable connection cannot be confirmed locally; its configuration and
  required dependencies were not edited. Nothing was pushed or deployed.

## Files modified

1. `src/routes/index.tsx`
2. `src/routes/__root.tsx`
3. `src/routes/classes.tsx`
4. `src/components/site/SiteFooter.tsx`
5. `src/lib/site-data.ts`
6. `src/styles.css`
7. `public/favicon.ico`

## Files created

1. `src/components/site/SiteLoader.tsx`
2. `src/components/site/SampleImage.tsx`
3. `src/components/site/HomeShowcase.tsx`
4. `public/favicon.svg`
5. `public/images/brand-preview.png`
6. `public/images/classes/theory-class.svg`
7. `public/images/classes/revision-class.svg`
8. `public/images/classes/paper-class.svg`
9. `public/images/classes/physical-class.svg`
10. `public/images/classes/online-class.svg`
11. `public/images/centres/centre-nugegoda.svg`
12. `public/images/centres/centre-panadura.svg`
13. `public/images/centres/centre-horana.svg`
14. `public/images/results/sample-result-1.svg`
15. `public/images/results/sample-result-2.svg`
16. `public/images/results/sample-result-3.svg`
17. `IMAGE_SOURCES.md`
18. `HOMEPAGE_UPDATE.md`

The successful production build regenerated `.output` and the generated Wrangler
deployment configuration. These are build artifacts; no deployment was performed.
