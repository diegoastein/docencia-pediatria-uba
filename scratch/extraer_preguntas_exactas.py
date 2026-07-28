import re

path = "/home/diegosteinberg/docencia/scratch/efu_por_temas_resuelto.txt"
with open(path, "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Extract question 1 and 2 verbatim
q1_match = re.search(r'(1\.\s+Ud\.\s+atiende\s+en\s+su\s+consultorio\s+a\s+Pablo.*?)(?=\n\s*\n\d+\.|\Z)', text, re.DOTALL)
q2_match = re.search(r'(2\.\s+Ud\s+se\s+encuentra\s+otorgando\s+el\s+alta\s+de\s+Ián.*?)(?=\n\s*\n\d+\.|\Z)', text, re.DOTALL)

print("--- PREGUNTA 1 EXACTA ---")
if q1_match:
    print(q1_match.group(1).strip())

print("\n--- PREGUNTA 2 EXACTA ---")
if q2_match:
    print(q2_match.group(1).strip())
