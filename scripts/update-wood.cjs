const fs = require('fs');
let content = fs.readFileSync('src/content/guides/jobs/woodcutting.md', 'utf8');
const oldTable = `| ไอเทม | น้ำหนัก | เวลาแปรรูป | อัตราผลผลิต | ราคาขายในระบบ Eco | ช่องทางจำหน่าย |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **ไม้ดิบ (Raw Wood)** | 0.50 กก. | 10 วิ/ชิ้น | 1 ชิ้น/รอบ | **$90** | ขายทันที / นำไปโพล |
| **ไม้แปร (Processed Wood)** | 0.50 กก. | 5 วิ/ชิ้น | 1:1 (ดิบ 1 ➔ แปร 1) | **$171** | ขายจุดรับซื้อ / ส่งแพ็ค |
| **ไม้แพ็ค (Packed Wood)** | 1.00 กก. | 5 วิ/2 ชิ้น | 2:1 (แปร 2 ➔ แพ็ค 1) | **$479** | จุดขายไม้ (กำไรสูงสุด) |`;

const newTable = `| ไอเทม | ไอคอน | น้ำหนัก | เวลาแปรรูป | อัตราผลผลิต | ราคาขายในระบบ Eco | ช่องทางจำหน่าย |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **ไม้ดิบ (Raw Wood)** | <img src="/items/icons/raw_wood.png" alt="ไม้ดิบ" class="w-8 h-8 rounded-lg inline-block shadow-sm" /> | 0.50 กก. | 10 วิ/ชิ้น | 1 ชิ้น/รอบ | **$90** | ขายทันที / นำไปโพล |
| **ไม้แปร (Processed Wood)** | <img src="/items/icons/processed_wood.png" alt="ไม้แปร" class="w-8 h-8 rounded-lg inline-block shadow-sm" /> | 0.50 กก. | 5 วิ/ชิ้น | 1:1 (ดิบ 1 ➔ แปร 1) | **$171** | ขายจุดรับซื้อ / ส่งแพ็ค |
| **ไม้แพ็ค (Packed Wood)** | <img src="/items/icons/packed_wood.png" alt="ไม้แพ็ค" class="w-8 h-8 rounded-lg inline-block shadow-sm" /> | 1.00 กก. | 5 วิ/2 ชิ้น | 2:1 (แปร 2 ➔ แพ็ค 1) | **$479** | จุดขายไม้ (กำไรสูงสุด) |`;

// Normalize \r\n
const normalizedOld = oldTable.replace(/\r\n/g, '\n');
const normalizedContent = content.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedOld)) {
  const updated = normalizedContent.replace(normalizedOld, newTable);
  fs.writeFileSync('src/content/guides/jobs/woodcutting.md', updated, 'utf8');
  console.log('Successfully updated woodcutting.md!');
} else {
  console.log('Match not found!');
}
