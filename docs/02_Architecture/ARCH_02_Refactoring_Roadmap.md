---
project: RUNTOWN
category: architecture
status: in-progress
priority: critical
last_audit: 2026-11-07
tags:
  - roadmap
  - tasks
  - refactoring
  - planning
---

# 🗺️ ARCH-02: 4-Phase System Refactoring Roadmap

This document outlines the strategic refactoring and modernization roadmap for RUN TOWN Wiki, using **Obsidian Tasks** syntax.

---

## 📌 Phase 1: Vault Restructuring & Governance (Completed)
- [x] Consolidate scattered root markdown documents into structured vault folders ➕ 2026-11-07 ✅ 2026-11-07 #task #phase1 #priority/critical
- [x] Standardize YAML frontmatter across all notes with Single Source of Truth (SSOT) ➕ 2026-11-07 ✅ 2026-11-07 #task #phase1 #priority/critical
- [x] Establish `.agent/` rules, schema definitions, and MCP connection templates ➕ 2026-11-07 ✅ 2026-11-07 #task #phase1 #priority/high
- [x] Scaffold Templater standard templates for Features, Scripts, and ADRs ➕ 2026-11-07 ✅ 2026-11-07 #task #phase1 #priority/high
- [x] Generate visual Canvas dashboards and Excalidraw architecture maps ➕ 2026-11-07 ✅ 2026-11-07 #task #phase1 #priority/high

---

## 🚀 Phase 2: Performance & Bundle Optimization (Active)
- [x] Consolidate spot coordinates & extra metadata into `src/data/mapSpots.ts` and decompose `map.astro` ➕ 2026-11-11 ✅ 2026-11-11 #task #phase2 #priority/high
- [x] Implement WebP conversion for Hero (`hero-city.webp`) and lossless PNG compression for `public/maps/spots/` ➕ 2026-11-11 ✅ 2026-11-11 #task #phase2 #priority/medium
- [ ] Streamline `jobGpsRoadRoutes.json` payload via quantized coordinate deltas ⏳ 2026-11-22 #task #phase2 #priority/medium
- [ ] Implement Service Worker caching for offline map tile navigation ⏳ 2026-11-25 #task #phase2 #priority/low

---

## 🧭 Phase 3: Interactive Spatial & Calculation Features
- [ ] Integrate dual-timer audio alerts for Pig farm feeding cycles (5 min / 15 min) ⏳ 2026-12-01 ⏫ #task #phase3 #priority/high
- [ ] Build interactive Route Comparison widget directly inside `FEAT_01` and `FEAT_02` guides ⏳ 2026-12-05 #task #phase3 #priority/medium
- [ ] Exportable CSV / JSON loadout calculator for 150 kg truck runs ⏳ 2026-12-10 #task #phase3 #priority/low

---

## 🤖 Phase 4: Autonomous CI/CD & Agentic Sync
- [ ] Configure GitHub Actions workflow for automatic vault linting and frontmatter schema validation ⏳ 2026-12-15 #task #phase4 #priority/medium
- [ ] Setup automated PR generator for community spot updates in `fivemSpots.json` ⏳ 2026-12-20 #task #phase4 #priority/low
- [x] Configure Cloudflare Workers Static Assets deployment (`wrangler.jsonc`, `public/_headers`, `src/pages/404.astro`) ➕ 2026-11-11 ✅ 2026-11-11 #task #phase4 #priority/medium
