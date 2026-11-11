---
project: RUNTOWN
category: agent-governance
status: completed
priority: critical
last_audit: 2026-11-07
tags:
  - agentic-vault
  - schema
  - frontmatter
  - validation
---

# 📑 Vault YAML Frontmatter Schema

All notes inside this Obsidian Agentic Vault must start with a YAML frontmatter block adhering to the schemas below. This ensures seamless parsing by **Dataview**, **Obsidian Tasks**, and LLM agents.

---

## 1. Feature Specifications (`01_Features/`)

```yaml
---
project: RUNTOWN
category: feature-deep-dive
feature_id: FEAT-01
status: completed           # completed | in-progress | prototype | planned
priority: critical         # critical | high | medium | low
last_audit: YYYY-MM-DD
tags:
  - runtown
  - farming
  - white-jobs             # or black-jobs, logistics, crafting
---
```

## 2. Architecture & System Notes (`02_Architecture/`)

```yaml
---
project: RUNTOWN
category: architecture
status: completed           # completed | in-progress | planned
priority: high             # critical | high | medium | low
last_audit: YYYY-MM-DD
tags:
  - architecture
  - astro
  - design-system
  - roadmap
---
```

## 3. Scripts Vault Notes (`03_Scripts_Vault/`)

```yaml
---
project: RUNTOWN
category: script
status: verified           # verified | experimental | deprecated
priority: medium
last_audit: YYYY-MM-DD
tags:
  - scripts
  - automation
  - nodejs
  - python
---
```

## 4. Index & Dashboards (`00_Index/`)

```yaml
---
project: RUNTOWN
category: index
status: completed
priority: critical
last_audit: YYYY-MM-DD
tags:
  - index
  - master-hub
  - dataview
---
```

## 5. Inbox Staging Notes (`10_Inbox/`)

```yaml
---
project: RUNTOWN
category: inbox-draft
status: draft              # draft | pending-review
priority: medium
created: YYYY-MM-DD
tags:
  - inbox
  - ai-proposal
---
```

---

## 🔍 Required vs Optional Fields

| Field | Type | Required | Allowed Values |
| :--- | :--- | :---: | :--- |
| `project` | string | ✅ Yes | `RUNTOWN` |
| `category` | string | ✅ Yes | `feature-deep-dive`, `architecture`, `script`, `index`, `inbox-draft`, `archive`, `template`, `agent-governance` |
| `status` | string | ✅ Yes | `completed`, `in-progress`, `prototype`, `planned`, `verified`, `deprecated`, `draft` |
| `priority` | string | ✅ Yes | `critical`, `high`, `medium`, `low` |
| `last_audit` | date (YYYY-MM-DD) | ✅ Yes | Valid ISO Date |
| `tags` | list of strings | ✅ Yes | Valid lowercase kebab tags |
| `feature_id` | string | 🟡 Feature notes only | e.g. `FEAT-01`, `FEAT-02` |
