import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'c:\Users\_newgen\Documents\antigravity\dazzling-brahmagupta\public\fivem_cement_spots.json', encoding='utf-8') as f:
    spots = json.load(f)

print(f"Total spots: {len(spots)}")
for s in spots:
    name = s.get('name', '')
    if any(k in name for k in ['หมู', 'ไม้', 'ข้าว', 'เหล็ก', 'ดอกไม้', 'เหมือง', 'หิน', 'ทอง', 'คอปเปอร์', 'เศษ']):
        print(f"Name: {name:20} | x: {s.get('x'):8.1f} | y: {s.get('y'):8.1f} | icon: {s.get('icon')} | color: {s.get('color')}")
