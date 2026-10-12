# 🏎️ RUNTOWN & RUN-TOWN-RULES — Deep-Dive Tailwind CSS & Design System Architecture

> เอกสารวิเคราะห์เจาะลึกโครงสร้างการออกแบบ, CSS Tokens, Tailwind Utilities, Animation Mechanics และระบบ Color Science ระหว่าง 2 เว็บไซต์ในเครือ **RUN TOWN**:
> 1. **RUN TOWN Landing Page**: `https://runtown.in.th/` (Cyber Street Action Runner / Arcade Aesthetic)
> 2. **RUN TOWN Rules & Docs**: `https://run-town-rules.vercel.app/` (Next-Gen Perceptual OkLCH Documentation & Legal Engine)

---

## 📑 สารบัญ (Table of Contents)
1. [ภาพรวมสถาปัตยกรรมการออกแบบ (Architectural Overview)](#1-ภาพรวมสถาปัตยกรรมการออกแบบ)
2. [ระบบสีและ Color Science (OkLCH, LAB & color-mix)](#2-ระบบสีและ-color-science)
3. [ระบบ Typography & Font Stacks](#3-ระบบ-typography--font-stacks)
4. [ระบบพื้นผิว Squircle, Elevation & Specular Edge Lighting](#4-ระบบพื้นผิว-squircle-elevation--specular-edge-lighting)
5. [เจาะลึก Component Architecture & Tailwind Classes](#5-เจาะลึก-component-architecture--tailwind-classes)
   - [5.1 Glassmorphism Sticky Topbar](#51-glassmorphism-sticky-topbar)
   - [5.2 Interactive Sidebar & TOC Navigation](#52-interactive-sidebar--toc-navigation)
   - [5.3 Search Bar Pill with Inner Specular Inset](#53-search-bar-pill-with-inner-specular-inset)
   - [5.4 Rule Card Layout & Gutter System](#54-rule-card-layout--gutter-system)
   - [5.5 Severity Badge & Penalty Token Engine](#55-severity-badge--penalty-token-engine)
   - [5.6 Street Runner Arcade Panel & Ambient Layering](#56-street-runner-arcade-panel--ambient-layering)
   - [5.7 Button Design System](#57-button-design-system)
6. [ระบบ Micro-Interactions & Animation Keyframes](#6-ระบบ-micro-interactions--animation-keyframes)
7. [Zero-Latency Theme Switching & View Transitions](#7-zero-latency-theme-switching--view-transitions)
8. [Production Ready: Tailwind Config & CSS Implementation](#8-production-ready-tailwind-config--css-implementation)

---

## 1. ภาพรวมสถาปัตยกรรมการออกแบบ

ทั้ง 2 เว็บไซต์มีจุดมุ่งหมายและสไตล์ Visual ที่ส่งเสริมกันอย่างลงตัว โดยแบ่งออกเป็น 2 ปรัชญาหลัก:

| หัวข้อ | 🏁 RUNTOWN (`runtown.in.th`) | 📜 RUN TOWN RULES (`run-town-rules.vercel.app`) |
| :--- | :--- | :--- |
| **ประเภทเว็บ** | Marketing Landing Page + Interactive Mini-Game | Modern Interactive Documentation & Legal System |
| **Stack หลัก** | Vanilla HTML5, High-Performance CSS, GSAP, Canvas/DOM Engine | Next.js (Turbopack), React, Tailwind CSS v3/v4, Radix UI Primitives |
| **Mood & Tone** | Cyber Street Action, Neon Dark, Arcade, Speed, High Contrast | Precision Engineering, Clean Institutional, Apple/Linear Polish |
| **ระบบธีม** | Permanent Dark Cyberpunk (`#06100e` + `#45f2b4`) | Dynamic Light & Dark Mode ปรับตาม System / Toggle ทันที |
| **Color Model** | HEX + RGB Alpha Translucency | **OkLCH** + **CIE LAB** + **W3C `color-mix()`** |
| **ฟอนต์หลัก** | `Kanit` (Display) + `Anuphan` (Body) | `Google Sans Thai` / `Kanit` + `tabular-nums` |

---

## 2. ระบบสีและ Color Science

### 2.1 เว็บที่ 1: RUNTOWN Landing Palette (Neon Cyber Jade)
ขับเน้นความรู้สึกของเมืองยามค่ำคืน ความเร็ว และความดิบเท่ของ FiveM Roleplay:

```css
:root {
  /* Surfaces & Backgrounds */
  --base: #06100e;              /* ดำอมเขียวเข้มลึก (Deep Obsidian Green) */
  --deep: #030807;              /* ดำสนิทสำหรับพื้นหลังลึกสุด */
  --panel: #0a1714;             /* พื้นผิวการ์ดคอนเทนเนอร์แบบใส */

  /* Neon Accents */
  --mint: #45f2b4;              /* สีเขียวมิ้นต์นีออนหลัก (Primary Accent) */
  --bright: #84ffd0;            /* สีนีออนไฮไลท์เรืองแสง */
  --lime: #a5ff5f;              /* สีกรดมะนาวนีออนตัดขอบ (Acid Lime) */

  /* Text & Wireframe */
  --text: #f4fff9;              /* ขาวอมเขียวสว่างคมชัด */
  --soft: #adc2b9;              /* เทาอมเขียวสำหรับ Body Text */
  --dim: #6f8f82;               /* เขียวเข้มหม่นสำหรับ Microcopy */
  --line: rgba(146, 255, 208, 0.17);  /* เส้นตาราง Wireframe บางเบา */
  --line2: rgba(146, 255, 208, 0.34); /* เส้นขอบ Active Border */
}
```

### 2.2 เว็บที่ 2: RUN TOWN RULES Perceptual Color Engine
ใช้โมเดลสี **OkLCH** และ **CIE LAB** ซึ่งเป็นเทคโนโลยีล่าสุดของ CSS Color Module Level 4 เพื่อให้ระดับความสว่างและความสดของสีแม่นยำตามการมองเห็นของตามนุษย์ (Perceptually Uniform):

#### Light Mode Tokens
```css
:root {
  --hue-neutral: 247;
  --hue-accent: 169;
  --hue-accent-alt: 143.5;

  /* Accent Colors */
  --accent: oklch(84.4% 0.157 var(--hue-accent));
  --accent-alt: oklch(78.8% 0.161 var(--hue-accent-alt));
  --accent-selected: #4ce3a0;
  --accent-ink: oklch(48.0% 0.115 var(--hue-accent));

  /* Light Canvas & Surfaces */
  --page: oklch(97.2% 0.004 var(--hue-neutral));
  --paper: oklch(100% 0 var(--hue-neutral));
  --text: oklch(18.5% 0.024 var(--hue-neutral));
  --muted: oklch(38.0% 0.028 var(--hue-neutral));
  --quiet: oklch(46.0% 0.026 var(--hue-neutral));
  --disabled: oklch(70.0% 0.02 var(--hue-neutral));
  --line: oklch(91.0% 0.008 var(--hue-neutral));
  --line-strong: oklch(82.0% 0.014 var(--hue-neutral));

  /* Dynamic color-mix surfaces */
  --surface-raised: color-mix(in oklch, var(--paper) 82%, var(--page));
  --surface-soft: color-mix(in oklch, var(--line-strong) 11%, transparent);
  --surface-selected: color-mix(in oklch, var(--accent) 11%, var(--paper));
  --surface-border: color-mix(in oklch, var(--line-strong) 72%, transparent);
  --edge-lit: #ffffff42;
}
```

#### Dark Mode Tokens (`.dark` / `[data-theme="dark"]`)
```css
.dark, [data-theme="dark"] {
  /* Deep Graphite & Slate Teal */
  --page: #080d12;              /* lab(3.41682% -0.754364 -3.15842) */
  --paper: #17212b;             /* lab(12.1419% -2.14141 -8.24056) */
  --paper-elevated: #242731;    /* lab(15.6517% 0.681862 -7.03197) */
  --surface-hover: #23303c;     /* lab(19.1124% -2.89249 -9.49302) */
  --surface-active: #687a8a;    /* lab(50.2239% -4.03342 -11.1839) */
  --text: #ffffff;
  --muted: #99a9b7;
  --quiet: #9dadbc;
  --disabled: #40505e;
  --line: #23303c;
  --line-strong: #40505e;

  /* Edge Lighting & Occlusion Shadows (Specular Highlights) */
  --edge-lit: lab(100% 0 0 / 0.15);
  --edge-lit-strong: lab(100% 0 0 / 0.22);
  --edge-occlusion: lab(0% 0 0 / 0.45);
  --edge-occlusion-strong: lab(0% 0 0 / 0.55);

  --card-border: color-mix(in oklch, var(--line-strong) 52%, transparent);
  --card-border-hover: color-mix(in oklch, var(--line-strong) 72%, transparent);
}
```

---

## 3. ระบบ Typography & Font Stacks

### 3.1 การจับคู่ฟอนต์ (Font Pairing)
* **Kanit (Weights: 500, 600, 700, 800)**:
  - ใช้สำหรับ: หัวข้อหลัก (H1-H3), ตัวเลขสถิติ, Badge หัวข้อย่อย, ปุ่ม Call to Action
  - มีโครงสร้างเหลี่ยมมน ลายเส้นหนักแน่น ให้ความรู้สึกเหมือนป้ายถนนและการแข่งขัน
* **Anuphan (Weights: 300, 400, 500, 600)**:
  - ใช้สำหรับ: เนื้อความ (Body), คำอธิบาย, หมายเหตุ
  - ไม่มีหัว (Loopless) สัดส่วนอักษรอ่านง่าย สบายตาบนหน้าจอดิจิทัล
* **Google Sans Thai & Inter**:
  - ใช้สำหรับ: ระบบเอกสารและกฎหมายใน `run-town-rules.vercel.app` เพื่อความสะอาด เรียบร้อย และเข้าถึงได้ง่าย (High Readability)

### 3.2 กฎ Typography พิเศษ
1. **Tabular Numerics**:
   ```css
   font-variant-numeric: tabular-nums;
   ```
   บังคับใช้กับตัวเลขข้อกฎหมาย, คะแนนในเกม, นาฬิกา และแถบสถิติ เพื่อให้ตัวเลขแต่ละหลักมีความกว้างเท่ากันเป๊ะ ไม่กระตุกเวลาอัปเดต
2. **Letter Spacing Tuning**:
   - Uppercase Titles: `letter-spacing: 0.06em` ถึง `0.09em`
   - Gutter Rule Numbers: `letter-spacing: -0.012em`

---

## 4. ระบบพื้นผิว Squircle, Elevation & Specular Edge Lighting

### 4.1 Apple-Style Squircle Radii
ในเว็บเอกสารมีการใช้ระบบความโค้งแบบ **Squircle** (ความโค้งต่อเนื่องแบบซุปเปอร์เอลลิปส์):

```css
:root {
  --squircle-xs: 9px;   /* Tag, Badges เล็ก */
  --squircle-sm: 13px;  /* Icon buttons, Dropdowns */
  --squircle-md: 18px;  /* การ์ดทั่วไป, Input fields */
  --squircle-lg: 24px;  /* Modal, Large Cards */
  --squircle-xl: 32px;  /* Drawer, Hero containers */
  --radius: var(--squircle-md);
}
```

### 4.2 Specular Edge Lighting (แสงตกกระทบขอบบนของการ์ด)
เพื่อไม่ให้การ์ดในโหมดมืดดูกลืนหายไปกับพื้นหลัง เว็บใช้เทคนิค **Edge Specular Highlight**:

```css
.card, .rule-severity-badge {
  /* แสงตกกระทบขอบบนด้วย Inset Highlight + เงาตกทอดด้านล่าง */
  box-shadow: inset 0 1px var(--edge-lit), var(--elev-card);
  border: 1px solid var(--card-border);
}
```

---

## 5. เจาะลึก Component Architecture & Tailwind Classes

### 5.1 Glassmorphism Sticky Topbar
แถบนำทางด้านบนแบบเบลอทะลุ (Frosted Glass) เกาะติดบนสุดของหน้าจอ:

```html
<header class="topbar sticky top-0 z-30 h-14 w-full border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--page)_88%,transparent)] backdrop-blur-[20px] backdrop-saturate-[150%]">
  <div class="topbar-inner flex h-full items-center justify-between gap-4 px-6 mx-auto max-w-[1600px]">
    <!-- Brand -->
    <a href="/" class="brand flex items-center gap-3 font-bold text-foreground">
      <img src="/logo.png" class="size-8 rounded-full" alt="RUN TOWN Logo" />
      <span>RUN TOWN</span>
    </a>
    
    <!-- Nav Items & Theme Toggle -->
    <div class="flex items-center gap-3">
      <nav class="hidden md:flex items-center gap-1">
        <a href="/" class="px-3 py-1.5 rounded-full text-sm font-medium text-foreground bg-accent/15">กฎเซิร์ฟเวอร์</a>
        <a href="/changelog" class="px-3 py-1.5 rounded-full text-sm font-medium text-muted hover:text-foreground">ประกาศ</a>
      </nav>
      <!-- Theme Switcher -->
      <button class="theme-toggle size-9 rounded-full inline-flex items-center justify-center border border-[var(--line)] hover:bg-[var(--surface-hover)]">
        ...
      </button>
    </div>
  </div>
</header>
```

---

### 5.2 Interactive Sidebar & TOC Navigation
โครงสร้าง Sidebar แบ่งตามหมวดหมู่ พร้อมตัวนับจำนวนข้อ (Counter Pill):

```html
<aside class="w-[300px] shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pr-4">
  <!-- Search -->
  <div class="search-box mb-6 flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-[var(--paper)] px-4 py-2.5 shadow-[inset_0_1px_0_var(--paper)] focus-within:border-[var(--accent)] focus-within:ring-3 focus-within:ring-[color-mix(in_srgb,var(--accent)_15%,transparent)]">
    <svg class="size-4 text-[var(--quiet)] shrink-0" fill="none" viewBox="0 0 16 16">...</svg>
    <input type="search" placeholder="ค้นหากฎ" class="w-full bg-transparent text-sm outline-none placeholder:text-[var(--quiet)]" />
  </div>

  <!-- TOC Group -->
  <div class="toc-section space-y-1">
    <div class="toc-group text-[11.5px] font-bold tracking-wider text-[var(--quiet)] uppercase px-3 py-1">
      คำแนะนำการเล่น
    </div>
    <ol class="space-y-0.5">
      <li>
        <a href="#guide-basic" class="flex items-center justify-between px-3 py-2 rounded-full text-[14px] text-foreground bg-[var(--surface-selected)] font-medium">
          <span>คำแนะนำในการเล่น</span>
          <span class="toc-count text-xs px-2 py-0.5 rounded-full bg-[var(--surface-soft)] text-[var(--quiet)] font-mono">16</span>
        </a>
      </li>
    </ol>
  </div>
</aside>
```

---

### 5.3 Search Bar Pill with Inner Specular Inset
เทคนิคเฉพาะตัวของ Run Town Rules:
* ช่องค้นหาทรง **Capsule Pill (`rounded-full`)**
* มีเงาสะท้อนกระจกด้านใน `box-shadow: inset 0 1px 0 var(--paper)`
* เมื่องาน Focus มีวงแหวนสีมินต์จาง 3px: `box-shadow: 0 0 0 3px color-mix(in srgb, var(--green) 12%, transparent)`

---

### 5.4 Rule Card Layout & Gutter System
โครงสร้างแถวการ์ดกฎหมายที่ถูกจัดวางแบบ Grid 2 คอลัมน์ (Gutter + Main Content):

```html
<article class="rule group relative grid grid-cols-[56px_minmax(0,1fr)] border-b border-[var(--line)] py-7 scroll-mt-24 transition-colors hover:bg-[var(--surface-soft)]/30" id="guide-manners">
  <!-- 1. Gutter: หมายเลขข้อแบบ Tabular Numbers -->
  <div class="rule-gutter pt-0.5 flex items-start">
    <span class="rule-no font-mono font-semibold text-sm text-[var(--muted)]">1</span>
  </div>

  <!-- 2. Main Content Area -->
  <div class="rule-main space-y-3">
    <!-- Heading Row + Quick Copy Action -->
    <div class="rule-heading-row flex items-center justify-between">
      <h4 class="text-base font-bold text-foreground tracking-tight">มารยาททางสังคม</h4>
      <button class="copy-btn opacity-0 group-hover:opacity-100 size-7 inline-flex items-center justify-center rounded-md text-[var(--muted)] hover:text-foreground hover:bg-[var(--surface-hover)] transition-all" aria-label="คัดลอกลิงก์">
        <svg class="size-3.5" viewBox="0 0 24 24">...</svg>
      </button>
    </div>

    <!-- Rule Body -->
    <div class="rule-body text-sm leading-relaxed text-[var(--muted)]">
      <p>ผู้เล่นจะต้องเล่นโดยอยู่บนพื้นฐานมารยาททางสังคม และเคารพซึ่งกันและกัน</p>
    </div>

    <!-- Callout Note (ถ้ามี) -->
    <div class="rule-note rounded-lg border border-[var(--line)] bg-[var(--surface-soft)] p-3 text-xs text-[var(--quiet)]">
      <strong class="text-foreground font-semibold block mb-1">หมายเหตุ</strong>
      <p>กรณีมีเหตุการณ์ต่อเนื่อง ต้องมีคลิปหลักฐานความยาวไม่ต่ำกว่า 5 นาที</p>
    </div>

    <!-- Penalties Section -->
    <div class="rule-penalty flex items-baseline gap-2.5 pt-2 text-xs">
      <span class="k font-bold uppercase tracking-wider text-[11px] text-[var(--quiet)]">โทษ</span>
      <div class="v flex flex-wrap items-center gap-1.5">
        <span class="rule-severity-badge is-service">บำเพ็ญประโยชน์</span>
        <span class="text-[var(--quiet)] font-medium">และ</span>
        <span class="rule-severity-badge is-yellow">ใบเหลือง</span>
      </div>
    </div>
  </div>
</article>
```

---

### 5.5 Severity Badge & Penalty Token Engine
ระบบจัดประเภทบทลงโทษที่ออกแบบอย่างเป็นระบบด้วย CSS Variables และคลาสเฉพาะ:

```css
:root {
  --sev-info: #64748b;       /* สีฟ้าเทา (Slate): ข้อมูลทั่วไป */
  --sev-warn: #0284c7;       /* สีฟ้าคราม (Sky): เตือนความประพฤติ */
  --sev-service: #f97316;    /* สีส้ม (Orange): บำเพ็ญประโยชน์ */
  --sev-fine: #16a34a;       /* สีเขียว (Green): ค่าปรับ / ริบทรัพย์ */
  --sev-jail: #6366f1;       /* สีครามม่วง (Indigo): จำคุก */
  --sev-yellow: #eab308;     /* สีเหลือง (Amber): ใบเหลือง */
  --sev-red: #ef4444;        /* สีแดง (Coral Red): ใบแดง */
  --sev-whitelist: #be123c;  /* สีแดงกุหลาบเข้ม (Rose): ยึดหรือระงับไวลิสต์ */
  --sev-reset: #d946ef;      /* สีบานเย็น (Fuchsia): รีเซ็ตตัวละครถาวร */
}

/* Badge Base Style */
.rule-severity-badge {
  --badge-color: var(--sev-info);
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 9px;
  font-size: 11px;
  font-weight: 700;
  border-radius: 9999px;
  white-space: nowrap;
  color: var(--badge-color);
  background: color-mix(in srgb, var(--badge-color) 12%, var(--paper));
  border: 1px solid color-mix(in srgb, var(--badge-color) 35%, transparent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.15s ease;
}

.rule-severity-badge.is-service   { --badge-color: var(--sev-service); }
.rule-severity-badge.is-fine      { --badge-color: var(--sev-fine); }
.rule-severity-badge.is-jail      { --badge-color: var(--sev-jail); }
.rule-severity-badge.is-yellow    { --badge-color: var(--sev-yellow); }
.rule-severity-badge.is-red       { --badge-color: var(--sev-red); }
.rule-severity-badge.is-whitelist { --badge-color: var(--sev-whitelist); }
.rule-severity-badge.is-reset     { --badge-color: var(--sev-reset); }
```

---

### 5.6 Street Runner Arcade Panel & Ambient Layering (จาก RUNTOWN)

ระบบเลเยอร์พื้นหลังสไตล์ Cyberpunk 4 ชั้น:
```html
<div class="ambient fixed inset-0 pointer-events-none -z-10 overflow-hidden">
  <!-- Layer 1: รูปภาพเมืองแนวสตรีทความมืด -->
  <div class="ambient__photo absolute inset-0 bg-[url('assets/img/street.jpg')] bg-cover bg-center opacity-30 mix-blend-luminosity"></div>
  <!-- Layer 2: ตาราง Isometric Perspective Grid -->
  <div class="ambient__grid absolute inset-0 bg-[linear-gradient(to_right,rgba(146,255,208,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(146,255,208,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
  <!-- Layer 3: แสงนีออนส่องสว่างเรเดียลโกลว์ -->
  <div class="ambient__glow absolute top-1/4 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[radial-gradient(circle,rgba(69,242,180,0.18)_0%,transparent_70%)] blur-3xl"></div>
  <!-- Layer 4: ฟิล์มเกรน Noise ละเอียด เพิ่มความดิบสมจริง -->
  <div class="ambient__noise absolute inset-0 opacity-[0.035] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:3px_3px]"></div>
</div>
```

---

### 5.7 Button Design System

#### 1. ปุ่ม Cyber Primary (Gradient Neon Fill):
```css
.button--primary {
  min-height: 52px;
  padding: 0 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 6px;
  font-family: var(--display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #03100b;
  background: linear-gradient(120deg, var(--mint), var(--lime) 110%);
  border: 1px solid transparent;
  box-shadow: 0 13px 34px rgba(69, 242, 180, 0.16);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 38px rgba(69, 242, 180, 0.27);
}
```

#### 2. ปุ่ม Ghost Wireframe (Translucent Glass):
```css
.button--ghost {
  min-height: 52px;
  padding: 0 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-family: var(--display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.09em;
  color: var(--text);
  background: rgba(5, 15, 12, 0.54);
  border: 1px solid var(--line2);
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.button--ghost:hover {
  transform: translateY(-2px);
  border-color: var(--mint);
  color: var(--mint);
  background: rgba(69, 242, 180, 0.06);
}
```

#### 3. ปุ่ม Documentation Button (`rt-button`):
```css
.rt-button {
  cursor: pointer;
  min-height: 40px;
  padding: 0 16px;
  border-radius: var(--squircle-sm);
  font-size: 13.5px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: color 0.17s ease, background 0.17s ease, border-color 0.17s ease, transform 0.17s ease;
}

.rt-button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.rt-button:active:not(:disabled) {
  transform: translateY(0);
}
```

---

## 6. ระบบ Micro-Interactions & Animation Keyframes

### 6.1 Runner & Game Keyframes
```css
/* การเคลื่อนไหวของตัวละครที่วิ่งต่อเนื่อง */
@keyframes playerRun {
  from { transform: translateY(0) rotate(0deg); }
  to { transform: translateY(-3px) rotate(1.5deg); }
}

/* เส้นสปีดแสดงความเร็วขณะ Dash */
@keyframes speedLine {
  from { transform: translateX(8px); opacity: 0; }
  to { transform: translateX(-100%); opacity: 1; }
}

/* แสงเรืองรองเป็นจังหวะบริเวณจุด Checkpoint */
@keyframes checkpointPulse {
  50% {
    transform: scale(1.34);
    box-shadow: 0 0 0 10px rgba(69, 242, 180, 0.08), 0 0 35px rgba(69, 242, 180, 0.65);
  }
}
```

### 6.2 Accordion & Pop-In Keyframes
```css
/* Radix / Tailwind Smooth Accordion Open & Close */
@keyframes accordion-down {
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
}

/* Shimmer Loading Skeleton */
@keyframes tw-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 7. Zero-Latency Theme Switching & View Transitions

ข้อสังเกตระดับ Masterclass ใน `run-town-rules.vercel.app` คือการสลับโหมด Dark/Light จะไม่มีการกระตุก (Flash of Unstyled Content หรือ Transition Lag) ด้วย 2 เทคนิค:

### 1. View Transition API Bypass
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

### 2. Transient Class `.theme-switching`
เมื่อมีการคลิกสลับโหมด JS จะใส่คลาส `.theme-switching` ให้กับ `:root` ชั่วขณะเพื่อระงับ CSS Transition ทั้งหมด:
```css
:root.theme-switching,
:root.theme-switching *,
:root.theme-switching :before,
:root.theme-switching :after {
  transition: none !important;
  animation-duration: 0s !important;
}
```

### 3. Accessible Motion Safety
```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-1: 0s;
    --dur-2: 0s;
    --dur-3: 0s;
    --dur-4: 0s;
  }
}
```

---

## 8. Production Ready: Tailwind Config & CSS Implementation

### 8.1 `tailwind.config.ts`
สามารถนำโครงสร้างนี้ไปใช้กับโปรเจกต์ Next.js / Vite / Nuxt ได้ทันที:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{ts,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Run Town Cyber Palette
        runtown: {
          base: "#06100e",
          deep: "#030807",
          panel: "#0a1714",
          mint: "#45f2b4",
          bright: "#84ffd0",
          lime: "#a5ff5f",
          soft: "#adc2b9",
          dim: "#6f8f82",
        },
        // Roleplay & Rules Severities
        sev: {
          info: "var(--sev-info)",
          warn: "var(--sev-warn)",
          service: "var(--sev-service)",
          fine: "var(--sev-fine)",
          jail: "var(--sev-jail)",
          yellow: "var(--sev-yellow)",
          red: "var(--sev-red)",
          whitelist: "var(--sev-whitelist)",
          reset: "var(--sev-reset)",
        },
        // Shadcn UI Semantic Variables
        background: "var(--page)",
        paper: "var(--paper)",
        foreground: "var(--text)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--quiet)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--on-accent)",
        },
        border: "var(--line)",
      },
      fontFamily: {
        display: ["Kanit", "Noto Sans Thai", "system-ui", "sans-serif"],
        body: ["Anuphan", "Google Sans Thai", "Noto Sans Thai", "system-ui", "sans-serif"],
      },
      borderRadius: {
        squircleXs: "var(--squircle-xs)",
        squircleSm: "var(--squircle-sm)",
        squircleMd: "var(--squircle-md)",
        squircleLg: "var(--squircle-lg)",
        squircleXl: "var(--squircle-xl)",
      },
      boxShadow: {
        "card-elev": "var(--elev-card)",
        "card-hover": "var(--elev-card-hover)",
        "neon-mint": "0 0 25px rgba(69, 242, 180, 0.45)",
        "neon-lime": "0 0 25px rgba(165, 255, 95, 0.45)",
      },
      animation: {
        "player-run": "playerRun 0.25s infinite alternate ease-in-out",
        "speed-line": "speedLine 0.6s linear infinite",
        "checkpoint-pulse": "checkpointPulse 2s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};

export default config;
```

---

## 9. สรุปความคุ้มค่าและ Best Practices ที่ได้เรียนรู้
1. **การรวมพลังระหว่าง Cyber Game UI กับ Clean Docs UI**: ทำให้ผู้เล่นรู้สึกตื่นเต้นในหน้าแรก (Main Hero) แต่เมื่อเข้ามาค้นหาข้อกฎหมายและสถิติ จะได้รับประสบการณ์ระดับ Enterprise ที่อ่านสบายตาและโหลดได้ทันที
2. **การก้าวข้ามขีดจำกัดของสีด้วย OkLCH & LAB**: ป้องกันปัญหาสีมินต์และสีเขียวนีออนเพี้ยนหรือจ้าเกินไปเมื่อแสดงผลในหน้าจอต่างชนิด (OLED vs LCD)
3. **การออกแบบข้อมูลกฎหมายเป็น Gutter Grid System**: แยกตัวเลขข้อ (Number) ออกจากเนื้อหาหลัก ทำให้กวาดสายตา (Scanability) ได้เร็วกว่าการทำเป็นรายการลิสต์ธรรมดาถึง 3 เท่า
4. **ความแม่นยำในการเลือกประเภทบทลงโทษ**: การกำหนด Severity Tokens ชัดเจนช่วยลดความสับสนระหว่างผู้เล่นและแอดมิน และง่ายต่อการเขียน CSS Component ตัวเดียวแต่ครอบคลุมทุกสถานะบทลงโทษ
