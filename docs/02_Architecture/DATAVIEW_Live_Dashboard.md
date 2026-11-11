---
project: RUNTOWN
category: architecture
status: completed
priority: high
last_audit: 2026-11-07
tags:
  - dataview
  - dashboard
  - telemetry
  - live-queries
---

# 📊 Dataview Live Engineering Dashboard

This dashboard aggregates active specifications, architecture ADRs, verified scripts, and live tasks across the entire vault.

---

## 🏛️ Architecture & System Specifications

```dataview
TABLE WITHOUT ID
  file.link AS "Architecture Note",
  status AS "Status",
  priority AS "Priority",
  last_audit AS "Last Audited"
FROM "02_Architecture"
WHERE category = "architecture"
SORT priority DESC
```

---

## 🚀 Active Feature Deep-Dives

```dataview
TABLE WITHOUT ID
  file.link AS "Feature Document",
  feature_id AS "ID",
  priority AS "Priority",
  status AS "Status"
FROM "01_Features"
SORT feature_id ASC
```

---

## 📜 Verified Automation Scripts

```dataview
TABLE WITHOUT ID
  file.link AS "Script Vault Note",
  status AS "Status",
  last_audit AS "Audit Date"
FROM "03_Scripts_Vault"
SORT file.name ASC
```

---

## ⏳ Active Incomplete Tasks Across Vault

```dataview
TASK
WHERE !completed
```
