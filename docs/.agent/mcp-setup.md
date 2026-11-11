---
project: RUNTOWN
category: agent-governance
status: completed
priority: medium
last_audit: 2026-11-07
tags:
  - mcp
  - obsidian-integration
  - tooling
---

# 🔌 Model Context Protocol (MCP) Setup for Obsidian

This guide documents how AI agents and IDEs (Cursor, Antigravity, Claude Desktop) connect directly to this vault via the Model Context Protocol (MCP).

---

## 🚀 Recommended Obsidian MCP Server

We recommend `@modelcontextprotocol/server-filesystem` or `mcp-obsidian` for bi-directional vault access.

### 1. Claude Desktop / Antigravity MCP Configuration

Add this entry to your `mcpSettings.json` or `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "runtown-vault": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:\\Users\\_newgen\\Documents\\antigravity\\epic-euclid\\docs"
      ]
    }
  }
}
```

### 2. Available Agent Capabilities via MCP
Once configured, the agent has programmatic access to:
- `read_file`: Read clean markdown notes and frontmatter.
- `search_files`: Fast fuzzy and keyword search across notes.
- `write_file`: Write new proposals to `10_Inbox/` safely.
- `edit_file`: Surgical replacements inside existing specifications.

---

## 🛡️ Security & Boundary Settings
- The server scope is strictly confined to the `docs/` folder.
- Ephemeral Obsidian cache files (`.obsidian/workspace.json`, `.obsidian/cache/`) are ignored.
