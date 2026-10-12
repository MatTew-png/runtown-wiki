# 📖 คู่มือการใช้งานระบบ Astro + Tailwind + Markdown/MDX Wiki Hub
**RUN TOWN FiveM Thailand Master Guide Portal**

---

## ⚡ สรุปหัวใจสำคัญ (Quick Summary)
ระบบนี้ถูกออกแบบมาเพื่อแก้ปัญหา **"ไม่ต้องเขียนโค้ด HTML ซ้ำซ้อน"** และ **"ป้องกันการแก้โค้ดยาวนาน"**:
1. **เวลาคุณจะเพิ่มคู่มือใหม่:** คุณแค่สร้างไฟล์ Markdown (`.md` หรือ `.mdx`) ในโฟลเดอร์ `src/content/guides/[ชื่อหมวด]/[ชื่อไฟล์].md`
2. **ระบบจะสร้างหน้าเว็บให้อัตโนมัติ 100%:** มีแถบเมนูด้านซ้าย (Sidebar), สารบัญอัตโนมัติ (Table of Contents), Breadcrumbs, ปุ่มคัดลอกลิงก์ และลิงก์ไปยังแผนที่เรดาร์ GTA V ให้ทันที โดยที่คุณไม่ต้องแตะต้องโค้ด HTML หรือ JavaScript เลย

---

## 📁 โครงสร้างโฟลเดอร์ในระบบ (Directory Map)

```text
c:\Users\_newgen\Documents\antigravity\epic-euclid\
├── src/
│   ├── content/
│   │   ├── config.ts                    <-- กำหนดประเภทข้อมูล (Schema Validation)
│   │   └── guides/                      <-- โฟลเดอร์เก็บเนื้อหาคู่มือทั้งหมด!
│   │       ├── farming/                 <-- หมวดงานฟาร์มขาว
│   │       │   ├── pork.md              <-- คู่มือฟาร์มหมู
│   │       │   └── flower.md            <-- คู่มือฟาร์มดอกไม้
│   │       ├── crafting/                <-- หมวดคราฟต์ & อาวุธ
│   │       │   ├── weapons.md           <-- อาวุธ Lv.1 (Machete, Knife, Dagger...)
│   │       │   └── materials.md         <-- วัตถุดิบ & คอร์ (Impact & Edge Core)
│   │       └── rules/                   <-- หมวดกฎเมือง
│   │           └── server-rules.md      <-- กฎเซิร์ฟเวอร์ & Safe Zone
│   ├── components/
│   │   ├── Navbar.astro                 <-- แถบเมนูด้านบนสุด
│   │   ├── Sidebar.astro                <-- แถบนำทางหมวดหมู่ซ้ายมือ (พร้อมช่องค้นหา)
│   │   └── TableOfContents.astro        <-- สารบัญดึงจากหัวข้อ ## ### อัตโนมัติ
│   ├── layouts/
│   │   ├── BaseLayout.astro             <-- โครงหน้าเว็บหลัก (Fonts, Theme, Footer)
│   │   └── GuideLayout.astro            <-- เลย์เอาต์หน้าคู่มือ
│   ├── pages/
│   │   ├── index.astro                  <-- หน้าแรก (Bento Grid สรุปทุกหมวด)
│   │   ├── guides/
│   │   │   ├── index.astro              <-- หน้ารวมสารบัญคู่มือทั้งหมด (มีตัวกรอง)
│   │   │   └── [...slug].astro          <-- ตัวแปลงไฟล์ Markdown เป็นหน้าเว็บอัตโนมัติ
│   │   └── map.astro                    <-- หน้าเรดาร์แผนที่ GTA V + Cooldown 10 นาที
│   └── styles/
│       └── global.css                   <-- ธีม RUN TOWN Cyberpunk & สไตล์เนื้อหา
├── astro.config.mjs                     <-- การตั้งค่า Astro + Tailwind + MDX
└── package.json
```

---

## ✍️ วิธีเพิ่มคู่มือใหม่ใน 30 วินาที (How to Add a Guide)

สร้างไฟล์ `.md` ขึ้นมาใหม่ในโฟลเดอร์ย่อย เช่น `src/content/guides/farming/wood.md` 
โดยมีส่วนหัวด้านบน (Frontmatter) ดังนี้:

```markdown
---
title: "คู่มือตัดไม้ & แปรรูปไม้ซุง"
description: "พิกัดป่าสน Paleto Bay อัตราการแปรรูปไม้แผ่น และจุดส่งออกโรงเลื่อย"
category: "farming"
categoryName: "งานฟาร์มขาว"
order: 3
icon: "🪵"
badge: "CD 10น."
cooldown: 10
updatedAt: "09 ตุลาคม 2026"
---

## 🪵 ข้อมูลทั่วไป
เนื้อหาคู่มือของคุณสามารถพิมพ์เป็นภาษาไทยและ Markdown ทั่วไปได้ทันที...

### 1. พิกัดจุดตัดไม้
* **พิกัด GPS:** `X: -567.8, Y: -2156.2, Z: 30.0`
* **ผลผลิต:** ไม้ท่อน 120 ชิ้น

| คลาสรถ | ความจุ | รายได้ต่อเที่ยว |
| :--- | :---: | :---: |
| กระบะ 150 กก. | 60 แผ่น | $11,400 |
```

### คำอธิบายฟิลด์ใน Frontmatter:
* `title`: ชื่อคู่มือที่จะแสดงตัวใหญ่บนหัวเว็บ
* `description`: คำอธิบายย่อ (แสดงในการ์ดหน้าแรก)
* `category`: รหัสหมวดหมู่ภาษาอังกฤษ (`farming`, `crafting`, `rules`, `combat`, `general`)
* `categoryName`: ชื่อหมวดหมู่ภาษาไทยที่จะแสดงบนเว็บ
* `order`: ลำดับการแสดงผลใน Sidebar (1, 2, 3...)
* `icon`: อีโมจิประจำคู่มือ เช่น 🐷, 🌸, 🗡️, 🪵
* `badge`: ป้ายกำกับเล็กๆ เช่น `HOT`, `NEW`, `CD 10น.` (เว้นว่างได้)
* `cooldown`: ตัวเลขเวลาคูลดาวน์ (นาที) เช่น `10` เพื่อให้แสดงป้ายจับเวลา

---

## ➕ วิธีเพิ่มหมวดหมู่ใหม่ (How to Add a New Category)

ถ้าในอนาคตต้องการเพิ่มหมวดใหม่ เช่น หมวดตกปลา (`fishing`):

1. **เปิดไฟล์ `src/content/config.ts`**:
   เพิ่ม `'fishing'` ใน `z.enum`:
   ```typescript
   category: z.enum(['farming', 'crafting', 'rules', 'combat', 'general', 'fishing']),
   ```

2. **เปิดไฟล์ `src/components/Sidebar.astro`**:
   เพิ่มข้อมูลภาษาไทยใน `categoryConfig`:
   ```typescript
   fishing: { label: 'ตกปลา & ประมง (Fishing)', icon: '🎣' },
   ```

3. สร้างโฟลเดอร์ `src/content/guides/fishing/` แล้วใส่ไฟล์ `.md` ได้เลย!

---

## 💻 คำสั่งสำหรับใช้งาน (Commands)

| คำสั่ง | ผลลัพธ์ | URL |
| :--- | :--- | :--- |
| `npm run dev` | เปิดเซิร์ฟเวอร์ทดสอบแบบสด (แก้ Markdown แล้วหน้าเว็บอัปเดตทันที) | [http://localhost:4321](http://localhost:4321) |
| `npm run build` | บิลด์เว็บทั้งหมดเป็นไฟล์ Static HTML ลงในโฟลเดอร์ `dist/` | เร็วจัด พร้อม Deploy |
| `npm run preview` | พรีวิวผลลัพธ์หลังบิลด์จำลองแบบ Production | [http://localhost:4321](http://localhost:4321) |

---

## 🚀 ลิงก์ทดสอบหน้าเว็บสด (ตอนนี้รันอยู่แล้ว)

* 🏠 **หน้าแรก (Hub):** [http://localhost:4321/](http://localhost:4321/)
* 📚 **หน้ารวมสารบัญคู่มือทั้งหมด:** [http://localhost:4321/guides](http://localhost:4321/guides)
* 🐷 **ตัวอย่างหน้าคู่มือฟาร์มหมู:** [http://localhost:4321/guides/farming/pork](http://localhost:4321/guides/farming/pork)
* 🌸 **ตัวอย่างหน้าคู่มือฟาร์มดอกไม้:** [http://localhost:4321/guides/farming/flower](http://localhost:4321/guides/farming/flower)
* 🗡️ **ตัวอย่างหน้าคู่มือคราฟต์อาวุธ:** [http://localhost:4321/guides/crafting/weapons](http://localhost:4321/guides/crafting/weapons)
* 🗺️ **หน้าเรดาร์แผนที่ GTA V + คูลดาวน์ 10 นาที:** [http://localhost:4321/map](http://localhost:4321/map)
