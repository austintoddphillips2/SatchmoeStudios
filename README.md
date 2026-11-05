hosting site for satchmoe studios

## Public website URLs

The website is published at https://satchmoestudios.com/. Clean page routes use directory `index.html` files:

- `/` (legacy source: `index.html`)
- `/mma-empire/` (legacy source: `mma-empire.html`)
- `/red-eye-empire/`
- `/privacy/` (legacy source: `mma-empire-privacy.html`)
- `/proam-dashboard/` (legacy source: `proam-dashboard.html`)
- `/team/` (legacy source: `team.html`)
- `/other-projects/` (legacy source: `other-projects/upcoming-projects.html`)
- `/other-projects/smart-draft/` (legacy source: `other-projects/smart-draft.html`)
- `/other-projects/pdf-editor/` (legacy source: `other-projects/pdf-editor/index.html`)

Legacy `.html` files retain their content and forward to the clean routes, including query strings and fragments when JavaScript is enabled. Keep these compatibility files for existing app/store links. The Google verification file and PDF Editor assets/service worker remain in place.

AdMob authorized sellers are published at `/app-ads.txt`. This filename must remain exact.

## The Cabinet

The Cabinet is hosted at `/thecabinet/`. Its complete static game, portraits, data, third-party library, and attribution files are preserved in `thecabinet/`. The old repository forwards visitors and challenge links to this route and can transfer the five Cabinet browser-storage keys in a temporary URL fragment. Import never overwrites existing data and removes the fragment before analytics loads. Other app storage is never transferred.

The Cabinet keeps its existing GA4 property (`G-ENKKL3JF1H`).

The MMA Empire wordmark masters live at `assets/img/mma-empire/mma_empire_wordmark_fa58.png` (406×251) and `assets/img/mma-empire/mma_empire_wordmark_4x_upscale_711a.png` (1624×1004). The larger file is a 4× upscale of the same pixels, not extra detail. Homepage and game-page logo slots show that file at its own aspect ratio on the existing navy field. The MMA favicon is the same wordmark fitted inside a square without stretching. The studio mark is unchanged.

Red Eye Empire has its own page at `/red-eye-empire/` and is also featured on the homepage. It is a free-to-play idle airline tycoon, with an LED departure board that sits on your desktop, coming to Steam in November 2026 and iOS to follow. Project Romémon is listed under Other Projects and described at `/romemon/` as a project in development. FarChunks, a planned Minecraft LOD mod, is also listed under Other Projects. Proam Dashboard remains available at `/proam-dashboard/` and is listed under Other Projects.
