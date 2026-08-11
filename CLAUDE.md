# Reglas de Proyecto: Cursada de Pediatría UBA (Docencia)

Este archivo configura las reglas de comportamiento y contexto de proyecto para Claude Code.

---

## 🌐 Idioma y Formato de Comunicación
- **Idioma:** Responder SIEMPRE en español en todas las interacciones, comentarios y explicaciones.
- **Formato:** Respuestas claras, concisas, estructuradas y profesionales.

---

## 🏥 Contexto del Proyecto
- **Institución:** Facultad de Medicina, Universidad de Buenos Aires (UBA) - Cátedra de Pediatría.
- **Sede:** Hospital Ramón Carrillo (Ciudadela, Pcia. de Buenos Aires).
- **Duración:** 10 Semanas (03 de Agosto de 2026 al 10 de Octubre de 2026).
- **Horarios:** 08:30 a 10:00 hs (Teóricos) | 10:30 a 12:00 hs (Prácticos en grupos de 2 a 4 alumnos).
- **Evaluación Final:** Examen Final Unificado (EFU) en la Facultad de Medicina.

---

## 📝 Reglas Estrictas para los Ejercicios y Casos EFU
1. **Límite de Opciones:** Las preguntas de ejercitación EFU deben tener como MÁXIMO **8 opciones (de la A a la H)**.
2. **Sin Respuestas Inventadas (Cero Alucinación):** NUNCA, bajo ningún punto de vista, inventar o crear respuestas u opciones que no existan literalmente en los archivos fuente de los exámenes EFU (`fuentes_pdf/`).
3. **Formato Verbatim:** Respetar los enunciados y las opciones exactas del examen oficial.

---

## 📂 Archivos Principales del Proyecto
- `cronograma_y_planificacion_pediatria_2026.md`: Planificador maestro de la cursada.
- `talleres_efu_semanales.md`: Cuadernillos de ejercitación para los viernes.
- `banco_preguntas_efu_pediatria.md`: Catálogo con 168 preguntas de EFU extraídas de los PDFs.
- `index.html`: Herramienta interactiva publicada en GitHub Pages, con tres solapas: **Anuncios Classroom** (botón de copiado directo), **Talleres EFU** (modo presentación con votación de alumnos) y **Control de Prácticos** (matriz de asistencia con sincronización en la nube y exportación XLSX).
- `generar_planilla_excel.py`: Generador de la planilla Excel de control de prácticos (incluye la nómina oficial de alumnos).
- `inventario_clases_drive.md`: Repositorio dinámico de presentaciones en Google Drive.
- `fuentes_pdf/`: PDFs oficiales de los exámenes EFU (fuente de verdad para las preguntas).

> Las presentaciones `.pptx` están ignoradas por git (se comparten por Google Drive).
