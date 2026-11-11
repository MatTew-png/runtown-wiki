---
project: RUNTOWN
category: architecture
status: in-progress
priority: high
last_audit: 2026-11-07
kanban-plugin: basic
tags:
  - kanban
  - project-management
  - sprint
---

# 📋 RUN TOWN Engineering Kanban Board

## 📋 Backlog
- [ ] Exportable CSV / JSON loadout calculator for 150 kg truck runs
- [ ] Service Worker caching for offline map tile navigation
- [ ] Automated PR generator for community spot updates in `fivemSpots.json`
- [ ] Deploy zero-latency edge caching via Cloudflare Pages / Vercel Edge

## 🏗️ In Progress
- [ ] Code-split Leaflet map dependencies from initial document bundle
- [ ] Implement WebP / AVIF compression for high-res item icons in `public/items/`
- [ ] Streamline `jobGpsRoadRoutes.json` payload via quantized coordinate deltas

## 🧪 Testing
- [ ] Dual-timer audio alerts for Pig farm feeding cycles (5 min / 15 min)
- [ ] Route Comparison widget inside `FEAT_01` and `FEAT_02` guides
- [ ] GitHub Actions workflow for automatic vault linting

## ✅ Completed
**Complete**
- [x] Consolidate scattered root markdown documents into structured vault folders
- [x] Standardize YAML frontmatter across all notes with Single Source of Truth (SSOT)
- [x] Establish `.agent/` rules, schema definitions, and MCP connection templates
- [x] Scaffold Templater standard templates for Features, Scripts, and ADRs
- [x] Generate visual Canvas dashboards and Excalidraw architecture maps
- [x] Setup automated 1-click sync scripts (`sync_vault.ps1`, `sync_vault.py`)

%% kanban:settings
```json
{
  "kanban-plugin": "basic",
  "tag-sort": []
}
```
%%
