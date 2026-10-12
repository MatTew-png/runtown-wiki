import os
from PIL import Image

uploaded_dir = r"C:\Users\_newgen\.gemini\antigravity\brain\9cb11562-9ffb-471a-93e0-68cd7687e012\.user_uploaded"
for f in sorted(os.listdir(uploaded_dir)):
    if f.endswith('.png'):
        p = os.path.join(uploaded_dir, f)
        im = Image.open(p)
        print(f"{f}: {im.size}, mode={im.mode}")
