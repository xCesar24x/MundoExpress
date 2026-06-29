from PIL import Image

def clean_studio_f(path):
    print(f"Procesando Studio F: {path}")
    try:
        img = Image.open(path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            r, g, b, a = item
            # Si el color es gris claro o blanco (fondos)
            if r > 200 and g > 200 and b > 200 and abs(r - g) < 5 and abs(g - b) < 5:
                newData.append((255, 255, 255, 0)) # Hacer transparente
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(path, "PNG")
        print("¡Studio F limpiado con éxito!")
    except Exception as e:
        print(f"Error procesando Studio F: {e}")

def clean_mercado_libre(path):
    print(f"Procesando Mercado Libre: {path}")
    try:
        img = Image.open(path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            r, g, b, a = item
            # Si el color es gris claro o blanco (fondos)
            if r > 220 and g > 220 and b > 220 and abs(r - g) < 5 and abs(g - b) < 5:
                newData.append((255, 255, 255, 0)) # Hacer transparente
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(path, "PNG")
        print("¡Mercado Libre limpiado con éxito!")
    except Exception as e:
        print(f"Error procesando Mercado Libre: {e}")

clean_mercado_libre("public/assets/424-4241106_mercadolibre-logo-de-mercado-libre-hd-png-download.png")
clean_studio_f("public/assets/png-transparent-mazda-studio-f-clothing-fashion-shoe-mazda-text-fashion-logo.png")
