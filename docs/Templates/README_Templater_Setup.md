---
project: RUNTOWN
category: template
status: completed
priority: medium
last_audit: 2026-11-07
tags:
  - templater
  - setup
  - obsidian-plugin
---

# 📄 Templater Plugin Setup Guide

This vault includes standardized templates pre-configured for the **Templater** community plugin in Obsidian.

---

## ⚙️ Configuration Instructions in Obsidian

1. Open **Obsidian Settings** ➔ **Community Plugins**.
2. Search for and install **Templater** (by SilentVoid13), then enable it.
3. In Templater Settings:
   - **Template folder location:** Set to `Templates`
   - **Trigger Templater on new file creation:** Toggle **ON**
   - **User script functions folder:** Leave blank or configure if using external JS.
4. **Syntax Support:**
   - `<% tp.file.title %>`: Injects the filename.
   - `<% tp.date.now("YYYY-MM-DD") %>`: Injects today's date.
   - Dynamic regex extraction automatically extracts numeric identifiers for feature and ADR IDs.
