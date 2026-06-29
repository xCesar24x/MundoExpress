from PIL import Image
from collections import Counter

def list_top_colors(path):
    print(f"\nColores más comunes en {path}:")
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        pixels = []
        for x in range(width):
            for y in range(min(100, height)):
                pixels.append(img.getpixel((x, y)))
        counter = Counter(pixels)
        for color, count in counter.most_common(10):
            print(f"Color: {color}, Cantidad: {count}")
    except Exception as e:
        print(f"Error: {e}")

list_top_colors("public/assets/424-4241106_mercadolibre-logo-de-mercado-libre-hd-png-download.png")
list_top_colors("public/assets/png-transparent-mazda-studio-f-clothing-fashion-shoe-mazda-text-fashion-logo.png")
