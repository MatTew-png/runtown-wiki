---
project: RUNTOWN
category: script
status: verified
priority: medium
last_audit: 2026-11-07
tags:
  - scripts
  - assets
  - python
  - image-processing
---

# 📜 SCRIPT-03: Icon Transparency & Card Showcase Pipeline

This document documents the Python imaging pipeline used to convert raw GTA V item icons into transparent, high-DPI assets formatted for the modern web.

---

## 1. 512x512 Transparent Icon Processor (`scripts/generate_transparent_512.py`)

- **Primary Goal:** Reads raw icons, detects solid background colors via chroma keying / alpha masking, crops padding, and rescales cleanly to 512x512 PNG with crisp specular borders.
- **Runtime:** Python 3.10+ (Pillow)
- **Execution Command:**
  ````bash
  python scripts/generate_transparent_512.py
  ````

---

## 2. Showcase Card Generator (`scripts/generate_showcase_cards.py`)

- **Primary Goal:** Generates composite cards featuring weapon stats, required crafting ingredients, and item tiers for social media and landing page showcases.
- **Execution Command:**
  ````bash
  python scripts/generate_showcase_cards.py
  ````
