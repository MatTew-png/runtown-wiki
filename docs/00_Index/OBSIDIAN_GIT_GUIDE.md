---
project: RUNTOWN
category: index
status: completed
priority: medium
last_audit: 2026-11-07
tags:
  - git-sync
  - guide
  - automation
  - obsidian
---

# 🔄 Obsidian Git Synchronization Guide

This guide details how to keep this vault synchronized across multiple development workstations, mobile devices, and AI agent environments.

---

## 🛡️ Recommended `.gitignore` for Obsidian

To prevent merge conflicts and avoid committing ephemeral workspace view states, ensure your `.gitignore` includes:

```gitignore
# Obsidian Ephemeral & Cache Files
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/workspace*
.obsidian/cache/
.trash/
.DS_Store
Thumbs.db
*.log
```

---

## ⚡ 1-Click Automated Sync Scripts

We provide two pre-packaged zero-dependency sync scripts inside `docs/`:

### 1. PowerShell Sync (`sync_vault.ps1`)
Run in PowerShell:
```powershell
.\docs\sync_vault.ps1
```
*Automatically pulls latest remote commits, stages changes in `docs/`, commits with ISO timestamp, and pushes.*

### 2. Cross-Platform Python Sync (`sync_vault.py`)
Run in terminal:
```bash
python docs/sync_vault.py
```

---

## 📱 Mobile Sync (iOS / Android)
- **Option A (Obsidian Git):** Recommended for Android using GitSync.
- **Option B (Remotely Save):** Syncs directly via S3, WebDAV, or OneDrive without git merge conflicts.
