# Penston Studio — Claude Notes

## Project Overview

Static HTML/CSS website for [penston.studio](https://penston.studio), the personal site and portfolio of George Penston. No build tools, frameworks, or package managers — just plain HTML and CSS.

## Structure

```
/
├── index.html          # Studio homepage (portfolio/about)
├── markedly/
│   └── index.html      # Markedly app landing page
├── assets/
│   ├── style.css       # Shared styles for all pages
│   └── ...             # Favicons, app icons, images
├── robots.txt
└── sitemap.xml
```

## Style & Design Tokens

Defined in `assets/style.css`. Key tokens:
- **Accent**: `#eb5a00` (orange)
- **Fonts**: Space Grotesk (headings), Inter (body)
- **Background**: `#fcfcfc` (primary), `#f7f6f3` (secondary)
- Icons use [Remixicon](https://remixicon.com/) via CDN (markedly page only)

## Content Guidelines

- Copy should be concise and confident — not marketing-fluffy
- Use curly/smart quotes (`'` `"`) not straight quotes
- Tone: professional but personal, maker-focused

## Deployment

Hosted at `penston.studio`. No CI/CD — changes go live when pushed to `main`.

## Git Workflow

- Feature branches: `claude/<description>-<sessionId>`
- Push to branch, then merge to `main` to deploy
