# Skill: /prompt-engineering-patterns — Patrones de ingeniería de prompts FIXU AI

## Trigger
Cuando se dice `/prompt-engineering-patterns` o al crear/optimizar un prompt de agente conversacional.

## Objetivo
Aplicar los patrones probados de FIXU AI para construir o refinar prompts de agentes conversacionales. Basado en aprendizajes reales de 3 clientes en producción (~5,000+ leads/mes combinados).

## Pasos

### 1. Estructura modular por PASOS
Todo prompt de agente FIXU AI sigue esta estructura:

```
# ROL
[Identidad, misión, tono, mercado]

# REGLAS GENERALES
[6-8 reglas numeradas, las más críticas del agente]

# SALUDO INICIAL
[Mensaje exacto de bienvenida]

# TIPOS DE CLIENTE
[Clasificación del lead según primer mensaje]

# MÓDULO [TIPO_1] (ej: COMPRADOR)
## PASO 1: [Detección/ID]
## PASO 2: [Calificación]
## PASO 3: [Búsqueda + Presentación]
## PASO 4: [Validación/Gate]

# MÓDULO [TIPO_2] (ej: ARRENDATARIO)
[Misma estructura de PASOS]

# FLUJOS SECUNDARIOS
[Vendedor, Postulante, etc. — versiones compactas]

# MANEJO DE FRICCIÓN
[Objeciones comunes y respuestas]

# DERIVACIÓN AUTOMÁTICA
[Triggers que escalan a humano inmediatamente]

# HERRAMIENTAS
[Lista de tools con descripción breve]

# ESTILO
[Tono, vocabulario, emojis, anti-patrones]

# NOTAS IMPORTANTES / REGLAS INMUTABLES
[Repetición de las reglas más críticas — el LLM las olvida fácilmente]
```

**Por qué esta estructura:** Cada sección es autocontenida. Permite cambios quirúrgicos sin reestructurar. Los PASOS numerados dentro de cada módulo crean un flujo predecible que el LLM puede seguir.

### 2. Character budgeting
El prompt debe caber en el context window del LLM con margen para historial de conversación.

**Técnicas de compresión (probadas en producción):**

| Técnica | Ejemplo ANTES | Ejemplo DESPUÉS | Ahorro |
|---------|-------------|-----------------|--------|
| Eliminar verbosidad | "Presentar cada propiedad con texto natural, no como listado con guiones." | "Texto natural (no listado con guiones)." | ~40% |
| Condicionales compactos | "Si el cliente envía un link de TikTok o Instagram, debes pedirle..." | "Link TikTok/Instagram → pedir código de 7 dígitos" | ~50% |
| Eliminar redundancia | "Solo envía el link que viene en los datos de `buscar_propiedades`. NUNCA inventes links." | "**NUNCA inventes links.**" (si la regla ya está arriba) | 100% |
| Comprimir descripciones de tools | Descripción de 3 líneas | Descripción de 1 línea | ~60% |

**Proceso:**
1. Medir caracteres del prompt actual
2. Estimar caracteres de las adiciones necesarias
3. Identificar zonas comprimibles (verbosidad, redundancia, descripciones largas)
4. Comprimir primero, insertar después
5. Verificar que el resultado no excede el presupuesto

**Referencia real:** Prompt URUS v4.02 (13,447 chars) → v5.00 (13,194 chars) = -253 chars con 4 instrucciones nuevas agregadas.

### 3. Anti-alucinación
El LLM inventará datos si no se le prohíbe explícitamente.

**Patrón obligatorio:**
```
**ANTI-ALUCINACIÓN:** Solo envía datos confirmados por herramientas. NUNCA inventes [lista específica de lo que NO debe inventar].
```

**Complementos:**
- Anclar SIEMPRE a datos de herramientas: "Usa ÚNICAMENTE los datos que devuelve `[tool_name]`"
- Fallback explícito para cuando la tool no devuelve datos: "Si no hay coincidencia exacta, presenta las similitudes que recibas"
- Prohibir links genéricos: "NUNCA inventes links ni uses links genéricos"
- Si piden datos que la tool no provee: "Las fotos están en el link que te compartí" (redirigir, no inventar)

### 4. Reglas inmutables (repetición estratégica)
Las reglas más críticas deben aparecer en **dos lugares:**
1. En la sección relevante del flujo (donde se aplica la regla)
2. En la sección final de NOTAS IMPORTANTES / REGLAS INMUTABLES

**Por qué:** El LLM pierde atención en prompts largos. Las reglas al final actúan como "recordatorio final" antes de generar la respuesta.

**Ejemplo de reglas que siempre deben repetirse:**
- Lead ve propiedades ANTES de DNI
- DNI = derivación (no seguir conversando)
- NUNCA inventar datos de propiedades
- Links solo de la herramienta, nunca genéricos
- No derivar sin completar PASO 4 (gate obligatorio)

### 5. Estilo y tono
Definir explícitamente la persona del agente:

```
# ESTILO
- Tono cálido, curioso, [N]-[M] frases por mensaje
- Vocabulario y lenguaje [IDIOMA], [VARIANTE] nativo
- Emojis con moderación ([N]-[M] por mensaje)
- No repitas preguntas respondidas
- Nunca hacer preguntas cerradas (sí/no)
- Cada mensaje debe invitar a continuar la conversación
```

**Anti-patrones explícitos (obligatorio incluir):**
- "Evita frases robóticas: 'te invito a continuar', 'procedemos con', 'para avanzar necesito'"
- "Usa transiciones naturales: 'Cuéntame...', 'Cómo te imaginas...?', 'Qué te parece si...?'"
- "No repitas lo dicho por el cliente. Valida breve y avanza."

**Prohibiciones de vocabulario (según el negocio):**
- Ej: "NUNCA uses la palabra 'asesor'. Siempre di 'agente'."

### 6. Derivación como patrón
Todo agente necesita un sistema de derivación a humano. Patrón universal:

```
# DERIVACIÓN AUTOMÁTICA
Ejecuta `derivar_humano` inmediatamente si detectas:
1. **Quejas/reclamos**
2. **Negociación de precios**
3. **[Dato clave] entregado** (ej: DNI)
4. **Resistencia total a validación**
5. **Pide teléfono/contacto directo**

Mensaje: "Te conecto con [nombre_humano]."
Cierre: "Síguenos: [redes sociales]"
```

**Regla clave:** Definir claramente qué triggers son AUTOMÁTICOS (bypass del flujo) vs cuáles requieren completar pasos previos.

### 7. Checklist de validación pre-deploy

Antes de subir cualquier prompt a producción:

- [ ] **ROL** tiene identidad clara (nombre, género, tono, mercado)
- [ ] **REGLAS GENERALES** incluyen anti-alucinación
- [ ] **Cada módulo** tiene PASOS numerados con flujo claro
- [ ] **Herramientas** listadas con descripción breve
- [ ] **ESTILO** incluye anti-patrones y prohibiciones
- [ ] **REGLAS INMUTABLES** repiten las reglas más críticas al final
- [ ] **Character count** verificado (no excede presupuesto)
- [ ] **Sin redundancia** entre secciones (cada instrucción aparece en su lugar óptimo)
- [ ] **Fallbacks** definidos para: sin resultados, datos incompletos, tool falla
- [ ] **5+ escenarios** testeados en conversación simulada
- [ ] **Versión anterior** guardada como backup

## Patrón de referencia
- **Prompt más maduro:** `clientes/remax-urus/prompts/current_prompt_live.txt` (v5.00, 290 líneas, 13,194 chars)
- **Evolución documentada:** Comparar `Prompt_Anthu_2_0_4_02.txt` vs `Prompt_Anthu_2_0_5_00.txt` para ver compresión aplicada
- **Templates base:** `templates/master-prompt-inmobiliaria.md` y `templates/master-prompt-atencion-cliente.md`

## Reglas
- NUNCA crear un prompt desde cero sin revisar los existentes primero
- SIEMPRE versionar prompts (vX.YY) y guardar versión anterior
- El prompt debe caber en el context window del LLM con margen para historial (~30% del window libre)
- Comprimir antes de agregar — nunca expandir sin hacer espacio
- Testear con escenarios reales del negocio, no genéricos
- Documentar cada cambio con razonamiento en el README del cliente
