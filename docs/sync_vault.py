#!/usr/bin/env python3
"""
sync_vault.py - Cross-Platform Obsidian Vault Git Sync
"""
import datetime
import subprocess
import sys


def run_cmd(args):
    result = subprocess.run(args, text=True, capture_output=True)
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def main():
    print("🔄 [Python] Syncing Obsidian Vault...")

    code, branch, err = run_cmd(["git", "rev-parse", "--abbrev-ref", "HEAD"])
    if code != 0 or branch != "main":
        print(f"❌ Refusing vault sync outside 'main' branch (current: '{branch or err}').")
        return 1

    _, non_docs_dirty, _ = run_cmd(["git", "status", "--porcelain", "--", ":!docs"])
    if non_docs_dirty:
        print("❌ Dirty working tree outside docs/. Commit or stash code changes before rebasing.")
        return 1

    # 1. Pull rebase (abort safely if rebase conflicts)
    code, out, err = run_cmd(["git", "pull", "--rebase", "origin", "main"])
    if code != 0:
        print(f"❌ Pull rebase failed: {err or out}")
        return 1

    # 2. Add docs
    code, _, err = run_cmd(["git", "add", "docs/"])
    if code != 0:
        print(f"❌ Failed to stage docs/: {err}")
        return 1

    # 3. Check status
    _, status, _ = run_cmd(["git", "status", "--porcelain", "docs/"])
    if not status:
        print("✨ No changes in docs/. Vault is up to date.")
        return 0

    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    msg = f"chore(vault): auto-sync vault updates [{now}]"

    code, _, err = run_cmd(["git", "commit", "-m", msg])
    if code != 0:
        print(f"❌ Commit failed: {err}")
        return 1

    code, _, err = run_cmd(["git", "push", "origin", "main"])
    if code == 0:
        print("✅ Vault synced and pushed successfully!")
        return 0

    print(f"❌ Push failed: {err}")
    return 1


if __name__ == "__main__":
    sys.exit(main())
