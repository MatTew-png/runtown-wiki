---
project: RUNTOWN
category: agent-governance
status: completed
priority: critical
last_audit: 2026-11-07
tags:
  - agentic-vault
  - governance
  - rules
  - ai-protocol
---

# 🤖 Agent Operational Governance & Directives

This document sets the operational boundaries, file naming standards, and architectural hygiene rules for all AI agents (Antigravity, Claude Code, Cursor, Copilot) interacting with this knowledge vault.

---

## 🛡️ Core Rules & Inviolable Guardrails

### 1. Zero Destructive Overwrite
- **Never perform whole-file overwrites** without explicit instruction.
- Always prefer surgical diffs (`edit_file` / `replace_file_content`) preserving existing metadata and notes.
- If proposing major new documentation, drafts, or unverified analysis, place them into [[README|10_Inbox/]] first for human review before promoting to `01_Features/` or `02_Architecture/`.

### 2. File Naming Conventions
Strict alphanumeric prefixes and PascalCase naming must be used across all directories:
- **Features:** `FEAT_XX_PascalCase.md` (e.g., `FEAT_01_Pork_Farming.md`)
- **Architecture & System:** `ARCH_XX_PascalCase.md` (e.g., `ARCH_01_Architecture_Audit.md`)
- **Scripts & Tools:** `SCRIPT_XX_PascalCase.md` (e.g., `SCRIPT_01_Route_Calculators.md`)
- **Templates:** `Template_PascalCase.md` (e.g., `Template_New_Feature.md`)
- **Archive:** Preserved historical filenames under `90_Archive/`

### 3. Wikilinks Over File URLs
- In Markdown prose, **always use Obsidian Wikilinks** (e.g. `[[00_Master_Index]]` or aliased `[[MOC|Master Map of Content]]`).
- Do NOT use hardcoded absolute file paths like `file:///C:/Users/...` in documentation body.

### 4. Single Source of Truth (SSOT) Frontmatter
- Every markdown note must begin with valid YAML frontmatter matching [[schema|.agent/schema.md]].
- **Never duplicate frontmatter metadata** inside blockquotes (e.g., do not write `> **Project ID:** ...` if `project:` is in YAML). Keep body prose focused on explanations, math, diagrams, and code.

### 5. Empirical Verification & Grounding
- Never hallucinate vehicle weights, farming cooldowns, drop rates, or GPS coordinates.
- Cross-check against verified data files: `src/data/fivemSpots.json`, `src/data/jobGpsRoadRoutes.json`, and [[FEAT_04_Farming_Economy_Analysis]].

---

## 🗺️ Cross-References
- [[schema|YAML Schema Definitions]]
- [[mcp-setup|Model Context Protocol (MCP) Setup]]
- [[MOC|Master Map of Content (MOC)]]
