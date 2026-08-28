# ◈ Marco Daniel Castillo — Portfolio

> _"Architecting digital artifacts in the heart of Western Visayas."_

A personal developer portfolio built with TypeScript and Vite. Features a dark arcane aesthetic powered by the Catppuccin color palette, SPA routing, live GitHub repository integration, and an interactive particle background.

---

## ✦ Preview

![Status](https://img.shields.io/badge/STATUS-2ND%20YEAR%20SE%20STUDENT-cba6f7?style=flat-square&labelColor=0b0b10)
![License](https://img.shields.io/badge/LICENSE-MIT-89b4fa?style=flat-square&labelColor=0b0b10)
![Built With](https://img.shields.io/badge/BUILT%20WITH-TypeScript%20+%20Vite-f5e0dc?style=flat-square&labelColor=0b0b10)

---

## ✦ Features

- **SPA with History API** — Clean URLs (`/projects`, `/about`), smooth page transitions, browser back/forward support
- **Dark/Light Theme** — Catppuccin Mocha ↔ Latte toggle, saved to localStorage, respects `prefers-color-scheme`
- **Live GitHub Integration** — Fetches and displays repositories via the GitHub REST API with 5-minute caching
- **Project Detail Pages** — Individual pages for each repo with description, stats, topics, and README rendering
- **Search & Filter** — Filter projects by language, search by name/description, sort by stars/name/updated
- **Skeleton Loaders** — Shimmer placeholders while API data loads
- **About Page** — Bio, technical skills, and timeline
- **Contact Form** — Formspree-powered contact form
- **Particle Canvas** — Interactive `particles.js` background with grab-on-hover effect
- **Mobile Responsive** — Hamburger menu with animated toggle
- **Accessible** — Supports `prefers-reduced-motion`, semantic HTML, ARIA labels
- **SEO Ready** — Open Graph, Twitter Card, and meta description tags

---

## ✦ Tech Stack

| Layer     | Technology                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| Markup    | HTML5                                                                                                         |
| Styling   | CSS3 (custom properties, keyframe animations)                                                                 |
| Logic     | TypeScript                                                                                                    |
| Bundler   | [Vite](https://vitejs.dev/) `v5.x`                                                                            |
| Particles | [particles.js](https://vincentgarreau.com/particles.js/) `v2.0.0`                                             |
| Fonts     | [Cinzel](https://fonts.google.com/specimen/Cinzel) · [Fira Code](https://fonts.google.com/specimen/Fira+Code) |
| Data      | [GitHub REST API](https://docs.github.com/en/rest)                                                            |
| Forms     | [Formspree](https://formspree.io/)                                                                            |

---

## ✦ Project Structure

```
portfolio/
├── index.html              # Shell — nav, particles, #app, footer
├── public/
│   └── images/             # Favicons, manifest, PWA assets
├── src/
│   ├── main.ts             # Entry — init router, theme, particles
│   ├── router.ts           # History API router with transitions
│   ├── theme.ts            # Dark/light toggle + localStorage
│   ├── types.ts            # Shared interfaces
│   ├── api.ts              # GitHub API fetch + caching
│   ├── views/
│   │   ├── home.ts         # Hero + featured projects
│   │   ├── projects.ts     # Full grid + search/filter
│   │   ├── project-detail.ts # Single repo detail + README
│   │   ├── about.ts        # Bio, skills, timeline
│   │   ├── contact.ts      # Contact form (Formspree)
│   │   └── stats.ts        # GitHub stats cards
│   ├── components/
│   │   ├── skeleton.ts     # Skeleton loaders
│   │   ├── repo-card.ts    # Reusable repo card
│   │   └── theme-toggle.ts # Dark/light toggle button
│   └── styles/
│       ├── theme.css       # CSS variables (dark + light)
│       ├── global.css      # Reset, nav, footer, shared
│       ├── transitions.css # Page transition animations
│       ├── skeleton.css    # Skeleton loading styles
│       └── views/          # Per-view styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ✦ Getting Started

Requires Node.js 18+.

```bash
git clone https://github.com/KabbalahTreeofLife/<repo-name>.git
cd <repo-name>
npm install
npm run dev
```

Then visit `http://localhost:5173`.

---

## ✦ Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Type-check + build for prod  |
| `npm run preview` | Preview production build     |

---

## ✦ Customization

**`src/views/about.ts`** — Update bio, skills, and timeline content.

**`src/api.ts`** — Change the GitHub username:

```ts
const USERNAME = 'YourGitHubUsername';
```

**`src/styles/theme.css`** — Swap color values in the `:root` and `[data-theme="light"]` blocks.

**`src/views/contact.ts`** — Replace `YOUR_FORM_ID` with your Formspree endpoint.

---

## ✦ Deployment

Build produces static files in `dist/`:

```bash
npm run build
```

Deploy `dist/` anywhere:

- **GitHub Pages** — Push `dist/` to `gh-pages` branch
- **Netlify / Vercel** — Connect repo, set build command to `npm run build` and output to `dist`
- **Any static host** — Upload the `dist/` folder

---

## ✦ License

Released under the [MIT License](LICENSE). Free to use, modify, and redistribute.

---

<p align="center">
  <sub>ESTABLISHED MMXXVI · ILOILO CITY, PH</sub>
</p>
