# Hostinger deployment — deshanpathinayake.lk

Upload file: ../deshanpathinayake-hostinger-ready.zip (10,772,684 bytes).
SHA-256: 1563019F2565BF4980DC77A799AE2EEECD3C2EF6BA2775D09E858A38228422D7

## What changed

- Replaced TanStack Start SSR with a Vite browser entry (`index.html`, `src/main.tsx`). Kept TanStack Router, route-level metadata, code splitting, and the existing React page components.
- Removed Start and Nitro dependencies and the Start server/middleware entries. Updated package-lock.json and installed with `npm ci`.
- Replaced the HTML shell in the root route with client head management; retained stylesheets, fonts, favicon, and existing Google Tag Manager configuration. Production share image uses the requested absolute domain.
- Added `public/.htaccess` with DirectoryIndex and Apache/LiteSpeed SPA fallback. Vite base is `/`.
- Added repeatable static-file serving, browser verification, motion verification, and ZIP packaging scripts under `scripts/`.
- Existing page markup, CSS, images, data, animations, and responsive layouts were retained.

## Architecture and limitations

TanStack Start supports static prerendering (https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering). Inspection found four fixed public routes, no page loaders/server functions, no backend fetches, and no environment-variable references or .env files. The original server files were generic error handling and middleware. The chosen deployment is a client-rendered SPA; no per-route HTML directories are needed. JavaScript is required for page content, and crawlers that do not execute JavaScript see the shared HTML metadata rather than each page's client-generated metadata. The archive contains no server process, Node runtime, credentials, source TypeScript, source maps, node_modules, or source project folder.

No existing on-site feature requires a backend. Student accounts, registration, payments, and course access belong to the existing external LMS at deshanpathinayakebs.edu.lk; this ZIP preserves its links, not its server or data. WhatsApp/social links, Google Fonts, and Google Tag Manager continue to depend on their external services and network availability. External account/payment workflows were not exercised.

## Validation

- `npm ci`: passed using updated npm lockfile.
- `npm run build`: passed; client-only `dist/index.html` produced.
- `npx tsc --noEmit`: passed.
- `node scripts/test-static.mjs`: passed 12 combinations: `/`, `/about`, `/classes`, `/timetable` at 375, 768, and 1440 pixels. Direct requests and refreshes passed. Images loaded, page titles matched, and no horizontal overflow was detected. Mobile menu, internal navigation, result dialog, and LMS target checks passed. No browser console errors, page exceptions, or failed local asset responses were observed.
- Local verification served only production files with a static-file server and SPA fallback, without loading any application backend. Node was a local test utility only, and is not uploaded or required by the deployment.
- ZIP verified: 52 files; root index.html and .htaccess present; no wrapper directory; every entry's SHA-256 matches its production source. Manifest: deployment-review/zip-manifest.txt. Browser report: deployment-review/results.json.
- npm audit reports five high-severity dependency groups: brace-expansion, seroval, source-map-js, Vite, and Zod. These were inherited from the dependency tree; broad dependency upgrades were not included. Development dependencies are excluded from the deployment ZIP. This is not a clean dependency-security audit.
- Not uploaded to Hostinger: actual Apache/LiteSpeed rewrite execution, DNS, HTTPS certificate, and live-domain behavior remain to be confirmed after upload. Local static tests simulate the fallback rather than running Hostinger's web server.

## Upload in Hostinger

1. Log in to Hostinger hPanel. Open Websites, locate deshanpathinayake.lk, and open its dashboard/File Manager (sometimes under Files).
2. Open the domain's `public_html` folder. Download a backup of the existing files, including hidden files such as .htaccess. Store the backup outside public_html.
3. After backing up, remove the old website files from public_html. Avoid leaving an old index.php or old rewrite rules that could intercept the new site. Preserve hosting-managed verification folders if needed.
4. Upload `deshanpathinayake-hostinger-ready.zip` and extract it directly into public_html. If the extraction dialog proposes a folder named after the ZIP, change the destination to public_html.
5. Confirm `public_html/index.html`, `public_html/.htaccess`, `public_html/assets/`, and `public_html/images/` exist. There should be no intervening dist or project folder. After extraction, remove the uploaded ZIP from public_html.
6. Open https://deshanpathinayake.lk/. Open /about, /classes, and /timetable directly and refresh each one. Test the mobile menu, result images, FAQ, and LMS links.
7. If the old site persists, clear Hostinger/CDN/browser caches. If direct routes fail, confirm .htaccess was extracted into public_html and is active. Ensure the domain points to this hosting account and HTTPS is active.

There is no npm install, npm start, database setup, or Node process on Hostinger.

Hostinger references: https://support.hostinger.com/en/articles/4548688-basic-actions-in-the-file-manager and https://support.hostinger.com/en/articles/1583307-how-to-create-an-htaccess-file

## Rebuild locally

Use npm and package-lock.json as the deployment lockfile (the original bun.lock is retained as historical project material).

```
npm ci
npm run build
npm run serve:static
```

In another terminal, run `npm run test:static` and `node scripts/test-motion.mjs`. Package with `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/package-hostinger.ps1`. The packaging script verifies archive contents and file hashes. Review documents, scripts, screenshots, and source files are kept outside the deployable ZIP.

Normal-motion browser checks also passed at 375 and 1440 pixels: loader dismissal, completed typewriter, and FAQ expansion. Hero screenshots are in deployment-review/.


Responsive header/footer update: compact mobile branding with LMS access in the mobile menu; full-width footer introduction and contacts around two navigation columns below 601px; flexible desktop columns and safe contact wrapping. Production build passed, and scripts/test-responsive.mjs passed at 320, 360, 375, 390, 600, 601, 768, 1023, 1024, and 1440 pixels, checking clipping, header overlap, and mobile navigation. Results: deployment-review/responsive-results.json. ZIP regenerated and all 52 files verified.
