/**
 * ============================================================================
 *  CREADOR DEL FORMULARIO DE CONSTANCIA
 *  Taller: Trastornos del Estado Ácido-Base en Pediatría
 *  Desarrollado por Diego Steinberg
 * ============================================================================
 *
 *  CÓMO USARLO
 *  -----------
 *  1. Entrá a  https://script.google.com  y creá un proyecto nuevo.
 *  2. Borrá lo que venga por defecto y pegá ESTE archivo completo.
 *  3. En el selector de función elegí  crearFormulario  y apretá Ejecutar.
 *     La primera vez Google pide autorización: es tu propia cuenta creando
 *     un formulario en tu propio Drive.
 *  4. Al terminar, abrí el registro de ejecución: ahí quedan el link de
 *     edición y el link para los alumnos.
 *
 *  QUÉ MODO USAR
 *  -------------
 *  'COMPLETO'   -> las 26 consignas del taller, autocorregidas, con nota.
 *                  Da constancia fuerte y nota importable a Classroom.
 *  'CONSTANCIA' -> formulario corto: nombre, el resumen que genera el taller
 *                  y las dos preguntas abiertas. Para cuando el taller se
 *                  resuelve en la página y el formulario es sólo el acuse.
 */

const MODO = 'COMPLETO';          // 'COMPLETO'  |  'CONSTANCIA'

const LINK_TALLER = 'PEGAR ACÁ EL LINK DEL TALLER';

const TITULO = 'Taller: Trastornos del Estado Ácido-Base en Pediatría';
const AUTOR  = 'Diego Steinberg';

const BLOQUES = [
 {
  "tipo": "seccion",
  "titulo": "Caso 1 — Ana, 8 meses",
  "ayuda": "Consulta por diarrea acuosa de 4 días de evolución, 8 a 10 deposiciones diarias, con vómitos ocasionales. Desde ayer rechaza el pecho y la madre la nota \"dormida\". \n\nExamen físico: letárgica pero reactiva al estímulo, ojos hundidos, mucosas secas, pliegue cutáneo que retrae lentamente, relleno capilar 3 segundos. FR 46/min sin tiraje ni ruidos agregados. FC 168/min. Peso actual 7,2 kg; pesaba 7,9 kg hace diez días.\n\nEXÁMENES COMPLEMENTARIOS\n• pH: 7,22\n• pCO₂: 25 mmHg\n• HCO₃: 10 mEq/L\n• EB: −16 mEq/L\n• Na⁺: 138 mEq/L\n• K⁺: 3,4 mEq/L\n• Cl⁻: 117 mEq/L\n• Glucemia: 88 mg/dL\n• Urea: 48 mg/dL\n• Creatinina: 0,5 mg/dL",
  "qs": [
   {
    "id": "c1q1",
    "tipo": "radio",
    "texto": "Pasos 1 y 2: ¿cuál es el trastorno primario?",
    "hint": "",
    "opts": [
     {
      "t": "Acidosis metabólica",
      "ok": true,
      "fb": "El pH bajó y el HCO₃ está bajo: los dos se movieron en la misma dirección. Ese es el trastorno primario."
     },
     {
      "t": "Acidosis respiratoria",
      "ok": false,
      "fb": "Si fuera respiratoria, la pCO₂ tendría que estar alta. Acá está en 25 mmHg, es decir baja."
     },
     {
      "t": "Alcalosis respiratoria",
      "ok": false,
      "fb": "La pCO₂ baja llama la atención, pero si fuera el trastorno primario el pH tendría que ser alto, y está en 7,22. Acá la pCO₂ baja es la compensación."
     },
     {
      "t": "Trastorno mixto",
      "ok": false,
      "fb": "Todavía no podés afirmarlo: para eso hay que calcular primero si la compensación es la esperada. Ese es el paso 3."
     }
    ]
   },
   {
    "id": "c1q2",
    "tipo": "radio",
    "texto": "Paso 3: aplicá la fórmula de Winter. ¿La compensación respiratoria es adecuada?",
    "hint": "pCO₂ esperada = 1,5 × HCO₃ + 8 (± 2)",
    "opts": [
     {
      "t": "Sí, es exactamente la esperada",
      "ok": true,
      "fb": "1,5 × 10 + 8 = 23, con un rango de 21 a 25. La pCO₂ medida es 25: cae dentro del rango. La taquipnea de Ana es la compensación, no una neumonía."
     },
     {
      "t": "Es insuficiente: debería tener una pCO₂ más baja",
      "ok": false,
      "fb": "La esperada es de 21 a 25 mmHg y la medida es 25. Está compensando lo que corresponde."
     },
     {
      "t": "Es excesiva: hay además una alcalosis respiratoria",
      "ok": false,
      "fb": "Para afirmar eso la pCO₂ tendría que estar por debajo de 21. Con 25 está en el límite superior de lo esperado."
     },
     {
      "t": "No se puede evaluar sin una muestra arterial",
      "ok": false,
      "fb": "Una muestra venosa es perfectamente válida para evaluar el componente metabólico y el anion gap. Solo la oxigenación exige sangre arterial."
     }
    ]
   },
   {
    "id": "c1q3",
    "tipo": "radio",
    "texto": "Paso 4: calculá el anion gap e interpretalo.",
    "hint": "AG = Na⁺ − (Cl⁻ + HCO₃⁻)",
    "opts": [
     {
      "t": "AG 11: normal → se perdió bicarbonato por vía digestiva",
      "ok": true,
      "fb": "138 − (117 + 10) = 11. Gap normal con cloro alto: acidosis metabólica hiperclorémica por pérdida intestinal de bicarbonato. Es el patrón clásico de la diarrea."
     },
     {
      "t": "AG 11: normal → hay que buscar un ácido agregado",
      "ok": false,
      "fb": "Al revés: el gap normal indica que NO se agregó un ácido. Si se hubiera agregado (lactato, cetonas), el gap estaría aumentado."
     },
     {
      "t": "AG 21: aumentado → probable acidosis láctica",
      "ok": false,
      "fb": "Ese 21 sale de olvidar sumar el bicarbonato dentro del paréntesis. La cuenta es 138 − (117 + 10) = 11, no 138 − 117."
     },
     {
      "t": "No se puede calcular sin el lactato",
      "ok": false,
      "fb": "El anion gap se calcula solo con sodio, cloro y bicarbonato. Justamente sirve para sospechar un lactato alto cuando todavía no lo tenés."
     }
    ]
   },
   {
    "id": "c1q4",
    "tipo": "multi",
    "texto": "Paso 5: ¿cuáles son las conductas adecuadas? (elegí 2)",
    "hint": "",
    "opts": [
     {
      "t": "Expandir con solución fisiológica 20 ml/kg",
      "ok": true,
      "fb": "Correcto. Ana tiene signos de shock compensado (relleno 3 segundos, taquicardia, letargo): la prioridad es restituir volumen."
     },
     {
      "t": "Rehidratar y reponer las pérdidas: el bicarbonato se recupera solo al restablecer la perfusión",
      "ok": true,
      "fb": "Correcto. Al mejorar la perfusión cae la producción de lactato y el riñón regenera bicarbonato. La acidosis se corrige sola en pocas horas."
     },
     {
      "t": "Indicar bicarbonato de sodio 1–2 mEq/kg por vía endovenosa",
      "ok": false,
      "fb": "No. Aporta sodio, agrava la hipopotasemia (que ya está en 3,4) y no acelera la recuperación. Con un pH de 7,22 y una causa reversible, no está indicado."
     },
     {
      "t": "Iniciar antibiótico por la taquipnea y el aumento de la urea",
      "ok": false,
      "fb": "La taquipnea es la compensación respiratoria de la acidosis, no un foco pulmonar: no hay tiraje ni ruidos agregados. La urea alta es prerrenal, por deshidratación."
     },
     {
      "t": "Corregir la hipopotasemia antes de expandir",
      "ok": false,
      "fb": "La reposición de potasio se hace junto con la hidratación y una vez constatada la diuresis, nunca antes ni en lugar de la expansión."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Caso 2 — Bautista, 45 días",
  "ayuda": "Vómitos posprandiales desde hace diez días, cada vez más intensos, no biliosos, \"que salen despedidos\". Queda con hambre y vuelve a pedir el pecho enseguida. \n\nExamen físico: ávido, algo irritable, con mucosas semisecas. Se observan ondas peristálticas en epigastrio después de la toma. Deposiciones escasas y oscuras. Peso 3,9 kg (nació con 3,5 kg; a los 15 días pesaba 3,8 kg).\n\nEXÁMENES COMPLEMENTARIOS\n• pH: 7,52\n• pCO₂: 47 mmHg\n• HCO₃: 38 mEq/L\n• Na⁺: 136 mEq/L\n• K⁺: 2,9 mEq/L\n• Cl⁻: 88 mEq/L",
  "qs": [
   {
    "id": "c2q1",
    "tipo": "radio",
    "texto": "Pasos 1 a 3: ¿cómo lo clasificás?",
    "hint": "",
    "opts": [
     {
      "t": "Alcalosis metabólica con compensación respiratoria adecuada",
      "ok": true,
      "fb": "pH alto con HCO₃ alto: alcalosis metabólica. Esperabas que la pCO₂ subiera 0,7 × 14 ≈ 10 mmHg sobre 40, es decir alrededor de 50. Medís 47: compensación adecuada."
     },
     {
      "t": "Alcalosis metabólica con acidosis respiratoria asociada",
      "ok": false,
      "fb": "La pCO₂ de 47 parece alta, pero es exactamente la hipoventilación compensadora que se espera. Solo hablarías de un segundo trastorno si estuviera muy por encima de 55."
     },
     {
      "t": "Alcalosis respiratoria",
      "ok": false,
      "fb": "En una alcalosis respiratoria la pCO₂ estaría baja. Acá está alta."
     },
     {
      "t": "Alcalosis mixta",
      "ok": false,
      "fb": "Para que fuera mixta la pCO₂ debería estar baja y sumarse al efecto del bicarbonato alto. Acá la pCO₂ alta va en sentido contrario: está compensando."
     }
    ]
   },
   {
    "id": "c2q2",
    "tipo": "radio",
    "texto": "Si pedís un ionograma urinario, ¿qué esperás encontrar y por qué?",
    "hint": "",
    "opts": [
     {
      "t": "Orina ácida con cloro urinario menor a 20 mEq/L",
      "ok": true,
      "fb": "Es la clásica aciduria paradojal. La hipovolemia activa la aldosterona, que reabsorbe sodio a cambio de eliminar H⁺ y K⁺: el riñón termina acidificando la orina de un paciente alcalótico. El cloro urinario bajo confirma que es una alcalosis cloro-sensible."
     },
     {
      "t": "Orina alcalina, porque el paciente está alcalótico",
      "ok": false,
      "fb": "Es lo intuitivo y es lo que falla. Al principio del cuadro la orina sí es alcalina, pero una vez instalada la hipovolemia el riñón prioriza retener sodio y agua, y elimina H⁺: aparece la aciduria paradojal."
     },
     {
      "t": "Cloro urinario mayor a 40 mEq/L",
      "ok": false,
      "fb": "Eso indicaría una alcalosis cloro-resistente (Bartter, Gitelman, hiperaldosteronismo). No corresponde a una pérdida por vómitos."
     },
     {
      "t": "Un sedimento con cilindros hialinos, sin valor diagnóstico",
      "ok": false,
      "fb": "Puede aparecer, pero el dato que define la conducta acá es el cloro urinario."
     }
    ]
   },
   {
    "id": "c2q3",
    "tipo": "radio",
    "texto": "La ecografía confirma una estenosis hipertrófica del píloro. ¿Cuál es la conducta?",
    "hint": "",
    "opts": [
     {
      "t": "Internar, corregir el medio interno con solución fisiológica y potasio, y operar una vez normalizado",
      "ok": true,
      "fb": "Correcto, y es el mensaje central del caso. La piloromiotomía es una urgencia diferida: se opera cuando el cloro supera 100, el bicarbonato baja de 30 y el potasio se normalizó."
     },
     {
      "t": "Derivar a quirófano de urgencia: el retraso empeora el pronóstico",
      "ok": false,
      "fb": "Este es el error clásico. La estenosis pilórica es una urgencia médica, no quirúrgica. Operar en plena alcalosis con hipopotasemia expone a arritmias y a apneas posanestésicas, porque la alcalosis deprime el centro respiratorio."
     },
     {
      "t": "Probar tolerancia oral con fórmula espesada y controlar en 48 horas",
      "ok": false,
      "fb": "La obstrucción es mecánica: ningún cambio de la alimentación la resuelve, y se pierde tiempo mientras se agrava el medio interno."
     },
     {
      "t": "Corregir la alcalosis con acetazolamida y luego operar",
      "ok": false,
      "fb": "No hace falta. Lo que corrige esta alcalosis es reponer cloro y volumen; con solución fisiológica y potasio alcanza."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Caso 3 — Tomás, 3 meses",
  "ayuda": "Cuarto día de un cuadro de rinorrea, tos y dificultad respiratoria progresiva. Ingresa a la guardia en pleno invierno.\n\nExamen físico: tiraje universal, quejido espiratorio, sibilancias y crepitantes diseminados. Saturación 88% con máscara de oxígeno. La madre refiere dos episodios de pausa respiratoria en el domicilio. En las últimas dos horas la frecuencia respiratoria bajó de 72 a 38, y el niño está hipotónico y con menor respuesta al estímulo.\n\nEXÁMENES COMPLEMENTARIOS\n• pH (capilar): 7,21\n• pCO₂: 70 mmHg\n• HCO₃: 27 mEq/L\n• EB: +1 mEq/L",
  "qs": [
   {
    "id": "c3q1",
    "tipo": "radio",
    "texto": "Pasos 1 y 2: ¿cuál es el trastorno primario?",
    "hint": "",
    "opts": [
     {
      "t": "Acidosis respiratoria",
      "ok": true,
      "fb": "El pH bajó y la pCO₂ está alta: se movieron juntos. El pulmón no está eliminando CO₂."
     },
     {
      "t": "Acidosis metabólica",
      "ok": false,
      "fb": "El bicarbonato está en 27, es decir normal-alto. En una acidosis metabólica estaría bajo."
     },
     {
      "t": "Alcalosis metabólica con acidosis respiratoria",
      "ok": false,
      "fb": "Es una interpretación tentadora por el HCO₃ de 27, pero en la próxima pregunta vas a ver que ese valor es exactamente el que corresponde a la compensación."
     },
     {
      "t": "Trastorno mixto respiratorio y metabólico",
      "ok": false,
      "fb": "El EB de +1 y el bicarbonato acorde a lo esperado no dejan lugar para un componente metabólico."
     }
    ]
   },
   {
    "id": "c3q2",
    "tipo": "radio",
    "texto": "Paso 3: el HCO₃ es 27. ¿Indica una alcalosis metabólica asociada?",
    "hint": "En la acidosis respiratoria aguda, el HCO₃ sube 1 mEq/L por cada 10 mmHg que sube la pCO₂.",
    "opts": [
     {
      "t": "No: es exactamente la compensación aguda esperada",
      "ok": true,
      "fb": "La pCO₂ subió 30 mmHg sobre 40, así que se esperaba que el HCO₃ subiera 3, de 24 a 27. Es lo que medís. Se trata de una acidosis respiratoria aguda pura."
     },
     {
      "t": "Sí: cualquier HCO₃ por encima de 26 define una alcalosis metabólica",
      "ok": false,
      "fb": "Los valores de referencia se aplican al paciente sin trastorno primario. Frente a una acidosis respiratoria hay que comparar contra la compensación esperada, no contra el rango normal."
     },
     {
      "t": "No, porque el HCO₃ capilar no es confiable",
      "ok": false,
      "fb": "La muestra capilar bien tomada es confiable para pH, pCO₂ y HCO₃. Lo que no se interpreta en una capilar es la pO₂."
     },
     {
      "t": "Indica que el cuadro es crónico",
      "ok": false,
      "fb": "Al revés: si fuera crónico el HCO₃ habría subido 3,5 a 4 por cada 10 de pCO₂, es decir hasta 34 o 36. Que esté en 27 confirma que es agudo."
     }
    ]
   },
   {
    "id": "c3q3",
    "tipo": "radio",
    "texto": "¿Cuál es el dato más grave del caso?",
    "hint": "",
    "opts": [
     {
      "t": "Que la frecuencia respiratoria haya bajado de 72 a 38",
      "ok": true,
      "fb": "Exacto. En un lactante con hipercapnia progresiva, la caída de la frecuencia respiratoria no es mejoría: es agotamiento de los músculos respiratorios. Sumado a la hipotonía y a las apneas, define una insuficiencia respiratoria inminente."
     },
     {
      "t": "La saturación de 88%",
      "ok": false,
      "fb": "Es preocupante y hay que corregirla, pero se resuelve con oxígeno. La retención de CO₂ con agotamiento es lo que anuncia el paro respiratorio."
     },
     {
      "t": "El pH de 7,21",
      "ok": false,
      "fb": "Refleja la gravedad, pero es una consecuencia. El dato que obliga a actuar ahora mismo es la tendencia clínica."
     },
     {
      "t": "Las sibilancias diseminadas",
      "ok": false,
      "fb": "Son esperables en una bronquiolitis. Su desaparición, en cambio, junto con la disminución de la entrada de aire, sí sería un signo ominoso."
     }
    ]
   },
   {
    "id": "c3q4",
    "tipo": "radio",
    "texto": "¿Cuál es la conducta?",
    "hint": "",
    "opts": [
     {
      "t": "Soporte ventilatorio inmediato y traslado a terapia intensiva",
      "ok": true,
      "fb": "Correcto. Cánula de alto flujo o ventilación no invasiva de entrada, con el equipo preparado para intubar. El tratamiento de la acidosis respiratoria es ventilar: no hay atajo farmacológico."
     },
     {
      "t": "Corregir la acidosis con bicarbonato de sodio",
      "ok": false,
      "fb": "Es una conducta peligrosa. El bicarbonato administrado genera CO₂ que un paciente que ya no ventila no puede eliminar: la acidemia empeora, sobre todo dentro de la célula."
     },
     {
      "t": "Aumentar el flujo de oxígeno y reevaluar en una hora",
      "ok": false,
      "fb": "El oxígeno corrige la saturación pero no elimina CO₂ y puede enmascarar el deterioro. Con apneas y agotamiento, una hora de espera es demasiado."
     },
     {
      "t": "Nebulizar con salbutamol y adrenalina antes de decidir",
      "ok": false,
      "fb": "La evidencia no sostiene el uso rutinario de broncodilatadores en la bronquiolitis, y menos aún demorar por ellos el soporte ventilatorio de un paciente que se está agotando."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Caso 4 — Malena, 12 años",
  "ayuda": "Consulta por decaimiento y vómitos de 48 horas. Los padres refieren que en el último mes bajó cuatro kilos, toma agua todo el tiempo y se levanta de noche a orinar.\n\nExamen físico: regular estado general, sensorio alternante. Mucosas secas, ojos hundidos. Respiración profunda y regular. FR 32/min. FC 124/min. TA 100/55 mmHg. Aliento con olor característico.\n\nEXÁMENES COMPLEMENTARIOS\n• Glucemia: 486 mg/dL\n• pH: 7,08\n• pCO₂: 15 mmHg\n• HCO₃: 4,4 mEq/L\n• Na⁺: 130 mEq/L\n• K⁺: 5,2 mEq/L\n• Cl⁻: 96 mEq/L\n• Cetonemia: positiva +++",
  "qs": [
   {
    "id": "c4q1",
    "tipo": "radio",
    "texto": "Clasificá el trastorno, con el anion gap incluido.",
    "hint": "",
    "opts": [
     {
      "t": "Acidosis metabólica con anion gap aumentado (≈30), con compensación respiratoria adecuada",
      "ok": true,
      "fb": "AG = 130 − (96 + 4,4) ≈ 30. Winter: 1,5 × 4,4 + 8 ≈ 15, con rango de 13 a 17; la pCO₂ medida es 15. Esa respiración profunda y regular es la respiración de Kussmaul, o sea la compensación funcionando a pleno."
     },
     {
      "t": "Acidosis metabólica con anion gap normal",
      "ok": false,
      "fb": "Volvé a hacer la cuenta: 130 − (96 + 4,4) ≈ 30, muy por encima del rango de 8 a 16. Los cuerpos cetónicos son los aniones no medidos que lo elevan."
     },
     {
      "t": "Acidosis mixta, metabólica y respiratoria",
      "ok": false,
      "fb": "La pCO₂ de 15 coincide con la esperada por Winter. No sobra ni falta compensación: no hay segundo trastorno."
     },
     {
      "t": "Acidosis metabólica con compensación insuficiente",
      "ok": false,
      "fb": "Con un bicarbonato de 4,4, la pCO₂ esperada es de 13 a 17 mmHg. Medís 15: la compensación es máxima y adecuada. Cuidado, porque no puede bajar mucho más: esa es su reserva agotándose."
     }
    ]
   },
   {
    "id": "c4q2",
    "tipo": "radio",
    "texto": "El potasio es 5,2 mEq/L. ¿Cómo lo interpretás?",
    "hint": "",
    "opts": [
     {
      "t": "El potasio corporal total está disminuido y va a caer al iniciar la insulina",
      "ok": true,
      "fb": "Correcto, y es el concepto que más vidas salva en cetoacidosis. La acidosis y el déficit de insulina sacan potasio de la célula hacia el plasma, mientras la diuresis osmótica lo elimina por orina. La insulina lo devuelve al intracelular de golpe: si no reponés potasio con la hidratación, aparece la hipopotasemia grave con arritmia."
     },
     {
      "t": "Hay hiperpotasemia: corresponde tratarla",
      "ok": false,
      "fb": "El valor está apenas por encima del rango y no refleja el contenido corporal real. Tratar esta \"hiperpotasemia\" precipitaría una hipopotasemia grave."
     },
     {
      "t": "Es un valor normal y no requiere seguimiento",
      "ok": false,
      "fb": "Numéricamente casi lo es, pero en este contexto exige controles seriados y reposición. No hacer nada equivale a mirar para otro lado."
     },
     {
      "t": "Indica insuficiencia renal",
      "ok": false,
      "fb": "Nada en el caso lo sugiere. El potasio se explica por completo por la redistribución de la acidosis y el déficit de insulina."
     }
    ]
   },
   {
    "id": "c4q3",
    "tipo": "multi",
    "texto": "Con un pH de 7,08, ¿cuáles son las conductas correctas? (elegí 2)",
    "hint": "",
    "opts": [
     {
      "t": "Expandir con solución fisiológica y luego iniciar insulina corriente en infusión continua",
      "ok": true,
      "fb": "Correcto. Primero volumen, después insulina, siempre en infusión continua y a dosis baja. La acidosis se corrige al frenar la cetogénesis, no al agregar álcali."
     },
     {
      "t": "Reponer potasio junto con la hidratación, una vez constatada la diuresis",
      "ok": true,
      "fb": "Correcto. Es lo que evita la caída brusca del potasio al empezar la insulina. Con un potasio menor a 3,3 mEq/L, la insulina se posterga hasta reponerlo."
     },
     {
      "t": "Indicar bicarbonato de sodio, porque el pH es menor a 7,10",
      "ok": false,
      "fb": "No. En cetoacidosis diabética el bicarbonato se asocia a mayor riesgo de edema cerebral, agrava la hipopotasemia y produce acidosis paradojal del sistema nervioso central. Se reserva para acidemias extremas y persistentes con compromiso hemodinámico, y aun ahí es discutido."
     },
     {
      "t": "Administrar insulina NPH por vía subcutánea para cubrir las próximas 12 horas",
      "ok": false,
      "fb": "En la cetoacidosis la vía subcutánea no es confiable, por mala perfusión, y la insulina de acción intermedia no permite titular. Va insulina corriente endovenosa en infusión continua."
     },
     {
      "t": "Corregir rápidamente la hiponatremia con solución hipertónica",
      "ok": false,
      "fb": "El sodio de 130 es en gran parte dilucional por la hiperglucemia. Corregido por glucemia da alrededor de 136, es decir prácticamente normal, y sube solo al bajar la glucemia. Una corrección rápida sería peligrosa."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Caso 5 — Sofía, 5 años",
  "ayuda": "Fiebre de 39,5 °C de 48 horas, tos y dolor en el costado derecho al respirar hondo.\n\nExamen físico: buen estado general, lúcida, bien perfundida, con relleno capilar menor a 2 segundos. FR 38/min sin tiraje ni quejido. Saturación 96% al aire ambiente. Hipoventilación en la base derecha. La radiografía muestra una consolidación en el lóbulo inferior derecho. El EAB lo trae de otra guardia, donde se lo pidieron por la taquipnea.\n\nEXÁMENES COMPLEMENTARIOS\n• pH: 7,50\n• pCO₂: 27 mmHg\n• HCO₃: 20 mEq/L\n• Na⁺: 137 mEq/L\n• K⁺: 3,8 mEq/L\n• Cl⁻: 104 mEq/L\n• Lactato: 1,2 mmol/L",
  "qs": [
   {
    "id": "c5q1",
    "tipo": "radio",
    "texto": "¿Cómo lo clasificás?",
    "hint": "",
    "opts": [
     {
      "t": "Alcalosis respiratoria aguda, con descenso compensador del bicarbonato",
      "ok": true,
      "fb": "pH alto con pCO₂ baja: alcalosis respiratoria. La pCO₂ bajó 13 mmHg, así que se esperaba que el HCO₃ bajara alrededor de 2,6, de 24 a 21. Medís 20: compatible con un cuadro agudo."
     },
     {
      "t": "Acidosis metabólica con alcalosis respiratoria",
      "ok": false,
      "fb": "El bicarbonato de 20 tienta a decirlo, pero es la respuesta esperable al descenso de la pCO₂, y el anion gap está en 13, es decir normal, con un lactato de 1,2. No hay acidosis metabólica."
     },
     {
      "t": "Alcalosis metabólica",
      "ok": false,
      "fb": "En ese caso el bicarbonato estaría alto, y acá está bajo."
     },
     {
      "t": "El EAB es normal para una niña de 5 años",
      "ok": false,
      "fb": "Un pH de 7,50 con pCO₂ de 27 está claramente fuera de rango a cualquier edad."
     }
    ]
   },
   {
    "id": "c5q2",
    "tipo": "radio",
    "texto": "¿Qué hacés con este estado ácido-base?",
    "hint": "",
    "opts": [
     {
      "t": "Nada dirigido al EAB: trato la fiebre, el dolor y la neumonía",
      "ok": true,
      "fb": "Correcto. La alcalosis respiratoria es una respuesta a la fiebre y al dolor pleurítico, no una enfermedad. Se corrige sola cuando se trata la causa. Es, además, el trastorno ácido-base más frecuente en el niño febril."
     },
     {
      "t": "Indico reinhalación en bolsa para que retenga CO₂",
      "ok": false,
      "fb": "No corresponde. Sofía no hiperventila por ansiedad, sino por fiebre y dolor con una neumonía de base; frenarle la ventilación no aporta nada y puede ser riesgoso."
     },
     {
      "t": "Repito el EAB cada 6 horas hasta que se normalice",
      "ok": false,
      "fb": "Repetir un estudio que no va a cambiar ninguna conducta solo agrega dolor y costo. La clínica alcanza para el seguimiento."
     },
     {
      "t": "Interpreto la alcalosis como sepsis e inicio tratamiento en terapia intensiva",
      "ok": false,
      "fb": "Cuidado con el otro extremo. La alcalosis respiratoria puede ser el primer signo de una sepsis, y por eso siempre hay que buscarla, pero Sofía está lúcida, bien perfundida, con lactato normal y un foco claro. No hay criterios de sepsis grave."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Caso 6 — Felipe, 2 años",
  "ayuda": "Derivado por escaso progreso de peso y talla desde el año de vida. Toma mucho líquido y moja los pañales con abundante orina, incluso de noche. Nunca tuvo diarrea y no recibe medicación.\n\nExamen físico: peso en percentilo 3, talla en percentilo 3. Buen estado general, bien hidratado. Sin visceromegalias. Resto del examen sin particularidades.\n\nEXÁMENES COMPLEMENTARIOS\n• pH: 7,28\n• pCO₂: 30 mmHg\n• HCO₃: 14 mEq/L\n• Na⁺: 138 mEq/L\n• K⁺: 2,9 mEq/L\n• Cl⁻: 114 mEq/L\n• Orina — pH: 6,8\n• Orina — Na⁺: 42 mEq/L\n• Orina — K⁺: 28 mEq/L\n• Orina — Cl⁻: 30 mEq/L",
  "qs": [
   {
    "id": "c6q1",
    "tipo": "radio",
    "texto": "Pasos 3 y 4: compensación y anion gap.",
    "hint": "",
    "opts": [
     {
      "t": "Compensación adecuada y AG de 10, es decir normal",
      "ok": true,
      "fb": "Winter: 1,5 × 14 + 8 = 29, con rango de 27 a 31, y la pCO₂ es 30. El AG es 138 − (114 + 14) = 10, dentro del rango normal. Estás frente a una acidosis metabólica hiperclorémica."
     },
     {
      "t": "Compensación adecuada y AG de 24, es decir aumentado",
      "ok": false,
      "fb": "Revisá la cuenta: 138 − (114 + 14) = 10. El 24 sale de restar solo el cloro."
     },
     {
      "t": "Compensación insuficiente y AG normal",
      "ok": false,
      "fb": "El anion gap está bien, pero la compensación no: la pCO₂ esperada es de 27 a 31 y medís 30. Es la adecuada."
     },
     {
      "t": "No se puede calcular el AG sin la albúmina",
      "ok": false,
      "fb": "La albúmina refina el cálculo cuando está baja, pero el AG se calcula igual. Y como Felipe no tiene edemas ni signos de desnutrición grave, la corrección no cambiaría la categoría."
     }
    ]
   },
   {
    "id": "c6q2",
    "tipo": "radio",
    "texto": "Acidosis con AG normal y sin diarrea. Calculá el anion gap urinario e interpretalo.",
    "hint": "AG urinario = (Na⁺ + K⁺)ₒᵣᵢₙₐ − Cl⁻ₒᵣᵢₙₐ",
    "opts": [
     {
      "t": "+40: positivo → el riñón no logra excretar amonio, es una acidosis tubular renal",
      "ok": true,
      "fb": "(42 + 28) − 30 = +40. El amonio se excreta acompañado de cloro; si el cloro urinario es bajo frente a los cationes, es que hay poco amonio. Un gap urinario positivo en plena acidemia señala al riñón como responsable."
     },
     {
      "t": "+40: positivo → pérdida digestiva de bicarbonato",
      "ok": false,
      "fb": "Es al revés. En la pérdida digestiva el riñón funciona bien, excreta amonio en abundancia y el gap urinario da negativo. Además, Felipe nunca tuvo diarrea."
     },
     {
      "t": "−40: negativo → pérdida digestiva",
      "ok": false,
      "fb": "El signo está invertido: (42 + 28) − 30 da +40, no −40."
     },
     {
      "t": "El anion gap urinario no es válido en menores de 5 años",
      "ok": false,
      "fb": "Sí es válido. Pierde utilidad ante poliuria extrema, cetonuria o insuficiencia renal avanzada, ninguna de las cuales aplica acá."
     }
    ]
   },
   {
    "id": "c6q3",
    "tipo": "radio",
    "texto": "El pH urinario es 6,8 pese a la acidemia. ¿Qué tipo de acidosis tubular renal sugiere?",
    "hint": "",
    "opts": [
     {
      "t": "Distal (tipo I): el túbulo distal no puede acidificar la orina",
      "ok": true,
      "fb": "Correcto. En la acidosis tubular distal el riñón es incapaz de bajar el pH urinario por debajo de 5,5 aun con acidemia grave. Se acompaña de hipopotasemia, hipercalciuria, nefrocalcinosis y retraso de crecimiento, que es justamente el motivo de consulta."
     },
     {
      "t": "Proximal (tipo II): hay pérdida de bicarbonato en el túbulo proximal",
      "ok": false,
      "fb": "En la proximal el túbulo distal conserva su capacidad de acidificar: una vez que el bicarbonato plasmático cae por debajo del umbral, el pH urinario baja de 5,5. Suele además formar parte de un síndrome de Fanconi."
     },
     {
      "t": "Tipo IV: por hipoaldosteronismo",
      "ok": false,
      "fb": "La tipo IV cursa con hiperpotasemia, y Felipe tiene un potasio de 2,9."
     },
     {
      "t": "No se puede diferenciar sin una prueba de sobrecarga ácida",
      "ok": false,
      "fb": "La prueba se reserva para casos dudosos o incompletos. Acá la tríada de pH urinario alto en acidemia, hipopotasemia y retraso de crecimiento orienta con claridad."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Error 1 — El asmático de la guardia",
  "ayuda": "La siguiente interpretación es INCORRECTA. Encontrá el error.\n\n«Paciente de 10 años en crisis asmática, tercera hora de tratamiento. Frecuencia respiratoria 34, saturación 91%, habla por palabras sueltas y está sentado hacia adelante. Le pedí un EAB: pH 7,38, pCO₂ 41, HCO₃ 24. Gasometría normal, así que continúo con broncodilatadores y control en dos horas.»",
  "qs": [
   {
    "id": "e1q",
    "tipo": "radio",
    "texto": "¿Dónde está el error?",
    "hint": "",
    "opts": [
     {
      "t": "Una pCO₂ normal en un paciente que hiperventila significa fatiga muscular: es un signo de gravedad, no de normalidad",
      "ok": true,
      "fb": "Exacto. Un chico con una crisis grave y frecuencia respiratoria de 34 debería estar eliminando CO₂, con una pCO₂ de 25 a 30. Que esté en 41 indica que ya no logra sostener la ventilación. La pCO₂ \"normalizándose\" en un asmático es una de las señales de alarma más traicioneras de la pediatría: anuncia el paro respiratorio, no la mejoría."
     },
     {
      "t": "El error fue pedir un EAB: en el asma no aporta información",
      "ok": false,
      "fb": "Pedirlo en una crisis grave que no responde es correcto. El error no fue pedirlo, sino leerlo sin mirar al paciente."
     },
     {
      "t": "Debería haber pedido una muestra arterial",
      "ok": false,
      "fb": "La discusión sobre el tipo de muestra es secundaria. Con cualquier muestra, esa pCO₂ en ese contexto clínico es una señal de alarma."
     },
     {
      "t": "El bicarbonato de 24 es demasiado bajo para una crisis de tres horas",
      "ok": false,
      "fb": "Es un valor normal, y sería lo esperable: el riñón no alcanza a compensar en tres horas."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Error 2 — La cetoacidosis",
  "ayuda": "La siguiente interpretación es INCORRECTA. Encontrá el error.\n\n«Adolescente con cetoacidosis diabética, pH 6,95, bicarbonato 3. Está muy acidótico, así que indiqué bicarbonato de sodio 1 mEq/kg en bolo para sacarlo del pH crítico, y arranco la insulina cuando el pH mejore.»",
  "qs": [
   {
    "id": "e2q",
    "tipo": "radio",
    "texto": "¿Dónde está el error?",
    "hint": "",
    "opts": [
     {
      "t": "Hay dos: el bolo de bicarbonato y demorar la insulina esperando que mejore el pH",
      "ok": true,
      "fb": "Correcto, y los dos son graves. El bicarbonato se asocia a mayor riesgo de edema cerebral en pediatría, agrava la hipopotasemia y genera acidosis paradojal del sistema nervioso central, porque el CO₂ que produce atraviesa la barrera hematoencefálica mucho más rápido que el bicarbonato. Y demorar la insulina mantiene abierta la cetogénesis, que es la fábrica de la acidosis: sin insulina, el pH no va a mejorar."
     },
     {
      "t": "La dosis de bicarbonato es baja: correspondían 2 a 3 mEq/kg",
      "ok": false,
      "fb": "El problema no es la dosis sino la indicación. Aumentarla haría más daño."
     },
     {
      "t": "No hay error: con un pH de 6,95 el bicarbonato está indicado en todas las guías",
      "ok": false,
      "fb": "Ninguna guía pediátrica actual recomienda el bicarbonato de rutina en cetoacidosis, ni siquiera con pH menor a 7. Se contempla solo en acidemia extrema persistente con compromiso hemodinámico, y sigue siendo discutido."
     },
     {
      "t": "El error fue no pedir una tomografía de cerebro antes de tratar",
      "ok": false,
      "fb": "No corresponde de entrada. La neuroimagen se plantea ante deterioro neurológico durante el tratamiento, y aun así no debe demorar el manejo del edema cerebral si se sospecha."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Error 3 — El píloro",
  "ayuda": "La siguiente interpretación es INCORRECTA. Encontrá el error.\n\n«Lactante de 40 días con estenosis pilórica confirmada por ecografía. pH 7,55, bicarbonato 40, cloro 85, potasio 2,7. Aviso a cirugía para operarlo esta misma noche: cuanto antes se resuelva la obstrucción, antes se corrige el medio interno.»",
  "qs": [
   {
    "id": "e3q",
    "tipo": "radio",
    "texto": "¿Dónde está el error?",
    "hint": "",
    "opts": [
     {
      "t": "Es una urgencia médica, no quirúrgica: hay que corregir el medio interno antes de la anestesia",
      "ok": true,
      "fb": "Correcto. Operar con esa alcalosis y ese potasio expone a arritmias intraoperatorias y a apneas posanestésicas, porque la alcalosis deprime el centro respiratorio. Se corrige primero con solución fisiológica y potasio, y se opera cuando el cloro supera 100, el bicarbonato baja de 30 y el potasio se normaliza. Suelen ser de 24 a 48 horas."
     },
     {
      "t": "El error es el diagnóstico: con esos valores hay que pensar en un síndrome de Bartter",
      "ok": false,
      "fb": "El cuadro clínico y la ecografía confirman la estenosis pilórica. Además, el Bartter cursa con cloro urinario alto y sin obstrucción."
     },
     {
      "t": "Faltó indicar antibióticos antes de la cirugía",
      "ok": false,
      "fb": "No es el punto crítico. Lo que puede matar al paciente esta noche es el medio interno, no la profilaxis."
     },
     {
      "t": "No hay error: la obstrucción es la causa y hay que resolverla cuanto antes",
      "ok": false,
      "fb": "Es el razonamiento intuitivo y es exactamente el error. La obstrucción no mata en 48 horas; la alcalosis con hipopotasemia bajo anestesia, sí."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Error 4 — El potasio tranquilizador",
  "ayuda": "La siguiente interpretación es INCORRECTA. Encontrá el error.\n\n«Lactante de 6 meses con diarrea, deshidratación grave y acidosis metabólica: pH 7,15, bicarbonato 8. El ionograma muestra un potasio de 4,6, así que está normal y no hace falta reponer potasio. Expando y sigo con el plan de hidratación.»",
  "qs": [
   {
    "id": "e4q",
    "tipo": "radio",
    "texto": "¿Dónde está el error?",
    "hint": "",
    "opts": [
     {
      "t": "Con esa acidemia, un potasio de 4,6 esconde un déficit corporal importante que se va a manifestar al corregir el pH",
      "ok": true,
      "fb": "Correcto. La acidosis desplaza potasio desde el interior de la célula hacia el plasma: por cada 0,1 que baja el pH, el potasio plasmático sube aproximadamente 0,3 a 0,6 mEq/L. Con un pH de 7,15, ese 4,6 corresponde a un potasio real bastante más bajo. Al corregirse la acidosis, el potasio vuelve a la célula y puede aparecer una hipopotasemia grave. La diarrea, además, ya venía perdiéndolo."
     },
     {
      "t": "El error es haber expandido: primero hay que corregir el potasio",
      "ok": false,
      "fb": "No. La expansión frente a una deshidratación grave siempre va primero. El potasio se repone junto con el plan de hidratación, una vez constatada la diuresis."
     },
     {
      "t": "Faltó indicar bicarbonato con un pH de 7,15",
      "ok": false,
      "fb": "Es la conducta contraria a la correcta. La acidosis de la diarrea se corrige con volumen; agregar bicarbonato empeoraría la hipopotasemia oculta."
     },
     {
      "t": "No hay error: 4,6 mEq/L es un valor normal",
      "ok": false,
      "fb": "Es normal como número, pero el número no se lee solo. En el contexto de una acidemia importante, un potasio \"normal\" es un potasio bajo disfrazado."
     }
    ]
   }
  ]
 },
 {
  "tipo": "seccion",
  "titulo": "Desafío final — Renzo, 2 años",
  "ayuda": "Ingresa por fiebre alta de tres días y dificultad respiratoria progresiva. En las últimas seis horas está somnoliento y \"no responde como siempre\".\n\nExamen físico: mal estado general, palidez, moteado en rodillas. Relleno capilar 4 segundos, pulsos periféricos débiles. FC 180/min. TA 78/40 mmHg. FR 22/min con respiración superficial e irregular. Saturación 89% con máscara con reservorio. Hipoventilación generalizada, con crepitantes en ambas bases.\n\nEXÁMENES COMPLEMENTARIOS\n• pH: 7,18\n• pCO₂: 55 mmHg\n• HCO₃: 20 mEq/L\n• EB: −8 mEq/L\n• Na⁺: 134 mEq/L\n• K⁺: 4,4 mEq/L\n• Cl⁻: 96 mEq/L\n• Lactato: 5,8 mmol/L",
  "qs": [
   {
    "id": "d1q1",
    "tipo": "radio",
    "texto": "¿Cuántos trastornos ácido-base tiene Renzo?",
    "hint": "",
    "opts": [
     {
      "t": "Dos: acidosis respiratoria y acidosis metabólica",
      "ok": true,
      "fb": "Correcto. El pH bajo con pCO₂ alta define la acidosis respiratoria; el EB de −8 y el lactato de 5,8 delatan la acidosis metabólica sumada. Las dos empujan el pH en la misma dirección, y por eso la acidemia es tan marcada."
     },
     {
      "t": "Uno: acidosis respiratoria con compensación metabólica",
      "ok": false,
      "fb": "No puede ser una compensación por dos razones: la compensación renal demora días, y sobre todo iría en sentido contrario, subiendo el bicarbonato, no bajándolo."
     },
     {
      "t": "Uno: acidosis metabólica con compensación respiratoria",
      "ok": false,
      "fb": "Si la compensación respiratoria funcionara, la pCO₂ estaría baja. Está en 55: el pulmón no está compensando, está fallando."
     },
     {
      "t": "Tres trastornos simultáneos",
      "ok": false,
      "fb": "No hay elementos para un tercero. Con dos acidosis sumadas alcanza para explicar todo el cuadro."
     }
    ]
   },
   {
    "id": "d1q2",
    "tipo": "radio",
    "texto": "El HCO₃ es 20, es decir apenas bajo. ¿Con qué argumento demostrás que hay una acidosis metabólica?",
    "hint": "Compará el bicarbonato medido contra el que esperarías por la acidosis respiratoria.",
    "opts": [
     {
      "t": "Porque en una acidosis respiratoria aguda el HCO₃ debería haber SUBIDO a unos 25,5, y en cambio está en 20",
      "ok": true,
      "fb": "Ese es exactamente el paso 3 haciendo su trabajo. La pCO₂ subió 15 mmHg, así que el bicarbonato debería haber subido 1,5, hasta unos 25,5. Que esté en 20 significa que algo se lo está consumiendo: la acidosis láctica del shock. Un bicarbonato \"casi normal\" puede esconder una acidosis metabólica grave."
     },
     {
      "t": "Porque 20 mEq/L está por debajo del rango normal de 22 a 26",
      "ok": false,
      "fb": "Ese argumento es débil: en un lactante 20 podría ser normal. Lo que lo vuelve concluyente es la comparación contra la compensación esperada."
     },
     {
      "t": "Porque el sodio de 134 está bajo",
      "ok": false,
      "fb": "La natremia no interviene en el diagnóstico del trastorno ácido-base, solo en el cálculo del anion gap."
     },
     {
      "t": "No se puede demostrar sin repetir el EAB en dos horas",
      "ok": false,
      "fb": "Con los datos que ya tenés alcanza, y Renzo no está para esperar dos horas."
     }
    ]
   },
   {
    "id": "d1q3",
    "tipo": "radio",
    "texto": "Calculá el anion gap y decidí la conducta inmediata.",
    "hint": "",
    "opts": [
     {
      "t": "AG 18, aumentado por el lactato. Ventilar, expandir y administrar antibióticos precozmente",
      "ok": true,
      "fb": "134 − (96 + 20) = 18, aumentado, coherente con un lactato de 5,8. Renzo está en shock séptico con insuficiencia respiratoria: soporte ventilatorio, expansiones con solución fisiológica y antibióticos dentro de la primera hora. La acidosis se corrige al restablecer la perfusión y la ventilación."
     },
     {
      "t": "AG 18, aumentado. Corregir con bicarbonato antes de expandir",
      "ok": false,
      "fb": "El cálculo está bien pero la conducta no. Con un paciente que retiene CO₂, el bicarbonato genera más CO₂ que no puede eliminar y empeora la acidosis intracelular."
     },
     {
      "t": "AG 14, normal. Se trata de una acidosis hiperclorémica",
      "ok": false,
      "fb": "Revisá la cuenta: 134 − (96 + 20) = 18. Y un cloro de 96 no es alto."
     },
     {
      "t": "AG 18, aumentado. Solicitar hemocultivos y esperar el resultado antes de iniciar antibióticos",
      "ok": false,
      "fb": "Los hemocultivos se toman, sí, pero no se demora el antibiótico por ellos. En shock séptico cada hora de retraso aumenta la mortalidad."
     }
    ]
   }
  ]
 }
];

/* ========================================================================= */

function crearFormulario() {
  const form = FormApp.create(TITULO);
  form.setDescription(
    'Taller desarrollado por ' + AUTOR + '.\n\n' +
    (MODO === 'COMPLETO'
      ? 'Resolvé primero el taller en la página, donde vas a encontrar la explicación de cada opción. Después completá este formulario: queda como constancia de tu trabajo.\n\nTaller: ' + LINK_TALLER
      : 'Completá este formulario una vez que hayas terminado el taller.\n\nTaller: ' + LINK_TALLER)
  );

  // Identificación y control de entregas
  try { form.setCollectEmail(true); } catch (e) { Logger.log('No se pudo activar la recolección de correo: ' + e); }
  try { form.setLimitOneResponsePerUser(true); } catch (e) { Logger.log('No se pudo limitar a una respuesta: ' + e); }

  const nombre = form.addTextItem();
  nombre.setTitle('Apellido y nombre');
  nombre.setRequired(true);

  if (MODO === 'CONSTANCIA') {
    armarConstancia(form);
  } else {
    form.setIsQuiz(true);
    armarCompleto(form);
  }

  agregarPreguntasAbiertas(form);

  Logger.log('===========================================================');
  Logger.log('FORMULARIO CREADO');
  Logger.log('Modo: ' + MODO);
  Logger.log('Editar:  ' + form.getEditUrl());
  Logger.log('Alumnos: ' + form.getPublishedUrl());
  Logger.log('===========================================================');
  Logger.log('Para que la nota vuelva sola a Classroom, creá la tarea desde');
  Logger.log('Classroom > Trabajo de clase > Crear > Tarea con cuestionario');
  Logger.log('y reemplazá el formulario en blanco por este.');
}

function armarCompleto(form) {
  BLOQUES.forEach(function (b) {
    const pagina = form.addPageBreakItem();
    pagina.setTitle(b.titulo);
    pagina.setHelpText(b.ayuda);

    b.qs.forEach(function (q) {
      const item = (q.tipo === 'multi') ? form.addCheckboxItem() : form.addMultipleChoiceItem();
      item.setTitle(q.texto);
      if (q.hint) item.setHelpText('Pista: ' + q.hint);
      item.setChoices(q.opts.map(function (o) { return item.createChoice(o.t, o.ok); }));
      item.setPoints(1);
      item.setRequired(true);

      const clave = q.opts.filter(function (o) { return o.ok; })
                          .map(function (o) { return '• ' + o.t + '\n  ' + o.fb; })
                          .join('\n\n');
      const cierre = '\n\nEl fundamento de cada una de las opciones está en el taller.';
      const fb = FormApp.createFeedback().setText(recortar(clave + cierre)).build();
      item.setFeedbackForCorrect(fb);
      item.setFeedbackForIncorrect(fb);
    });
  });
}

function armarConstancia(form) {
  const pega = form.addParagraphTextItem();
  pega.setTitle('Pegá acá el resumen que generó el taller al terminar');
  pega.setHelpText('Es el texto que aparece al apretar "Generar resumen de entrega".');
  pega.setRequired(true);
}

function agregarPreguntasAbiertas(form) {
  const pagina = form.addPageBreakItem();
  pagina.setTitle('Para cerrar');

  const p1 = form.addParagraphTextItem();
  p1.setTitle('Explicá con tus palabras, como si se lo dijeras a un compañero, por qué en la deshidratación por diarrea casi nunca hace falta indicar bicarbonato.');
  p1.setRequired(true);

  const p2 = form.addParagraphTextItem();
  p2.setTitle('¿Cuál de los cuatro errores del taller creés que podrías haber cometido vos? ¿Por qué?');
  p2.setRequired(true);
}

/** Los textos de devolución de Formularios tienen un límite de longitud. */
function recortar(s) {
  const MAX = 900;
  return (s.length <= MAX) ? s : s.slice(0, MAX - 1) + '…';
}
