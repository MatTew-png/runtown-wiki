const fs = require('fs');
const path = require('path');

const networkData = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/gta5_road_network.json'), 'utf8'));

class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val, priority) {
    this.heap.push({ val, priority });
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0].val;
    const bottom = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = bottom;
      this._sinkDown(0);
    }
    return top;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  _bubbleUp(idx) {
    while (idx > 0) {
      const pIdx = (idx - 1) >> 1;
      if (this.heap[idx].priority < this.heap[pIdx].priority) {
        const tmp = this.heap[idx];
        this.heap[idx] = this.heap[pIdx];
        this.heap[pIdx] = tmp;
        idx = pIdx;
      } else break;
    }
  }
  _sinkDown(idx) {
    const len = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = (idx << 1) + 1;
      const right = left + 1;
      if (left < len && this.heap[left].priority < this.heap[smallest].priority) smallest = left;
      if (right < len && this.heap[right].priority < this.heap[smallest].priority) smallest = right;
      if (smallest !== idx) {
        const tmp = this.heap[idx];
        this.heap[idx] = this.heap[smallest];
        this.heap[smallest] = tmp;
        idx = smallest;
      } else break;
    }
  }
}

const cellSize = 100;
const spatialGrid = new Map();
for (let i = 0; i < networkData.nodes.length; i++) {
  const [nx, ny] = networkData.nodes[i];
  const cx = Math.floor(nx / cellSize);
  const cy = Math.floor(ny / cellSize);
  const key = `${cx},${cy}`;
  let cell = spatialGrid.get(key);
  if (!cell) {
    cell = [];
    spatialGrid.set(key, cell);
  }
  cell.push(i);
}

function findNearestNode(x, y) {
  const cx = Math.floor(x / cellSize);
  const cy = Math.floor(y / cellSize);
  let bestIdx = -1;
  let bestDist = Infinity;

  for (let r = 0; r <= 8; r++) {
    for (let dx = -r; dx <= r; dx++) {
      for (let dy = -r; dy <= r; dy++) {
        const key = `${cx + dx},${cy + dy}`;
        const cell = spatialGrid.get(key);
        if (cell) {
          for (let i = 0; i < cell.length; i++) {
            const idx = cell[i];
            const [nx, ny] = networkData.nodes[idx];
            const d = Math.hypot(nx - x, ny - y);
            if (d < bestDist) {
              bestDist = d;
              bestIdx = idx;
            }
          }
        }
      }
    }
    if (bestIdx !== -1 && bestDist <= r * cellSize) break;
  }
  return bestIdx;
}

function aStar(startIdx, endIdx) {
  if (startIdx === endIdx) return [startIdx];
  const nodes = networkData.nodes;
  const edges = networkData.edges;
  const nodeCount = nodes.length;

  const [endX, endY] = nodes[endIdx];
  const gScore = new Float32Array(nodeCount).fill(Infinity);
  const cameFrom = new Int32Array(nodeCount).fill(-1);
  const openSet = new MinHeap();

  gScore[startIdx] = 0;
  openSet.push(startIdx, Math.hypot(nodes[startIdx][0] - endX, nodes[startIdx][1] - endY));

  let iterations = 0;
  const maxIterations = 50000;

  while (!openSet.isEmpty() && iterations < maxIterations) {
    iterations++;
    const current = openSet.pop();
    if (current === null) break;

    if (current === endIdx) {
      const path = [current];
      let curr = current;
      while (cameFrom[curr] !== -1) {
        curr = cameFrom[curr];
        path.push(curr);
      }
      return path.reverse();
    }

    const [cx, cy] = nodes[current];
    const currentG = gScore[current];
    const nbrs = edges[current];

    for (let i = 0; i < nbrs.length; i++) {
      const neighbor = nbrs[i];
      const [nx, ny] = nodes[neighbor];
      const dist = Math.hypot(nx - cx, ny - cy);
      const tentativeG = currentG + dist;

      if (tentativeG < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeG;
        const h = Math.hypot(nx - endX, ny - endY);
        openSet.push(neighbor, tentativeG + h);
      }
    }
  }

  return null;
}

function calculateRouteBetween(p1, p2) {
  const startNode = findNearestNode(p1.x, p1.y);
  const endNode = findNearestNode(p2.x, p2.y);
  if (startNode === -1 || endNode === -1) {
    return [p1, p2];
  }
  const nodePath = aStar(startNode, endNode);
  if (!nodePath || nodePath.length === 0) {
    return [p1, p2];
  }
  const path = [p1];
  for (let i = 0; i < nodePath.length; i++) {
    const [nx, ny] = networkData.nodes[nodePath[i]];
    path.push({ x: nx, y: ny });
  }
  path.push(p2);
  return path;
}

function calculateMultiPoint(points) {
  const full = [];
  for (let i = 0; i < points.length - 1; i++) {
    const leg = calculateRouteBetween(points[i], points[i + 1]);
    if (i === 0) {
      full.push(...leg);
    } else {
      full.push(...leg.slice(1));
    }
  }
  return full;
}

const jobRoutes = {
  // 🪓 1. ไม้ (Woodcutting)
  wood: [
    { name: 'wood-farm', x: 94.1, y: 6938.8 },
    { name: 'wood-pro', x: -559.6, y: 5321.3 },
    { name: 'wood-pack', x: -567.8, y: -2156.2 },
    { name: 'wood-sell', x: 1202.7, y: -1271.3 }
  ],
  // 🐷 2. หมู (Pork Livestock)
  pork: [
    { name: 'pork-farm', x: 1454.2, y: 1067.7 },
    { name: 'pork-pro', x: 956.8, y: -2127.2 },
    { name: 'pork-pack', x: -609.0, y: -2159.5 },
    { name: 'pork-sell', x: -638.1, y: -1213.0 }
  ],
  // 🌾 3. ข้าว (Wheat Farming)
  wheat: [
    { name: 'wheat-farm', x: 2855.0, y: 4609.2 },
    { name: 'wheat-pro', x: 1932.9, y: 4633.7 },
    { name: 'wheat-pack', x: -591.4, y: -2130.9 },
    { name: 'wheat-sell', x: -1448.0, y: -363.5 }
  ],
  // 🌸 4. ดอกไม้ (Flower Gathering)
  flower: [
    { name: 'flower-farm', x: 2519.9, y: 4350.4 },
    { name: 'flower-pro', x: 837.9, y: 2157.6 },
    { name: 'flower-pack', x: -585.4, y: -2178.7 },
    { name: 'flower-sell', x: -1391.2, y: -171.8 }
  ],
  // ⛏️ 5. เหมือง & หลอมโลหะ (Mining & Smelting)
  mine: [
    { name: 'mine-pit', x: 2949.8, y: 2776.4 },
    { name: 'stone-pro', x: 2648.8, y: 2805.6 },
    { name: 'copper-pro', x: 1110.4, y: -2001.8 },
    { name: 'gold-pro', x: 1013.7, y: -2534.7 }
  ],
  // 💎 6. คริสตัล (Crystal Sifting & Processing)
  crystal: [
    { name: 'crystal-sift', x: -513.7, y: 2945.0 },
    { name: 'crystal-pro', x: -110.0, y: -2228.0 }
  ],
  // ⚙️ 7. เศษเหล็ก / จี่เหล็ก (จุดฟาร์ม 1 และ 2 แยกสายอิสระ วิ่งตรงเข้าเตาหลอม ไม่ต้องผ่านกัน)
  steel: [
    // สาย A: ฟาร์ม 1 ในเมือง (South LS) ➔ เตาหลอม Cypress Flats
    [
      { name: 'scrap-farm-1', x: 245.7, y: -1807.9 },
      { name: 'steel-pro', x: 1481.4, y: -1922.5 }
    ],
    // สาย B: ฟาร์ม 2 ทะเลทราย (Grand Senora) ➔ เตาหลอม Cypress Flats
    [
      { name: 'scrap-farm-2', x: 2401.3, y: 3110.5 },
      { name: 'steel-pro', x: 1481.4, y: -1922.5 }
    ]
  ],
  // Fallback alias for agri
  agri: [
    { name: 'wheat-farm', x: 2855.0, y: 4609.2 },
    { name: 'wheat-pro', x: 1932.9, y: 4633.7 },
    { name: 'wheat-pack', x: -591.4, y: -2130.9 },
    { name: 'wheat-sell', x: -1448.0, y: -363.5 }
  ]
};

const results = {};
for (const [jobKey, waypoints] of Object.entries(jobRoutes)) {
  console.log(`Calculating realistic GPS road route for ${jobKey}...`);
  const t0 = Date.now();
  if (Array.isArray(waypoints[0])) {
    // Multi-leg independent branches
    const legs = waypoints.map(leg => calculateMultiPoint(leg));
    results[jobKey] = legs;
    console.log(`  -> ${jobKey}: ${legs.length} independent branches in ${Date.now() - t0}ms`);
  } else {
    const roadPath = calculateMultiPoint(waypoints);
    results[jobKey] = roadPath;
    console.log(`  -> ${jobKey}: ${roadPath.length} road points in ${Date.now() - t0}ms`);
  }
}

fs.writeFileSync(path.join(__dirname, '../src/data/jobGpsRoadRoutes.json'), JSON.stringify(results, null, 2));
console.log('Successfully written src/data/jobGpsRoadRoutes.json');
