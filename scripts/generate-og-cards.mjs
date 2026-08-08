/**
 * Renders the site's 1200×630 Open Graph cards to assets/og-*.png.
 *
 * Every page used to point og:image at a 200×200 favicon with
 * twitter:card=summary, so sharing a penston.studio link produced a tiny icon
 * or nothing at all — while gpenston.com, which generates a real card, previewed
 * properly. This closes that gap.
 *
 * The site itself has no build step and this deliberately doesn't add one: the
 * PNGs are committed, and this script only needs re-running when a card's
 * wording changes or a new page is added.
 *
 * Playwright is borrowed rather than depended on. This repo has no
 * package.json on purpose — adding one would make Vercel stop treating the
 * site as plain static files and start looking for a build — so the script
 * resolves Playwright out of a sibling checkout that already has it (the
 * portfolio uses it for its resume PDF). Override if yours lives elsewhere:
 *
 *   node scripts/generate-og-cards.mjs
 *   PLAYWRIGHT_FROM=/path/to/node_modules node scripts/generate-og-cards.mjs
 */
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const template = pathToFileURL(join(here, "og-card.html")).href;

const modules =
  process.env.PLAYWRIGHT_FROM ??
  join(root, "..", "gpenston-portfolio", "node_modules");

if (!existsSync(join(modules, "playwright"))) {
  console.error(
    `Playwright not found in ${modules}.\n` +
      `Set PLAYWRIGHT_FROM to a node_modules directory that has it.`
  );
  process.exit(1);
}

const { chromium } = createRequire(join(modules, "noop.js"))("playwright");

const CARDS = [
  {
    out: "og-studio.png",
    chapter: "00",
    kicker: "Bureau · Chapter 03",
    title: "Penston Studio",
    sub: "A one-person practice in product design and development. The side projects live here.",
    foot: "George Penston",
  },
  {
    out: "og-markedly.png",
    chapter: "01",
    kicker: "Catalogue · macOS",
    title: "Markedly",
    sub: "Convert documents and images to Markdown — locally, instantly, for free.",
    foot: "Penston Studio",
    icon: "../assets/markedly-icon.png",
  },
  {
    out: "og-pour-over.png",
    chapter: "02",
    kicker: "Catalogue · GitHub Action",
    title: "Pour Over",
    sub: "Your Raindrop read-later list, delivered to your inbox as a daily digest.",
    foot: "Penston Studio",
    icon: "../assets/pour-over-icon.png",
  },
  {
    out: "og-notes.png",
    chapter: "03",
    kicker: "Notes",
    title: "Notes",
    sub: "Working notes on building and hosting small sites.",
    foot: "Penston Studio",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});

for (const { out, ...params } of CARDS) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v)
  );
  await page.goto(`${template}?${query}`);
  // Web fonts load over the network; without this the card renders in the
  // fallback face, which is the whole point of the design missing.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(root, "assets", out) });
  console.log(`  ${out}`);
}

await browser.close();
console.log(`Wrote ${CARDS.length} cards to assets/`);
