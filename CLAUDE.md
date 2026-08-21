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
- `banco_preguntas_efu_pediatria.md`: Catálogo con 168 preguntas de EFU extraídas de los PDFs (versión previa, en migración hacia `banco_casos_efu.json`, ver sección siguiente).
- `banco_casos_efu.json`: Banco estructurado de casos EFU (fuente de verdad intermedia, ver sección "Banco Estructurado de Casos EFU").
- `validar_banco_casos_efu.py`: Script de validación de `banco_casos_efu.json` contra las reglas del proyecto.
- `prompt_extraccion_antigravity.md`: Prompt listo para pegar en Antigravity que genera `banco_casos_efu.json` desde `fuentes_pdf/`.
- `index.html`: Herramienta interactiva publicada en GitHub Pages, con tres solapas: **Anuncios Classroom** (botón de copiado directo), **Talleres EFU** (modo presentación con votación de alumnos) y **Control de Prácticos** (matriz de asistencia con sincronización en la nube y exportación XLSX).
- `generar_planilla_excel.py`: Generador de la planilla Excel de control de prácticos (incluye la nómina oficial de alumnos).
- `inventario_clases_drive.md`: Repositorio dinámico de presentaciones en Google Drive.
- `fuentes_pdf/`: PDFs oficiales de los exámenes EFU (fuente de verdad original para las preguntas).
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

### Actividades Abiertas en Vivo (sin necesidad de contenido clínico nuevo)
Reutilizan la misma sala/QR de la Votación en Vivo (botón "💬 Actividad Abierta" en la barra
del docente), sin escanear un segundo código. Cuatro plantillas listas para usar:
- **☁️ Nube de Palabras:** el docente escribe una consigna libre en el momento; los alumnos
  mandan una palabra/frase corta y se agrega por frecuencia (agrupa variantes por tilde, sin
  tocar la "ñ" — no es un diacrítico).
- **❓ Muro de Preguntas Anónimas:** los alumnos mandan preguntas de texto libre (sin límite,
  se pueden mandar varias) y pueden votar las de otros; el docente las ve ordenadas por votos
  y puede marcarlas "respondida" (sólo de su lado, no se sincroniza).
- **🌡️ Pulso de Cierre de Clase:** consigna fija (escala 1-5 + comentario opcional), pensada
  para correr al final de cada teórico sin preparación previa.
- **🗳️ Encuesta de Opción Múltiple:** el docente escribe una consigna y de 2 a 8 opciones ad
  hoc en el momento (sin depender de un caso ya cargado en el banco EFU); los alumnos eligen
  una sola opción y el docente ve barras de resultado en vivo — sin corrección, útil para
  cualquier pregunta que no sea "en una palabra" ni de escala 1-5.

Modelo de datos: `efuRooms/{roomId}/meta.activity` (`type`/`prompt`/`status`/`key`) +
`efuRooms/{roomId}/activity/{key}/responses` (append-only) y `/upvotes` (sólo Muro de
Preguntas) — mismo patrón anti-condición-de-carrera que los votos de casos. No requiere tocar
las reglas de Firebase: cuelga del mismo nodo `efuRooms/$roomId` ya abierto.

### Modo Opinión (encuestas de criterio clínico, sin corrección)
Toggle "🎭 Modo Opinión" dentro del Modo Presentación (junto al botón de Ranking, sólo con
sala activa). Convierte la votación de un caso EFU cualquiera en una encuesta sin respuesta
"correcta": al revelar, se muestra la distribución de opinión del grupo en vez de marcar
verde/rojo, y ese caso no suma puntaje en el ranking de equipos. Útil para viñetas de criterio
clínico donde clínicos razonables discreparían — reutiliza cualquier caso ya cargado, sin
escribir contenido nuevo.

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

---

## 🗄️ Banco Estructurado de Casos EFU (`banco_casos_efu.json`)

**Motivación:** releer los PDFs de `fuentes_pdf/` cada vez que se genera o amplía un taller es lento,
caro en tokens y crece mal a medida que se agrega material nuevo. Por eso se migró a un banco
intermedio estructurado en JSON, que actúa como fuente de verdad rápida de consultar (por
módulo/tema, sin reprocesar PDFs) pero manteniendo trazabilidad total al PDF y página de origen.

**Flujo de trabajo (estado actual, en curso):**
1. Se agregan PDFs nuevos a `fuentes_pdf/`.
2. El trabajo grueso de extracción (parsing/OCR de PDF → JSON) se delega a **Antigravity** (IA
   externa), NO a Claude, por costo/tiempo. El prompt de extracción a usar está en
   `prompt_extraccion_antigravity.md` (copiar y pegar tal cual en Antigravity).
3. Antigravity entrega `banco_casos_efu.json` en la raíz del repo.
4. **Antes de confiar en el archivo**, correr:
   ```bash
   python3 validar_banco_casos_efu.py
   ```
   Corrige errores bloqueantes (exit code ≠ 0) antes de seguir. Las advertencias se revisan a mano.
5. Una vez validado, Claude (u otra sesión) hace una revisión puntual de una muestra de casos
   `"verificado"` contra el PDF fuente (usando `fuente_pdf` + `pagina` de cada caso) antes de que
   el JSON reemplace a `banco_preguntas_efu_pediatria.md` como fuente para generar
   `talleres_efu_semanales.md`.

**Esquema de cada caso en `banco_casos_efu.json`:**
```json
{
  "id": "string único, formato {codigo_fuente}_{pagina}_{indice}",
  "fuente_pdf": "nombre exacto del archivo en fuentes_pdf/",
  "pagina": 12,
  "modulo_tematico": "string o null",
  "enunciado": "texto verbatim completo",
  "opciones": { "A": "texto", "B": "texto", "...": "..." },
  "correctas": ["letra", "..."] o null,
  "estado": "verificado | sin_grilla | revisar_ocr | excede_opciones",
  "notas": "string o null"
}
```

**Reglas que aplican también a este banco (heredadas de las reglas EFU generales):**
- Máximo 8 opciones (A-H) por caso — si el original tiene más, se marca `"excede_opciones"` y no
  se usa para talleres.
- `correctas` solo se completa si hay grilla oficial u otra marca inequívoca en el PDF; si no,
  `"estado": "sin_grilla"` y `correctas: null` (cero alucinación, no se infiere por conocimiento
  médico).
- `"estado": "revisar_ocr"` indica texto dudoso por mala calidad de escaneo — no usar en talleres
  hasta confirmar contra el PDF original.
- Todo caso debe ser trazable a `fuente_pdf` + `pagina` para poder verificarlo manualmente.

**Próximo paso pendiente:** una vez que `banco_casos_efu.json` esté generado y validado, migrar
la generación de `talleres_efu_semanales.md` para que lea de este JSON en vez de releer los PDFs
o depender de `banco_preguntas_efu_pediatria.md`.
