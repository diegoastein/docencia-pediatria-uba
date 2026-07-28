import zipfile
import xml.etree.ElementTree as ET
import os

pptx_path = "/home/diegosteinberg/docencia/Presentación.pptx"

if not os.path.exists(pptx_path):
    print("Archivo no encontrado:", pptx_path)
    exit(1)

with zipfile.ZipFile(pptx_path, 'r') as z:
    # Find all slide xml files
    slide_files = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
    
    # Sort slides by slide number
    def slide_num(name):
        return int(''.join(filter(str.isdigit, name)))
    
    slide_files.sort(key=slide_num)
    
    print(f"Total de Diapositivas: {len(slide_files)}\n")
    
    for slide_file in slide_files:
        print(f"=== {slide_file.upper()} ===")
        xml_content = z.read(slide_file)
        tree = ET.fromstring(xml_content)
        
        # Extract text elements
        texts = []
        for elem in tree.iter():
            if elem.tag.endswith('}t') and elem.text:
                texts.append(elem.text.strip())
        
        full_slide_text = " ".join([t for t in texts if t])
        print(full_slide_text if full_slide_text else "(Diapositiva sin texto / solo imágenes)")
        print("-" * 50)
