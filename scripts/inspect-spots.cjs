const fs = require('fs');
const spots = JSON.parse(fs.readFileSync('./src/data/fivemSpots.json', 'utf8'));
spots.filter(s => /หมอ|ช่าง|เหล็ก|แร่|คอป|ทอง|เพชร|เหมือง|ขยะ|เศษ/.test(s.name)).forEach(j => {
  console.log(`- [${j.category || 'none'}] "${j.name}" (${j.x}, ${j.y})`);
});
