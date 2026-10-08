hosting site for satchmoe studios

## Public website URLs

The website is published at https://satchmoestudios.com/. Clean page routes use directory `index.html` files:

- `/` (legacy source: `index.html`)
- `/mma-empire/` (legacy source: `mma-empire.html`)
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
