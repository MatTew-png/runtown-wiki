const fs = require('fs');
function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), size: buf.length };
}
const dir = 'public/items/icons/';
fs.readdirSync(dir).filter(f => f.endsWith('.png')).forEach(f => {
  try {
    const d = getPngDimensions(dir + f);
    console.log(f.padEnd(25) + d.width + "x" + d.height + " (" + d.size + " bytes)");
  } catch(e) {}
});
