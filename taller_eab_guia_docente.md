# Guía docente — Taller autoguiado: Trastornos del Estado Ácido-Base

**Archivo del alumno:** `taller_eab_online.html`
**Modalidad:** asincrónica, individual, para toda la cursada.
**Duración estimada:** 60 a 75 minutos.
**Creado:** 27/08/2026

---

## 1. Por qué esta estrategia y no otra

Se evaluaron seis formatos de taller. Con modalidad **asincrónica y sin docente presente**
quedan descartados el rally de estaciones, el caso en sobres y la guardia simulada: los tres
dependen de alguien que modere, cronometre o entregue información por partes.

Lo que sí funciona sin docente es un taller donde **el feedback está escrito de antemano**. De
ahí la decisión central del diseño: cada consigna muestra, al comprobar, el fundamento de
**todas** las opciones —también las que el alumno no eligió—. El alumno que se equivoca recibe
la explicación de por qué su opción es incorrecta *y* por qué la correcta lo es. Sin eso, un
taller asincrónico es un cuestionario, no un taller.

---

## 2. Estructura

| Módulo | Contenido | Consignas |
|---|---|---|
| **0** | Sondeo previo (dos preguntas, no puntúan) | 2 |
| **1** | Los 5 pasos · valores normales pediátricos · arterial vs. venoso vs. capilar · fórmulas de compensación · causas | — |
| **2** | Seis pacientes, uno por patrón | 19 |
| **3** | Caza del error: cuatro interpretaciones equivocadas | 4 |
| **4** | Desafío final: trastorno mixto | 3 |
| **Cierre** | Seis mensajes clave + kit de bolsillo imprimible | — |
| **Entrega** | Puntaje + dos preguntas abiertas + resumen copiable | 2 abiertas |

**26 consignas puntuables.** El Módulo 0 no puntúa a propósito: mide el punto de partida.

### Los seis casos y qué enseña cada uno

| Caso | Paciente | Patrón | Concepto central |
|---|---|---|---|
| 1 | Ana, 8 meses, diarrea | Acidosis metabólica, AG normal | La taquipnea del deshidratado es compensación, no neumonía. El bicarbonato no hace falta. |
| 2 | Bautista, 45 días, píloro | Alcalosis metabólica hipoclorémica | Aciduria paradojal. Urgencia **médica**, no quirúrgica. |
| 3 | Tomás, 3 meses, bronquiolitis | Acidosis respiratoria aguda | La caída de la frecuencia respiratoria es agotamiento, no mejoría. |
| 4 | Malena, 12 años, cetoacidosis | Acidosis metabólica, AG aumentado | Potasio "normal" con déficit corporal. Por qué no se da bicarbonato. |
| 5 | Sofía, 5 años, neumonía | Alcalosis respiratoria | **No todo EAB alterado se trata.** El mismo número, en otro paciente, sería sepsis. |
| 6 | Felipe, 2 años, ATR distal | Acidosis metabólica, AG normal | Anion gap urinario. La acidosis tubular como causa tratable de baja talla. |

### Los cuatro errores del Módulo 3

1. **El asmático:** pCO₂ "normal" en quien hiperventila = fatiga inminente.
2. **La cetoacidosis:** bolo de bicarbonato + demorar la insulina.
3. **El píloro:** a quirófano sin corregir el medio interno (riesgo de apnea posanestésica).
4. **El potasio tranquilizador:** 4,6 mEq/L en plena acidemia esconde un déficit real.

---

## 3. Cómo publicarlo en Classroom

El archivo es **una sola página, autocontenida**: no usa CDN, ni librerías, ni backend, ni
Firebase. Funciona sin conexión una vez cargada. Hay dos caminos:

### Opción A — GitHub Pages (recomendada, es el flujo que ya usás)

```bash
git add taller_eab_online.html taller_eab_guia_docente.md && git commit -m "feat(taller): taller autoguiado de estado ácido-base para Classroom"
```

Después de pushear queda en
`https://<tu-usuario>.github.io/<repo>/taller_eab_online.html`, y ese link se pega en Classroom.

> ⚠️ **Ojo con la pantalla de contraseña.** El taller es un archivo **aparte** de `index.html`
> y no pasa por `#access-gate`: los alumnos entran directo, que es lo que corresponde. No lo
> incorpores dentro de `index.html` salvo que quieras que tengan la contraseña del docente.

### Opción B — Subirlo a Drive

Drive no ejecuta JavaScript en la vista previa de un `.html`, así que **el taller no funciona
adjuntándolo como archivo**. Si no querés usar GitHub Pages, la alternativa real es cualquier
hosting estático (Netlify Drop, por ejemplo). Decímelo y lo armo.

### Configuración sugerida de la tarea

- **Tipo:** Tarea (no "Material"), para que quede la entrega de cada alumno.
- **Puntos:** 0, o "sin calificación". El taller es formativo. Si califica, el alumno busca
  acertar en vez de equivocarse, y el módulo de caza del error pierde todo su sentido.
- **Rúbrica:** ninguna. No hay nada que calificar por criterios.
- **Entrega:** el alumno pega el resumen que genera la página.

---

## 4. La constancia en Classroom

**Configuración elegida (27/08/2026): solo el taller HTML.** Sin formulario de Google. La
constancia es el resumen que el alumno pega como respuesta a la tarea.

### Por qué esta y no otra

Classroom **no puede detectar que un alumno abrió el link** del taller: no hay ninguna
comunicación entre una página externa y Classroom. Solo registra lo que el alumno entrega
adentro de Classroom. Se evaluaron tres configuraciones:

| | Qué implica | Por qué no |
|---|---|---|
| Solo formulario de Google | Todo adentro de Google, nota automática | Se pierde el Módulo 1 (los 5 pasos, tablas, kit de bolsillo) y el feedback por opción |
| **Solo el taller HTML** | **Mejor experiencia de aprendizaje; constancia = resumen pegado** | **Elegida** |
| Las dos | Aprende en el HTML, deja constancia en el formulario | Un paso más para el alumno; solo se justifica si el taller lleva nota |

Como el taller **no lleva nota**, la debilidad del resumen pegado (es editable) no importa: no
hay nada que un alumno gane falsificándolo.

### Qué entrega el alumno

```
TALLER: TRASTORNOS DEL ESTADO ÁCIDO-BASE EN PEDIATRÍA
Taller desarrollado por Diego Steinberg
=====================================================
Alumno/a: PEREZ, Ana
Fecha de finalización: 27/8/2026, 08:48:56
Consignas resueltas: 26 de 26
Respuestas correctas: 21 de 26

DETALLE POR CONSIGNA
  [OK   ] Caso 1 (Ana, 8 meses) · consigna 1 — marcó A
  [ERROR] Caso 1 (Ana, 8 meses) · consigna 2 — marcó B
  ...
```

Classroom registra por su cuenta el estado ("Entregado" / "Entregado con retraso") y la fecha y
hora. Eso es la constancia formal; el texto pegado es el detalle.

### Qué hacer con las entregas

Leyendo el conjunto se detecta en dos minutos **qué consigna falló el curso entero**, para
llevar ese tema al teórico siguiente. Es el mismo criterio del análisis post-examen de la
pestaña Evaluaciones, pero a mano y sin infraestructura.

---

## 4 bis. Apéndice: el formulario, por si alguna vez hace falta nota

**No se usa en la configuración actual.** Queda armado y probado por si más adelante el taller
tiene que calificar.

`crear_formulario_classroom.gs` construye el cuestionario completo en Google Forms: 26 preguntas
en 12 secciones, 1 punto cada una, con la clave marcada y devolución automática. **Las preguntas
se extraen del propio `taller_eab_online.html`**, no están transcriptas: si se corrige una
consigna en la página y se vuelve a generar, el formulario sale sincronizado.

**Para crearlo:** `script.google.com` → proyecto nuevo → pegar el archivo entero → guardar →
elegir la función `crearFormulario` → Ejecutar → autorizar (el aviso "Google no ha verificado
esta aplicación" es normal: la aplicación es el propio script) → los links quedan en el registro
de ejecución.

**Para adjuntarlo:** *Trabajo de clase → Crear → **Tarea*** (la común, no "Tarea con
cuestionario") → **Añadir → Drive** → elegir el formulario → activar **"Importar
calificaciones"** → 26 puntos.

Dos advertencias, si algún día se activa:

> Cada ejecución de `crearFormulario` crea un formulario **nuevo, con link nuevo**. No actualiza
> el existente. Si el link ya se repartió, editar directo en Forms (Clave de respuestas, en cada
> pregunta).

> La importación de notas funciona bien en cuentas de Workspace; con cuentas personales de Gmail
> el interruptor a veces no aparece. Plan B: Forms corrige solo igual, los puntajes están en la
> pestaña Respuestas.

---

## 5. Decisiones de contenido, para que quede registrado

- **Las viñetas son de elaboración propia, no son casos EFU.** Está aclarado en un recuadro al
  principio de la página, para no confundir a los alumnos con la ejercitación de los viernes.
  Los valores de laboratorio de cada caso fueron construidos para ser **internamente
  consistentes**: cada uno verifica la ecuación de Henderson (`[H⁺] ≈ 24 × pCO₂ / HCO₃`) y la
  fórmula de compensación que corresponde a su patrón. Se puede calcular sobre ellos sin que
  aparezcan contradicciones.
- **No se usó ningún caso del banco EFU** — la consigna fue expresamente un taller desde cero.
  Si más adelante querés enlazar este taller con la ejercitación EFU, en
  `banco_casos_efu.json` hay dos casos verificados con estado ácido-base real:
  - `portemas_neo_14` (Emanuel, 25 días): pH 7,63 · HCO₃ 39,5 · K 2,8 · Cl 90 → alcalosis
    metabólica por estenosis pilórica. Es el equivalente EFU del Caso 2.
  - `portemas_end_01_licia` (Licia, 12 años): pH 7,20 · HCO₃ 6,7 → cetoacidosis. Equivalente
    del Caso 4. Ojo: la fuente informa la pCO₂ en "mMol/l", que es un error de unidad del
    original (la pCO₂ se mide en mmHg).
- **Sin Firebase ni votación en vivo.** Es un taller individual y asincrónico: la sala en vivo
  no aporta nada y agregaría una dependencia de red innecesaria.
- **El progreso se guarda en `localStorage`** del dispositivo del alumno. Si cambia de teléfono
  o borra los datos del navegador, pierde el avance. Está avisado en la introducción de la
  página.
