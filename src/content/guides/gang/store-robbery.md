---
title: "Store Robbery: งัดร้านค้า (5vs5 GvG Tournament)"
description: "คู่มือสงครามงัดร้านค้า 5vs5 รูปแบบทัวร์นาเมนต์: ตารางเวลา 12:00-03:00, ระบบแยก World, กฎการสมัคร NPC 5 นาที (กด G ดูกระดาน), สูตรคราฟต์ Breaching Kit, และของรางวัล Diamond Ingot / Dirty Money / Lucky Box"
category: "gang"
categoryName: "แก๊ง & ครอบครัว"
order: 2
icon: "🏪"
iconImage: "/items/icons/transparent/breaching_kit.png"
badge: "GVG TOURNAMENT"
status: "ready"
updatedAt: "OCTOBER 2026"
tool: "Breaching Kit (ชุดอุปกรณ์งัดแงะ)"
risk: "สงครามแยก World (5vs5)"
---

<div class="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-gradient-to-br from-[#1c0b0f]/90 via-[#120a0e]/95 to-[#0b0c12] p-6 sm:p-8 shadow-[0_0_40px_rgba(244,63,94,0.15)] my-6">
  <div class="flex flex-col md:flex-row items-center gap-6">
    <div class="relative shrink-0">
      <div class="size-28 sm:size-32 rounded-2xl bg-rose-500/10 border-2 border-rose-400/50 p-2 flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.3)]">
        <img src="/items/icons/transparent/breaching_kit.png" alt="Breaching Kit" class="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
      </div>
      <span class="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white border border-white/20">
        5vs5 GvG
      </span>
    </div>
    <div class="space-y-2 text-center md:text-left">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 font-mono text-xs font-bold">
        <span>🏪</span>
        <span>สมรภูมิงัดร้านค้า (STORE ROBBERY TOURNAMENT)</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-wide">
        สงครามแย่งชิงร้านค้า <span class="text-rose-400">5vs5</span> มิติแยก (Isolated World)
      </h2>
      <p class="text-sm text-slate-300 leading-relaxed max-w-2xl">
        กิจกรรมปะทะระหว่างแก๊งแบบ Bracket Tournament ในมิติแยกส่วนตัว ชิงสิทธิ์งัดตู้เซฟร้านค้าด้วย <strong>Breaching Kit</strong> ทีมที่เหลือรอดเป็นทีมสุดท้ายรับของรางวัลระดับสูง Diamond Ingot, Dirty Money และ Lucky Box
      </p>
    </div>
  </div>
</div>

---

## ⏱️ ข้อมูล & ตารางเวลาการเปิดร้านค้า (Schedule & Rules)

การปล้นร้านค้าในเมือง RUN TOWN เป็นระบบทัวร์นาเมนต์ที่ปลอดภัยจากการรบกวนภายนอก โดยมีกฎและเงื่อนไขเวลาดังนี้:

| หัวข้อกำหนด | รายละเอียดระบบ | คำแนะนำ & ข้อควรระวัง |
| :--- | :--- | :--- |
| **จำนวนผู้เล่น** | **5 vs 5 คน** (ระบบทีม) | ผู้เข้าแข่งขันทุกคน**ต้องมีรายชื่อใน [Headquarter (HQ)](/guides/gang/headquarter)** |
| **จำนวนร้านค้าที่เปิด** | **3 ร้าน** (ช่วงทดสอบระบบ Beta) | ติดตามสถานะร้านค้าและไอคอนร้านได้โดยตรงจาก **หน้าแผนที่ (Map)** |
| **ช่วงเวลาเปิดทำการ** | **12:00 น. ถึง 03:00 น.** (เวลาประเทศไทย) | ร้านจะไม่เปิดในช่วงเช้าตรู่ (03:01 - 11:59) |
| **รอบแรกหลังเปิดเซิร์ฟ** | **สุ่มเกิด 30 - 50 นาที** หลังเซิร์ฟเวอร์เปิด | ให้สมาชิกแก๊งสแตนด์บายเตรียมอาวุธและ Breaching Kit ให้พร้อม |
| **คูลดาวน์หลังจบการแข่งขัน** | **40 นาที** (นับจากร้านก่อนหน้าจบลง) | เมื่อหมดคูลดาวน์ระบบจะสุ่มเปิดร้านค้ารอบถัดไป |
| **มิติพื้นที่ (World Instance)** | **แยก World อิสระ** | ผู้เล่นภายนอกไม่สามารถมองเห็นหรือเข้ามายิงแทรกแซงได้ |
| **ระบบหลังพ่ายแพ้** | **ชุบชีวิตอัตโนมัติ** | ทีมที่สลบจะได้รับการชุบชีวิตฟื้นฟู และวาร์ปส่งกลับมายังมิติปกติทันที |

---

## 🎮 ขั้นตอนการเข้าร่วม & กฎการแข่งขัน (Step-by-Step Flow)

```mermaid
flowchart TD
    A["📍 1. ตรวจสอบแผนที่ (Map) ดูร้านค้าที่กำลังเปิด"] --> B["🚶‍♂️ 2. เดินทางไปหน้าร้าน สมัครกับ NPC ภายใน 5 นาที"]
    B --> C["📋 3. กดปุ่ม 'G' เพื่อเปิดดูรายชื่อและสายการแข่งขัน"]
    C --> D["🎲 4. ครบ 5 นาที ระบบจับคู่ Matchmaking อัตโนมัติ"]
    D --> E["🎯 5. ย้ายเข้าสู่ Isolated World (ศัตรูมีมาร์กเกอร์สีแดงบนหัว)"]
    E --> F["⏳ 6. เวลานับถอยหลัง 30 วินาที เตรียมความพร้อม (บังคับเริ่ม)"]
    F --> G["⚔️ 7. ต่อสู้ 5vs5 ทีมแพ้ถูกชุบส่งกลับโลกปกติ"]
    G --> H["🏆 8. ทีมชนะเลิศทีมสุดท้าย ได้รับสิทธิ์งัดร้านค้า"]
    H --> I["🔓 9. ใช้ Breaching Kit เจาะร้าน ภายในเวลา 5 นาที"]
```

### 1. การสมัครเข้าร่วม (Registration Phase)
* สมาชิกทีม 5 คน เดินทางไปยังหน้าร้านค้าที่ขึ้นแจ้งเตือนบนแผนที่
* กดคุยเพื่อสมัครเข้าร่วมกับ **NPC ประจำหน้าร้าน**
* มีเวลาเปิดรับสมัครเพียง **5 นาที** เท่านั้น หากหมดเวลาจะไม่สามารถลงทะเบียนเพิ่มได้
* สามารถกดคีย์ลัด **`G`** เพื่อเปิดดูรายชื่อทีมทั้งหมด และตรวจสอบสายการแข่งขัน (Tournament Bracket)

### 2. การจับคู่และการต่อสู้ (Matchmaking & Battle Phase)
* เมื่อสิ้นสุดเวลา 5 นาที ระบบจะสุ่มประกบคู่ต่อสู้โดยอัตโนมัติ
* ตัวละครจะถูกดึงเข้าสู่ **มิติแยก (Isolated World)**
* **จุดสังเกตศัตรู:** ฝ่ายตรงข้ามจะมี **Marker สัญลักษณ์สีแดง** ปรากฏอยู่บนศีรษะอย่างชัดเจน
* มีเวลาเตรียมตัว **30 วินาที** ก่อนเปิดฉากยิง หากหมดเวลาระบบจะบังคับเริ่มทันทีโดยไม่มีการรอ
* ทีมที่สมาชิกสลบจนหมดทั้งทีม ระบบจะทำการ **ชุบชีวิตอัตโนมัติ** แล้วเทเลพอร์ตปรับส่งกลับสู่โลกปกติ (Normal World) อย่างปลอดภัย

### 3. การงัดร้านค้าของผู้ชนะ (Breaching Phase)
* ทีมที่ยืนหยัดเป็นทีมสุดท้ายและคว้าชัยชนะในรอบชิงชนะเลิศ จะได้รับสิทธิ์ในการงัดร้านค้า
* **เงื่อนไขสำคัญ:** ต้องพกพาไอเทม **Breaching Kit (ชุดอุปกรณ์งัดแงะ)** มาด้วย
* **จำกัดเวลา:** ต้องทำการงัดร้านให้เสร็จสิ้นภายใน **5 นาที** หลังจากจบการต่อสู้รอบสุดท้าย

---

## 🛠️ สูตรคราฟต์ไอเทม Breaching Kit (100% Success)

ไอเทมจำเป็นสำหรับการปลดล็อครางวัลของทีมชนะเลิศ สามารถคราฟต์ได้ที่โต๊ะช่าง:

<div class="my-6 rounded-2xl overflow-hidden border border-line bg-card max-w-2xl mx-auto shadow-lg">
  <img src="/items/breaching_kit_crafting.png" alt="Breaching Kit Crafting Recipe In-game" class="w-full object-cover" />
</div>

### 📋 วัตถุดิบที่ใช้ในการผลิต Breaching Kit:

| ไอคอน | ชื่อไอเทม / วัตถุดิบ | จำนวนที่ใช้ | ระดับ & คุณสมบัติ |
| :---: | :--- | :---: | :--- |
| <img src="/items/icons/transparent/breaching_kit.png" width="40" height="40" class="object-contain inline-block" alt="Breaching Kit" /> | **Breaching Kit** *(ผลลัพธ์)* | **1 ชิ้น** | **ระดับทั่วไป (General)** · อัตราสำเร็จ **100%** · เวลาคราฟต์ 10 วินาที |
| <img src="/items/icons/transparent/black_money.png" width="40" height="40" class="object-contain inline-block" alt="Black Money" /> | **Black Money (เงินแดง)** | **1,500 บาท** | เงินนอกกฎหมายที่ได้จากการฟาร์มงานดำหรือกิจกรรมใต้ดิน |
| <img src="/items/icons/transparent/copper_ingot.png" width="40" height="40" class="object-contain inline-block" alt="Copper Ingot" /> | **Copper Ingot (ทองแดงแท่ง)** | **10 ชิ้น** | แท่งทองแดงหลอมเกรดอุตสาหกรรมสำหรับทำหัวเจาะ |

> [!TIP]
> **ข้อแนะนำก่อนลงแข่ง:** ควรให้สมาชิกในทีมอย่างน้อย 2 คนพก **Breaching Kit** สำรองไว้ในกระเป๋า เพื่อป้องกันเหตุฉุกเฉินกรณีผู้ถือไอเทมหลุดหรือเกิดความผิดพลาดในการงัด

---

## 🎁 รายการของรางวัลสำหรับทีมชนะเลิศ (Winner Loot Pool)

เมื่อทีมชนะเลิศใช้งาน Breaching Kit งัดร้านค้าสำเร็จ จะได้รับไอเทมของรางวัลเข้ากระเป๋าดังนี้:

| ไอคอนของรางวัล | ชื่อไอเทม | จำนวนที่ได้รับ | มูลค่า & การนำไปใช้งาน |
| :---: | :--- | :---: | :--- |
| <img src="/items/icons/transparent/diamond_ingot.png" width="40" height="40" class="object-contain inline-block" alt="Diamond Ingot" /> | **Diamond Ingot** | **2 - 3 ชิ้น** | แร่ระดับแรร์พิเศษ สำหรับคราฟต์อาวุธขั้นสูงและอุปกรณ์ระดับท็อป |
| <img src="/items/icons/transparent/black_money.png" width="40" height="40" class="object-contain inline-block" alt="Dirty Money" /> | **Dirty Money (เงินแดง)** | **12,000 - 18,000 บาท** | เงินหมุนเวียนแก๊งสำหรับซื้อเสบียง อาวุธ และใช้คราฟต์ HQ Coin |
| <img src="/items/icons/transparent/aed.png" width="40" height="40" class="object-contain inline-block" alt="AED" /> | **AED (เครื่องกระตุกหัวใจพกพา)** | **8 - 10 เครื่อง** | อุปกรณ์ชุบชีวิตเพื่อนร่วมทีมในสนามรบ ปัจจัยสำคัญสำหรับไฟต์ใหญ่ |
| <img src="/items/icons/transparent/bandage.png" width="40" height="40" class="object-contain inline-block" alt="Bandage" /> | **Bandage (ผ้าพันแผล)** | **20 - 30 ชิ้น** | เวชภัณฑ์ฟื้นฟูเลือดพื้นฐาน เพิ่มความต่อเนื่องในการรบ |
| <img src="/items/icons/transparent/lucky_box.png" width="40" height="40" class="object-contain inline-block" alt="Lucky Box" /> | **Lucky Box** | **1 กล่อง** | กล่องสุ่มรางวัลล้ำค่า ลุ้นรับพิมพ์เขียวอาวุธและไอเทมสุดพิเศษ |

---

## 📡 การสื่อสาร & กลยุทธ์ในการแข่ง 5vs5

1. **การใช้วิทยุสื่อสาร [Radio (กด O)](/guides/gang/radio):**
   * ทีมงานและแก๊งที่มีชื่อในระบบ **Run Headquarter** สามารถใช้วิทยุสื่อสารช่องเฉพาะเพื่อบอกตำแหน่งและคอลเป้าหมาย
2. **การสังเกตศัตรูด้วย Marker สีแดง:**
   * ในช่วง 30 วินาทีแรก เช็คตำแหน่งการกระจายตัวของฝั่งตรงข้ามผ่านมาร์กเกอร์สีแดงเหนือหัว เพื่อวางแผนประกบยิง
3. **การบริหารสิทธิ์สมาชิกแก๊ง:**
   * ระบบ Store Robbery อ้างอิงจากรายชื่อสมาชิกใน **Run Headquarter** เท่านั้น หัวหน้าแก๊งควรตรวจสอบว่าผู้เล่นทั้ง 5 คนได้รับการลงทะเบียนเรียบร้อยแล้วผ่านเมนู `F10 > Member`

---

## 🔗 ลิงก์คู่มือที่เกี่ยวข้อง
* 👑 **[ระบบแก๊ง Headquarter & เหรียญ HQ Coin](/guides/gang/headquarter)** - คู่มือการขึ้นทะเบียนแก๊งและระบบคลัง Supplies
* 📻 **[วิทยุสื่อสาร Radio (กด O)](/guides/gang/radio)** - สิทธิ์การใช้วอและการตั้งคลื่นความถี่แก๊ง
* 🗺️ **[แผนที่จุดสำคัญ & จุดตรวจเมือง](/map)** - แผนที่แบบ Interactive สำหรับติดตามจุดเกิดร้านค้า
