---
project: RUNTOWN
category: inbox-draft
status: completed
priority: high
last_audit: 2026-11-07
tags:
  - inbox
  - staging
  - review-protocol
---

# 📥 Vault Intake & AI Draft Staging Area

Welcome to the `10_Inbox/` staging folder. This directory acts as the **quarantine and staging gateway** for human review of AI-generated drafts, experimental proposals, and raw research dumps.

---

## 🚦 Human & AI Review Protocol

1. **AI Generation Protocol:**
   - When an AI agent generates a new comprehensive feature guide, architecture proposal, or untested data analysis, it **must** save the draft inside `10_Inbox/` using the prefix `DRAFT_*.md`.
   - Never write unvetted documents directly into `01_Features/` or `02_Architecture/`.

2. **Human Review & Promotion:**
   - Human curators review the draft in Obsidian.
   - Verify all numbers, drop rates, and formulas against game telemetry.
   - Once approved, rename the file to standard convention (`FEAT_XX_*.md` or `ARCH_XX_*.md`) and move it to the corresponding destination folder.

3. **Purge Protocol:**
   - Rejected or obsolete drafts in `10_Inbox/` must be moved to [[90_Archive|90_Archive/]] or deleted cleanly.
