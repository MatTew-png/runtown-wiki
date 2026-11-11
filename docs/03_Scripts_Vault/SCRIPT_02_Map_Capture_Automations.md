---
project: RUNTOWN
category: script
status: verified
priority: medium
last_audit: 2026-11-07
tags:
  - scripts
  - automation
  - map-capture
  - puppeteer
---

# 📜 SCRIPT-02: Map Capture & Headless Telemetry

This document details the headless browser scripts used to capture pixel-perfect map previews, verify spot markers, and ensure UI alignment without manual browser interaction.

---

## 1. Spot ID Verifier (`scripts/verify_spot_ids.cjs`)

- **Primary Goal:** Validates that every spot listed in `fivemSpots.json` has a unique ID, valid coordinates, and does not produce duplicate markers on the Leaflet canvas.
- **Execution Command:**
  ````bash
  node scripts/verify_spot_ids.cjs
  ````

---

## 2. Job Map Flow Snapshot Automator (`scripts/capture_pork_flow_maps.cjs`)

- **Primary Goal:** Launches headless Chromium via Puppeteer, navigates to `/map`, focuses on the Pork Farming route (Farm ➔ Slaughterhouse ➔ Packing ➔ Pier), and captures high-res PNG previews for documentation.
- **Execution Command:**
  ````bash
  node scripts/capture_pork_flow_maps.cjs
  ````

---

## 3. Master Map Capturer (`scripts/capture_all_job_maps.cjs`)

- **Primary Goal:** Batch-captures all 26 job routes across Los Santos, generating preview thumbnails for the Bento Grid and guide pages.
- **Execution Command:**
  ````bash
  node scripts/capture_all_job_maps.cjs
  ````
