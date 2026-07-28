import re
import os

file_path = "/home/diegosteinberg/docencia/scratch/efu_por_temas_resuelto.txt"

with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Find main topic headers (e.g. 1. NEO, 2. RESPIRATORIO, etc.)
headers = re.findall(r'(\d+\.\s+[A-ZÁÉÍÓÚÑ\s]{3,})', text)
print("Secciones temáticas encontradas en EFU POR TEMAS:")
for h in set(headers):
    print("-", h.strip())

# Count total questions
questions = re.findall(r'\n\d+\.\s+[A-ZÁÉÍÓÚ]', text)
print(f"\nTotal estimado de preguntas de EFU en este archivo: {len(questions)}")
