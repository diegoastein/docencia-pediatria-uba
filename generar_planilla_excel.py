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

# Nómina oficial de alumnos y asignación por grupos hospitalarios (Semanas 1 a 10)
ESTUDIANTES_GRUPOS = [
    ("ACUÑA, Leila Carolina", "Grupo 1"),
    ("BARILARO, Canela", "Grupo 1"),
    ("CARUSO, Ailen", "Grupo 2"),
    ("CASTRO, Candela", "Grupo 2"),
    ("DAMIANI, Amanda", "Grupo 2"),
    ("DELGADO PAVIA, Milena Yazmin", "Grupo 2"),
    ("DIAZ MORENO, Milagros Anahi", "Grupo 3"),
    ("GARCIA, Luna Mora", "Grupo 3"),
    ("GENTILE, Florencia Belen", "Grupo 3"),
    ("GUERREIRO CAPARICA BORGES, Rafaella", "Grupo 3"),
    ("GUTIERREZ, Mailen Oriana", "Grupo 4"),
    ("QUISPE PEÑA, Nicole Selene", "Grupo 4"),
    ("ROJAS, Romina Rosana", "Grupo 4"),
    ("TEIXEIRA CRUZ, Caroline", "Grupo 5"),
    ("TELIAS, Giselle Marisol", "Grupo 5"),
    ("GALLOTTO, Tomas Matias", "Grupo 5"),
    ("LEGUIZAMON, Antonella Nerea", "Grupo 6"),
    ("MARQUEZ, Sofia Ailen", "Grupo 6"),
    ("MENDEZ, Mora", "Grupo 7"),
    ("OLMOS MUÑOZ, Melina Evelyn", "Grupo 7"),
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
        
        # Columnas de la planilla matriz
        writer.writerow([
            "N°", 
            "Apellido y Nombre", 
            "Grupo Hospitalario", 
            "Neonatología (Cant.)", 
            "Consultorio (Cant.)", 
            "Sala (Cant.)", 
            "Guardia (Cant.)", 
            "Total Prácticos", 
            "% Asistencia (Meta 10)", 
            "Estado de Regularidad",
            "Firma / Observaciones"
        ])
        
        for idx, (alumno, grupo) in enumerate(ESTUDIANTES_GRUPOS, 1):
            writer.writerow([
                idx,
                alumno,
                grupo,
                0, # Neo inicial
                0, # Consultorio inicial
                0, # Sala inicial
                0, # Guardia inicial
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
