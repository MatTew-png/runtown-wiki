import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import ts from 'typescript';

const ROOT = process.cwd();
const require = createRequire(import.meta.url);

function loadTsModule(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const source = fs.readFileSync(fullPath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: fullPath,
  });

  const mod = { exports: {} };
  const fn = new vm.Script(
    `(function (exports, require, module, __filename, __dirname) {\n${transpiled.outputText}\n})`,
    { filename: fullPath }
  );
  const compiled = fn.runInThisContext();
  compiled(mod.exports, require, mod, fullPath, path.dirname(fullPath));
  return mod.exports;
}

function walkFiles(dir, extFilter) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath, extFilter));
    } else if (!extFilter || extFilter(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

function requestHttp(port, reqPath, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path: reqPath, method }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8'),
        });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

const economy = loadTsModule('src/data/economy.ts');
const mapSpots = loadTsModule('src/data/mapSpots.ts');

test('SSOT economy formulas & Trading Buffer math remain exact', () => {
  assert.equal(economy.PLAYER_MAX_CARRY_KG, 30);
  assert.equal(economy.TRADING_BUFFER_KG, 10);
  assert.equal(economy.PLAYER_SAFE_CARRY_KG, 20);
  assert.equal(Object.keys(economy.WHITE_JOBS).length, 8);

  assert.equal(economy.calcSafeTotalCapacityKg(60), 80);
  assert.equal(economy.calcSafeTotalCapacityKg(120), 140);
  assert.equal(economy.calcSafeTotalCapacityKg(150), 170);
  assert.equal(economy.calcMaxPieces(80, 0.5), 160);
  assert.equal(economy.calcMaxPieces(140, 0.5), 280);
  assert.equal(economy.calcMaxPieces(170, 0.5), 340);

  assert.equal(economy.calcProcessingBrainLoadPct(120, 5), 34.2);
  assert.ok(Math.abs(economy.calcHungerDropPct(138) - 100) < 0.01);
});

test('SSOT mapSpots has 47 canonical spots, valid aliases, and zero broken spot links across src/', () => {
  const canonicalIds = Object.keys(mapSpots.SPOTS);
  assert.equal(canonicalIds.length, 47);

  for (const [alias, target] of Object.entries(mapSpots.SPOT_ALIASES)) {
    assert.ok(canonicalIds.includes(target), `Alias ${alias} -> unknown spot ${target}`);
    assert.ok(mapSpots.resolveSpot(alias), `resolveSpot('${alias}') failed`);
  }

  const srcFiles = walkFiles(path.join(ROOT, 'src'), (f) => /\.(astro|md|ts)$/.test(f));
  const missingSpots = [];

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/\/map\?spot=([a-zA-Z0-9_-]+)/g)) {
      const spotKey = match[1];
      if (!mapSpots.resolveSpot(spotKey)) {
        missingSpots.push(`${path.relative(ROOT, file)} -> ?spot=${spotKey}`);
      }
    }
    if (file.endsWith('InteractiveJobStepper.astro')) {
      for (const match of content.matchAll(/spotId:\s*'([^']+)'/g)) {
        const spotId = match[1];
        if (!mapSpots.resolveSpot(spotId)) {
          missingSpots.push(`${path.relative(ROOT, file)} -> spotId=${spotId}`);
        }
      }
    }
  }

  assert.deepEqual(missingSpots, []);
});

test('Public assets referenced across src/ exist on disk', () => {
  const srcFiles = walkFiles(path.join(ROOT, 'src'), (f) => /\.(astro|md|ts)$/.test(f));
  const missingAssets = [];

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.matchAll(/(?:src|href|srcset|image|icon|radarImage)\s*[:=]\s*["'`](\/(?:images|items|icons|maps)\/[a-zA-Z0-9_./-]+)/g);
    for (const m of matches) {
      const assetPath = m[1];
      const diskPath = path.join(ROOT, 'public', assetPath.replace(/^\//, ''));
      if (!fs.existsSync(diskPath)) {
        missingAssets.push(`${path.relative(ROOT, file)} -> ${assetPath}`);
      }
    }
  }

  assert.deepEqual(missingAssets, []);
});

test('Built dist/ passes CSS reduced-motion, token validity, maintenance inert guards, and internal guide link checks', () => {
  const distDir = path.join(ROOT, 'dist');
  assert.ok(fs.existsSync(distDir), 'dist/ missing: run npm run build before npm test');

  const cssFiles = walkFiles(path.join(distDir, '_astro'), (f) => f.endsWith('.css'));
  assert.ok(cssFiles.length > 0, 'Expected built CSS files in dist/_astro');
  const combinedCss = cssFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  assert.match(combinedCss, /prefers-reduced-motion:\s*reduce/);

  const htmlFiles = walkFiles(distDir, (f) => f.endsWith('.html'));
  assert.ok(htmlFiles.length >= 25, `Expected built HTML pages, got ${htmlFiles.length}`);

  const invalidClassTokenRe = /\b(text-rose|bg-rose|border-rose|text-amber|bg-amber|border-amber|bg-void|bg-dark|text-dark)\b(?![-\w/])/;
  const badClasses = [];
  const brokenGuideLinks = [];

  for (const htmlFile of htmlFiles) {
    const html = fs.readFileSync(htmlFile, 'utf8');

    for (const m of html.matchAll(/\bclass="([^"]+)"/g)) {
      const cls = m[1];
      const hit = cls.match(invalidClassTokenRe);
      if (hit) {
        badClasses.push(`${path.relative(distDir, htmlFile)}: ${hit[0]}`);
      }
    }

    for (const m of html.matchAll(/\bhref="(\/guides(?:\/[a-zA-Z0-9_/-]+)?)\/?(?:#[^"]*)?(?:\?[^"]*)?"/g)) {
      const route = m[1].replace(/\/$/, '');
      if (route === '/guides') continue;
      const candidateDir = path.join(distDir, route.slice(1), 'index.html');
      const candidateHtml = path.join(distDir, `${route.slice(1)}.html`);
      if (!fs.existsSync(candidateDir) && !fs.existsSync(candidateHtml)) {
        brokenGuideLinks.push(`${path.relative(distDir, htmlFile)} -> ${route}`);
      }
    }
  }

  assert.deepEqual(badClasses, []);
  assert.deepEqual(brokenGuideLinks, []);

  const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  assert.equal((homeHtml.match(/inert(?:\s*=\s*["'][^"']*["'])?[^>]*aria-hidden="true"/g) || []).length >= 3, true);
});

test('Cloudflare deployment config & static edge artifacts are valid (no stale Vercel/Surge configs)', () => {
  assert.equal(fs.existsSync(path.join(ROOT, 'vercel.json')), false, 'vercel.json should be removed after Cloudflare migration');
  assert.equal(fs.existsSync(path.join(ROOT, 'public', 'CNAME')), false, 'stale public/CNAME should be removed');

  const wranglerPath = path.join(ROOT, 'wrangler.jsonc');
  assert.ok(fs.existsSync(wranglerPath), 'wrangler.jsonc must exist');
  const wranglerConfig = JSON.parse(fs.readFileSync(wranglerPath, 'utf8'));
  assert.equal(wranglerConfig.name, 'runthukverb-wiki');
  assert.equal(wranglerConfig.assets?.directory, './dist');
  assert.equal(wranglerConfig.assets?.not_found_handling, '404-page');
  assert.ok(wranglerConfig.assets?.html_handling, 'html_handling must be set');

  const distHeadersPath = path.join(ROOT, 'dist', '_headers');
  assert.ok(fs.existsSync(distHeadersPath), 'dist/_headers must exist after astro build');
  const headersContent = fs.readFileSync(distHeadersPath, 'utf8');
  assert.match(headersContent, /Content-Security-Policy:/);
  assert.match(headersContent, /X-Frame-Options:\s*DENY/);
  assert.match(headersContent, /X-Content-Type-Options:\s*nosniff/);
  assert.match(headersContent, /Referrer-Policy:/);
  assert.match(headersContent, /Permissions-Policy:/);
  assert.match(headersContent, /Strict-Transport-Security:/);
  assert.match(headersContent, /\/_astro\/\*/);

  assert.ok(fs.existsSync(path.join(ROOT, 'dist', '404.html')), 'dist/404.html must exist for Cloudflare 404-page handling');
});

test('server.js serves built dist/ safely when present and blocks directory traversal & non-GET methods', {
  skip: !fs.existsSync(path.join(ROOT, 'server.js')) ? 'server.js is gitignored and absent in clean checkout' : false,
}, async () => {
  const testPort = 4399;
  const serverProc = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(testPort) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('server.js startup timed out')), 4000);
      serverProc.stdout.on('data', (buf) => {
        if (buf.toString('utf8').includes('SERVER IS RUNNING')) {
          clearTimeout(timeout);
          resolve();
        }
      });
      serverProc.stderr.on('data', (buf) => {
        clearTimeout(timeout);
        reject(new Error(buf.toString('utf8')));
      });
    });

    const homeRes = await requestHttp(testPort, '/');
    assert.equal(homeRes.status, 200);
    assert.match(homeRes.body, /RUN TOWN/);

    const cleanRes = await requestHttp(testPort, '/map');
    assert.equal(cleanRes.status, 200);

    const traversalRes = await requestHttp(testPort, '/../package.json');
    assert.ok(traversalRes.status === 403 || traversalRes.status === 404);
    assert.doesNotMatch(traversalRes.body, /"astro"/);

    const encodedTraversalRes = await requestHttp(testPort, '/%2e%2e/server.js');
    assert.equal(encodedTraversalRes.status, 403);
    assert.doesNotMatch(encodedTraversalRes.body, /createServer/);

    const methodRes = await requestHttp(testPort, '/', 'POST');
    assert.equal(methodRes.status, 405);
  } finally {
    serverProc.kill();
  }
});
