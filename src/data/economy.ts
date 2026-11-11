// Single Source of Truth (SSOT) for RUN TOWN FiveM Economy, Logistics & Survival Mechanics
// Verified against src/content/guides/{jobs,logistics,survival,food}/*.md

export const PLAYER_MAX_CARRY_KG = 30;
export const TRADING_BUFFER_KG = 10;
export const PLAYER_SAFE_CARRY_KG = PLAYER_MAX_CARRY_KG - TRADING_BUFFER_KG; // 20 kg safe carry

export const SURVIVAL_RATES = {
  /** Action fatigue added per gathered raw item (+0.10%/piece) */
  BRAIN_GATHER_ACTION_PCT: 0.1,
  /** Action fatigue added per processed/packed item (+0.25%/piece) */
  BRAIN_PROCESS_ACTION_PCT: 0.25,
  /** Passive time fatigue while awake (+0.42%/min = ~25%/hr = 100% Anti-AFK cap at 4 hrs) */
  BRAIN_PASSIVE_PCT_PER_MIN: 0.42,
  /** Standard processing duration per piece (seconds) */
  PROCESS_SEC_PER_PIECE: 5,
  /** Speed buff multiplier (+25% faster processing/packing) */
  SPEED_BUFF_MULTIPLIER: 0.75,
  /** Guide HUD amber indicator threshold (no in-game warning before 100%) */
  BRAIN_CAUTION_GUIDE_PCT: 50,
  /** Guide HUD red indicator threshold (no in-game warning before 100%) */
  BRAIN_CRITICAL_GUIDE_PCT: 80,
  /** Exact threshold where the character faints/dies immediately */
  BRAIN_FAINT_PCT: 100,
  /** Constant hunger decay (-0.7246%/min, -7.25%/10 min, 0% in ~138 min) */
  HUNGER_DROP_PCT_PER_MIN: 0.7246,
  /** Displayed UI hunger rate */
  HUNGER_DROP_PCT_PER_MIN_DISPLAY: 0.72,
  /** In-game HUD turns red below this percentage (~27 min remaining) */
  HUNGER_RED_ZONE_PCT: 20,
  /** Health HP drain per second once hunger or thirst hits 0% */
  STARVATION_HP_DRAIN_PER_SEC: 1,
} as const;

export interface VehicleTier {
  id: '60kg' | '120kg' | '150kg';
  trunkKg: number;
  label: string;
  shortLabel: string;
  safeTotalKg: number;
  guideUrl: string;
}

export const VEHICLE_TIERS: readonly VehicleTier[] = [
  {
    id: '60kg',
    trunkKg: 60,
    label: 'รถเล็ก 60 กก.',
    shortLabel: 'รถ 60 โล',
    safeTotalKg: 60 + PLAYER_SAFE_CARRY_KG,
    guideUrl: '/guides/logistics/vehicle-60kg',
  },
  {
    id: '120kg',
    trunkKg: 120,
    label: 'รถกลาง 120 กก.',
    shortLabel: 'รถ 120 โล',
    safeTotalKg: 120 + PLAYER_SAFE_CARRY_KG,
    guideUrl: '/guides/logistics/vehicle-120kg',
  },
  {
    id: '150kg',
    trunkKg: 150,
    label: 'รถใหญ่ 150 กก.',
    shortLabel: 'รถ 150 โล',
    safeTotalKg: 150 + PLAYER_SAFE_CARRY_KG,
    guideUrl: '/guides/logistics/vehicle-150kg',
  },
] as const;

export interface WhiteJobStage {
  num: string;
  name: string;
  en: string;
  desc: string;
  timeSec: number;
  zone: string;
  spotId: string;
  image: string;
}

export interface WhiteJobSpec {
  id:
    | 'woodcutting'
    | 'mining'
    | 'wheat'
    | 'smelting'
    | 'pork'
    | 'flowers'
    | 'crystal'
    | 'kitchen';
  name: string;
  en: string;
  shortName: string;
  icon: string;
  toolName: string;
  toolCostRD: number | null;
  toolBreakChancePct: number | null;
  rawWeightKg: number;
  packedWeightKg: number | null;
  gatherSec: number | null;
  processSec: number | null;
  packSec: number | null;
  ecoPricesRD: {
    raw?: number;
    processed?: number;
    packed?: number;
    hospital?: number;
    npcOrderMin?: number;
    npcOrderMax?: number;
    npcPerPiece?: number;
  };
  p2pLabel?: string;
  guideUrl: string;
  stages: WhiteJobStage[];
}

export const WHITE_JOBS: readonly WhiteJobSpec[] = [
  {
    id: 'woodcutting',
    name: 'ตัดไม้',
    en: 'WOODCUTTING',
    shortName: 'ตัดไม้',
    icon: '🪓',
    toolName: 'ขวานตัดไม้ (Axe)',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.5,
    packedWeightKg: 1.0,
    gatherSec: 10,
    processSec: 5,
    packSec: 5,
    ecoPricesRD: { raw: 99, processed: 171, packed: 479 },
    p2pLabel: '500–600 RD/กล่อง',
    guideUrl: '/guides/jobs/woodcutting',
    stages: [
      {
        num: '01',
        name: 'จุดตัดไม้ดิบ (Paleto Forest)',
        en: 'HARVEST RAW WOOD',
        desc: 'ขับขึ้นเหนือสุดที่ป่าสน Paleto Forest ใช้ขวาน (200 RD / โอกาสพัง 2%) กดตัดท่อนไม้ 10 วิ/ชิ้น ได้ไม้ดิบ 0.50 กก.',
        timeSec: 10,
        zone: 'Paleto Forest',
        spotId: 'wood-farm',
        image: '/maps/spots/wood_farm.png',
      },
      {
        num: '02',
        name: 'โรงเลื่อยแปรรูป (Paleto Sawmill)',
        en: 'PROCESS WOOD PLANKS',
        desc: 'ขับเลียบทางรถไฟเข้าโรงเลื่อย Paleto Bay นำไม้ดิบเข้าเครื่องแปรรูปเป็นไม้แปร อัตราส่วน 1:1 (5 วิ/ชิ้น)',
        timeSec: 5,
        zone: 'Paleto Sawmill',
        spotId: 'wood-pro',
        image: '/maps/spots/wood_pro.png',
      },
      {
        num: '03',
        name: 'โกดังแพ็คกล่องสินค้า (ท่าเรือใต้)',
        en: 'PACKAGING BOXES',
        desc: 'ขนไม้แปรรูปลงมาที่โกดังท่าเรือใต้ (Elysian Island) ใช้ไม้แปรรูป 2 ชิ้นแพ็คเป็น 1 กล่องน้ำหนัก 1.00 กก. (5 วิ/กล่อง)',
        timeSec: 5,
        zone: 'Industrial Docks',
        spotId: 'wood-pack',
        image: '/maps/spots/wood_pack.png',
      },
      {
        num: '04',
        name: 'จุดรับซื้อไม้รับเงินสด (El Burro Heights)',
        en: 'EXPORT & CASH OUT',
        desc: 'ส่งขายร้านค้า Eco รับ 479 RD/กล่อง (ขายผู้เล่น P2P ได้ 500–600 RD/กล่อง) แพงที่สุดในงานขาว',
        timeSec: 0,
        zone: 'El Burro Heights',
        spotId: 'wood-sell',
        image: '/maps/spots/wood_sell.png',
      },
    ],
  },
  {
    id: 'mining',
    name: 'ขุดแร่ & อัญมณี',
    en: 'MINING',
    shortName: 'ขุดแร่',
    icon: '⛏️',
    toolName: 'อีเตอร์ขุดหิน (Pickaxe)',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.5,
    packedWeightKg: null,
    gatherSec: 10,
    processSec: 5,
    packSec: null,
    ecoPricesRD: { processed: 400 },
    p2pLabel: 'Copper 400 · Gold 600 · Diamond 10,000 RD (1%)',
    guideUrl: '/guides/jobs/mining',
    stages: [
      {
        num: '01',
        name: 'เหมืองหิน Davis Quartz',
        en: 'QUARRY EXCAVATION',
        desc: 'ขับไปเหมืองหิน Davis Quartz ใช้อีเตอร์ (200 RD / พัง 2%) ขุดก้อนหินดิบ 10 วิ/ก้อน (0.50 กก.)',
        timeSec: 10,
        zone: 'Davis Quartz Quarry',
        spotId: 'mine-pit',
        image: '/maps/spots/mine_farm.png',
      },
      {
        num: '02',
        name: 'จุดโพลหิน & คัดแยกแร่',
        en: 'CRUSH & EXTRACT ORE',
        desc: 'ทุบแยกแร่ปากทางเหมือง (5 วิ/ก้อน) ลุ้นรับ Copper 60%, Gold 40% และ Diamond 1%',
        timeSec: 5,
        zone: 'Davis Quartz Gate',
        spotId: 'stone-pro',
        image: '/maps/spots/mine_stone_pro.png',
      },
      {
        num: '03',
        name: 'โรงหลอมโลหะ Cypress Flats (Copper)',
        en: 'SMELT COPPER INGOTS',
        desc: 'นำ Raw Copper เข้าเตาหลอมโซน Cypress Flats (5 วิ/ชิ้น) ได้ Copper Ingot มูลค่า 400 RD และใช้ทำคริสตัล',
        timeSec: 5,
        zone: 'Cypress Flats',
        spotId: 'copper-smelt',
        image: '/maps/spots/copper_smelt.png',
      },
      {
        num: '04',
        name: 'โรงหลอมทองคำใต้ (Gold & Diamond)',
        en: 'SMELT GOLD & CASHOUT',
        desc: 'หลอม Raw Gold ที่โรงงานท่าเรือใต้รับ 600 RD/แท่ง ส่วน Diamond 1% ขายได้ทันที 10,000 RD',
        timeSec: 5,
        zone: 'South Harbor',
        spotId: 'gold-smelt',
        image: '/maps/spots/gold_smelt.png',
      },
    ],
  },
  {
    id: 'wheat',
    name: 'ฟาร์มข้าวสาลี',
    en: 'WHEAT FARMING',
    shortName: 'ฟาร์มข้าว',
    icon: '🌾',
    toolName: 'เคียวเกี่ยวข้าว (Sickle)',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.5,
    packedWeightKg: 1.0,
    gatherSec: 10,
    processSec: 5,
    packSec: 5,
    ecoPricesRD: { raw: 77, processed: 134, packed: 368 },
    p2pLabel: '100 RD/ต้น (เลี้ยงหมู/ทำแป้ง)',
    guideUrl: '/guides/jobs/wheat',
    stages: [
      {
        num: '01',
        name: 'ทุ่งนาข้าว Grapeseed',
        en: 'HARVEST WHEAT',
        desc: 'ขับไปทุ่งนา Grapeseed ใช้เคียวเกี่ยวข้าว (200 RD / พัง 2%) เกี่ยว 10 วิ/ชิ้น ได้รวงข้าวดิบ 0.50 กก.',
        timeSec: 10,
        zone: 'Grapeseed Fields',
        spotId: 'wheat-farm',
        image: '/maps/spots/wheat_farm.png',
      },
      {
        num: '02',
        name: 'โรงสีข้าว Grapeseed Mill',
        en: 'GRAIN MILLING',
        desc: 'ขับแค่ 1 กม. มาที่โรงสีข้าว แปรรูปเป็น Rice Grain (5 วิ/ชิ้น) ใช้เลี้ยงหมู ปิ้งแป้งเคบับ หรือส่งผู้เล่น ~100 RD',
        timeSec: 5,
        zone: 'Grapeseed Mill',
        spotId: 'wheat-pro',
        image: '/maps/spots/wheat_pro.png',
      },
      {
        num: '03',
        name: 'โกดังแพ็คกล่องข้าว',
        en: 'WHEAT PACKAGING',
        desc: 'นำข้าวสาร 2 ชิ้นแพ็คลงกล่องที่โกดังท่าเรือใต้ (5 วิ/กล่อง) น้ำหนัก 1.00 กก.',
        timeSec: 5,
        zone: 'Industrial Docks',
        spotId: 'wheat-pack',
        image: '/maps/spots/wheat_pack.png',
      },
      {
        num: '04',
        name: 'จุดรับซื้อข้าว Morningwood',
        en: 'WHEAT EXPORT',
        desc: 'นำกล่องข้าวไปขายรับเงินสด Eco 368 RD/กล่อง (ดิบ 77 / โพล 134 / กล่อง 368 RD)',
        timeSec: 0,
        zone: 'Morningwood',
        spotId: 'wheat-sell',
        image: '/maps/spots/wheat_sell.png',
      },
    ],
  },
  {
    id: 'smelting',
    name: 'จี่เหล็กอุตสาหกรรม',
    en: 'SMELTING STEEL',
    shortName: 'จี่เหล็ก',
    icon: '🔧',
    toolName: 'ถุงมือเก็บเหล็ก (Gloves)',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.25,
    packedWeightKg: null,
    gatherSec: 10,
    processSec: 5,
    packSec: null,
    ecoPricesRD: { raw: 83, processed: 233 },
    p2pLabel: '233–240 RD/แท่ง (คราฟต์อาวุธ)',
    guideUrl: '/guides/jobs/smelting',
    stages: [
      {
        num: '01',
        name: 'กองซากรถในเมือง (Cypress Flats)',
        en: 'SCAVENGE SCRAP METAL',
        desc: 'ใส่ถุงมือ (200 RD / พัง 2%) เก็บเศษเหล็ก 10 วิ/รอบ ได้ทีละ 2 ชิ้น (0.25 กก./ชิ้น = 0.50 กก./รอบ)',
        timeSec: 10,
        zone: 'Cypress Flats',
        spotId: 'scrap-farm-1',
        image: '/maps/spots/scrap_farm_1.png',
      },
      {
        num: '02',
        name: 'กองซากรถทะเลทราย (Grand Senora)',
        en: 'DESERT SCRAP YARD',
        desc: 'จุดทางเลือกนอกเมืองโซน Senora เก็บเศษเหล็ก 2 ชิ้นต่อรอบได้รวดเร็วไม่แออัด',
        timeSec: 10,
        zone: 'Grand Senora',
        spotId: 'scrap-farm-2',
        image: '/maps/spots/scrap_farm_2.png',
      },
      {
        num: '03',
        name: 'เตาหลอมเหล็กเส้น (2:1)',
        en: 'STEEL SMELTER',
        desc: 'นำเศษเหล็ก 2 ชิ้นหลอมเป็น Steel Ingot 1 แท่ง (0.50 กก., ใช้เวลา 5 วิ/แท่ง) ค่าสมองรวม ~3.42%/นาที',
        timeSec: 5,
        zone: 'La Puerta Smelter',
        spotId: 'steel-pro',
        image: '/maps/spots/steel_pro.png',
      },
      {
        num: '04',
        name: 'ขาย Eco 233 RD หรือตลาดผู้เล่น',
        en: 'SELL STEEL INGOTS',
        desc: 'ขายระบบ Eco ได้ 233 RD/แท่ง หรือขายผู้เล่นสายคราฟต์อาวุธ/อู่ช่าง 233–240 RD/แท่ง',
        timeSec: 0,
        zone: 'La Puerta Smelter',
        spotId: 'steel-pro',
        image: '/maps/spots/steel_pro.png',
      },
    ],
  },
  {
    id: 'pork',
    name: 'ฟาร์มเลี้ยงหมู',
    en: 'PIG FARMING',
    shortName: 'เลี้ยงหมู',
    icon: '🐷',
    toolName: 'มีดชำแหละ & ถุงอาหารหมู',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.5,
    packedWeightKg: 1.0,
    gatherSec: 900,
    processSec: 5,
    packSec: 5,
    ecoPricesRD: { raw: 97, processed: 149, packed: 380 },
    p2pLabel: '130–150 RD/ชิ้น (ส่งสายครัว)',
    guideUrl: '/guides/jobs/pig',
    stages: [
      {
        num: '01',
        name: 'คอกเลี้ยงหมู Grand Senora (15 นาที = 60 ชิ้น)',
        en: 'RAISE LIVESTOCK',
        desc: 'ให้อาหารหมูแล้วพักรอโต 15 นาที เก็บด้วยมีด (200 RD / พัง 2%) ได้เนื้อหมูสด 60 ชิ้น/คอก (ชิ้นละ 0.50 กก.)',
        timeSec: 900,
        zone: 'Grand Senora Desert',
        spotId: 'pork-farm',
        image: '/maps/spots/pork_farm.png',
      },
      {
        num: '02',
        name: 'โรงชำแหละเนื้อหมู Cypress Flats',
        en: 'MEAT PROCESSING',
        desc: 'ขับลงใต้เพียง 4 กม. เข้าโรงชำแหละแปรรูปหมูดิบเป็นหมูแปรรูป (5 วิ/ชิ้น)',
        timeSec: 5,
        zone: 'Cypress Flats',
        spotId: 'pork-pro',
        image: '/maps/spots/pork_pro.png',
      },
      {
        num: '03',
        name: 'โกดังแพ็คหมูกล่องสินค้า',
        en: 'PORK PACKAGING',
        desc: 'แพ็คเนื้อหมูแปรรูป 2 ชิ้นลงกล่องลัง 1.00 กก. ที่โกดังท่าเรือใต้ (5 วิ/กล่อง)',
        timeSec: 5,
        zone: 'Industrial Docks',
        spotId: 'pork-pack',
        image: '/maps/spots/pork_pack.png',
      },
      {
        num: '04',
        name: 'จุดรับซื้อ Little Seoul / ขายผู้เล่น',
        en: 'WHOLESALE EXPORT',
        desc: 'ลูปสั้นสุด 7.18–7.69 กม. ขาย Eco 380 RD/กล่อง (ดิบ 97 / โพล 149) หรือขายหมูสดผู้เล่นสายครัว 130–150 RD/ชิ้น',
        timeSec: 0,
        zone: 'Little Seoul',
        spotId: 'pork-sell',
        image: '/maps/spots/pork_sell.png',
      },
    ],
  },
  {
    id: 'flowers',
    name: 'เก็บดอกไม้',
    en: 'FLOWER GATHERING',
    shortName: 'เก็บดอกไม้',
    icon: '🌸',
    toolName: 'กรรไกรตัดดอกไม้ (Scissors)',
    toolCostRD: 200,
    toolBreakChancePct: 2,
    rawWeightKg: 0.5,
    packedWeightKg: 1.0,
    gatherSec: 8,
    processSec: 5,
    packSec: 5,
    ecoPricesRD: { raw: 88, processed: 155, packed: 424, hospital: 120 },
    p2pLabel: 'ส่งหมอ รพ. 120 RD/ดอก (ขายสดไวสุด)',
    guideUrl: '/guides/jobs/flowers',
    stages: [
      {
        num: '01',
        name: 'ทุ่งดอกไม้ป่า Mount Gordo (ไวสุด 8 วิ)',
        en: 'PICK FLOWERS',
        desc: 'เก็บไวที่สุดในเกมเพียง 8 วิ/ชิ้น (0.50 กก.) ด้วยกรรไกรตัดดอกไม้ (200 RD / พัง 2%)',
        timeSec: 8,
        zone: 'Mount Gordo',
        spotId: 'flower-farm',
        image: '/maps/spots/flower_farm.png',
      },
      {
        num: '02',
        name: 'โรงสกัดสมุนไพร Grand Senora',
        en: 'PROCESS FLOWERS',
        desc: 'นำดอกไม้สดเข้าโรงสกัดแปรรูป 5 วิ/ชิ้น อัตรา 1:1 (หรือตีรถเข้า รพ. ขายสดได้เลย)',
        timeSec: 5,
        zone: 'Grand Senora',
        spotId: 'flower-pro',
        image: '/maps/spots/flower_pro.png',
      },
      {
        num: '03',
        name: 'โกดังแพ็คช่อดอกไม้ (ท่าเรือใต้)',
        en: 'FLOWER PACKAGING',
        desc: 'นำดอกไม้แปรรูป 2 ชิ้นแพ็คลงกล่อง 1.00 กก. ที่โกดังท่าเรือใต้ (5 วิ/กล่อง)',
        timeSec: 5,
        zone: 'Industrial Docks',
        spotId: 'flower-pack',
        image: '/maps/spots/flower_pack.png',
      },
      {
        num: '04',
        name: 'Del Perro 424 RD/กล่อง หรือ รพ. 120 RD/ดอก',
        en: 'EXPORT OR HOSPITAL',
        desc: 'ขายกล่อง Del Perro 424 RD/กล่อง (ดิบ 88 / โพล 155) หรือส่งสดให้หมอ รพ. Pillbox Hill ดอกละ 120 RD',
        timeSec: 0,
        zone: 'Del Perro / Pillbox Hill',
        spotId: 'flower-sell',
        image: '/maps/spots/flower_sell.png',
      },
    ],
  },
  {
    id: 'crystal',
    name: 'ร่อนคริสตัล',
    en: 'CRYSTAL PANNING',
    shortName: 'ร่อนคริสตัล',
    icon: '💎',
    toolName: 'ถาดร่อนคริสตัล (Panning Tray)',
    toolCostRD: null,
    toolBreakChancePct: null,
    rawWeightKg: 0.5,
    packedWeightKg: 1.0,
    gatherSec: null,
    processSec: 5,
    packSec: null,
    ecoPricesRD: {},
    p2pLabel: 'สูตร 5 Raw Crystal + 3 Copper Ingot = 1 Crystal Ingot',
    guideUrl: '/guides/jobs/crystal',
    stages: [
      {
        num: '01',
        name: 'ตั้งถาดร่อนในน้ำตื้น (สูงสุด 2 เสา)',
        en: 'DEPLOY PANNING TRAY',
        desc: 'เดินลงน้ำตื้นใน Blip ร่อนแร่ (ห้ามลงน้ำลึก/ห้ามออกนอกโซนเด็ดขาด มิฉะนั้นเสาจะถูกทำลายทันที)',
        timeSec: 0,
        zone: 'Zancudo River',
        spotId: 'crystal-sift',
        image: '/maps/spots/crystal_sift.png',
      },
      {
        num: '02',
        name: 'มินิเกมเขย่าตะแกรง A/D เมื่อเครื่องค้าง',
        en: 'SHAKE & MONITOR',
        desc: 'ห้ามวางเสาทิ้งไว้แล้วเดินไกล เมื่อถาดขัดข้องให้กดมินิเกม A/D สลับเพื่อเดินเครื่องต่อและซ่อมบำรุง',
        timeSec: 0,
        zone: 'Zancudo River',
        spotId: 'crystal-sift',
        image: '/maps/spots/crystal_sift.png',
      },
      {
        num: '03',
        name: 'สต็อก Copper Ingot คู่ Raw Crystal (3:5)',
        en: 'HARVEST & PREP COPPER',
        desc: 'เก็บ Raw Crystal (0.50 กก.) ให้ครบอัตราส่วน 5 ชิ้น พร้อมเตรียม Copper Ingot 3 ชิ้นจากโรงหลอมทองแดง',
        timeSec: 5,
        zone: 'Cypress Flats',
        spotId: 'copper-smelt',
        image: '/maps/spots/copper_smelt.png',
      },
      {
        num: '04',
        name: 'แปรรูป Crystal Ingot (1.00 กก.)',
        en: 'CRAFT CRYSTAL INGOT',
        desc: 'ผสม 5 Raw Crystal + 3 Copper Ingot ➔ 1 Crystal Ingot สำเร็จรูปสำหรับสายคราฟต์อาวุธ/อัพเกรดระดับสูง',
        timeSec: 5,
        zone: 'Crystal Processor',
        spotId: 'crystal-pro',
        image: '/maps/spots/crystal_pro.png',
      },
    ],
  },
  {
    id: 'kitchen',
    name: 'ครัว & ส่งอาหาร',
    en: 'RUN KITCHEN & DELIVERY',
    shortName: 'ครัว & ส่งอาหาร',
    icon: '🥙',
    toolName: 'เตาย่าง Doner & แอปรันแมน',
    toolCostRD: null,
    toolBreakChancePct: null,
    rawWeightKg: 0.3,
    packedWeightKg: null,
    gatherSec: 180,
    processSec: null,
    packSec: null,
    ecoPricesRD: { npcPerPiece: 1500, npcOrderMin: 3000, npcOrderMax: 6000 },
    p2pLabel: 'Doner 2,500 RD = 4 ชิ้น · เสบียงลดหิว 50%',
    guideUrl: '/guides/jobs/kitchen',
    stages: [
      {
        num: '01',
        name: 'ซื้อ Doner Split 2,500 RD & ย่าง 3 นาที',
        en: 'ROAST DONER & TOAST BREAD',
        desc: 'ย่าง Doner (ทำได้สูงสุด 2 เตาพร้อมกัน, 1 ก้อนได้ 4 ชิ้น) + ปิ้งแป้งด้วย Rice Grain x2 ที่ Blip พิซซ่า',
        timeSec: 180,
        zone: 'Downtown Kitchen',
        spotId: 'kitchen-downtown',
        image: '/maps/spots/kitchen_cook.png',
      },
      {
        num: '02',
        name: 'Shave Doner & ประกอบ Kebab / Pita',
        en: 'SHAVE DONER & ASSEMBLE',
        desc: 'หยิบแป้ง ➔ เฉือนเนื้อ (SHAVE DONER) ➔ ประกอบเป็น Kebab (0.30 กก. ส่ง NPC) หรือ Pita (กินเองลดหิว 50% ลดเครียด -10)',
        timeSec: 5,
        zone: 'Vespucci Kitchen',
        spotId: 'kitchen-vespucci',
        image: '/maps/spots/kitchen_assemble.png',
      },
      {
        num: '03',
        name: 'เปิดแอปรันแมน กดโหมด Runner Mode',
        en: 'ACCEPT RUNMAN ORDER',
        desc: 'เตรียม Kebab ให้พร้อมในตัว กดเปิดแอปรันแมนแล้วรอรับออเดอร์ลูกค้า NPC รอบละ 2–4 ชิ้น',
        timeSec: 0,
        zone: 'Mirror Park Kitchen',
        spotId: 'kitchen-mirror',
        image: '/maps/spots/kitchen_app.png',
      },
      {
        num: '04',
        name: 'บิดส่งลูกค้า NPC รับ 1,500 RD/ชิ้น',
        en: 'DELIVER FOOD & CASH OUT',
        desc: 'ขับตามพิกัด GPS ไปส่งให้ลูกค้า รับ 1,500 RD/ชิ้น (ออเดอร์ละ 3,000–6,000 RD/จุด)',
        timeSec: 0,
        zone: 'Paleto Bay Kitchen',
        spotId: 'kitchen-paleto',
        image: '/maps/spots/kitchen_deliver.png',
      },
    ],
  },
] as const;

export const WHITE_JOBS_COUNT = WHITE_JOBS.length;

/** Calculate total usable weight capacity respecting 10 kg Trading Buffer when body carry is enabled */
export function calcSafeTotalCapacityKg(
  trunkKg: number,
  includeBodyCarry = true,
  respectTradingBuffer = true
): number {
  const safeTrunk = Math.max(0, trunkKg);
  if (!includeBodyCarry) return safeTrunk;
  return safeTrunk + (respectTradingBuffer ? PLAYER_SAFE_CARRY_KG : PLAYER_MAX_CARRY_KG);
}

/** Calculate whole-item count fitting within totalKg capacity */
export function calcMaxPieces(totalKg: number, itemWeightKg: number): number {
  if (totalKg <= 0 || itemWeightKg <= 0) return 0;
  return Math.floor(totalKg / itemWeightKg);
}

/** Calculate processing brain fatigue % (+0.25%/pc + 0.42%/min passive time) */
export function calcProcessingBrainLoadPct(
  pieces: number,
  secPerPiece: number = SURVIVAL_RATES.PROCESS_SEC_PER_PIECE
): number {
  if (pieces <= 0) return 0;
  const durationMinutes = (pieces * Math.max(0, secPerPiece)) / 60;
  return (
    pieces * SURVIVAL_RATES.BRAIN_PROCESS_ACTION_PCT +
    durationMinutes * SURVIVAL_RATES.BRAIN_PASSIVE_PCT_PER_MIN
  );
}

/** Calculate constant hunger drop over elapsed minutes */
export function calcHungerDropPct(minutes: number): number {
  if (minutes <= 0) return 0;
  return minutes * SURVIVAL_RATES.HUNGER_DROP_PCT_PER_MIN;
}

export function formatRD(amount: number): string {
  return `${Math.round(amount).toLocaleString('en-US')} RD`;
}
