# Votación en vivo por QR para el Modo Presentación EFU

> Plan de implementación pendiente. Generado con Claude Code el 20/08/2026 a pedido del
> docente, para implementarse en otra sesión/computadora.

## Contexto

Hoy el Modo Presentación de Talleres EFU (`index.html`) simula una votación: el docente
toca las teclas A-H para marcar manualmente qué alumnos "levantaron la mano", y esa marca
es puramente local al navegador del docente — no hay participación real de los celulares
de los alumnos. El objetivo es reemplazar/complementar esa simulación por una votación real:
cada alumno escanea un QR una vez al inicio de la clase, y desde su celular vota la opción
del caso que se está mostrando en pantalla en ese momento; el resultado agregado se ve en
vivo en la proyección. El docente puede elegir, sesión por sesión, entre un modo **Anónimo**
(rápido, sin identificación) y un modo **Equipos** (gamificado, con nombre de equipo libre y
un ranking de puntos que se acumula caso tras caso a lo largo de todo el taller).

Decisiones ya tomadas con el usuario:
- Backend: **Firebase Realtime Database**, vía su API REST (fetch), sin SDK — mismo estilo
  `fetch`-based que ya usa la sincronización de Asistencia (`index.html:3016-3208`), pero sin el
  problema de "pisar votos": en vez de leer-modificar-escribir un blob completo (como jsonblob),
  cada voto se **agrega** como nodo nuevo (`POST` con push-id autogenerado por Firebase), así que
  aunque 30 celulares voten en el mismo segundo nunca se pisan entre sí.
- Dos modos elegidos por el docente al activar la votación: Anónimo / Equipos (nombre libre).
- Modo Equipos: ranking de puntos acumulado a lo largo de todo el taller.
- Anti-doble-voto: un voto por celular por caso, marcado con `localStorage` (no a prueba de
  trampas, alcanza para uso en clase).
- Sala de votación nueva y separada de la sala de sincronización de Asistencia.

## Modelo de datos (Firebase Realtime Database)

```
/efuRooms/{roomId}/
  meta/
    mode: "anonimo" | "equipos"
    currentCaseId: "12"            # id derivado del caso que se está votando ahora
    phase: 1 | 2                    # 1 = votación abierta, 2 = respuestas reveladas
    updatedAt: <timestamp>
  votes/{caseId}/{pushId}/          # un nodo por voto emitido, nunca se sobreescribe
    options: ["D","E","H"]
    team: "Equipo Rojo"              # solo si mode = "equipos"
    ts: <timestamp>
  teams/{teamName}/
    score: <number>                  # solo se usa en modo "equipos"
```

- `caseId` **no requiere tocar el markup de los 29 casos existentes**: se deriva en runtime del
  `id` ya único de cada `.answer-box` (`ans1`, `ans12`, `ans8_2`, ...), quitándole el prefijo
  `ans`. Es la misma lógica, replicada tanto en `index.html` como en `votar.html` (2 líneas, sin
  riesgo de duplicar contenido clínico).
- Los votos nunca se leen-modifican-escriben entre celulares: cada alumno solo hace `POST`
  (append). El único lector/agregador es el navegador del docente, que hace `GET` por polling.
- `teams/{team}/score` sólo lo escribe el navegador del docente (un único actor, secuencialmente,
  al revelar cada caso) — tampoco hay condición de carrera ahí.

## Página nueva para los alumnos: `votar.html`

Página estática, mobile-first, autocontenida (sin el resto del CSS/JS de `index.html`).

- Lee `?room=ROOMID` de la URL (la que codifica el QR). Si falta, muestra un input para tipear
  el código de sala a mano (fallback si el QR no escanea).
- Si `meta.mode === "equipos"` y el celular no tiene un nombre de equipo guardado en
  `localStorage`, pide "Nombre de tu equipo" una sola vez (persiste para toda la sesión).
- Hace polling de `/efuRooms/{roomId}/meta.json` cada ~2s. Cuando cambia `currentCaseId`:
  - Hace `fetch('index.html')` (mismo origen, sin problema de CORS) y parsea el HTML con
    `DOMParser` para extraer **solo el título y las opciones** (letra + texto) del caso activo
    — nunca la data clínica completa (esa ya está en el proyector). Así el contenido de las
    preguntas tiene una única fuente de verdad (los `.card` de `index.html`); `votar.html` no
    duplica ni reinventa texto de ningún caso (cumple la regla de "cero alucinación" del
    proyecto).
  - Renderiza los botones de opción (toggle multi-selección, para cubrir los casos
    "marque hasta 3 opciones") y un botón "Votar".
- Al votar: `POST` a `/efuRooms/{roomId}/votes/{caseId}.json` con `{options, team?, ts}`, marca
  `localStorage` (`efuVoted_{roomId}_{caseId}`) para bloquear un segundo voto en ese mismo caso,
  y muestra "✅ Voto enviado, esperando al resto".
- Si `phase === 2` (docente ya reveló respuestas) o si el alumno ya votó ese caso: pantalla de
  espera ("Esperando el próximo caso...").

## Cambios en `index.html` (lado docente)

1. **Helpers REST Firebase** (paralelos a `fetchWithTimeout`/`pushToCloud` ya existentes):
   `efuFbGet`, `efuFbPost`, `efuFbPatch` contra `${EFU_FIREBASE_DB_URL}/efuRooms/...`. Si
   `EFU_FIREBASE_DB_URL` no está configurada, la Votación en Vivo queda deshabilitada sin romper
   nada (fallback explicado abajo).

2. **Activar sala** — nuevo control en la barra de la pestaña EFU (junto al botón
   "📺 Iniciar Modo Presentación"): selector Anónimo/Equipos + botón "🗳️ Activar Votación en
   Vivo". Genera un `roomId` corto (6 caracteres), escribe el `meta` inicial en Firebase, lo
   guarda en `localStorage`, y muestra el código de sala + QR (usando la librería `qrcode` vía
   CDN `jsdelivr`, mismo patrón que ya usa `xlsx.js` en `index.html:8`) apuntando a
   `votar.html?room=ROOMID`.

3. **`initPresentationData()`**: agrega el `caseId` derivado a cada entrada de
   `presentationCases`.

4. **`renderSlide()`**: agrega un panel de votación en vivo (QR + código de sala, colapsable,
   con el mismo comportamiento de auto-ocultarse que ya tienen los controles vía
   `resetControlsTimer()`), y — cuando hay sala activa — cambia `renderOptionsOnly()` para
   dibujar una barra de porcentaje en vivo por opción (en vez de sólo el marcado manual A-H que
   hay hoy). Si no hay sala activa, todo sigue funcionando exactamente igual que ahora (toggle
   manual con teclado), sin romper el modo actual.

5. **Polling de votos**: mientras `currentPhase === 1` y hay sala activa, `setInterval` (~2s)
   hace `GET` de `votes/{caseId}` y recalcula las barras. Se detiene al cambiar de caso/fase o
   al salir de la presentación (`exitPresentation`).

6. **`nextStep()` / `prevStep()`**: al cambiar de caso o fase, hacen `PATCH` de
   `meta.currentCaseId` / `meta.phase` (fire-and-forget). Al pasar de fase 1→2 (revelar
   respuestas) en modo "equipos": un único `GET` final de los votos del caso, compara el
   conjunto de opciones votado por cada equipo contra el conjunto de opciones correctas
   (`isCorrect` ya disponible en `currentCase.options`) — **coincidencia exacta de conjuntos =
   1 punto** (regla simple y sin ambigüedad, también cubre los casos de una sola opción
   correcta) — y actualiza `teams/{team}/score` en Firebase.

7. **Ranking** (sólo modo equipos): botón "🏆 Ver Ranking" en el pie de la presentación, muestra
   `teams` ordenado por puntaje.

8. **Degradación sin red/Firebase**: si `EFU_FIREBASE_DB_URL` no está configurada, o los
   `fetch` fallan/timeoutean, el panel de votación muestra "Votación en vivo no disponible" y el
   Modo Presentación sigue funcionando igual que hoy (toggle manual A-H), sin bloquear la clase.

## Configuración manual de Firebase (una sola vez)

1. Crear proyecto en console.firebase.google.com → habilitar **Realtime Database** (no
   Firestore).
2. Reglas de seguridad (documentar también en `CLAUDE.md` una vez implementado), acotadas al
   nodo `efuRooms`:
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
   (Sin autenticación de alumnos: es una herramienta de aula de bajo riesgo, no datos
   sensibles; el acotamiento a `efuRooms` evita que se use la base para otra cosa.)
3. Copiar el `databaseURL` del proyecto (ej. `https://xxx-default-rtdb.firebaseio.com`) y
   pegarlo en la constante `EFU_FIREBASE_DB_URL` de `index.html` (y `votar.html`).

## Archivos a crear/modificar

- **Nuevo**: `votar.html` — página de votación para el celular del alumno.
- **`index.html`**: helpers Firebase, control de activación de sala + QR, cambios en
  `initPresentationData`, `renderSlide`, `renderOptionsOnly`, `nextStep`, `prevStep`,
  `startPresentation`/`exitPresentation` (arranque/parada de polling), nuevo `<script src>` de
  la librería `qrcode` (CDN).
- **`CLAUDE.md`**: nueva sección documentando la Votación en Vivo (arquitectura, reglas de
  Firebase, cómo configurar `EFU_FIREBASE_DB_URL`), siguiendo el estilo de las secciones
  existentes.

## Verificación

- Servir el repo local (`python3 -m http.server`), abrir `index.html` en una pestaña (docente)
  y `votar.html?room=<el generado>` en otra pestaña/celular (o modo dispositivo de Chrome)
  simulando un alumno.
- Probar modo **Anónimo**: votar desde 2-3 "alumnos" simulados, confirmar que las barras en
  vivo del docente se actualizan en ~2s y que el conteo es correcto.
- Probar modo **Equipos**: votar con 2 equipos en 2-3 casos, confirmar que el ranking acumula
  puntos sólo cuando el conjunto de opciones coincide exactamente con las correctas.
- Confirmar el bloqueo de doble voto (recargar `votar.html` en la misma pestaña/celular sobre el
  mismo caso no debe permitir votar de nuevo).
- Confirmar que un caso alcanzado por el buscador por tema (no por semana) también vota
  correctamente — valida que el `caseId` derivado de `.answer-box` es estable independientemente
  del filtro activo.
- Simular Firebase mal configurado (`EFU_FIREBASE_DB_URL` vacío) y confirmar que el Modo
  Presentación sigue funcionando igual que hoy, sin errores en consola que rompan la UI.
