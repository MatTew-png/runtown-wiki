---
project: RUNTOWN
category: agent-governance
status: completed
priority: high
last_audit: 2026-11-11
tags:
  - agent-skill
  - economy
  - runtown
  - formulas
---

# 🧠 Agent Skill: RUN TOWN Economy & Logistics Intelligence

This skill equips agents with verified Single-Source-of-Truth (`src/data/economy.ts`) formulas and logistics limits in **RUN TOWN FiveM**.

---

## 🏎️ Vehicle Weight Capacities & Trading Buffer Rule
- **Player Max Backpack:** `30 kg` (Reserve **`10 kg` Trading Buffer** ➔ Safe carry **`20 kg`**)
- **City Car / Compact (60 kg):** Safe total `60 + 20 = 80 kg` (`160 pcs` @ 0.5 kg)
- **Sedan / SUV (120 kg):** Safe total `120 + 20 = 140 kg` (`280 pcs` @ 0.5 kg)
- **Pickup / Heavy Hauler (150 kg):** Safe total `150 + 20 = 170 kg` (`340 pcs` @ 0.5 kg)

## 🌾 Verified 8 White Jobs (`src/data/economy.ts`)
- **Woodcutting:** Harvest 10s (0.5 kg, 99 RD) ➔ Process 5s (171 RD) ➔ Pack 2:1 / 5s (1.0 kg, Eco `479 RD` | P2P `500–600 RD`).
- **Pork:** Grow 15 min / 60 pcs (0.5 kg, Raw 97 RD / P2P 130–150 RD) ➔ Process 5s (149 RD) ➔ Pack 2:1 / 5s (`380 RD`).
- **Wheat:** Harvest 10s (77 RD / P2P 100 RD) ➔ Process 5s (134 RD) ➔ Pack 2:1 / 5s (`368 RD`).
- **Flowers:** Fastest harvest `8s/pc` (0.5 kg, Eco 88 RD / Hospital P2P `120 RD`) ➔ Process 5s (155 RD) ➔ Pack 2:1 / 5s (`424 RD`).
- **Smelting (Steel):** Scavenge `10s / 2 pcs` (0.25 kg/pc, 83 RD) ➔ Smelt 2:1 / 5s (0.5 kg, Eco `233 RD` | Mechanic P2P `233–240 RD`).
- **Mining:** Harvest 10s (0.5 kg) ➔ Process 5s (Copper `60%`, Gold `40%`, Diamond `1%`) ➔ Smelt (`400 RD` Copper / `600 RD` Gold / `10,000 RD` Diamond).
- **Crystal:** `Panning Tray` in shallow water (max `2` poles; do not leave blip zone) ➔ `5 Raw Crystal + 3 Copper Ingot ➔ 1 Crystal Ingot` (weapon upgrades).
- **Run Kitchen & RunMan:** Doner Split `2,500 RD` (3 min roast = 4 portions) + `Rice Grain x2` ➔ Kebab/Pita (`0.30 kg`, `-50%` hunger, `-10` stress) ➔ RunMan order `2–4 pcs` @ `1,500 RD/pc` (`3,000–6,000 RD`).

## 🧠 Brain Fatigue & Hunger Mechanics
- **Brain Fatigue Rate:** `+0.25%` per processed item + `+0.42% / min` passive (`~240 min` AFK to 100%).
- **Brain Limit:** Faints/dies **immediately at `100%`** with **no in-game warning** at 70–80% (50% yellow / 80% red are guide HUD thresholds). Reset to `0%` at บาร์เขียว (Del Perro), อู่ช่าง (Chumash), or with reset items.
- **Hunger Decay:** `-0.7246% / min` (~`-0.72%/min`). Turns red at `≤ 20%` (`~27 min` left); reaches `0%` in `~138 min` (`-1 HP/sec`).
