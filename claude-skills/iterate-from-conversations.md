# Skill: /iterate-from-conversations — Optimizar agente desde conversaciones reales

## Trigger
Cuando se dice `/iterate-from-conversations [cliente]` o "analizar conversaciones de [cliente]".

## Objetivo
Leer conversaciones reales del agente IA, cruzarlas con feedback del cliente, diagnosticar discrepancias entre comportamiento esperado vs real, y producir ajustes quirúrgicos al prompt o workflows.

## Pasos

### 1. Cargar contexto del cliente
Lee estos archivos simultáneamente:
- `clientes/[cliente]/README.md` — Arquitectura, flujos, decisiones técnicas
- `clientes/[cliente]/prompts/current_prompt_live.txt` — Prompt activo
- `clientes/[cliente]/reportes/` — Feedback y reportes existentes
- `clientes/[cliente]/workflows/` — Workflows desplegados (si aplica)

Identifica:
- Flujo conversacional esperado (PASOS definidos en el prompt)
- Reglas inmutables que NO deben violarse
- Herramientas disponibles y su comportamiento esperado
- Puntos de derivación automática

### 2. Obtener conversaciones reales
Conectar a la fuente de conversaciones del cliente:

**Opción A — Chatwoot API:**
```
GET /api/v1/accounts/{account_id}/conversations?page=1
Headers: api_access_token: [TOKEN]
```
Filtrar por rango de fechas (default: últimos 7 días).

**Opción B — n8n MCP:**
Usar `mcp__claude_ai_n8n_[Cliente]__search_workflows` para identificar workflows de exportación.

**Opción C — Export manual:**
Si el usuario proporciona conversaciones exportadas en texto/CSV.

Seleccionar muestra representativa: mínimo 10, máximo 30 conversaciones.

### 3. Análisis de patrones
Para cada conversación, evaluar:

| Criterio | Qué buscar |
|----------|-----------|
| **Secuencia de PASOS** | El agente siguió el orden definido en el prompt? Saltó alguno? |
| **Alucinación** | Inventó datos no confirmados por herramientas? (hab, baños, área, precios) |
| **Tono** | Consistente con las instrucciones? (cálido, peruano, sin frases robóticas) |
| **Derivación** | Se ejecutó en el momento correcto? Prematura? Tardía? |
| **Loops** | Repitió la misma pregunta? Pidió datos ya proporcionados? |
| **Links/URLs** | Usó links reales de la herramienta o inventó links genéricos? |
| **Preguntas cerradas** | Hizo preguntas de sí/no cuando el prompt lo prohíbe? |
| **Eco** | Repitió textualmente lo dicho por el cliente? |

Clasificar cada conversación: OK / CON_ISSUES / CRÍTICA.

### 4. Cruce con feedback del cliente
Comparar hallazgos con feedback documentado:
- **Confirmados:** Problemas que el feedback reporta Y aparecen en conversaciones
- **No reportados:** Problemas detectados en conversaciones que el cliente no mencionó
- **Fantasma:** Problemas reportados por el cliente que NO se reproducen en conversaciones

### 5. Diagnóstico categorizado
Para cada problema, clasificar la causa raíz:

| Categoría | Significado | Acción |
|-----------|-----------|--------|
| `PROMPT` | La instrucción existe pero el LLM la ignora | Reforzar: mover a posición más prominente, repetir en reglas inmutables |
| `PROMPT_MISSING` | No hay instrucción para este caso | Agregar sección nueva (verificar presupuesto de caracteres) |
| `WORKFLOW` | El flujo n8n no ejecuta correctamente | Revisar nodos del workflow, verificar parámetros |
| `TOOL` | La herramienta devuelve datos incorrectos/incompletos | Revisar configuración de la tool en n8n |
| `EDGE_CASE` | Situación no contemplada en el diseño | Documentar, decidir si agregar al prompt o manejar vía derivación |

### 6. Producir ajustes quirúrgicos
Para cada problema diagnosticado:
- **Archivo afectado:** path exacto
- **Sección/línea:** ubicación precisa del cambio
- **Texto actual (OLD):** lo que dice ahora
- **Texto propuesto (NEW):** el cambio mínimo necesario
- **Justificación:** evidencia de la conversación real que lo motiva
- **Impacto estimado:** % de conversaciones que se benefician

Principio: **cambio mínimo, máximo impacto.** Nunca reestructurar secciones completas.

### 7. Generar reporte
Formato de salida:

```
## Reporte de Iteración — [Cliente]
**Fecha:** [fecha]
**Conversaciones analizadas:** [N]
**Período:** [rango de fechas]

### Métricas
- Conversaciones OK: X/N (Y%)
- Con issues menores: X/N
- Críticas: X/N

### Hallazgos (por prioridad)

#### 🔴 CRÍTICO — [descripción]
- **Evidencia:** "[fragmento de conversación]"
- **Causa:** [PROMPT/WORKFLOW/TOOL]
- **Fix:** [cambio propuesto]

#### 🟡 MEDIO — [descripción]
...

### Ajustes propuestos
[tabla con todos los cambios, archivo, sección, OLD/NEW]

### Presupuesto de caracteres
- Prompt actual: [N] chars
- Post-cambios: [N] chars (+/- diferencia)
```

## Reglas
- NUNCA reestructurar un prompt completo — solo ajustes quirúrgicos
- SIEMPRE mostrar evidencia (fragmento de conversación real) para cada hallazgo
- Si un problema requiere cambio de workflow n8n, documentar pero NO ejecutar sin aprobación del usuario
- Priorizar por impacto: problemas que afectan a >20% de conversaciones van primero
- Verificar presupuesto de caracteres antes de agregar texto al prompt
- No eliminar reglas existentes a menos que estén causando problemas confirmados
- Después de aplicar cambios, sugerir monitoreo Chatwoot 24-48h
