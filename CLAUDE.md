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
- `index.html`: Herramienta interactiva publicada en GitHub Pages, con cuatro solapas: **Anuncios Classroom** (botón de copiado directo), **Talleres EFU** (modo presentación con votación de alumnos), **Control de Prácticos** (matriz de asistencia con sincronización en la nube y exportación XLSX) y **Evaluaciones** (armado y toma de parciales/prefinales, ver sección propia más abajo).
- `generar_planilla_excel.py`: Generador de la planilla Excel de control de prácticos. Lee la
  nómina real de `nomina_alumnos.txt` (no versionado, ver sección "Control de Ingreso y Datos
  Sensibles" más abajo) — el script ya no trae nombres hardcodeados.
- `inventario_clases_drive.md`: Repositorio dinámico de presentaciones en Google Drive.
- `fuentes_pdf/`: PDFs oficiales de los exámenes EFU (fuente de verdad original para las preguntas).
- `votar.html`: Página mobile-first para que los alumnos voten desde su celular durante el Modo Presentación (ver sección Votación en Vivo más abajo).
- `examen.html`: Página mobile-first para que los alumnos rindan parciales/prefinales desde su celular (ver sección Evaluaciones más abajo). No comparte código con `votar.html` a propósito: la dinámica es distinta (navegación libre entre preguntas, entrega única, sin feedback de aciertos).

> Las presentaciones `.pptx` están ignoradas por git (se comparten por Google Drive).

---

## 🔒 Control de Ingreso y Datos Sensibles (agregado 21/08/2026)

`index.html` y `fuentes_pdf/` son **públicos** (repo público, GitHub Pages público) — no hay
forma de ocultarlos sin pasar a un plan de GitHub pago y sin romper `votar.html`, que depende de
poder hacer `fetch('index.html')` desde cualquier celular sin login (así funciona el QR). Dos
medidas tomadas, con ese límite en mente:

- **Pantalla de contraseña en `index.html`** (`#access-gate`, al principio de `<body>`): overlay
  de JS que pide contraseña antes de mostrar el contenido (envuelto en
  `<div id="app-content" style="display:none">`), compara un hash SHA-256 (no la contraseña en
  texto plano) y guarda el desbloqueo en `localStorage`. **Esto NO es seguridad real** — el HTML
  sigue siendo 100% descargable con `curl`/`view-source` con o sin la contraseña, a propósito,
  porque si se ocultara el contenido real del DOM se rompería `votar.html`. Sirve sólo para que
  no entre cualquiera navegando por curiosidad. Ojo si se retoca: el chequeo automático de
  desbloqueo al cargar la página tiene que ir en un listener de `DOMContentLoaded` (o después),
  nunca en medio del `<script>` que está antes de `#app-content` en el HTML — si no,
  `document.getElementById('app-content')` da `null` porque ese nodo todavía no se parseó, y la
  página queda en blanco en una recarga con sesión ya desbloqueada (bug real que apareció y se
  corrigió durante esta misma tarea).
- **Nómina real de alumnos, nunca en el repositorio.** Antes estaba hardcodeada en dos lugares
  del código público (`generar_planilla_excel.py` y el `studentGroups` de `index.html`). Ahora:
  - En `index.html`, la pestaña Control de Prácticos usa `studentRoster` (array simple, sin el
    campo "Grupo" que tenía antes — no se usaba en ningún lado más que como dato muerto), cargado
    de `localStorage` (`pediatriaStudentRoster`). Botón "✏️ Editar Nómina" en la barra de
    controles para cargarla/editarla; si está vacía al iniciar, abre el editor automáticamente
    (primer uso). Se pierde si se borra el `localStorage` del navegador o se cambia de
    dispositivo — hay que volver a cargarla a mano, no hay sync a la nube de la nómina en sí
    (sólo `attendanceData`, los registros de asistencia, si se usa la sincronización existente).
  - `generar_planilla_excel.py` lee de `nomina_alumnos.txt` (raíz del repo, un nombre por línea,
    formato "APELLIDO, Nombre") — ese archivo está en `.gitignore` a propósito y hay que crearlo
    localmente para poder correr el script; si falta, el script explica cómo crearlo en vez de
    fallar en silencio.
  - **Pendiente, no resuelto:** los commits viejos del repo (anteriores a este cambio) siguen
    teniendo la nómina real en el historial de git, visible en GitHub aunque el archivo actual ya
    no la tenga. Sacarla del historial requiere reescribir commits (`git filter-repo` o similar,
    con force-push) — es una operación más delicada que no se hizo todavía; consultar con el
    docente antes de intentarla si se vuelve prioridad.

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

## 📋 Evaluaciones: Parciales y Prefinales (agregado 24/08/2026)

Cuarta pestaña de `index.html` (`#tab-evaluaciones`) + página del alumno `examen.html`. El docente
arma el examen eligiendo casos del **mismo banco EFU que usa en los talleres** (las tarjetas
`.card` de la pestaña Talleres EFU — no hay una segunda copia del contenido clínico), lo activa
cuando toca, y los alumnos rinden desde el celular entrando por un QR proyectado.

**Flujo:** armar examen (título, tipo parcial/prefinal, fecha, casos) → "▶ Tomar" abre la sala y
muestra el QR → los alumnos escanean, se identifican con **apellido y nombre** y quedan en el
lobby → "▶ Comenzar examen" les habilita las preguntas → el docente ve el desempeño en vivo →
"⏹ Finalizar examen" congela los resultados → exportación a Excel y PDF.

**En el celular del alumno:** puede pasar a otra pregunta sin contestar, volver atrás y cambiar
respuestas cuantas veces quiera; una grilla numerada arriba muestra cuáles ya respondió. Al
enviar, pierde el acceso (confirmación previa avisando cuántas quedaron sin responder). Cada
respuesta se guarda sola en Firebase apenas se toca una opción, así que quedarse sin batería o
recargar la página no pierde nada.

**Reglas de corrección** (definidas por el docente, 24/08/2026):
- Cada pregunta vale **1 punto**, otorgado en forma **proporcional: aciertos ÷ cantidad de
  opciones correctas**, **sin penalizar** las incorrectas.
- Marcar **más de 3 opciones anula la pregunta**: 0 puntos, pero sigue contando en el puntaje
  máximo (si no, marcar de más saldría gratis). El celular **no bloquea** la cuarta marca a
  propósito — avisa en rojo, igual que la regla del EFU real.
- El armador **sólo ofrece casos con exactamente 3 opciones correctas** (141 de los 167 del banco).
  Hay un checkbox para ver los demás, pero quedan deshabilitados.
- **Escala de nota:** lineal en dos tramos, **0% → 1**, **60% → 4** (aprobado), **100% → 10**. La
  "nota final" entera nunca aprueba por redondeo: con menos del 60% se topea en 3 (si no, un 59,9%
  redondearía a 4).
- **Mezclado opcional** de orden de preguntas y de opciones, distinto para cada alumno. Se calcula
  en el celular y se guarda en su `localStorage` (una recarga no reordena el examen a mitad de
  camino). Las respuestas viajan **siempre con la letra canónica del banco**, nunca con la letra
  mostrada en pantalla: el mezclado es puramente visual y la corrección no depende de él.
- **Ocultar nombres:** toggle del lado del docente para proyectar el desempeño sin exponer quién
  es quién. Con los nombres ocultos la tabla se **reordena por puntaje** — si se ordenara por
  apellido, la posición en la lista delataría igual cada fila.

**Modelo de datos (Firebase):** cuelga de `efuRooms/{roomId}/exam/` — se eligió ese nodo **a
propósito** porque las reglas de seguridad ya desplegadas habilitan lectura/escritura bajo
`efuRooms/$roomId`, así que **no hace falta tocar ni redesplegar las reglas**. (La validación de
`meta` de las reglas aplica a `efuRooms/$roomId/meta`, el de la votación; el examen usa
`.../exam/meta`, que es otro nodo.) Estructura: `exam/meta` (estado `lobby`/`running`/`closed` y
opciones), `exam/questions` (array), `exam/students/{sid}`, `exam/answers/{sid}/{nPregunta}`
— cada alumno escribe sólo en su propio nodo, sin condiciones de carrera.

**Lo que NUNCA sale de la computadora del docente:** a Firebase se suben **sólo enunciado y
opciones**. Ni las respuestas correctas ni el título del caso (que suele spoilear el diagnóstico:
"Amalia de 9 meses (Bronquiolitis Leve)") viajan. **Toda la corrección ocurre en el navegador del
docente**, contra las tarjetas de la pestaña Talleres EFU. Verificado con `curl` sobre una sala
real: las opciones publicadas tienen sólo `letter` y `text`.

**Los resultados se guardan en `localStorage`** (`pediatriaExams`, junto con los exámenes
armados), no en Firebase: la nube es el canal en vivo, no el archivo del examen. Implicancia
práctica igual que con la nómina — **si se borra el `localStorage` o se cambia de computadora, se
pierden los exámenes y las notas**. Exportar a Excel/PDF después de cada toma.

**Limitaciones conocidas, asumidas:**
- **Las respuestas correctas siguen estando en `index.html`, que es público.** Un alumno que
  conozca la URL y mire el código fuente puede encontrar los casos con su `data-correct="true"`.
  La pantalla de contraseña no lo impide (nunca lo impidió, ver sección de seguridad arriba). Lo
  que se hizo es no facilitarlo: el celular del alumno **no descarga `index.html`** durante el
  examen (a diferencia de `votar.html`, que sí lo hace). Es un examen presencial con el docente
  mirando; para que sea a prueba de todo habría que sacar los casos del sitio público.
- **Doble entrega:** un alumno que ya entregó y borra su `localStorage` queda bloqueado igual —
  al reingresar se chequea contra Firebase si ya figura una entrega con ese mismo nombre
  (comparación sin distinguir mayúsculas/tildes de capitalización). Lo que **no** cubre es que
  entre con un nombre distinto o que rinda por otro: la identificación es por texto libre, sin
  login. Se eligió texto libre a propósito para no publicar la nómina real en una base pública
  (ver sección de datos sensibles).
- El **PDF sale por la ventana de impresión** del navegador ("Destino: Guardar como PDF"), no por
  una librería: es un acta con formato propio, no suma otro CDN y sigue funcionando si el aula se
  queda sin internet después de cargar la página.

---

## 🗄️ Banco Estructurado de Casos EFU (`banco_casos_efu.json`)

> ⚠️ **Estado real (actualizado 21/08/2026): extracción parcial, en pausa por decisión del docente.**
> `banco_casos_efu.json` y `validar_banco_casos_efu.py` **sí existen** y están cargados con
> **194 casos de `EFU POR TEMAS (resuelto).docx.pdf`** (las 124 páginas de ese PDF, completas —
> 138 `"verificado"`, 53 `"excede_opciones"`, 2 `"revisar_ocr"`, 1 `"sin_grilla"`). Los otros dos
> PDFs de `fuentes_pdf/` (`1.1 COMPILADO EFUS con rta.pdf`, 141 páginas, y
> `EFU 29-02-24 con GRILLA.pdf`, 14 páginas escaneadas) **no se procesaron** — el docente decidió
> que el volumen actual alcanza por ahora. Retomar esos dos con el mismo flujo de abajo si más
> adelante hace falta más contenido; no es necesario para que el banco actual sea usable.
>
> **Los 138 casos `"verificado"` ya están integrados en `index.html`** (pestaña Talleres EFU),
> como tarjetas `.card` normales al final del tab, con `data-tema` para el buscador y
> `data-semana=""` (vacío a propósito): no aparecen navegando por un viernes específico (1-9),
> sólo con "Todas" o buscando por tema — decisión del docente, porque no corresponden a ningún
> viernes del cronograma. Se distinguen de las tarjetas curadas por semana en dos cosas: el badge
> dice "Banco EFU — {módulo}" en vez de "Viernes X — EFU", y la justificación es breve (1-2
> líneas de lógica clínica general, no la justificación letra por letra que sí tienen los casos
> curados) — decisión del docente para no multiplicar por 138 el trabajo de escribir
> justificación detallada. IDs de sus `answer-box` con prefijo `ansB` (`ansB1`...`ansB138`) para
> no colisionar con los `ansN`/`ansN_M` de las tarjetas curadas.
> **Antigravity queda descartado como método de extracción** (decisión del docente, 21/08/2026):
> pide permisos demasiado amplios y sus resultados no son confiables. La extracción la hace
> **Claude Code directamente**, caso por caso, con el skill de PDF — más lento y con más costo en
> tokens que delegarla a otra IA, pero es el trade-off aceptado a cambio de no depender de una
> herramienta externa y de mantener el mismo nivel de cuidado que ya se usó en la auditoría del
> 21/08/2026 (ver más abajo). `prompt_extraccion_antigravity.md` ya no aplica y no hace falta
> crearlo.
>
> Lo que sí existe, y **no hay que confundir con este plan**, es una extracción distinta y
> anterior: `banco_casos_efu_completo.json` (+ `README_CASOS_EFU.md`, `RESUMEN_CASOS_EFU.md`,
> `EXTRACCION_CASOS_EFU_INFO.md`), generada el 18/08/2026 por una sesión de Claude Code ad hoc,
> sin pasar por Antigravity. Tiene otro nombre, otro esquema (sin `estado`/`modulo_tematico`,
> sin distinción `sin_grilla`), y **no la lee ni `index.html` ni `talleres_efu_semanales.md` ni
> ningún script** — es un archivo huérfano. Además, completa `respuestas_correctas` en el 100%
> de los casos con una heurística de texto (ausencia de `"(No,"` o `"KILLER"` en la opción), lo
> cual no cumple el estándar de "grilla oficial inequívoca" de este proyecto — tratarlo como
> borrador a revisar, no como banco verificado, si se lo va a reutilizar.
>
> De paso: una auditoría puntual de `talleres_efu_semanales.md` (21/08/2026) encontró que los
> casos "Jonathan" y "Amalia" (Semana 3) tienen algunas letras completadas por criterio clínico
> en vez de grilla — queda documentado inline con "⚠️ Nota de método" en ese archivo, sin
> resolver del todo (no hay forma de cerrarlo sin más anotaciones en la fuente). El caso
> "Rosendo" (Semana 2) tenía además un diagnóstico que contradecía una anotación explícita de la
> fuente ("BRONQUIOLITIS" según un compañero de cursada); quedó **confirmado por el docente de
> la cátedra** como crisis hipoxémica (paciente cardíaco conocido, salbutamol incorrecto) — ya
> cerrado, la anotación de la fuente queda sólo de referencia.

**Motivación:** releer los PDFs de `fuentes_pdf/` cada vez que se genera o amplía un taller es lento,
caro en tokens y crece mal a medida que se agrega material nuevo. Por eso se migró a un banco
intermedio estructurado en JSON, que actúa como fuente de verdad rápida de consultar (por
módulo/tema, sin reprocesar PDFs) pero manteniendo trazabilidad total al PDF y página de origen.

**Flujo de trabajo (revisado 21/08/2026 — sin Antigravity, ver callout arriba):**
1. Se agregan PDFs nuevos a `fuentes_pdf/`.
2. Claude Code hace la extracción directamente (con el skill de PDF para lectura/OCR confiable),
   caso por caso, citando siempre `fuente_pdf` + `pagina`. Nada de texto ni de opciones se
   completa de memoria — todo sale de lo que Claude efectivamente lee en el PDF de esa tanda.
3. Claude arma/actualiza `banco_casos_efu.json` en la raíz del repo con el esquema de abajo.
4. **Antes de confiar en el archivo**, correr:
   ```bash
   python3 validar_banco_casos_efu.py
   ```
   Chequeo mecánico (máximo 8 opciones, campos obligatorios, `estado` válido) — no reemplaza la
   revisión humana, sólo atrapa errores de forma. Corregir errores bloqueantes antes de seguir.
5. Revisión puntual de una muestra de casos `"verificado"` contra el PDF fuente (usando
   `fuente_pdf` + `pagina` de cada caso) antes de que el JSON reemplace a
   `banco_preguntas_efu_pediatria.md` como fuente para generar `talleres_efu_semanales.md`.

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

**Próximo paso pendiente:** `banco_casos_efu.json` ya existe y está validado (194 casos de
`EFU POR TEMAS`), pero todavía no se usó para generar ni ampliar `talleres_efu_semanales.md` —
ese archivo sigue viniendo de una lectura directa de PDFs hecha antes de que este banco
existiera. Migrar la generación de talleres nuevos para que lea de este JSON (filtrando por
`modulo_tematico` y `estado: "verificado"`) es el siguiente paso real, cuando haga falta ampliar
el cuadernillo.
