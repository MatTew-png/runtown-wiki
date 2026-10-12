const fs = require('fs');

const content = fs.readFileSync('src/pages/map.astro', 'utf8');

const targetIds = [
  'wood-farm', 'wood-pro', 'wood-pack', 'wood-sell',
  'wheat-farm', 'wheat-pro', 'wheat-pack', 'wheat-sell',
  'flower-farm', 'flower-pro', 'flower-pack', 'flower-sell',
  'mine-pit', 'stone-pro', 'copper-smelt', 'gold-smelt',
  'crystal-sift', 'crystal-pro',
  'scrap-farm-1', 'scrap-farm-2', 'steel-pro',
  'pork-farm', 'pork-pro', 'pork-pack', 'pork-sell',
  'bar-green', 'garage-reset', 'rebel-desert', 'rebel-south'
];

targetIds.forEach(id => {
  const needle = "'" + id + "':";
  const exists = content.includes(needle);
  console.log(`${id}: ${exists ? 'OK' : 'MISSING'}`);
});
