---
project: RUNTOWN
category: index
status: completed
priority: high
last_audit: 2026-11-11
tags:
  - audit
  - codebase
  - telemetry
  - empirical
---

# 🔍 Codebase & DataModel Status Audit

This audit document provides the verified ground truth of the **runthukverb-wiki** codebase as of November 2026.

---

## 💻 Tech Stack Inventory

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Meta-Framework** | Astro SSG | `^5.18.2` | Static Site Generation & Content Collections |
| **Styling** | Tailwind CSS | `^3.4.19` | Utility-first CSS & theme tokens (`tailwind.config.mjs`) |
| **Motion Physics** | GSAP | `^3.15.0` | Animations with `gsap.context()` & `prefers-reduced-motion` |
| **Interactive Map** | Leaflet | `^1.9.4` | GTA V Los Santos coordinate tile rasterization |
| **Type Safety & QA** | TypeScript / Zod / Node Test | `^5.9.3` / `node:test` | `@astrojs/check` (`astro check`) & `tests/integrity.test.mjs` |

---

## 📈 Empirical Route & Build Metrics

- **Total Static HTML Pages:** 29 pages
- **Content Collection Items:** 26 guides across 7 categories (`white_jobs`, `black_jobs`, `vehicles`, `crafting`, `survival`, `food`, `gang`)
- **Build Duration:** ~55.20s (Full SSG + Vite client bundle via `npm run build`)
- **Client Bundles:** 45 modules transformed, largest chunk `map.astro` (`405.78 kB`, `98.93 kB` gzip)
- **SSOT & Data Assets:**
  - `src/data/economy.ts`: Verified Trading Buffer (`30 - 10 = 20 kg`), vitals rates, vehicle tiers, and 8 White Jobs
  - `src/data/mapSpots.ts`: 47 canonical map spots + 54 backward-compatible aliases (`SPOT_ALIASES`)
  - `src/data/fivemSpots.json`: 90.8 KB (Raw spot export reference)
  - `src/data/jobGpsRoadRoutes.json`: 400.3 KB (Pre-computed A* waypoint road graphs)

---

## 📊 Content Inventory Breakdown

| Content Category | File Count | Representative Guides |
| :--- | :---: | :--- |
| **Jobs (White & Black)** | 14 | `flowers.md`, `pig.md`, `wheat.md`, `mining.md`, `smelting.md`, `cement.md`, `weed-grow.md` |
| **Logistics & Vehicles** | 5 | `vehicles.md`, `sport-tuning.md`, `vehicle-60kg.md`, `vehicle-120kg.md`, `vehicle-150kg.md` |
| **Crafting & Armory** | 2 | `materials.md`, `weapons.md` |
| **Gang & Underground** | 3 | `headquarter.md`, `radio.md`, `store-robbery.md` |
| **Survival & Food** | 2 | `vitals.md`, `nutrition.md` |

---

## 🛡️ Health & Integrity Status
- **Type Checking:** `npm run check` (`astro check`) passing with `0 errors`, `0 warnings` across 74 files.
- **Automated Regression Tests:** `npm test` (`tests/integrity.test.mjs`) verifying SSOT math, 47 canonical map spots + broken `?spot=`/`spotId` links, public image/icon existence, `prefers-reduced-motion` + token validity in `dist/`, Cloudflare deployment artifacts (`wrangler.jsonc`, `dist/_headers`, `dist/404.html`), and traversal protection.
- **Edge Hosting:** **Cloudflare Workers Static Assets** via `wrangler.jsonc` (`./dist`) & `public/_headers` (replaced Vercel/Surge configs).
- **Dead Link Rate:** 0% (All internal `/guides/...` and `/map?spot=...` links resolved cleanly).
- **Memory Footprint:** Clean static output in `dist/`.
