import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

os.makedirs('public/items/cards', exist_ok=True)

# Define color themes for different materials
THEMES = {
    'raw_pork': {'glow': (244, 63, 94), 'cat': 'LIVESTOCK // RAW MEAT', 'weight': '0.50 KG'},
    'processed_pork': {'glow': (236, 72, 153), 'cat': 'MEAT // SLAUGHTERED', 'weight': '0.50 KG'},
    'packed_pork': {'glow': (16, 185, 129), 'cat': 'CARGO // EXPORT CRATE', 'weight': '1.00 KG'},
    'raw_flower': {'glow': (236, 72, 153), 'cat': 'HERB // WILD BOTANICAL', 'weight': '0.50 KG'},
    'processed_flower': {'glow': (168, 85, 247), 'cat': 'EXTRACT // BOUQUET', 'weight': '0.50 KG'},
    'packed_flower': {'glow': (16, 185, 129), 'cat': 'CARGO // GIFT BOX', 'weight': '1.00 KG'},
    'raw_rice': {'glow': (245, 158, 11), 'cat': 'AGRICULTURE // RAW GRAIN', 'weight': '0.50 KG'},
    'processed_rice': {'glow': (226, 232, 240), 'cat': 'STAPLE // MILLED RICE', 'weight': '0.50 KG'},
    'packed_rice': {'glow': (16, 185, 129), 'cat': 'CARGO // RICE SACK', 'weight': '1.00 KG'},
    'raw_wood': {'glow': (217, 119, 6), 'cat': 'FORESTRY // RAW TIMBER', 'weight': '0.50 KG'},
    'processed_wood': {'glow': (234, 88, 12), 'cat': 'LUMBER // PLANKS', 'weight': '0.50 KG'},
    'packed_wood': {'glow': (16, 185, 129), 'cat': 'CARGO // WOOD PALLET', 'weight': '1.00 KG'},
    'scrap_metal': {'glow': (148, 163, 184), 'cat': 'RECYCLED // SCRAP METAL', 'weight': '0.25 KG'},
    'steel_ingot': {'glow': (96, 165, 250), 'cat': 'SMELTED // STEEL INGOT', 'weight': '0.50 KG'},
    'gold_ingot': {'glow': (234, 179, 8), 'cat': 'PRECIOUS // GOLD INGOT', 'weight': '0.50 KG'},
    'copper_ingot': {'glow': (249, 115, 22), 'cat': 'INDUSTRIAL // COPPER INGOT', 'weight': '0.50 KG'},
    'crystal_ingot': {'glow': (6, 182, 212), 'cat': 'RARE // CRYSTAL INGOT', 'weight': '0.50 KG'},
    'raw_crystal': {'glow': (20, 184, 166), 'cat': 'MINING // RAW CRYSTAL', 'weight': '0.50 KG'},
    'cut_diamond': {'glow': (59, 130, 246), 'cat': 'GEMSTONE // CUT DIAMOND', 'weight': '0.50 KG'},
    'cement': {'glow': (120, 113, 108), 'cat': 'MATERIAL // CEMENT BAG', 'weight': '0.50 KG'},
    'wood_crate': {'glow': (180, 83, 9), 'cat': 'CONTAINER // WOOD CRATE', 'weight': '0.50 KG'},
}

def create_showcase_card(item_key, icon_path, out_path):
    w, h = 640, 400
    theme = THEMES.get(item_key, {'glow': (0, 255, 178), 'cat': 'ITEM // MATERIAL', 'weight': '0.50 KG'})
    glow_rgb = theme['glow']

    # 1. Base dark background with gradient
    card = Image.new('RGBA', (w, h), (10, 13, 20, 255))
    draw = ImageDraw.Draw(card)

    # Vertical gradient from darker top/bottom to slightly lighter center
    for y in range(h):
        factor = 1.0 - abs(y - h/2) / (h/2)
        r = int(10 + 10 * factor)
        g = int(13 + 12 * factor)
        b = int(20 + 16 * factor)
        draw.line([(0, y), (w, y)], fill=(r, g, b, 255))

    # 2. Tech grid dots
    grid_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    grid_spacing = 24
    for gx in range(12, w, grid_spacing):
        for gy in range(12, h, grid_spacing):
            grid_draw.rectangle([gx, gy, gx+1, gy+1], fill=(255, 255, 255, 18))
    card = Image.alpha_composite(card, grid_img)

    # 3. Glowing pedestal in center-bottom
    glow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow_layer)
    cx, cy = w // 2, int(h * 0.52)
    
    # Outer radial glow
    for r in range(180, 0, -6):
        alpha = int(45 * (1.0 - (r / 180.0)**1.2))
        g_draw.ellipse([cx - r*1.3, cy - r*0.75, cx + r*1.3, cy + r*0.75], 
                       fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], alpha))
    
    # Gaussian blur for butter-smooth light
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=18))
    card = Image.alpha_composite(card, glow_layer)

    # Isometric pedestal rings
    pedestal_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(pedestal_layer)
    ped_y = int(h * 0.72)
    rx, ry = 140, 36
    # Outer ring
    p_draw.ellipse([cx - rx, ped_y - ry, cx + rx, ped_y + ry], outline=(glow_rgb[0], glow_rgb[1], glow_rgb[2], 120), width=2)
    # Inner ring
    p_draw.ellipse([cx - rx*0.7, ped_y - ry*0.7, cx + rx*0.7, ped_y + ry*0.7], outline=(255, 255, 255, 60), width=1)
    
    card = Image.alpha_composite(card, pedestal_layer)

    # 4. Load and paste item icon with floating shadow
    if os.path.exists(icon_path):
        icon = Image.open(icon_path).convert('RGBA')
        # Scale icon to fit nicely in 210x210 box
        iw, ih = icon.size
        scale = min(210 / iw, 210 / ih)
        target_w, target_h = int(iw * scale), int(ih * scale)
        icon_resized = icon.resize((target_w, target_h), Image.Resampling.LANCZOS)

        # Shadow on pedestal
        shadow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
        s_draw = ImageDraw.Draw(shadow_layer)
        s_rx, s_ry = int(target_w * 0.45), int(target_h * 0.15)
        s_draw.ellipse([cx - s_rx, ped_y - s_ry, cx + s_rx, ped_y + s_ry], fill=(0, 0, 0, 140))
        shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(radius=10))
        card = Image.alpha_composite(card, shadow_layer)

        # Center position floating slightly above pedestal
        ix = cx - target_w // 2
        iy = int(ped_y - target_h * 0.85)
        card.paste(icon_resized, (ix, iy), icon_resized)

    # 5. Cyberpunk HUD borders & corner brackets
    hud_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    h_draw = ImageDraw.Draw(hud_layer)

    # Outer border
    h_draw.rounded_rectangle([1, 1, w-2, h-2], radius=16, outline=(255, 255, 255, 30), width=1)

    # Corner brackets (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
    bracket_len = 16
    bracket_color = (glow_rgb[0], glow_rgb[1], glow_rgb[2], 200)
    # Top-Left
    h_draw.line([(16, 16), (16 + bracket_len, 16)], fill=bracket_color, width=2)
    h_draw.line([(16, 16), (16, 16 + bracket_len)], fill=bracket_color, width=2)
    # Top-Right
    h_draw.line([(w - 16, 16), (w - 16 - bracket_len, 16)], fill=bracket_color, width=2)
    h_draw.line([(w - 16, 16), (w - 16, 16 + bracket_len)], fill=bracket_color, width=2)
    # Bottom-Left
    h_draw.line([(16, h - 16), (16 + bracket_len, h - 16)], fill=bracket_color, width=2)
    h_draw.line([(16, h - 16), (16, h - 16 - bracket_len)], fill=bracket_color, width=2)
    # Bottom-Right
    h_draw.line([(w - 16, h - 16), (w - 16 - bracket_len, h - 16)], fill=bracket_color, width=2)
    h_draw.line([(w - 16, h - 16), (w - 16, h - 16 - bracket_len)], fill=bracket_color, width=2)

    # Text HUD
    font_cat = ImageFont.load_default()
    h_draw.text((32, 22), f"// {theme['cat']}", fill=(200, 210, 225, 200), font=font_cat)
    h_draw.text((w - 110, 22), f"[{theme['weight']}]", fill=(glow_rgb[0], glow_rgb[1], glow_rgb[2], 220), font=font_cat)
    h_draw.text((32, h - 34), "SECURITY LEVEL: VERIFIED", fill=(100, 116, 139, 180), font=font_cat)
    h_draw.text((w - 110, h - 34), "PATCH 1.3.0", fill=(100, 116, 139, 180), font=font_cat)

    card = Image.alpha_composite(card, hud_layer)

    # Save card as PNG
    card.save(out_path, 'PNG', optimize=True)
    print(f"Generated Showcase Card: {os.path.basename(out_path)}")

# Generate cards for all material items
for key in THEMES.keys():
    # check if transparent icon exists
    icon_p = f"public/items/icons/transparent/{key}.png"
    if not os.path.exists(icon_p):
        icon_p = f"public/items/icons/{key}.png"
    if os.path.exists(icon_p):
        out_p = f"public/items/cards/{key}.png"
        create_showcase_card(key, icon_p, out_p)
