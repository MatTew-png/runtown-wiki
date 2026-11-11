---
project: RUNTOWN
category: index
status: completed
priority: critical
last_audit: 2026-11-07
tags:
  - matrix
  - dataview
  - features
  - tracking
---

# 🚀 Dynamic Feature Matrix

This matrix tracks all primary feature specifications and career economics inside the vault.

> [!NOTE]
> When opened inside Obsidian with the **Dataview** plugin enabled, the query below automatically refreshes in real-time as notes are added or updated.

---

## ⚡ Live Dataview Query

```dataview
TABLE WITHOUT ID
  file.link AS "Feature Document",
  feature_id AS "ID",
  category AS "Category",
  status AS "Status",
  priority AS "Priority",
  last_audit AS "Last Audited"
FROM "01_Features"
WHERE feature_id
SORT feature_id ASC
```

---

## 📋 Static Snapshot Matrix (Markdown Fallback)

| Feature Document | ID | Domain | Status | Priority | Core Deliverable |
| :--- | :---: | :---: | :---: | :---: | :--- |
| [[FEAT_01_Pork_Farming\|🐷 FEAT_01: Pork Farming Master Guide]] | `FEAT-01` | Farming | Completed | Critical | 15-min cycle, 5 models, Rice Stash trick, 3 brain reset loops |
| [[FEAT_02_Flower_Farming\|🌸 FEAT_02: Flower Farming Master Guide]] | `FEAT-02` | Farming | Completed | High | 5 routes, $100 vs $387 Spa export, 120k buff break-even |
| [[FEAT_03_Cross_Career_Benchmark\|📊 FEAT_03: Cross-Career Comparative Benchmark]] | `FEAT-03` | Benchmark | Completed | High | 150 kg truck comparison, 7.4-hr shift, 72-hr marathon tier list |
| [[FEAT_04_Farming_Economy_Analysis\|📈 FEAT_04: Farming Economy & Logistics Analysis]] | `FEAT-04` | Economy | Completed | High | Iron vs Pork 48-hr marathon, shared stash, fuel & truck speeds |
