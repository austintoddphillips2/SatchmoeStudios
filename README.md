# Satchmoe Studios site — deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `satchmoe-studios-site`).
2. Upload all five HTML files plus the `assets/` folder to the repo root (drag-and-drop works fine on github.com, or use git).
3. In the repo: **Settings → Pages → Source → Deploy from a branch → main → / (root) → Save**.
4. Your site goes live in a minute or two at:
   `https://<your-username>.github.io/satchmoe-studios-site/`

## Pages
- `index.html` — landing page, studio overview, spotlights Proam Dashboard up top
- `proam-dashboard.html` — Satch's Proam Dashboard, the studio's paid product
- `mma-empire.html` — MMA Empire, links to Steam + Discord
- `smart-draft.html` — Smart Draft, links to the live game
- `upcoming-projects.html` — Airport Manager Tycoon, PDF Editor, Heat & Heel
- `team.html` — staff bios and photos
- `assets/style.css` — shared styling for all pages
- `assets/theme.js` — powers the light/dark mode toggle button in the nav; remembers the visitor's choice via localStorage, and defaults to their OS setting on first visit

## Wiring up Proam Dashboard checkout
`proam-dashboard.html` currently has two placeholder spots marked with `<!-- TODO -->` comments — the "Get Proam Dashboard" buttons and the `$—` price. Once Lemon Squeezy verification goes through:
1. Create the product in your Lemon Squeezy dashboard and grab either the hosted checkout URL or the `lemon.js` overlay snippet.
2. Swap the `mailto:` links in the two buttons for your checkout link (or wire up the overlay).
3. Replace `$—` in the price card with the real price.

## To use a real domain later
Buy a domain (Namecheap, Cloudflare, etc.), then in the same Pages settings add it under "Custom domain" and follow GitHub's DNS instructions. No rebuild needed.

## Adding staff photos
In `team.html`, each person has a `.staff-photo` block with a placeholder initials `<span>`. Replace the `<span>AP</span>` (etc.) with an `<img src="assets/team/austin.jpg" alt="Austin Phillips">` once you have photos — drop the image files into a new `assets/team/` folder.

## Editing content
Each page is a separate HTML file with its own text; the look and feel (colors, fonts, buttons, cards) all lives in `assets/style.css`, so changing a color or font there updates every page at once.
