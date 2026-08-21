#!/usr/bin/env python3
"""
Validador de banco_casos_efu.json contra las reglas del proyecto (ver CLAUDE.md).

Uso:
    python3 validar_banco_casos_efu.py [ruta_al_json]

Exit code 0: sin errores bloqueantes (puede haber advertencias, revisar a mano).
Exit code 1: hay errores bloqueantes — corregir antes de usar el archivo.
"""
import json
import sys
from collections import Counter

RUTA_DEFAULT = "banco_casos_efu.json"
ESTADOS_VALIDOS = {"verificado", "sin_grilla", "revisar_ocr", "excede_opciones"}
LETRAS_VALIDAS = list("ABCDEFGH")
CAMPOS_OBLIGATORIOS = ["id", "fuente_pdf", "pagina", "enunciado", "opciones", "correctas", "estado"]


def cargar(ruta):
    try:
        with open(ruta, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ No existe el archivo: {ruta}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ JSON inválido: {e}")
        sys.exit(1)


def main():
    ruta = sys.argv[1] if len(sys.argv) > 1 else RUTA_DEFAULT
    data = cargar(ruta)

    casos = data.get("casos") if isinstance(data, dict) else data
    if not isinstance(casos, list):
        print("❌ El JSON debe ser una lista de casos, o un objeto con clave \"casos\" que sea una lista.")
        sys.exit(1)

    errores = []
    advertencias = []
    ids_vistos = Counter()

    for i, caso in enumerate(casos):
        etiqueta = caso.get("id", f"(sin id, índice {i})") if isinstance(caso, dict) else f"(índice {i}, no es objeto)"

        if not isinstance(caso, dict):
            errores.append(f"{etiqueta}: el caso no es un objeto JSON.")
            continue

        for campo in CAMPOS_OBLIGATORIOS:
            if campo not in caso:
                errores.append(f"{etiqueta}: falta el campo obligatorio '{campo}'.")

        cid = caso.get("id")
        if cid:
            ids_vistos[cid] += 1

        estado = caso.get("estado")
        if estado is not None and estado not in ESTADOS_VALIDOS:
            errores.append(f"{etiqueta}: estado '{estado}' inválido (debe ser uno de {sorted(ESTADOS_VALIDOS)}).")

        opciones = caso.get("opciones")
        if isinstance(opciones, dict):
            letras = list(opciones.keys())
            if len(letras) > 8:
                if estado != "excede_opciones":
                    errores.append(
                        f"{etiqueta}: tiene {len(letras)} opciones (> 8) pero estado es '{estado}', "
                        f"debería ser 'excede_opciones'."
                    )
            letras_invalidas = [l for l in letras if l not in LETRAS_VALIDAS and len(letras) <= 8]
            if letras_invalidas and len(letras) <= 8:
                advertencias.append(f"{etiqueta}: letras de opción fuera de A-H: {letras_invalidas}.")
        elif opciones is not None:
            errores.append(f"{etiqueta}: 'opciones' debe ser un objeto {{letra: texto}}.")

        correctas = caso.get("correctas")
        if correctas is not None:
            if not isinstance(correctas, list):
                errores.append(f"{etiqueta}: 'correctas' debe ser una lista de letras o null.")
            elif estado == "sin_grilla":
                errores.append(f"{etiqueta}: estado 'sin_grilla' pero 'correctas' no es null — inconsistente.")
            elif isinstance(opciones, dict):
                invalidas = [l for l in correctas if l not in opciones]
                if invalidas:
                    errores.append(f"{etiqueta}: 'correctas' referencia letras que no existen en 'opciones': {invalidas}.")
        else:
            if estado not in ("sin_grilla", "excede_opciones", "revisar_ocr"):
                advertencias.append(f"{etiqueta}: 'correctas' es null pero estado es '{estado}' (revisar si corresponde 'sin_grilla').")

        pagina = caso.get("pagina")
        if pagina is not None and not isinstance(pagina, int):
            errores.append(f"{etiqueta}: 'pagina' debe ser un entero.")

        enunciado = caso.get("enunciado")
        if estado not in ("excede_opciones",) and isinstance(enunciado, str) and len(enunciado.strip()) < 20:
            advertencias.append(f"{etiqueta}: enunciado sospechosamente corto ({len(enunciado.strip())} caracteres).")

    duplicados = [cid for cid, n in ids_vistos.items() if n > 1]
    if duplicados:
        errores.append(f"IDs duplicados: {duplicados}")

    print(f"Casos totales: {len(casos)}")
    por_estado = Counter(c.get("estado") for c in casos if isinstance(c, dict))
    for estado, n in sorted(por_estado.items(), key=lambda x: str(x[0])):
        print(f"  - {estado}: {n}")

    if advertencias:
        print(f"\n⚠️  {len(advertencias)} advertencia(s) (revisar a mano, no bloquean):")
        for a in advertencias:
            print(f"  - {a}")

    if errores:
        print(f"\n❌ {len(errores)} error(es) bloqueante(s):")
        for e in errores:
            print(f"  - {e}")
        sys.exit(1)

    print("\n✅ Sin errores bloqueantes.")
    sys.exit(0)


if __name__ == "__main__":
    main()
