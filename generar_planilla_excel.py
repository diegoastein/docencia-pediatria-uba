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

# Nómina oficial de alumnos
ESTUDIANTES = [
    "ACUÑA, Leila Carolina",
    "BARILARO, Canela",
    "CARUSO, Ailen",
    "CASTRO, Candela",
    "DAMIANI, Amanda",
    "DELGADO PAVIA, Milena Yazmin",
    "DIAZ MORENO, Milagros Anahi",
    "GARCIA, Luna Mora",
    "GENTILE, Florencia Belen",
    "GUERREIRO CAPARICA BORGES, Rafaella",
    "GUTIERREZ, Mailen Oriana",
    "LEGUIZAMON, Antonella Nerea",
    "MARQUEZ, Sofia Ailen",
    "MENDEZ, Mora",
    "OLMOS MUÑOZ, Melina Evelyn",
    "QUISPE PEÑA, Nicole Selene",
    "ROJAS, Romina Rosana",
    "TEIXEIRA CRUZ, Caroline",
    "TELIAS, Giselle Marisol",
    "GALLOTTO, Tomas Matias",
]

def generar_csv_excel(output_filename="planilla_control_practicos_pediatria_2026.csv"):
    """
    Genera una planilla CSV optimizada para Excel con BOM UTF-8 (compatible con MS Excel sin caracteres corruptos)
    """
    filepath = Path(output_filename)
    
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
        
        for idx, alumno in enumerate(sorted(ESTUDIANTES), 1):
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
