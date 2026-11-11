---
project: RUNTOWN
category: agent-governance
status: completed
priority: critical
last_audit: 2026-11-07
tags:
  - agents
  - ai-protocol
  - rules
---

# 🤖 AI Agent Directive Pointer

All AI agents (Antigravity, Claude Code, Cursor, Copilot) operating within this knowledge vault must strictly adhere to the operational rules and frontmatter schemas defined in:

- **Rules & Operational Boundaries:** [[rules|.agent/rules.md]]
- **YAML Frontmatter Schemas:** [[schema|.agent/schema.md]]
- **Domain Intelligence:** [[runtown-economy|.agent/skills/runtown-economy.md]]
- **Master Map of Content:** [[MOC|MOC.md]]

### Golden Rules
1. **Never perform destructive whole-file overwrites.** Use surgical replacements.
2. **Stage unreviewed proposals and new guides in `10_Inbox/`** before human promotion.
3. **Use Obsidian Wikilinks** (e.g., `[[MOC]]` or `[[00_Master_Index|Label]]`) in Markdown prose instead of hardcoded file URLs.
4. **All notes must begin with valid YAML frontmatter** matching `.agent/schema.md`.
