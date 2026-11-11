---
project: RUNTOWN
category: script
status: verified
priority: high
last_audit: 2026-11-07
tags:
  - scripts
  - gps
  - logistics
  - route-math
---

# 📜 SCRIPT-01: Route Calculators & GPS Road Math

This document catalogs the verified route calculation and waypoint generation tools used to build the spatial telemetry for the RUN TOWN Radar Map.

---

## 1. Road Route Graph Generator (`scripts/generate_road_routes.cjs`)

- **Primary Goal:** Reads raw road network nodes, resolves optimal waypoints between farming plots, slaughterhouses, and pier markets, and writes the precomputed graph directly to `src/data/jobGpsRoadRoutes.json`.
- **Runtime:** Node.js CommonJS
- **Execution Command:**
  ````bash
  node scripts/generate_road_routes.cjs
  ````

### Architectural Highlights
````javascript
// scripts/generate_road_routes.cjs excerpt
const fs = require('fs');
const path = require('path');

// Loads spot coordinates and calculates shortest euclidean path across road nodes
function computeEuclideanDistance(coordA, coordB) {
  const dx = coordA[0] - coordB[0];
  const dy = coordA[1] - coordB[1];
  return Math.sqrt(dx * dx + dy * dy);
}
````

---

## 2. Interactive Route Calculator (`scripts/calc-routes.cjs`)

- **Primary Goal:** Computes live point-to-point distances between specific FiveM job spots with road curvature penalty factors (1.25x - 1.40x).
- **Execution Command:**
  ````bash
  node scripts/calc-routes.cjs
  ````

---

## 3. Map Marker Debugger (`scripts/debug_map.cjs`)

- **Primary Goal:** Verifies click event dispatching and leaflet layer registration for newly added spots.
- **Execution Command:**
  ````bash
  node scripts/debug_map.cjs
  ````
