---
excalidraw-plugin: parsed
tags: [excalidraw, architecture, runtown]
---

# 🎨 RUN TOWN Full System Architecture Diagram

> **Diagram Note:** This file is rendered interactively by the Obsidian Excalidraw plugin, and displays a clean text and Mermaid fallback in standard Markdown viewers.

---

## 🏛️ System Component Flow (Text Fallback)

1. **Client Browser Layer:**
   - Sticky Mobile Telemetry HUD
   - GSAP 3 CyberMotion Physics
   - Leaflet Radar 2D Map Engine
2. **Precomputed Spatial Layer:**
   - ivemSpots.json (90 KB spot markers)
   - jobGpsRoadRoutes.json (400 KB road network graph)
3. **Astro 5 Content Engine:**
   - 26 Validated Markdown Guides
   - Zod Type Safety
   - OkLCH Tailwind Design System
4. **Edge CDN Distribution:**
   - 29 Static Pre-rendered HTML Pages on Vercel / Cloudflare Pages

`mermaid
graph LR
    A[Client UI & HUD] -->|Spatial Queries| B[Leaflet Radar 2D]
    B -->|Precomputed Graphs| C[src/data/jobGpsRoadRoutes.json]
    D[Astro Content Engine] -->|Static Compilation| E[dist/ Static Pages]
    E -->|Edge CDN| A
`

---

%%
# Drawing
`json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [
    {
      "id": "elem_box_client",
      "type": "rectangle",
      "x": 100,
      "y": 100,
      "width": 260,
      "height": 140,
      "angle": 0,
      "strokeColor": "#099268",
      "backgroundColor": "#e6fcf5",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 10423,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "elem_text_client",
      "type": "text",
      "x": 120,
      "y": 130,
      "width": 220,
      "height": 80,
      "angle": 0,
      "strokeColor": "#087f5b",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 23412,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "Client Layer (Browser)\n- Sticky HUD Telemetry\n- GSAP 3 Physics\n- Leaflet Radar 2D",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 14
    },
    {
      "id": "elem_box_engine",
      "type": "rectangle",
      "x": 450,
      "y": 100,
      "width": 260,
      "height": 140,
      "angle": 0,
      "strokeColor": "#1971c2",
      "backgroundColor": "#e7f5ff",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": {
        "type": 3
      },
      "seed": 45612,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false
    },
    {
      "id": "elem_text_engine",
      "type": "text",
      "x": 470,
      "y": 130,
      "width": 220,
      "height": 80,
      "angle": 0,
      "strokeColor": "#1864ab",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 78921,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "text": "Astro 5 SSG Engine\n- 26 Guides Markdown\n- Zod Type Schema\n- OkLCH Tailwind CSS",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "left",
      "verticalAlign": "top",
      "baseline": 14
    },
    {
      "id": "elem_arrow_1",
      "type": "arrow",
      "x": 360,
      "y": 170,
      "width": 90,
      "height": 0,
      "angle": 0,
      "strokeColor": "#495057",
      "backgroundColor": "transparent",
      "fillStyle": "solid",
      "strokeWidth": 2,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "frameId": null,
      "roundness": null,
      "seed": 12398,
      "version": 1,
      "versionNonce": 1,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          90,
          0
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": null,
      "endBinding": null,
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ],
  "appState": {
    "gridSize": null,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
`
%%
