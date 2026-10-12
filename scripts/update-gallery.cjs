const fs = require('fs');
let content = fs.readFileSync('src/components/ItemGallery.astro', 'utf8');

const insertTarget = `  {
    id: 'packed-rice',
    name: '📦 Packed Rice (ข้าวแพ็คถุง)',
    category: 'materials',
    type: 'สินค้าแพ็คส่งออก (Rice Pack)',
    badge: '1.00 กก. | $396',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    image: '/items/icons/packed_rice.png',
    icon: '/items/icons/packed_rice.png',
    stats: 'น้ำหนัก: 1.00 กก. | แพ็ค 5 วิ/2 ชิ้น (2:1) ที่โกดังท่าเรือ',
    recipe: ['ข้าวแปร x2', 'จุดแพ็คสินค้าท่าเรือ (5 วินาที)'],
    cost: '$396 บ.'
  }`;

const woodItems = `  {
    id: 'packed-rice',
    name: '📦 Packed Rice (ข้าวแพ็คถุง)',
    category: 'materials',
    type: 'สินค้าแพ็คส่งออก (Rice Pack)',
    badge: '1.00 กก. | $396',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    image: '/items/icons/packed_rice.png',
    icon: '/items/icons/packed_rice.png',
    stats: 'น้ำหนัก: 1.00 กก. | แพ็ค 5 วิ/2 ชิ้น (2:1) ที่โกดังท่าเรือ',
    recipe: ['ข้าวแปร x2', 'จุดแพ็คสินค้าท่าเรือ (5 วินาที)'],
    cost: '$396 บ.'
  },
  {
    id: 'raw-wood',
    name: '🪵 Raw Wood (ไม้ดิบ / ท่อนซุง)',
    category: 'materials',
    type: 'วัตถุดิบป่าไม้ (Raw Timber)',
    badge: '0.50 กก. | $90',
    badgeColor: 'bg-amber-800/20 text-amber-300 border-amber-800/40',
    image: '/items/icons/raw_wood.png',
    icon: '/items/icons/raw_wood.png',
    stats: 'น้ำหนัก: 0.50 กก. | ตัด 10 วิ/ชิ้น | ขาย Eco $90',
    recipe: ['ป่าสน Paleto Forest', 'ใช้ขวานตัดไม้ (10 วินาที)'],
    cost: '$90 บ.'
  },
  {
    id: 'processed-wood',
    name: '🪵 Processed Wood (ไม้แปร / ไม้แผ่น)',
    category: 'materials',
    type: 'ไม้แปรรูป (Processed Planks)',
    badge: '0.50 กก. | $171',
    badgeColor: 'bg-orange-700/20 text-orange-300 border-orange-700/40',
    image: '/items/icons/processed_wood.png',
    icon: '/items/icons/processed_wood.png',
    stats: 'น้ำหนัก: 0.50 กก. | โพล 5 วิ/ชิ้น (1:1) ที่โรงเลื่อย',
    recipe: ['ไม้ดิบ x1', 'ยืนโพลที่โรงเลื่อย Paleto Bay (5 วินาที)'],
    cost: '$171 บ.'
  },
  {
    id: 'packed-wood',
    name: '📦 Packed Wood (ไม้แพ็คพาเลท)',
    category: 'materials',
    type: 'สินค้าแพ็คส่งออก (Wood Pallet Pack)',
    badge: '1.00 กก. | $479',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    image: '/items/icons/packed_wood.png',
    icon: '/items/icons/packed_wood.png',
    stats: 'น้ำหนัก: 1.00 กก. | แพ็ค 5 วิ/2 ชิ้น (2:1) ที่โกดังท่าเรือ',
    recipe: ['ไม้แปร x2', 'จุดแพ็คสินค้าท่าเรือ (5 วินาที)'],
    cost: '$479 บ.'
  }`;

const normContent = content.replace(/\r\n/g, '\n');
const normTarget = insertTarget.replace(/\r\n/g, '\n');

if (normContent.includes(normTarget)) {
  const updated = normContent.replace(normTarget, woodItems.replace(/\r\n/g, '\n'));
  fs.writeFileSync('src/components/ItemGallery.astro', updated, 'utf8');
  console.log('Successfully updated ItemGallery.astro!');
} else {
  console.log('Target not found in ItemGallery.astro!');
}
