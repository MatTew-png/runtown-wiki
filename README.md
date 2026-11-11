# 🚜 RUN TOWN Wiki Hub & Obsidian Agentic Knowledge Vault

> **ระบบวิกิคู่มือเศรษฐกิจ & รูทฟาร์มเจาะลึก FiveM / GTA V Roleplay**  
> เอกสารถูกจัดระเบียบตามมาตรฐาน **Obsidian Agentic Vault Architecture** รองรับการเปิดใช้งานด้วย Obsidian และเชื่อมต่อกับ AI Agents (Antigravity, Cursor, Claude Code) อย่างมีประสิทธิภาพสูงสุด

---

## 📁 โครงสร้างโปรเจกต์ & Obsidian Vault (`docs/`)

```text
epic-euclid/
├── docs/                               # 🏰 Obsidian Agentic Knowledge Vault
│   ├── .agent/                         # 🤖 AI Agent Directives, Schema & Skills
│   │   ├── rules.md                    # กฎการทำงาน & Naming Conventions
│   │   ├── schema.md                   # Formal YAML Frontmatter Schema (SSOT)
│   │   ├── mcp-setup.md                # การเชื่อมต่อ Model Context Protocol
│   │   └── skills/runtown-economy.md   # ทักษะและความรู้ด้านเศรษฐกิจ RUN TOWN
│   ├── 00_Index/                       # 📑 ศูนย์รวมสารบัญ & การตรวจสอบระบบ
│   │   ├── 00_Master_Index.md          # หน้าศูนย์กลางหลักของคลังความรู้
│   │   ├── 01_Project_Status_Audit.md  # ตรวจสอบสถานะโค้ดเบส & สถิติเส้นทาง
│   │   ├── 02_Feature_Matrix.md        # ตารางสถานะฟีเจอร์แบบไดนามิก (Dataview)
│   │   └── OBSIDIAN_GIT_GUIDE.md       # คู่มือ Git Sync & เชื่อมต่อมือถือ
│   ├── 01_Features/                    # 🚀 คัมภีร์เจาะลึกแต่ละสายอาชีพ (FEAT_XX)
│   │   ├── FEAT_01_Pork_Farming.md     # 🐷 คัมภีร์ฟาร์มหมูฉบับสมบูรณ์ (15 นาที/รอบ, 5 โมเดล)
│   │   ├── FEAT_02_Flower_Farming.md   # 🌸 คัมภีร์ฟาร์มดอกไม้ฉบับสมบูรณ์ (5 รูท, ส่งสปา $387)
│   │   ├── FEAT_03_Cross_Career_Benchmark.md # 📊 ศูนย์เปรียบเทียบข้ามสายงาน & Tier List
│   │   └── FEAT_04_Farming_Economy_Analysis.md # 📈 วิเคราะห์เศรษฐกิจ เหล็ก vs หมู 48 ชม.
│   ├── 02_Architecture/                # 🏛️ สถาปัตยกรรม, โร้ดแมพ & ระบบงาน
│   │   ├── ARCH_01_Architecture_Audit.md      # วิเคราะห์ระบบ Jamstack, Leaflet & Tech Debt
│   │   ├── ARCH_02_Refactoring_Roadmap.md     # แผนพัฒนา 4 เฟส (Tasks Plugin Syntax)
│   │   ├── ARCH_03_Astro_Wiki_Template_Manual.md # คู่มือโครงสร้าง Astro Content Collections
│   │   ├── ARCH_04_Runtown_Design_System.md   # ระบบสี OkLCH, Tailwind Tokens & Micro-Interactions
│   │   ├── KANBAN_Board.md                    # บอร์ดจัดการงาน (Obsidian Kanban)
│   │   └── DATAVIEW_Live_Dashboard.md         # แดชบอร์ดสรุปงานสด (Dataview)
│   ├── 03_Scripts_Vault/               # 📜 คลังสคริปต์คำนวณและออโตเมชันที่ผ่านการตรวจสอบ
│   │   ├── SCRIPT_01_Route_Calculators.md     # สคริปต์คำนวณระยะทาง & เส้นทางถนน GPS
│   │   ├── SCRIPT_02_Map_Capture_Automations.md # สคริปต์แคปเจอร์แผนที่ด้วย Headless Browser
│   │   └── SCRIPT_03_Asset_Pipeline.md        # สคริปต์ประมวลผลไอคอนโปร่งใสและบัตรโชว์เคส
│   ├── 10_Inbox/                       # 📥 พื้นที่กักกันและดราฟต์สำหรับ AI (Staging Area)
│   │   └── README.md
│   ├── Templates/                      # 📄 เทมเพลตมาตรฐานสำหรับ Templater Plugin
│   │   ├── Template_New_Feature.md
│   │   ├── Template_New_Script.md
│   │   ├── Template_New_Architecture_ADR.md
│   │   └── README_Templater_Setup.md
│   ├── 90_Archive/                     # 📦 บันทึกประวัติศาสตร์และเวอร์ชันเก่า
│   ├── MOC.md                          # 🗺️ Master Relational Map of Content
│   ├── RUNTOWN_Project_Dashboard.canvas # แคนวาสแดชบอร์ดภาพรวมระดับบริหาร
│   ├── RUNTOWN_Architecture.canvas     # แคนวาสสถาปัตยกรรมระบบและโครงสร้างเลเยอร์
│   ├── RUNTOWN_Full_System.excalidraw.md # แผนผังระบบแบบโต้ตอบ (Excalidraw)
│   ├── sync_vault.ps1                  # สคริปต์ซิงก์ Git อัตโนมัติ (PowerShell)
│   └── sync_vault.py                   # สคริปต์ซิงก์ Git ข้ามแพลตฟอร์ม (Python)
├── src/                                # 🌐 ซอร์สโค้ด Astro Wiki Portal & Live Map
├── MOC.md                              # 🗺️ ตัวชี้เชื่อมโยงเข้าสู่ Vault ที่รูท
├── AGENTS.md / CLAUDE.md / .cursorrules# กฎควบคุม AI Agent ระดับรูท
└── README.md
```

---

## 📚 1. คลังคู่มือเจาะลึกเฉพาะแต่ละสายงาน (Dedicated Career Guides)

- 🐷 **[FEAT-01: คู่มือคัมภีร์ฟาร์มหมูฉบับสมบูรณ์](file:///c:/Users/_newgen/Documents/antigravity/epic-euclid/docs/01_Features/FEAT_01_Pork_Farming.md)**: วงจร 15 นาที, กฎ Zero Overweight, 3 รูทรีค่าความล้าสมอง (14 จุด, 11 จุด), 5 โมเดลกลยุทธ์, The Rice Stash Trick
- 🌸 **[FEAT-02: คู่มือคัมภีร์ฟาร์มดอกไม้ฉบับสมบูรณ์](file:///c:/Users/_newgen/Documents/antigravity/epic-euclid/docs/01_Features/FEAT_02_Flower_Farming.md)**: 5 เส้นทางโลจิสติกส์, ส่ง รพ. $100 vs ส่งสปา $387, จุดคุ้มทุนบัฟคูณ 120k
- 📊 **[FEAT-03: ศูนย์เปรียบเทียบข้ามสายงาน (Cross-Career Benchmark)](file:///c:/Users/_newgen/Documents/antigravity/epic-euclid/docs/01_Features/FEAT_03_Cross_Career_Benchmark.md)**: เปรียบเทียบรถ 150 กก., กะทำงาน 7.4 ชม., ศึกมาราธอน 72 ชม. และ Tier List
- 📈 **[FEAT-04: วิเคราะห์เศรษฐกิจ & รูทฟาร์ม (เหล็ก vs หมู)](file:///c:/Users/_newgen/Documents/antigravity/epic-euclid/docs/01_Features/FEAT_04_Farming_Economy_Analysis.md)**: เปรียบเทียบต้นทุน, รูทขนส่ง, Perfect Ratio และกำไรสุทธิ 48 ชม.

---

## 🎨 2. Visual Dashboards & Obsidian Canvases

เมื่อเปิดโฟลเดอร์ `docs/` ใน **Obsidian**:
1. **Executive Project Dashboard:** เปิดไฟล์ `RUNTOWN_Project_Dashboard.canvas` เพื่อดูภาพรวมของโปรเจกต์
2. **Architecture Canvas:** เปิดไฟล์ `RUNTOWN_Architecture.canvas` เพื่อดูการเชื่อมต่อระหว่าง Client, Components, Map Engine และ Content Engine
3. **Interactive Excalidraw:** เปิดไฟล์ `RUNTOWN_Full_System.excalidraw.md` เพื่อดูแผนผังการไหลของข้อมูล
4. **Live Dataview Dashboard:** เปิดไฟล์ `docs/02_Architecture/DATAVIEW_Live_Dashboard.md` เพื่อดูสถานะแบบเรียลไทม์

---

## 🛠️ 3. การรันเว็บ, การตรวจสอบ และ Deploy บน Cloudflare

```bash
# ติดตั้ง dependencies
npm install

# รันโหมด Development (Port 4321)
npm run dev

# ตรวจสอบ TypeScript / Astro & ชุดทดสอบ integrity
npm run check
npm run build
npm test

# ทดสอบจำลอง Cloudflare Edge runtime บนเครื่อง
npm run preview:cf

# Deploy ขึ้น Cloudflare Workers (Static Assets)
npx wrangler login
npm run deploy
```

### ☁️ ตั้งค่า Cloudflare Git Auto-Deploy
- **Config:** [wrangler.jsonc](wrangler.jsonc) (`assets.directory = "./dist"`, `not_found_handling = "404-page"`)
- **Security & Cache Headers:** [public/_headers](public/_headers)
- **วิธีที่ 1 (Cloudflare Native Workers Builds):** เชื่อม repo ใน Cloudflare Dashboard → Workers & Pages → Settings → Builds (`Build: npm run build`, `Deploy: npx wrangler deploy`)
- **วิธีที่ 2 (GitHub Actions CI/CD):** [.github/workflows/deploy.yml](.github/workflows/deploy.yml) จะรัน `npm run check`, `npm run build`, `npm test` ทุกครั้งที่ push/PR และ deploy อัตโนมัติบน `main` เมื่อตั้งค่า GitHub Repository Secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`)
