import os
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
from collections import deque

def process_item_icon(input_path, out_transparent_512, out_icon_128):
    im = Image.open(input_path).convert('RGBA')
    w, h = im.size
    arr = np.array(im)
    
    # 1. Background cutout using flood fill from outer edges
    # Most FiveM inventory icons have a dark slate background (r ~ 20-55, g ~ 25-60, b ~ 30-65)
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
               (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]
    bg_samples = [arr[y, x][:3].astype(float) for x, y in corners]
    avg_bg = np.mean(bg_samples, axis=0)

    visited = np.zeros((h, w), dtype=bool)
    mask_bg = np.zeros((h, w), dtype=bool)
    queue = deque()

    for x in range(w):
        for y in [0, h - 1]:
            diff = np.linalg.norm(arr[y, x][:3] - avg_bg)
            r, g, b = arr[y, x][:3]
            is_dark = (r < 75 and g < 80 and b < 85)
            if diff < 45 or is_dark:
                queue.append((x, y))
                visited[y, x] = True
                mask_bg[y, x] = True

    for y in range(h):
        for x in [0, w - 1]:
            if not visited[y, x]:
                diff = np.linalg.norm(arr[y, x][:3] - avg_bg)
                r, g, b = arr[y, x][:3]
                is_dark = (r < 75 and g < 80 and b < 85)
                if diff < 45 or is_dark:
                    queue.append((x, y))
                    visited[y, x] = True
                    mask_bg[y, x] = True

    while queue:
        cx, cy = queue.popleft()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                visited[ny, nx] = True
                r, g, b = arr[ny, nx][:3]
                diff = np.linalg.norm(arr[ny, nx][:3] - avg_bg)
                is_dark = (r < 72 and g < 78 and b < 82)
                # Saturation / color distance check
                is_low_sat = (max(r, g, b) - min(r, g, b) < 18)
                if (diff < 42 and is_dark) or (is_dark and is_low_sat):
                    mask_bg[ny, nx] = True
                    queue.append((nx, ny))

    # Apply alpha mask
    arr[mask_bg, 3] = 0
    cutout = Image.fromarray(arr)

    # Crop to item bounding box
    bbox = cutout.getbbox()
    if bbox:
        # Give 1px padding if inside bounds
        pad_bbox = (max(0, bbox[0]-1), max(0, bbox[1]-1), min(w, bbox[2]+1), min(h, bbox[3]+1))
        cropped = cutout.crop(pad_bbox)
    else:
        cropped = cutout

    cw, ch = cropped.size

    # 2. High-Quality Upscale to 512x512
    # Determine target size inside 512 canvas (leave ~48px margin on max dimension -> ~416px)
    target_dim = 416
    scale = target_dim / max(cw, ch)
    target_w = int(round(cw * scale))
    target_h = int(round(ch * scale))

    # Two-step super-resolution resampling:
    # First upscale with LANCZOS to 2x target, sharpen slightly, then downscale to target
    big_w = target_w * 2
    big_h = target_h * 2
    upscaled = cropped.resize((big_w, big_h), Image.Resampling.LANCZOS)
    
    # Gentle UnsharpMask to recover edge crispness without halos
    upscaled = upscaled.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=2))
    
    # Downscale cleanly to target size with Lanczos
    target_item = upscaled.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Enhance color vibrance slightly (10%)
    enhancer = ImageEnhance.Color(target_item)
    target_item = enhancer.enhance(1.08)

    # Composite onto 512x512 transparent canvas
    canvas_512 = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
    pos_x = (512 - target_w) // 2
    pos_y = (512 - target_h) // 2
    canvas_512.paste(target_item, (pos_x, pos_y), target_item)

    # Save transparent 512x512
    canvas_512.save(out_transparent_512, 'PNG')

    # Also save crisp 128x128 for icons
    canvas_128 = canvas_512.resize((128, 128), Image.Resampling.LANCZOS)
    canvas_128.save(out_icon_128, 'PNG')
    print(f"Generated: {os.path.basename(out_transparent_512)} (item size in 512: {target_w}x{target_h})")

items = [
    'raw_pork.png', 'processed_pork.png', 'packed_pork.png',
    'raw_flower.png', 'processed_flower.png', 'packed_flower.png',
    'raw_rice.png', 'processed_rice.png', 'packed_rice.png',
    'raw_wood.png', 'processed_wood.png', 'packed_wood.png',
    'scrap_metal.png', 'steel_ingot.png'
]

os.makedirs('public/items/icons/transparent', exist_ok=True)
for item in items:
    src = os.path.join('public/items/icons', item)
    dst_trans = os.path.join('public/items/icons/transparent', item)
    dst_128 = os.path.join('public/items/icons', f'icon_{item}')
    if os.path.exists(src):
        process_item_icon(src, dst_trans, dst_128)
