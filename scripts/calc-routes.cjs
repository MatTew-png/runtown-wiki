const spots = {
  wood: {
    farm: { name: "ฟามไม้", x: 94.1, y: 6938.8 },
    process: { name: "โพลไม้", x: -559.6, y: 5321.3 },
    pack: { name: "แพ็คไม้", x: -567.8, y: -2156.2 },
    sell: { name: "ขายไม้", x: 1202.7, y: -1271.3 }
  },
  wheat: {
    farm: { name: "ฟามข้าว", x: 2855, y: 4609.2 },
    process: { name: "โพลข้าว", x: 1932.9, y: 4633.7 },
    pack: { name: "แพ็คข้าว", x: -591.4, y: -2130.9 },
    sell: { name: "ขายข้าว", x: -1448, y: -363.5 }
  },
  flower: {
    farm: { name: "ฟามดอกไม้", x: 1035.7, y: 4315.3 },
    process: { name: "โพลดอกไม้", x: 837.9, y: 2157.6 },
    pack: { name: "แพ็คดอกไม้", x: -585.4, y: -2178.7 },
    sell: { name: "ขายดอกไม้", x: -1391.2, y: -171.8 }
  },
  pig: {
    farm: { name: "ฟามหมู", x: 1454.2, y: 1067.7 },
    process: { name: "โพลหมู", x: 956.8, y: -2127.2 },
    pack: { name: "แพ็คหมู", x: -609, y: -2159.5 },
    sell: { name: "ขายหมู", x: -638.1, y: -1213 }
  },
  mine: {
    mine: { name: "เหมือง", x: 2949.8, y: 2776.4 },
    processStone: { name: "โพลหิน", x: 2648.8, y: 2805.6 },
    processCopper: { name: "โพลคอปเปอร์", x: 1110.4, y: -2001.8 },
    processGold: { name: "โพลทอง", x: 1013.7, y: -2534.7 },
    processSteel: { name: "โพลเหล็ก", x: 1481.4, y: -1922.5 }
  }
};

function dist(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// Average truck speed in GTA V FiveM ~ 70-80 km/h on roads (~20-22 m/s). 1 GTA unit = 1 meter.
// Road winding factor typically ~ 1.25x Euclidean.
const ROAD_FACTOR = 1.25;
const TRUCK_SPEED_MPS = 21.0; // ~75 km/h

for (const [key, job] of Object.entries(spots)) {
  console.log(`\n=== JOB: ${key.toUpperCase()} ===`);
  const keys = Object.keys(job);
  let totalDist = 0;
  for (let i = 0; i < keys.length - 1; i++) {
    const from = job[keys[i]];
    const to = job[keys[i + 1]];
    const d = dist(from, to) * ROAD_FACTOR;
    totalDist += d;
    const timeSec = d / TRUCK_SPEED_MPS;
    const timeMin = (timeSec / 60).toFixed(1);
    console.log(`  Leg ${i+1}: ${from.name} -> ${to.name}: ${(d/1000).toFixed(2)} km (~${timeMin} min / ${Math.round(timeSec)}s)`);
  }
  const totalSec = totalDist / TRUCK_SPEED_MPS;
  console.log(`  TOTAL: ${(totalDist/1000).toFixed(2)} km (~${(totalSec/60).toFixed(1)} min / ${Math.round(totalSec)}s)`);
}
