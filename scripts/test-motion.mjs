/**
 * Checks the page-entrance / scroll-reveal system shared by penston.studio
 * and gpenston.com, in Chromium and WebKit. See docs/design-system.md §6.
 *
 *   node scripts/test-motion.mjs                    # both live sites
 *   node scripts/test-motion.mjs studio             # one site
 *   node scripts/test-motion.mjs studio --studio-url http://localhost:3456
 *   node scripts/test-motion.mjs portfolio --portfolio-url http://localhost:3100
 *
 * Exits non-zero if any check fails. Run it after any change to reveal.js,
 * the "Page entrance + scroll-reveal" CSS block, or the view transitions,
 * against local servers first, then against production after deploy.
 *
 * Checks, per site and engine (390×844 viewport):
 *   first visit     in-view [data-reveal] opaque, below-the-fold pending
 *   scroll          every [data-reveal] gets data-revealed and ends opaque
 *   second page     same as first visit on a deeper page
 *   runtime blocked reveal.js aborted: hidden at 0.5s, `js` dropped and
 *                   everything visible by 3.5s (the <head> failsafe)
 *   reduced motion  fade-only keyframes (reveal-fade / page-enter-fade)
 *   client nav      portfolio only: same document, .page-enter replays,
 *                   new reveals fire
 *   switcher VT     studio, WebKit only: navigation animates just the
 *                   product-switcher group; the mode wipe stays one layer
 * Plus: reveal.js is byte-identical on both sites (and in both local
 * repos, when the portfolio checkout is next to this one).
 *
 * Known blind spot: Playwright's Chromium reports no view transitions at
 * all (cross-document or same-document, headless or headed, production
 * included), so the switcher check only runs in WebKit. Check real Chrome
 * by hand.
 *
 * Playwright is borrowed from the sibling portfolio checkout, same as
 * generate-og-cards.mjs, because this repo must not have a package.json.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const portfolioRepo = join(root, "..", "gpenston-portfolio");
const modules = process.env.PLAYWRIGHT_FROM ?? join(portfolioRepo, "node_modules");

if (!existsSync(join(modules, "playwright"))) {
  console.error(
    `Playwright not found in ${modules}.\n` +
      `Set PLAYWRIGHT_FROM to a node_modules directory that has it.`
  );
  process.exit(1);
}
const pw = createRequire(join(modules, "noop.js"))("playwright");

// ----- Arguments -------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const which = ["studio", "portfolio"].includes(args[0]) ? args[0] : "both";

const SITES = {
  studio: {
    name: "penston.studio",
    base: (flag("--studio-url") ?? "https://penston.studio").replace(/\/$/, ""),
    home: "/markedly/",
    deep: "/pour-over/",
    runtime: "/assets/reveal.js",
    local: join(root, "assets", "reveal.js"),
  },
  portfolio: {
    name: "gpenston.com",
    base: (flag("--portfolio-url") ?? "https://gpenston.com").replace(/\/$/, ""),
    home: "/",
    deep: "/work",
    runtime: "/reveal.js",
    local: join(portfolioRepo, "public", "reveal.js"),
  },
};

// ----- Reporting -------------------------------------------------------
let failures = 0;
function check(label, ok, detail) {
  if (!ok) failures++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const VIEWPORT = { width: 390, height: 844 };

// Runs in the page: counts in-view and below-the-fold reveal state.
function revealState() {
  const els = [...document.querySelectorAll("[data-reveal]")];
  const vh = innerHeight;
  const opaque = (e) => getComputedStyle(e).opacity === "1";
  const inView = els.filter((e) => {
    const r = e.getBoundingClientRect();
    return r.top < vh - 64 && r.bottom > 64;
  });
  const below = els.filter((e) => e.getBoundingClientRect().top > vh);
  const cls = document.documentElement.classList;
  return {
    js: cls.contains("js"),
    live: cls.contains("reveal-live"),
    inView: inView.length,
    inViewOpaque: inView.filter(opaque).length,
    below: below.length,
    belowPending: below.filter((e) => getComputedStyle(e).opacity === "0").length,
  };
}

function checkFirstView(label, s) {
  check(`${label}: runtime live`, s.js && s.live);
  check(`${label}: in-view content visible`, s.inView > 0 && s.inViewOpaque === s.inView, `${s.inViewOpaque}/${s.inView}`);
  check(`${label}: below-the-fold waits for scroll`, s.belowPending === s.below, `${s.belowPending}/${s.below} pending`);
}

// ----- Per-site checks -------------------------------------------------
async function testSite(key, engine) {
  const site = SITES[key];
  const browser = await pw[engine].launch();
  const url = (path) => site.base + path;
  console.log(`\n${site.name} — ${engine}`);

  try {
    // First visit, scroll, second page
    let ctx = await browser.newContext({ viewport: VIEWPORT });
    let page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(url(site.home));
    await sleep(1500);
    checkFirstView("first visit", await page.evaluate(revealState));

    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await sleep(1200);
    const scrolled = await page.evaluate(() => {
      const els = [...document.querySelectorAll("[data-reveal]")];
      return {
        total: els.length,
        revealed: els.filter((e) => e.hasAttribute("data-revealed")).length,
        opaque: els.filter((e) => getComputedStyle(e).opacity === "1").length,
      };
    });
    check("scroll: everything reveals", scrolled.revealed === scrolled.total && scrolled.opaque === scrolled.total,
      `${scrolled.revealed}/${scrolled.total} revealed, ${scrolled.opaque} opaque`);

    await page.goto(url(site.deep));
    await sleep(1500);
    checkFirstView("second page", await page.evaluate(revealState));
    check("no page errors", errors.length === 0, errors.join("; "));
    await ctx.close();

    // Runtime blocked: the <head> failsafe must show everything
    ctx = await browser.newContext({ viewport: VIEWPORT });
    page = await ctx.newPage();
    await page.route(`**${site.runtime}*`, (r) => r.abort());
    await page.goto(url(site.home));
    await sleep(500);
    const early = await page.evaluate(revealState);
    await sleep(3000);
    const late = await page.evaluate(revealState);
    check("runtime blocked: hidden while waiting", early.js && early.inViewOpaque === 0, `${early.inViewOpaque}/${early.inView} visible at 0.5s`);
    check("runtime blocked: failsafe shows all by 3.5s", !late.js && late.inViewOpaque === late.inView, `${late.inViewOpaque}/${late.inView} visible`);
    await ctx.close();

    // Reduced motion: fades, no movement
    ctx = await browser.newContext({ viewport: VIEWPORT, reducedMotion: "reduce" });
    page = await ctx.newPage();
    await page.goto(url(site.home));
    await sleep(1500);
    const reduced = await page.evaluate(() => {
      const els = [...document.querySelectorAll("[data-reveal][data-revealed]")];
      const entrance = document.querySelector(".page-enter") || document.querySelector("main");
      return {
        revealed: els.length,
        opaque: els.filter((e) => getComputedStyle(e).opacity === "1").length,
        reveal: els[0] ? getComputedStyle(els[0]).animationName : "none",
        entrance: getComputedStyle(entrance).animationName,
      };
    });
    check("reduced motion: fade-only keyframes", reduced.reveal === "reveal-fade" && reduced.entrance === "page-enter-fade",
      `${reduced.reveal}, ${reduced.entrance}`);
    check("reduced motion: content visible", reduced.revealed > 0 && reduced.opaque === reduced.revealed, `${reduced.opaque}/${reduced.revealed}`);
    await ctx.close();

    // Portfolio: client-side navigation
    if (key === "portfolio") {
      ctx = await browser.newContext({ viewport: { width: 1100, height: 800 } });
      page = await ctx.newPage();
      await page.goto(url("/"));
      await sleep(1500);
      await page.evaluate(() => { window.__sameDocument = true; });
      await page.click('.nav-primary a[href="/about"]');
      await page.waitForURL("**/about");
      const nav = await page.evaluate(() => ({
        same: window.__sameDocument === true,
        entrance: (document.querySelector(".page-enter")?.getAnimations() ?? []).map((a) => a.animationName).join(","),
      }));
      await sleep(1500);
      const after = await page.evaluate(revealState);
      check("client nav: stays in the same document", nav.same);
      check("client nav: entrance replays", nav.entrance.includes("page-enter"), nav.entrance || "no animation");
      check("client nav: new reveals fire", after.inView > 0 && after.inViewOpaque === after.inView, `${after.inViewOpaque}/${after.inView}`);
      await ctx.close();
    }

    // Studio: switcher-only view transition (WebKit only — see header)
    if (key === "studio") {
      if (engine !== "webkit") {
        console.log("  SKIP  switcher view transition (Playwright's Chromium can't see view transitions)");
      } else {
        ctx = await browser.newContext({ viewport: { width: 1000, height: 700 } });
        page = await ctx.newPage();
        page.setDefaultTimeout(8000);
        await page.addInitScript(() => {
          addEventListener("pagereveal", (e) => {
            window.__vt = !!e.viewTransition;
            e.viewTransition?.ready.then(() => {
              window.__groups = document.documentElement.getAnimations({ subtree: true })
                .map((a) => a.effect?.pseudoElement).filter(Boolean);
            });
          });
        });
        await page.goto(url("/markedly/"));
        await sleep(800);
        await page.click(".product-switcher a", { noWaitAfter: true });
        await page.waitForURL("**/pour-over/**", { waitUntil: "commit" });
        await sleep(400);
        const vt = await page.evaluate(() => ({ ran: window.__vt, groups: [...new Set(window.__groups || [])] }));
        const named = vt.groups.filter((g) => !g.includes("(root)"));
        check("switcher VT: navigation runs a view transition", vt.ran === true);
        check("switcher VT: only the switcher animates",
          named.length > 0 && named.every((g) => g.includes("(product-switcher)")), named.join(", ") || "none");
        await sleep(600);
        // Don't await requestAnimationFrame here: it can hang mid-transition.
        const wipe = await page.evaluate(async () => {
          document.querySelector("[data-mode-toggle]").click();
          await new Promise((r) => setTimeout(r, 120));
          return [...new Set(document.documentElement.getAnimations({ subtree: true })
            .map((a) => a.effect?.pseudoElement).filter(Boolean))];
        });
        check("mode wipe: stays one layer", wipe.length > 0 && wipe.every((g) => g.includes("(root)")), wipe.join(", ") || "none");
        await ctx.close();
      }
    }
  } catch (e) {
    check("run completed", false, e.message.split("\n")[0]);
  } finally {
    await browser.close();
  }
}

// ----- reveal.js must be identical across both sites -------------------
async function checkRuntimeParity() {
  console.log("\nreveal.js parity");
  const sha = (buf) => createHash("sha1").update(buf).digest("hex").slice(0, 12);
  const keys = which === "both" ? ["studio", "portfolio"] : [which];
  const hashes = {};
  for (const key of keys) {
    const site = SITES[key];
    try {
      const res = await fetch(site.base + site.runtime);
      hashes[`${site.name} (served)`] = sha(Buffer.from(await res.arrayBuffer()));
    } catch (e) {
      check(`fetch ${site.name}${site.runtime}`, false, e.message);
    }
  }
  for (const key of ["studio", "portfolio"]) {
    if (existsSync(SITES[key].local)) hashes[`${key} repo`] = sha(readFileSync(SITES[key].local));
  }
  const unique = new Set(Object.values(hashes));
  check("reveal.js byte-identical everywhere", unique.size === 1,
    Object.entries(hashes).map(([k, v]) => `${k} ${v}`).join(", "));
}

for (const key of which === "both" ? ["studio", "portfolio"] : [which]) {
  for (const engine of ["chromium", "webkit"]) await testSite(key, engine);
}
await checkRuntimeParity();

console.log(failures ? `\n${failures} check(s) failed.` : "\nAll checks passed.");
process.exit(failures ? 1 : 0);
