import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'c:\Users\_newgen\Documents\antigravity\dazzling-brahmagupta\public\fivem_cement_spots.json', encoding='utf-8') as f:
    spots = json.load(f)

for s in spots:
    name = s.get('name', '')
    cat = s.get('category', '')
    # Check non-cement spots
    if 'ปูน' not in name:
        print(f"[{cat:10}] {name:25} | x: {s.get('x'):8.1f} | y: {s.get('y'):8.1f} | icon: {s.get('icon')}")
