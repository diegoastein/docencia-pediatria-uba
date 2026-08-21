#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Generador de Planilla Excel de Control de Prácticos Hospitalarios
Cursada de Pediatría UBA 2026 - Hospital Ramón Carrillo
"""

import csv
import sys
import datetime
from pathlib import Path

# La nómina real de alumnos NUNCA se hardcodea acá (este repo es público). Se lee de
# nomina_alumnos.txt en la raíz del proyecto (un nombre por línea, formato "APELLIDO, Nombre"),
# archivo que está en .gitignore y que cada quien crea localmente. Si no existe, se avisa cómo
# crearlo en vez de fallar en silencio.
NOMINA_PATH = Path(__file__).parent / "nomina_alumnos.txt"


def cargar_estudiantes():
    if not NOMINA_PATH.exists():
        print(f"❌ No se encontró {NOMINA_PATH.name}.")
        print(f"   Creá el archivo '{NOMINA_PATH}' con un nombre por línea (formato \"APELLIDO, Nombre\").")
        print("   Ese archivo está en .gitignore a propósito — la nómina real nunca se sube al repo.")
        sys.exit(1)
    nombres = [l.strip() for l in NOMINA_PATH.read_text(encoding="utf-8").splitlines() if l.strip()]
    if not nombres:
        print(f"❌ {NOMINA_PATH.name} existe pero está vacío.")
        sys.exit(1)
    return nombres

def generar_csv_excel(output_filename="planilla_control_practicos_pediatria_2026.csv"):
    """
    Genera una planilla CSV optimizada para Excel con BOM UTF-8 (compatible con MS Excel sin caracteres corruptos)
    """
    filepath = Path(output_filename)
    estudiantes = cargar_estudiantes()

    with open(filepath, mode="w", encoding="utf-8-sig", newline="") as file:
        writer = csv.writer(file, delimiter=";")
        
        # Encabezado institucional
        writer.writerow(["UNIVERSIDAD DE BUENOS AIRES - FACULTAD DE MEDICINA"])
        writer.writerow(["CÁTEDRA DE PEDIATRÍA - HOSPITAL RAMÓN CARRILLO"])
        writer.writerow(["PLANILLA MAESTRA DE ASISTENCIA Y CONTROL DE PRÁCTICOS 2026"])
        writer.writerow([f"Fecha de emisión: {datetime.datetime.now().strftime('%d/%m/%Y %H:%M')}"])
        writer.writerow([])
        
        # Columnas de la planilla matriz simplificada
        writer.writerow([
            "N°", 
            "Apellido y Nombre", 
            "Neonatología (Cant.)", 
            "Consultorio (Cant.)", 
            "Sala (Cant.)", 
            "Total Prácticos", 
            "% Asistencia (Meta 10)", 
            "Estado de Regularidad",
            "Firma / Observaciones"
        ])
        
        for idx, alumno in enumerate(sorted(estudiantes), 1):
            writer.writerow([
                idx,
                alumno,
                0, # Neo inicial
                0, # Consultorio inicial
                0, # Sala inicial
                0, # Total
                "0%",
                "PENDIENTE",
                ""
            ])
            
    print(f"✅ Planilla Excel generada exitosamente en: {filepath.resolve()}")
    return filepath

if __name__ == "__main__":
    out_file = sys.argv[1] if len(sys.argv) > 1 else "planilla_control_practicos_pediatria_2026.csv"
    generar_csv_excel(out_file)
