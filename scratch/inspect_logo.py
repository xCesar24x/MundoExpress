from PIL import Image

def inspect_image(path):
    print(f"Inspeccionando {path}...")
    try:
        img = Image.open(path).convert("RGBA")
        width, height = img.size
        # Tomamos una muestra de 20x20 píxeles del extremo superior izquierdo
        colors = set()
        for x in range(min(20, width)):
            for y in range(min(20, height)):
                colors.add(img.getpixel((x, y)))
        print(f"Colores únicos en la esquina (RGBA): {colors}")
    except Exception as e:
        print(f"Error: {e}")

inspect_image("public/assets/424-4241106_mercadolibre-logo-de-mercado-libre-hd-png-download.png")
inspect_image("public/assets/png-transparent-mazda-studio-f-clothing-fashion-shoe-mazda-text-fashion-logo.png")
