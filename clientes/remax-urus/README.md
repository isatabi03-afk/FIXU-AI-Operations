# PROYECTO ANTHU 2.0 — RE/MAX URUS
## Contexto completo para onboarding técnico y estratégico

> **Propósito de este README:** Permitir que cualquier persona —humana o LLM— comprenda el proyecto de inicio a fin sin necesidad de contexto adicional. Incluye historia, arquitectura, flujos, decisiones clave y estado actual.

---

## 1. QUIÉNES SON LOS ACTORES

| Actor | Rol | Notas |
|---|---|---|
| **Santiago Zavaleta (Santi)** | CEO de FIXU AI — cliente estratégico | Interlocutor principal, produce specs, prompts y documentación ejecutiva |
| **Manu** | Dev n8n de FIXU AI | Implementación técnica de flujos y automatizaciones |
| **Gonzalo Huapaya** | Gerente / Co-fundador RE/MAX URUS | Stakeholder senior, toma decisiones de negocio |
| **Leily** | Management RE/MAX URUS | Aprueba presupuesto y alcance, preocupada por tiempos del proyecto |
| **Anthuanet Huamana (Anthu 1.0)** | Leads Manager humana de RE/MAX URUS | Persona que el agente IA "clona". Supervisa ANTHU 2.0, recibe derivaciones |
| **Jimena** | Marketing RE/MAX URUS | Manejo de WhatsApp Business / Meta |

---

## 2. CONTEXTO DEL NEGOCIO (RE/MAX URUS)

**¿Qué es RE/MAX URUS?**
Oficina franquiciada de RE/MAX en Perú, especializada en compra, venta y alquiler de propiedades residenciales y comerciales en Lima. No usan portales inmobiliarios (Urbania, A Dónde Vivir). Su estrategia de adquisición de leads es 100% orgánica vía redes sociales: TikTok, Instagram y Facebook con más de 300,000 seguidores combinados y un equipo de 4 personas de marketing.

**Problema de negocio:**
- Volumen: ~3,000–4,000 leads/mes
- Tasa de agendamiento actual: 2–5%
- Una sola persona (Anthuanet) atiende, califica y deriva TODO manualmente
- No trabajan domingos → lunes se acumula todo el fin de semana
- Tiempo de respuesta al lead: depende 100% de disponibilidad humana
- Sistema CRM: **SIGIE** (plataforma exclusiva de RE/MAX Perú, no integrable fácilmente por API en la fase 1)

**Objetivo del proyecto:**
Aumentar la tasa de contactabilidad al 98% (respuesta en <1 minuto), calificar automáticamente, registrar datos y derivar solo leads "calientes" a Anthuanet y asesores. Liberar a Anthuanet de tareas repetitivas para que se enfoque en validación y gestión de leads de alta intención.

---

## 3. QUÉ ES ANTHU 2.0

**ANTHU 2.0** es un agente de IA conversacional desplegado en WhatsApp que actúa como "clon" de Anthuanet Huamana. Es la primera línea de atención comercial de RE/MAX URUS, disponible 24/7.

**Funciones principales:**
1. Saludo y clasificación de intención del lead (comprador / arrendatario / vendedor / postulante)
2. Calificación inteligente: zona, tipo de propiedad, presupuesto, plazo de compra, correo
3. Búsqueda de propiedades por ID o criterios (via `buscar_propiedades`)
4. Validación financiera: contado vs. crédito hipotecario. Incluye pre-evaluación con requisitos (ingresos >S/4,000, sin Infocorp, inicial 10–20%)
5. Solicitud de DNI para arrendatarios y compradores con crédito (trigger para Sentinel/Infocorp)
6. Registro automático del lead en Baserow (via `registrar_lead`)
7. Derivación a Anthuanet vía WhatsApp template (via `derivar_humano`)
8. Agendamiento de visitas (via `buscar_disponibilidad` + `agendar_visita`) — en implementación
9. Manejo de fricción (resistencia a dar DNI, quejas, urgencias irracionales, negociación de precios)

**Lo que ANTHU 2.0 NO hace:**
- Integración directa con SIGIE (fase futura)
- Enviar imágenes de propiedades (solo links landing de remax.pe)
- Confirmar elegibilidad crediticia (solo recopila datos y deriva)
- Inventar datos de propiedades (habitaciones, baños, área → PROHIBIDO)

---

## 4. STACK TECNOLÓGICO

| Capa | Herramienta | Función |
|---|---|---|
| Mensajería | Meta WhatsApp Business API | Canal principal de comunicación |
| Gestión de conversaciones | **Chatwoot** | CRM de conversaciones, vista de agente humano |
| Orquestación / Automatización | **n8n** (self-hosted) | Motor principal de flujos y subworkflows |
| Base de datos leads | **Baserow** | Registro estructurado de leads calificados |
| Base de datos propiedades | **Baserow** + sync desde **Google Sheets** | Cartera de propiedades actualizada |
| IA / LLM | **OpenAI API** | Núcleo conversacional del agente |
| Validación crediticia | **Sentinel / Infocorp** | Screening de historial crediticio por DNI |
| Generación de documentos | **ReportLab** (Python) | PDFs ejecutivos y reportes de costos |
| Agendamiento (próxima fase) | **Cal.com** | Links de calendario por asesor |
| Almacenamiento de propiedades | **Google Drive** (carpeta "Propiedades") | Fuente de datos de propiedades (Google Sheets → Baserow) |
| Gestión de proyecto | **Notion** | Documentación interna, observaciones y tareas |

---

## 5. FLUJO CONVERSACIONAL DE ANTHU 2.0

### MÓDULO COMPRADOR

```
LEAD ENTRA (mensaje WhatsApp)
        ↓
[PASO 1] ¿Trae ID de propiedad?
   SÍ → buscar_propiedades(id)
   NO → ir a PASO 2
        ↓
[PASO 2] Calificación inteligente
   (omitir preguntas ya respondidas en primer mensaje)
   → Distrito | Tipo propiedad | Presupuesto | Plazo mudanza | Email
        ↓
[PASO 3] Búsqueda + presentación
   → buscar_propiedades(criterios)
   → Mostrar máx. 3 opciones con: 🏠 Tipo | 📍 Distrito | 💰 Precio | 🔗 Link landing
   → NUNCA mencionar hab/baños/área
        ↓
[PASO 4] Validación financiera [GATE OBLIGATORIO antes de agendar]
   ¿Compra al contado o crédito hipotecario?
   
   CASO A - CONTADO:
   → registrar_lead(estado="calificado")
   → Ir a agendamiento de visita
   
   CASO B1 - CRÉDITO APROBADO:
   → Pedir DNI + nombre + email
   → registrar_lead(estado="validación pendiente", modalidad="crédito aprobado")
   → derivar_humano(motivo="Validación DNI - Comprador con crédito")
   → FINALIZAR (no responder más)
   
   CASO B2 - SIN CARTA APROBADA:
   → Presentar requisitos (ingresos >S/4,000, inicial 10-20%, sin Infocorp)
   → Recopilar: DNI, nombre, ingreso mensual, sustento, empresa, cargo, años
   → registrar_lead(estado="evaluación crediticia")
   → derivar_humano(motivo="Evaluación crediticia - Sin carta aprobada")
   → FINALIZAR
```

### MÓDULO ARRENDATARIO

```
[PASO 1] Calificación: Distrito | Tipo | Presupuesto mensual | Plazo | Mascotas | Email
   Validaciones mínimas:
   - Contrato <1 año → no aplica (mínimo 1 año)
   - Presupuesto <S/1,200 → rango desde S/1,200 en SJL, Comas, SMP, Los Olivos
   - Alquiler-venta → no trabajamos esa modalidad
        ↓
[PASO 2] Búsqueda + presentación (misma lógica que comprador)
        ↓
[PASO 3] DNI OBLIGATORIO
   → "Para coordinar visita, necesito tu DNI. Esto valida historial para que propietario autorice."
   → Ejecutar Sentinel/Infocorp por DNI
   → registrar_lead(tipo="Arrendatario", estado="validación pendiente")
   → derivar_humano
   → FINALIZAR
```

### MÓDULO VENDEDOR

```
Recopilar: ubicación propiedad | m² | tipo | inscripción SUNARP | nombre | email
→ registrar_lead(tipo="vendedor")
→ derivar_humano
→ "Un asesor especializado en tu zona te contactará para coordinar la valoración."
```

### MÓDULO POSTULANTE

```
Recopilar: nombre completo | email | celular | edad | distrito de residencia
→ registrar_lead(tipo="postulante")
→ derivar_humano
→ "El equipo de oportunidad te contactará para coordinar tu entrevista."
```

### DERIVACIÓN AUTOMÁTICA (bypass de flujo)

Se ejecuta `derivar_humano` inmediatamente ante:
1. Quejas o reclamos
2. Urgencia irracional ("quiero visita HOY a las 2pm", "quiero comprar YA")
3. 3+ insistencias en propiedad no disponible
4. Negociación de precios o comisiones
5. Consultas legales/contractuales
6. Sin propiedades + info incompleta del lead
7. Resistencia al DNI después de manejo de fricción
8. Recepción de DNI (trigger automático de derivación)

---

## 6. TEMPLATES WHATSAPP META (activos)

| Template | Cuándo se usa |
|---|---|
| `anthu_derivacion_dni_v1` | Al derivar por DNI (comprador/arrendatario) |
| `lead_verificado_sentinel_v1` | Cuando Sentinel valida OK el lead |
| `asesor_lead_asignado_v1` | Notificación al asesor de que tiene un lead asignado |
| `anthu_derivacion_quejas_v1` | Al derivar por quejas/reclamos |
| *(pendiente)* Template genérico fallback | Para derivaciones que no encajan en las anteriores |

> ⚠️ **Gap identificado:** Falta template genérico de fallback. Sin este, hay casos de derivación donde Anthuanet no recibe notificación → falla silenciosa.

---

## 7. ARQUITECTURA DE DATOS

### Tabla `leads` en Baserow (campos clave)

| Campo | Descripción |
|---|---|
| `id_lead` | ID único de sesión WhatsApp |
| `nombre` / `apellido` | Datos del prospecto |
| `celular` / `email` | Contacto |
| `tipo_lead` | Comprador / Arrendatario / Vendedor / Postulante |
| `intencion_detectada` | Señal de intención detectada por IA |
| `ubicacion` / `distribucion_deseada` | Preferencias de propiedad |
| `presupuesto` | Presupuesto declarado |
| `modalidad_financiamiento` | contado / crédito aprobado / evaluación crediticia |
| `estado_lead` | calificado / validación pendiente / evaluación crediticia / resistencia |
| `dni` | DNI del lead (cuando aplica) |
| `ingresos` / `empresa` | Datos para evaluación hipotecaria |
| `fecha_derivacion` | Timestamp de derivación |
| `visita_agendada` / `fecha_visita` | Estado de agendamiento |

> ⚠️ **Decisión técnica:** Se usa `UPSERT` (no INSERT) para evitar duplicados por constraint de `id_lead` en re-encuentros de sesión.

### Sync de Propiedades: Google Drive → Baserow

- RE/MAX URUS exporta su cartera de propiedades como Google Sheet a una carpeta de Drive ("Propiedades")
- Un workflow n8n detecta cambios, compara con Baserow usando campo `Codigo` como key
- Lógica: **"Google Sheets siempre gana"** → diff-based: inserts para nuevas, deletes para removidas
- ⚠️ **Issue conocido:** Error HTTP 403 en workflow `update_property_file` bloqueaba updates automáticos. Estado de resolución: pendiente confirmación.

---

## 8. HISTORIA DEL PROYECTO (cronología)

### Fase 0: Discovery (Octubre 2024)
- **Oct 27:** Primera reunión con Gonzalo. Se identifica el problema: 3,000–4,000 leads/mes, tasa de agendamiento 2–5%, cuello de botella en Anthuanet.
- Decisión de no usar portales, apostar por IA como diferenciador frente a las 100+ oficinas RE/MAX Perú.
- **Oct 31 (Cierre):** Reunión de propuesta con Leily y Gonzalo. Se presenta el concepto de "Anthuanet 24/7". Alcance pactado: 60 días de implementación + acompañamiento hasta estabilización.

### Fase 1: Onboarding y Auditoría (Noviembre 2024)
- **Nov 19 (Onboarding_Urus_1):** Reunión con Anthuanet y Jimena. Se mapea el proceso comercial completo: criterios de calificación, flujo real de atención, manejo de crédito hipotecario, rol del asesor vs. leads manager, restricción de no compartir ubicación exacta hasta datos entregados.
- **Nov 21 (Hallazgos_Urus):** Presentación a Leily y Gonzalo del diagnóstico completo + roadmap. Se muestra la plataforma de gestión del proyecto (Notion). Se explica la integración intermedia con Excel espejo del SIGIE (copy-paste para Anthuanet) como solución puente pre-API.
- Se define: propiedad se muestra ANTES del DNI. El SIGIE no es integrable en fase 1. Integración futura como objetivo estratégico.

### Fase 2: Construcción de ANTHU 2.0 (Diciembre 2024 – Enero 2025)
- Construcción del prompt base y flujos n8n
- Primeras conversaciones reales en producción → detección de bugs de comportamiento
- Se configura Chatwoot como capa de supervisión humana
- Se define tabla de leads en Baserow y workflow de sync de propiedades

### Fase 3: Ajustes y Entrenamiento (Enero 2025)
- **Ene 21 (Ajustes_Anthu_Urus):** Primera sesión de ajustes tras producción real. Correcciones aplicadas:
  - Presupuesto <S/4,000 → trigger automático de pre-evaluación hipotecaria
  - Rangos de alquiler actualizados: desde S/1,200 (eliminados precios obsoletos S/500–600)
  - Tono ajustado a español peruano nativo
  - Prompt ajustado para no mencionar cómo aparecen datos en la base de datos interna
  - Coordinación de lógica de calendario para agendamiento masivo

### Fase 4: Optimización del Prompt (Enero–Febrero 2025)
- **Ajustes_Anthu_Urus_2 y _3:** Revisiones iterativas del prompt basadas en feedback de Anthuanet
- **Fix crítico (v4.02):** ANTHU ofrecía coordinar visitas ANTES de completar validación financiera (PASO 4). Corrección: el CTA de agendamiento en PASO 3 fue eliminado; PASO 4 es gate obligatorio antes de cualquier mención de visita.
- Versión actual del prompt: **v4.02** (`Prompt_Anthu_2_0_4_02.txt`)

### Estado actual: Pre-producción full
- ANTHU 2.0 ha completado release inicial
- Pendiente: aprobación de management (Leily, Gonzalo, Anthuanet) para go-live full
- Acuerdo de continuidad mensual en preparación: $250 USD + 18% IGV/mes

---

## 9. DECISIONES TÉCNICAS CLAVE

| Decisión | Razonamiento |
|---|---|
| **Prompt modular por PASOS** | Facilita mantenimiento. Cambios quirúrgicos en secciones específicas, sin restructurar. |
| **Validación financiera como gate explícito (PASO 4)** | El agente saltaba el gate si el CTA de PASO 3 mencionaba visitas implícitamente. El gate debe ser texto explícito, no inferido. |
| **Lead VE propiedad ANTES de dar DNI** | Decisión operativa de Gonzalo/Leily: la ubicación exacta no se entrega hasta recibir datos del lead (para evitar que bypaseen al asesor y vayan directo al propietario). |
| **UPSERT en Supabase/Baserow** | Evita duplicate key constraint en re-encuentros de sesión (mismo `id_lead` en múltiples interacciones). |
| **Templates WhatsApp para derivación** | Meta no permite mensajes proactivos fuera de ventana de 24hs sin template aprobado. Los templates evitan pérdida de notificaciones a Anthuanet. |
| **No integrar con SIGIE en fase 1** | SIGIE (CRM propietario de RE/MAX) no tiene API pública disponible en el corto plazo. Solución puente: Baserow + Excel espejo para copy-paste. |
| **Google Sheets como fuente de verdad de propiedades** | RE/MAX URUS ya exporta su cartera del SIGIE a Sheets. Se aprovecha ese flujo existente. |
| **No confirmar elegibilidad crediticia** | Riesgo legal y operativo. ANTHU solo recopila datos y deriva; la evaluación real la hace el banco aliado. |

---

## 10. HALLAZGOS / BUGS CONOCIDOS (por severidad)

### 🔴 CRÍTICO
- **Gate financiero no respetado (CORREGIDO en v4.02):** ANTHU ofrecía visitas antes de preguntar modalidad de pago. Fix: CTA de PASO 3 limpiado, PASO 4 explicitado como gate.

### 🟠 ALTO
- **Template fallback faltante:** Sin template genérico para derivaciones que no matchean las 4 condiciones definidas → Anthuanet no recibe notificación → lead en limbo.
- **Error HTTP 403 en `update_property_file`:** Workflow de sync de propiedades bloqueado por permisos de Drive. Estado: pendiente resolución confirmada.

### 🟡 MEDIO
- **ANTHU menciona datos de BD interna:** En algunas respuestas mencionaba "revisé la publicación y aparece como consultar". Corregido en ajuste de prompt, pero requiere monitoreo.
- **Agendamiento sin validación de disponibilidad real:** `buscar_disponibilidad` y `agendar_visita` están definidos en el prompt pero la integración con calendario (Cal.com) está pendiente de implementación.
- **Duplicados de lead por re-sesión:** Resuelto con UPSERT, pero requiere validación en producción a escala.

### 🟢 BAJO
- **Tono no siempre peruano:** Casos aislados donde ANTHU usa expresiones no locales. Mitigado con instrucciones explícitas en prompt.
- **Preguntas cerradas (sí/no):** El prompt instruye evitarlas, pero el LLM puede generar algunas en edge cases.

---

## 11. PRÓXIMAS FASES

| Fase | Descripción | Prioridad |
|---|---|---|
| **Template fallback** | Crear y aprobar en Meta el template genérico de derivación | Alta |
| **Fix 403 Drive** | Resolver permisos en workflow update_property_file | Alta |
| **Cal.com integration** | Conectar `buscar_disponibilidad` y `agendar_visita` con calendario real de asesores | Media |
| **Go-live full** | Aprobación de Leily/Gonzalo/Anthuanet para producción completa | Alta |
| **Retainer mensual** | Formalizar acuerdo $250 USD + IGV/mes | Alta |
| **Integración SIGIE** | API con CRM propio de RE/MAX Perú (depende de RE/MAX Perú central) | Futura |
| **Reporte métricas** | Dashboard de performance: leads atendidos, calificados, derivados, tasa conversión | Media |

---

## 12. MODELO COMERCIAL / FINANCIERO

**Inversión inicial:** Cubierta por proyecto de 60 días (FIXU AI).

**Retainer mensual post-proyecto:**
| Concepto | Costo |
|---|---|
| Servidor dedicado (n8n) | Incluido |
| Tokens OpenAI API | Incluido (fijo) |
| Consultoría / soporte / optimización | Incluido |
| **Total fijo mensual** | **$250 USD + 18% IGV** |
| Templates Meta WhatsApp | Variable por volumen de envíos |
| OpenAI por interacción | Variable por volumen |

> Los costos variables se listan a precio unitario sin estimación de volumen en cotización ejecutiva (criterio acordado con Santi para evitar comprometer cifras sin datos reales de uso).

---

## 13. ESTRUCTURA DE ARCHIVOS DE ESTE PROYECTO

| Archivo | Tipo | Contenido |
|---|---|---|
| `Discovery_Urus_1.txt` | Transcripción reunión | Primera reunión (vacía o muy corta) |
| `Discovery_Urus_2.txt` | Transcripción reunión | Discovery con Gonzalo - Oct 27. Contexto de negocio y problema. |
| `Cierre_Urus.txt` | Transcripción reunión | Reunión de cierre/propuesta con Leily y Gonzalo - Oct 31. Presentación de solución. |
| `Onboarding_Urus_1.txt` | Transcripción reunión | Onboarding con Anthuanet y Jimena - Nov 19. Mapeo de proceso comercial. |
| `Hallazgos_Urus.txt` | Transcripción reunión | Presentación de hallazgos a management - Nov 21. |
| `Hallazgos_Urus_2.txt` | Transcripción reunión | Segunda sesión de hallazgos / ajustes operativos. |
| `Ajustes_Anthu_Urus.txt` | Transcripción reunión | Primera sesión de ajustes post-producción - Ene 21. |
| `Ajustes_Anthu_Urus_2.txt` | Transcripción reunión | Segunda sesión de ajustes y entrenamiento. |
| `Ajustes_Anthu_Urus_3.txt` | Transcripción reunión | Tercera sesión de ajustes. |
| `Prompt_Anthu_2_0_4_02.txt` | Prompt del sistema | Versión activa del prompt de ANTHU 2.0 (v4.02). Fuente de verdad del comportamiento del agente. |
| `FEEDBACK_ANTHU_2_0_ACTUALIZADO_2.pdf` | Documento operativo | Feedback consolidado de Anthuanet sobre comportamiento del agente. |
| `REPORTE_COSTOS_DERIVACION_ANTHU_2.pdf` | Reporte ejecutivo | Análisis de costos por tipo de derivación. Priorización de templates. |
| `export__Leads__Cuadrícula.csv` | Data real | Export de base de datos de leads registrados por ANTHU 2.0 (2,233 registros). |

---

## 14. PRINCIPIOS OPERATIVOS (no negociables)

1. **Lead VE la propiedad ANTES de entregar DNI** — Regla de negocio de Gonzalo/Leily.
2. **DNI = trigger de derivación automática** — Nunca procesar ni validar DNI dentro del agente. Siempre derivar a Anthuanet.
3. **Validación financiera es gate obligatorio** — ANTHU no puede ofrecer visitas sin haber pasado por PASO 4.
4. **ANTHU nunca inventa datos de propiedades** — Sin alucinación de habitaciones/baños/área.
5. **Link landing obligatorio** — Siempre enviar URL de remax.pe si está disponible.
6. **No cambiar el modelo operativo de RE/MAX URUS** — Solo optimizar dentro de lo acordado. ANTHU potencia el proceso, no lo reemplaza.
7. **Prompt: cambios quirúrgicos, no restructuración** — La estructura modular PASO X debe preservarse. Solo reemplazar texto específico donde hay bugs.
8. **Documentación ejecutiva sin jerga técnica** — Los PDFs para Leily/Gonzalo usan "leads", no "registros" ni "entidades". Sin términos de ingeniería.

---

## 15. CONTACTOS / ACCESOS RELEVANTES

- **WhatsApp Business:** Configurado via Meta WhatsApp Business API
- **Chatwoot:** Instancia self-hosted para supervisión de conversaciones
- **n8n URUS:** `https://n8n.remaxurus.online`
- **Baserow:** Base de datos de leads y propiedades
- **Google Drive / Sheets:** Carpeta "Propiedades" sincronizada con Baserow

---

*Documento generado por FIXU AI — Actualizado a versión del proyecto con Prompt v4.02*
*Para preguntas técnicas: Manu (dev n8n). Para decisiones estratégicas/comerciales: Santiago Zavaleta (FIXU AI).*
