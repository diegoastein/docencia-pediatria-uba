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
- `votar.html`: Página mobile-first para que los alumnos voten desde su celular durante el Modo Presentación (ver sección Votación en Vivo más abajo).

> Las presentaciones `.pptx` están ignoradas por git (se comparten por Google Drive).

---

## 🗳️ Votación en Vivo por QR (Talleres EFU)

El Modo Presentación de la pestaña Talleres EFU soporta votación real desde el celular de
cada alumno, además del toggle manual A-H de siempre (que sigue funcionando igual si la
votación en vivo no está configurada o falla).

- **Backend:** Firebase Realtime Database vía su API REST (`fetch`, sin SDK), en el nodo
  `/efuRooms/{roomId}/`. Cada voto se agrega como nodo nuevo (`POST`, push-id autogenerado),
  nunca se lee-modifica-escribe un blob completo, así que no hay riesgo de que dos celulares
  se pisen el voto.
- **Dos modos**, elegidos por el docente al activar la sala: **Anónimo** (rápido, sin
  identificación) y **Equipos** (nombre de equipo libre, con ranking de puntos acumulado a lo
  largo de todo el taller — 1 punto cuando el conjunto de opciones votadas coincide
  exactamente con las correctas).
- **Anti-doble-voto:** un voto por celular por caso, marcado en `localStorage` del alumno
  (no es a prueba de trampas; alcanza para uso en clase).
- **`caseId` estable:** se deriva en runtime del `id` de cada `.answer-box` (`ans12` → `"12"`),
  no del orden en pantalla — por eso vota bien tanto si se filtra por semana como si se llega
  al caso por el buscador por tema.
- **`votar.html`** no duplica el contenido clínico: hace `fetch('index.html')` (mismo origen)
  y usa `DOMParser` para extraer sólo el título y las opciones del caso activo desde el mismo
  `.card` que ya existe en `index.html` — una única fuente de verdad, cumpliendo la regla de
  "cero alucinación" del proyecto.

### Configuración de Firebase (ya realizada — 21/08/2026)
- **Proyecto:** `pediatria-uba-efu-votos` (cuenta `diegosteinberg@gmail.com`), vinculado a una
  de las cuentas de facturación existentes (plan Blaze — requisito de Google para crear una
  Realtime Database aunque el uso se mantenga en la capa gratuita).
- **`databaseURL`:** `https://pediatria-uba-efu-votos.firebaseio.com` — ya cargado en la
  constante `EFU_FIREBASE_DB_URL` de `index.html` y `votar.html`.
- **Reglas de seguridad** ya desplegadas, acotadas al nodo `efuRooms` (sin autenticación de
  alumnos: es una herramienta de aula de bajo riesgo, no maneja datos sensibles):
  ```json
  {
    "rules": {
      "efuRooms": {
        "$roomId": {
          ".read": true,
          ".write": true,
          "meta": { ".validate": "newData.hasChildren(['mode','phase'])" },
          "votes": {
            "$caseId": {
              "$voteId": { ".validate": "newData.hasChild('options')" }
            }
          }
        }
      }
    }
  }
  ```
  Verificado con pruebas reales: escritura/lectura pública funciona dentro de `efuRooms`, y
  está bloqueada fuera de ese nodo (`Permission denied`). También se probó el flujo completo
  activar sala → votar desde `votar.html` → barras en vivo → revelar → puntaje de equipos →
  ranking, con datos reales en Firebase (limpiados después de la prueba).
- Si en algún momento hay que recrear todo desde cero (otra cuenta, otro proyecto), los pasos
  son: crear proyecto → `gcloud services enable firebasedatabase.googleapis.com` → vincular
  billing (`gcloud billing projects link`, requerido por Google incluso en capa gratuita) →
  crear la instancia (`POST .../v1beta/projects/{id}/locations/{loc}/instances?databaseId={id}`)
  → subir las reglas de arriba con `PUT {databaseURL}/.settings/rules.json` → pegar el
  `databaseURL` resultante en `EFU_FIREBASE_DB_URL` en los dos archivos.
