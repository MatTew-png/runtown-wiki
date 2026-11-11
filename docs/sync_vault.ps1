# sync_vault.ps1 - Automated Obsidian Vault Git Sync
$ErrorActionPreference = "Stop"

Write-Host "🔄 Syncing Obsidian Vault..." -ForegroundColor Cyan

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($LASTEXITCODE -ne 0 -or $branch -ne "main") {
    throw "❌ Refusing vault sync outside 'main' branch (current: '$branch')."
}

$nonDocsDirty = git status --porcelain -- ':!docs'
if ($nonDocsDirty) {
    throw "❌ Dirty working tree outside docs/. Commit or stash code changes before rebasing."
}

# 1. Fetch and rebase remote changes
git pull --rebase origin main
if ($LASTEXITCODE -ne 0) {
    throw "❌ git pull --rebase origin main failed."
}

# 2. Stage vault modifications
git add docs/

# 3. Commit with timestamp
$timestamp = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
$commitMsg = "chore(vault): auto-sync vault updates [$timestamp]"

$status = git status --porcelain docs/
if ($status) {
    git commit -m "$commitMsg"
    if ($LASTEXITCODE -ne 0) { throw "❌ git commit failed." }
    git push origin main
    if ($LASTEXITCODE -ne 0) { throw "❌ git push origin main failed." }
    Write-Host "✅ Vault successfully synced and pushed!" -ForegroundColor Green
} else {
    Write-Host "✨ No changes detected in vault. Up to date." -ForegroundColor Yellow
}
