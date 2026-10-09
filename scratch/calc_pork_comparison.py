# scratch/calc_pork_comparison.py
import sys
sys.stdout.reconfigure(encoding='utf-8')

def calc_model_1_raw(r, p_raw):
    raw_count = r * 60
    cost = r * 2400
    revenue = raw_count * p_raw
    profit = revenue - cost
    
    t_work = r * 15.0 + r * 0.85 + 3.0 # breed + harvest + drive stash-farm-stash
    t_active = r * 1.35 + 3.0 # harvest + feed + drive
    t_afk = t_work - t_active
    
    fatigue = r * 2.0 + t_work * 0.42
    p_hr = profit / (t_work / 60.0)
    p_active_hr = profit / (t_active / 60.0)
    return {
        'profit': profit, 't_total': t_work, 't_active': t_active, 't_afk': t_afk,
        'p_hr': p_hr, 'p_active_hr': p_active_hr, 'fatigue': fatigue
    }

def calc_model_2_pro(r):
    raw_count = r * 60
    cost = r * 2400
    revenue = raw_count * 194
    profit = revenue - cost
    
    t_breed = r * 15.85 + 3.0
    t_pro = 1.1 + (raw_count * 5.0 / 60.0)
    t_reset = 2.7 + 0.25 + 2.0 + 2.0 # route 14 + sell mark 6-7 + wait 2m + return stash
    t_total = t_breed + t_pro + t_reset
    t_active = (r * 1.35 + 3.0) + t_pro + t_reset
    t_afk = t_total - t_active
    
    fatigue_peak = r * 2.0 + (raw_count * 0.25) + (t_breed + t_pro) * 0.42
    p_hr = profit / (t_total / 60.0)
    p_active_hr = profit / (t_active / 60.0)
    return {
        'profit': profit, 't_total': t_total, 't_active': t_active, 't_afk': t_afk,
        'p_hr': p_hr, 'p_active_hr': p_active_hr, 'fatigue': fatigue_peak
    }

def calc_model_3_pack(r):
    raw_count = r * 60
    pack_count = raw_count // 2
    cost = r * 2400
    revenue = pack_count * 422
    profit = revenue - cost
    
    t_breed = r * 15.85 + 3.0
    t_pro = 1.1 + (raw_count * 5.0 / 60.0)
    t_pack = 1.2 + (pack_count * 5.0 / 60.0)
    t_sell = 1.8 + 0.25
    t_reset = 1.8 + 2.0 + 2.0 # route 8 pack-reset 1.8m + wait 2m + return 2m
    t_total = t_breed + t_pro + t_pack + t_sell + t_reset
    t_active = (r * 1.35 + 3.0) + t_pro + t_pack + t_sell + t_reset
    t_afk = t_total - t_active
    
    fatigue_peak = r * 2.0 + (raw_count * 0.25) + (t_breed + t_pro + t_pack) * 0.42
    p_hr = profit / (t_total / 60.0)
    p_active_hr = profit / (t_active / 60.0)
    return {
        'profit': profit, 't_total': t_total, 't_active': t_active, 't_afk': t_afk,
        'p_hr': p_hr, 'p_active_hr': p_active_hr, 'fatigue': fatigue_peak
    }

def calc_model_4_buy_pack(r, buy_p):
    raw_count = r * 60
    pack_count = raw_count // 2
    cost = raw_count * buy_p
    revenue = pack_count * 422
    profit = revenue - cost
    
    t_pro = 1.1 + (raw_count * 5.0 / 60.0)
    t_pack = 1.2 + (pack_count * 5.0 / 60.0)
    t_sell = 1.8 + 0.25
    t_reset = 1.8 + 2.0 + 2.0
    t_total = t_pro + t_pack + t_sell + t_reset
    
    fatigue_peak = (raw_count * 0.25) + t_total * 0.42
    p_hr = profit / (t_total / 60.0)
    return {
        'profit': profit, 't_total': t_total, 't_active': t_total, 't_afk': 0,
        'p_hr': p_hr, 'p_active_hr': p_hr, 'fatigue': fatigue_peak
    }

def calc_model_5_buy_pro(r, buy_p):
    raw_count = r * 60
    cost = raw_count * buy_p
    revenue = raw_count * 194
    profit = revenue - cost
    
    t_pro = 1.1 + (raw_count * 5.0 / 60.0)
    t_reset = 2.7 + 0.25 + 2.0 + 2.0 # route 14 + sell + reset + return
    t_total = t_pro + t_reset
    
    fatigue_peak = (raw_count * 0.25) + t_total * 0.42
    p_hr = profit / (t_total / 60.0)
    return {
        'profit': profit, 't_total': t_total, 't_active': t_total, 't_afk': 0,
        'p_hr': p_hr, 'p_active_hr': p_hr, 'fatigue': fatigue_peak
    }

print('| โมเดลการทำเงิน | ขนาดรถ | กำไรสุทธิ/คัน | เวลารวม | เฝ้าจอจริง | เวลานอน AFK | สมองสูงสุด | กำไร/ชม. (รวมเวลา) | กำไร/ชม. (เวลาแตะจอ) |')
print('| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |')

vehicles = [('🚗 รถ 60 กก.', 2), ('🚙 รถ 120 กก.', 4), ('🚚 รถ 150 กก.', 5)]

models = [
    ('1. เลี้ยงเอง ➔ ขายดิบ 140 บ.', lambda r: calc_model_1_raw(r, 140)),
    ('2. เลี้ยงเอง ➔ ขายดิบ 150 บ.', lambda r: calc_model_1_raw(r, 150)),
    ('3. เลี้ยงเอง ➔ โพร $194 (ลูปรูท 14)', calc_model_2_pro),
    ('4. เลี้ยงเอง ➔ แพ็ค $422 (เต็มระบบ)', calc_model_3_pack),
    ('5. รับซื้อ 130 บ. ➔ โพร $194 (วนลูป 14)', lambda r: calc_model_5_buy_pro(r, 130)),
    ('6. รับซื้อ 130 บ. ➔ แพ็ค $422 (โรงงาน)', lambda r: calc_model_4_buy_pack(r, 130)),
    ('7. รับซื้อ 140 บ. ➔ แพ็ค $422 (โรงงาน)', lambda r: calc_model_4_buy_pack(r, 140)),
]

for m_name, fn in models:
    for v_name, r in vehicles:
        res = fn(r)
        p = res['profit']
        t_tot = res['t_total']
        t_act = res['t_active']
        t_afk = res['t_afk']
        fat = res['fatigue']
        phr = res['p_hr']
        pact_hr = res['p_active_hr']
        print(f"| {m_name} | {v_name} | **+{p:,.0f} บ.** | {t_tot:.1f} น. | {t_act:.1f} น. | {t_afk:.1f} น. | {fat:.1f}% | **{phr:,.0f} บ./ชม.** | {pact_hr:,.0f} บ./ชม. |")
