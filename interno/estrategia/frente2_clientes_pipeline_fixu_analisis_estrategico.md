# ANÁLISIS DE INTELIGENCIA COMERCIAL: CUMBRES
**Cliente:** Cumbres (Desarrolladora Inmobiliaria)  
**Periodo analizado:** Noviembre 2024 - Diciembre 2024  
**Documentos base:** Flujo Conversacional Cumbres + Cumbres Fase 2  
**Analista:** FIXU Intelligence Team  
**Fecha:** Febrero 2026

---

## RESUMEN EJECUTIVO (10 BULLETS)

1. **Cliente validado y en expansión:** Cumbres es el primer cliente de FIXU en sector inmobiliario, con relación de ~6 meses, actualmente en transición Fase 1 → Fase 2

2. **Volumen real comprobado:** 53 citas agendadas en noviembre 2024 con solo 40% de leads atendidos (60% derivados manualmente), indica potencial de +40% con optimización

3. **Pricing psicológico establecido:** Cliente acepta implícitamente modelo fee mensual + costo variable por conversación, sin objeciones fuertes de precio

4. **Integración crítica pendiente:** Principal bloqueador es sincronización con Esperan (CRM), mencionado repetidamente como requisito para Fase 2

5. **Urgencia operativa confirmada:** "Este mes es complicado, lo necesitamos ya urgente" - presión por cierre de año, curva de aprendizaje corta

6. **Multi-zona compleja:** Opera en 4 zonas (Callao, Trujillo, Chancay, Arequipa) con lógicas diferenciadas, requiere modularidad alta

7. **Dependencia de datos limpios:** Obsesión por coincidencia Drive-Chatwoot, campos vacíos son inaceptables, necesita dashboard espejo 1:1

8. **Decisor técnico identificado:** Giuseppe Quiroz (contacto principal), Dennis (operaciones data), Leonel (mencionado, rol no claro)

9. **Relación win-win explícita:** Cliente entiende que FIXU valida producto con ellos, acepta pricing preferencial vs nuevos clientes, se posiciona como partner no proveedor

10. **Señal de upsell fuerte:** Cliente proyecta necesidades futuras (seguimientos 24h, integración CRM, dashboard avanzado), modelo de expansión modular validado

---

## 1. PERFIL DEL CLIENTE

### Tipo de desarrolladora
- **Categoría:** Desarrolladora mediana-grande, multi-proyecto
- **Segmento:** Residencial (departamentos)
- **Cobertura geográfica:** Multi-regional (Lima: Callao, Chancay | Provincias: Trujillo, Arequipa)

### Tamaño aparente
- **Proyectos activos:** 4 (Vía Nova/Vía Monumental en Callao, Vía del Puerto en Chancay, proyecto Trujillo, 1 depto. remanente Arequipa)
- **Estructura comercial:** Equipo de asesores (no se menciona cantidad exacta), coordinador de datos (Dennis), gerencia comercial (Giuseppe)
- **Periodo vacacional:** Cierre empresarial 20 dic - 5 enero, indica estructura formal

### Volumen de leads
- **Métrica explícita:** 53 citas agendadas en noviembre 2024
- **Tasa de derivación manual:** 60% de leads derivados a asesor sin pasar por MIA
- **Potencial de optimización:** +40% proyectado con matriz actualizada
- **Canal principal:** WhatsApp (no se menciona volumen total de leads/mes)

### Estructura comercial
- **Modelo:** Asesores especializados por proyecto/zona
- **Proceso actual:** Lead → MIA (filtro inicial) → Derivación asesor → Agendamiento → Sala ventas
- **Punto de fricción:** Notificación a asesores manual, sin integración directa a CRM

### Herramientas actuales

**CRM/Gestión:**
- **Esperan:** CRM principal (mencionado 3 veces como crítico para Fase 2)
- **Google Drive:** Base de datos espejo para tracking (manejada por Dennis)
- **Chatwoot:** Plataforma conversacional actual (necesita espejo 1:1 con Drive)

**Canales:**
- **WhatsApp:** Canal principal de adquisición (sin mención de Meta, Instagram, web)
- **Google Search:** Mencionan que Arequipa recibe tráfico orgánico por búsquedas del proyecto

**Otros:**
- **Fathom:** Grabación de reuniones (evidencia en URLs)
- **MIA (FIXU):** Agente IA conversacional en implementación

### Nivel de madurez digital
**Score: 5/10 (Intermedio-bajo con aspiraciones altas)**

**Fortalezas:**
- Utilizan CRM (Esperan) 
- Trackean data en Drive con estructura
- Conscientes de importancia de integración

**Debilidades:**
- No tienen integración automática CRM-WhatsApp
- Derivación manual de leads (60%)
- No mencionan dashboards, analytics avanzados o automatización previa
- Dependencia fuerte de intervención humana

**Aspiraciones:**
- Quieren sincronización automática completa
- Buscan dashboard en tiempo real
- Proyectan seguimientos automáticos 24/7

---

## 2. DOLORES EXPLÍCITOS Y LATENTES

### TABLA DE DOLORES

| # | Dolor | Tipo | Severidad | Evidencia textual | Impacto estimado |
|---|-------|------|-----------|-------------------|------------------|
| D1 | **60% de leads derivados manualmente** | Operativo | ALTA | "Han sido casi con un 60% de derivaciones al asesor" | Pérdida directa de eficiencia, sobrecarga asesores |
| D2 | **Campos vacíos en base de datos** | Data/Control | ALTA | "No hay que tener celdas vacías" / "No tenemos números vacíos" | Imposibilita reporting, decisiones basadas en data incompleta |
| D3 | **Desincronización Drive-Chatwoot** | Integración | ALTA | "100 conversaciones acá, debe haber 100 en Drive" | Duplicación de trabajo, errores de seguimiento |
| D4 | **Urgencia de tiempo/curva aprendizaje** | Temporal | ALTA | "Este mes es complicado, lo necesitamos ya urgente" / "Acortar curvas de aprendizaje" | Presión por cierre de año, riesgo reputacional interno |
| D5 | **Falta de integración con Esperan** | Tecnológica | CRÍTICA | Mencionado 3+ veces como bloqueador Fase 2 | Trabajo manual, pérdida de leads, duplicación esfuerzos |
| D6 | **Leads no calificados (búsqueda trabajo, proveedores, post-venta)** | Calidad | MEDIA | "Vacantes de trabajo, proveedores, post-venta" requieren routing especial | Contaminación base, tiempo perdido asesores |
| D7 | **Ventana 24h de WhatsApp** | Costos | MEDIA | "A las 24 se corta el mensaje y ya hay cobro extra" / "No esperar a las 23 horas" | Incremento costo operativo si no se gestiona bien |
| D8 | **Ambigüedad en respuestas de leads** | Comunicación | MEDIA | Cliente pregunta zonas ambiguas (Pueblo Libre vs Callao) | Riesgo de perder leads por no ofrecer alternativas cercanas |
| D9 | **Falta de dashboard ejecutivo** | Visibilidad | MEDIA | "Ver las etiquetas, eso lo voy a ver en Drive" - necesita vista consolidada | Toma de decisiones lenta, sin KPIs en tiempo real |
| D10 | **Dependencia de expertise de personas** | Escalabilidad | LATENTE | Necesitan matriz de entrenamiento actualizada constantemente | Cuello de botella en crecimiento, no escalable |

### Dolores por categoría

**EMBUDO COMERCIAL:**
- 60% de leads pasan directo a asesor sin filtro IA (D1)
- Leads no calificados contaminan pipeline (D6)
- Pérdida de leads por no responder zonas alternativas cercanas (D8)

**CONTROL DE DATA:**
- Campos vacíos inaceptables en reportes (D2)
- Desincronización entre herramientas (D3)
- Imposibilidad de hacer análisis limpio sin data completa (D2, D3)

**TIEMPO DE RESPUESTA:**
- Urgencia operativa por cierre de año (D4)
- Necesidad de implementación rápida (D4)

**ASESORES:**
- Sobrecarga por atender leads que IA debería filtrar (D1)
- Tiempo perdido en consultas no comerciales (D6)

**REPORTING:**
- No hay dashboard consolidado (D9)
- Necesitan espejo exacto Drive-Chatwoot para auditar (D3)

**DEPENDENCIA HUMANA:**
- Requieren actualizar matriz de entrenamiento manualmente (D10)
- No pueden escalar sin agregar headcount (D10)

---

## 3. OBJECIONES

### TABLA DE OBJECIONES

| # | Objeción | Tipo | Momento | Manejo FIXU | Status |
|---|----------|------|---------|-------------|--------|
| O1 | **Alcance vs timing** | Scope creep | Fase 2 | "Tenemos que ser responsables con el alcance del primer contrato" | MANEJADA - Cliente acepta límites, se propone Fase 2 |
| O2 | **Funcionalidad fuera de alcance sin pricing** | Comercial | Seguimientos 24h | "No está dentro del alcance de la primera cotización" pero "lo vamos a dejar corriendo diciembre" | MANEJADA - Goodwill gesture como gancho |
| O3 | **Comparación con competencia implícita** | Competitiva | No explícita | Menciona "otro proveedor con Esperan" sin comparar precios | NO VERBALIZADA - Riesgo latente |
| O4 | **Complejidad de integración CRM** | Técnica | Fase 2 | Cliente pide "sincronizar todo con Esperan y tener la mejor solución" | PENDIENTE - Bloqueador para Fase 2 |
| O5 | **Necesidad de prueba antes de escalar** | Riesgo percibido | Fase 2 | "Deberías demostrar... durante enero" antes de decidir | ACEPTADA - Cliente quiere validar ROI |

### Objeciones NO presentadas (señales positivas):
- ❌ **Precio:** No hay cuestionamiento directo de costos
- ❌ **ROI:** No piden justificación de retorno
- ❌ **Cambio de proveedor:** No mencionan costos de switching
- ❌ **Complejidad técnica:** Confían en capacidad de FIXU
- ❌ **Tiempo de implementación:** Aceptan timelines propuestos

### Manejo estratégico de objeciones

**Best practice identificado:**
1. FIXU anticipa objeción de alcance y la verbaliza primero ("tenemos que ser responsables")
2. Ofrece goodwill (seguimientos 24h gratis diciembre) como hook para Fase 2
3. Cliente percibe transparencia y partnership, no venta agresiva

**Quote clave:**
> "Con Cumbres, nuestra visión [...] no es marginar como tal. Con ustedes empezamos y con ustedes queremos ayudarlos hasta que ustedes digan 'muchas gracias, los servicios acá nomás'. Nos convertimos en partners."

---

## 4. SEÑALES DE PRESUPUESTO Y PRICING

### TABLA DE PRICING IMPLÍCITO

| Concepto | Rango/Monto | Evidencia | Sensibilidad | Notas |
|----------|-------------|-----------|--------------|-------|
| **Fee mensual** | NO ESPECIFICADO | "La orden de servicio va a ser mensual" | BAJA | Cliente acepta concepto sin resistencia |
| **Costo variable** | Por conversación/notificación | "El costo variable por cada conversación, por la notificación" | MEDIA | Conscientes de modelo WhatsApp Business |
| **Desarrollo Fase 1** | PAGADO (monto no revelado) | Referencia a "primer contrato" cumplido | N/A | Ya ejecutado, cliente cumple pagos |
| **Pricing preferencial** | Descuento vs nuevos clientes | "No son los mismos precios que salimos a venderle a un nuevo cliente" | ALTA (positiva) | Cliente percibe valor de ser early adopter |
| **Modelo de costos** | Proyectado mensual en rango | "Proyectado mensual aproximadamente entre esto y esto, en un rango" | BAJA | Cliente acepta variabilidad, pide estimación no fijo |

### Comparaciones con otras inmobiliarias (de búsqueda en project knowledge)

**Enacorp (competidor):**
- Rango mencionado: "$2,000 - $2,500 USD" solo por desarrollo de agente reactivo+proactivo
- Fee mensual: Existe pero no cotizado en primera reunión
- Costos variables: Mensajes salientes (similar a Mantra)

**Implicación:** Cumbres probablemente está en rango $2,000-3,000 USD implementación + fee mensual $500-1,500 (hipótesis)

### Reacciones a precios
- **POSITIVA:** "No te preocupes con respecto a la cotización y a los precios"
- **POSITIVA:** Cliente no negocia, acepta que pricing personalizado requiere análisis post-discovery
- **NEUTRAL:** Pide "sincerar costos" para tomar decisión en enero (razonable, no objeción)

### Sensibilidad al fee mensual
**BAJA** - Indicadores:
- No cuestiona concepto de fee recurrente
- Entiende modelo SaaS + variable
- Prioriza funcionalidad sobre costo ("lo menos que implique manualmente algo")

### Expectativa de ROI
**IMPLÍCITA, NO VERBALIZADA:**
- Cliente mide éxito en: citas agendadas, reducción carga manual, dashboard limpio
- No pide payback period ni cálculo formal ROI
- Confía en validación de resultados (53 citas noviembre = proof point)

### Modelo de pricing percibido óptimo

Según conversaciones, cliente espera:
1. **Setup/Implementación:** One-time fee (ya pagado Fase 1)
2. **Fee mensual:** Recurrente, cubre mantenimiento + soporte
3. **Costos variables:** Pay-per-use en notificaciones WhatsApp
4. **Módulos adicionales:** Pricing por feature (ej: integración Esperan, seguimientos 24h, dashboard)

---

## 5. PROCESO DE DECISIÓN

### Quién decide

**Decisor principal:**
- **Giuseppe Quiroz:** Gerente Comercial / Líder proyecto (participa en 100% reuniones, da OK final)

**Influenciadores:**
- **Dennis:** Coordinador de datos/operaciones (usuario directo, valida funcionalidad técnica)
- **Leonel:** Mencionado 2 veces, rol no claro (posible gerencia general o IT)

**No mencionados:**
- Gerencia General / CEO (¿aprueba presupuestos grandes?)
- Finanzas (no se menciona aprobación presupuestal)

### Comité
**NO FORMAL** - Decisiones tomadas en reuniones operativas con Giuseppe + equipo técnico

### Tiempos

**Fase 1 (Nov-Dic 2024):**
- Discovery + implementación: ~6 meses desde inicio
- Urgencia cierre año: "Este mes es complicado, lo necesitamos urgente"

**Fase 2 (Proyectada):**
- Reunión decisión: 5 enero 2025
- Evaluación: Todo enero 2025 ("deberías demostrar durante enero")
- Implementación: No especificado (likely feb-mar 2025)

**Patrón temporal:**
- Cliente NO es impulsivo
- Requiere validación de resultados antes de expandir
- Decisiones post-vacaciones (enero = mes de evaluación)

### Aprobaciones

**Proceso inferido:**
1. Giuseppe valida técnicamente con Dennis
2. Evalúan resultados cuantitativos (53 citas, % derivaciones)
3. Giuseppe aprueba presupuesto (autonomía aparente hasta cierto monto)
4. Posible escalación a Leonel/Gerencia para Fase 2 (no confirmado)

**Quote clave:**
> "Durante enero deberías tú ya demostrar que [...] puedo hacerlo, el costo, sincerar costos [...] en base a eso podremos tomar la decisión si hay un tema completo."

### Pilotos

**Fase 1 = Piloto de facto:**
- Implementación con alcance limitado
- Prueba real en producción (53 citas = métricas reales)
- Diciembre = extensión goodwill para validar seguimientos 24h

**Criterios de éxito (no explícitos, inferidos):**
- \# de citas agendadas
- Reducción % derivación manual
- Calidad de datos en Drive/Chatwoot
- Facilidad de uso para Dennis/equipo

---

## 6. OPORTUNIDADES PARA FIXU

### Upsells identificados

| Oportunidad | Prioridad | Timing | Evidencia | Ticket estimado |
|-------------|-----------|--------|-----------|-----------------|
| **Integración Esperan (CRM)** | 🔴 CRÍTICA | Fase 2 (Q1 2025) | Mencionado 3+ veces como requisito | $1,500-3,000 |
| **Seguimientos automáticos 24h** | 🔴 ALTA | Fase 2 (Q1 2025) | Ya probando en diciembre, cliente lo pide explícito | $500-1,000/mes |
| **Dashboard ejecutivo** | 🟡 MEDIA | Fase 2-3 (Q1-Q2 2025) | "Ver dashboard" mencionado 2 veces | $800-1,500 |
| **Disparo automático desde # asesor** | 🟡 MEDIA | Fase 2 (Q1 2025) | "Que se dispare de su celular" cuando agenda cita | $300-800 |
| **Lógica avanzada seguimientos post-24h** | 🟢 BAJA | Fase 3 (Q2+ 2025) | Mencionado vagamente | $500-1,000 |
| **Canal Instagram** | 🟢 BAJA | Futuro (no especificado) | NO mencionado explícito, inferido de "ecosistema se expande" | $1,500-2,500 |
| **Canal TikTok** | 🟢 BAJA | Futuro (no especificado) | NO mencionado explícito | $1,500-2,500 |

### SaaS futuro

**Modelo proyectado:**
- Fase actual: Desarrollo custom + fee mensual mantenimiento
- Fase futura: Transición a plataforma SaaS multi-tenant con módulos

**Bloqueadores para SaaS:**
- Cumbres necesita alta personalización (4 zonas, lógicas diferenciadas)
- Integración Esperan es custom, no replicable 1:1
- Modelo actual (partner estratégico) genera más margen que SaaS

**Ventana SaaS (hipótesis):**
- Post 10-15 clientes inmobiliarios similares
- Cuando patrones conversacionales estén 90% estandarizados
- Esperan podría ser integración nativa en plataforma

### Automatización profunda

**Oportunidades técnicas:**
1. **Auto-clasificación leads:** Proyecto, zona, intención → CRM automático
2. **Scoring leads:** Modelo ML para priorizar seguimientos
3. **A/B testing conversacional:** Optimizar % agendamiento
4. **Voice AI:** Llamadas automáticas post-chat (no mencionado, oportunidad latente)

### Módulos adicionales

**Identificados en conversaciones:**
- Routing inteligente (post-venta → contacto@, ventas → asesor)
- Gestión multi-zona con reglas diferenciadas
- Reporting espejo Drive-Chatwoot (específico Cumbres)

**Potenciales (no mencionados):**
- CRM ligero embebido (competir con Esperan en el largo plazo)
- Email automation post-agendamiento
- Retargeting automático leads fríos

### FOLOU-fit

**¿Qué es FOLOU?** (Asumiendo producto FIXU, no mencionado en docs)

**Si FOLOU = Plataforma low-code/no-code:**
- ❌ **NO FIT inmediato:** Cumbres necesita desarrollo custom, no tiene capacidad interna
- ✅ **FIT futuro:** Si escalan equipo IT/Marketing, podrían internalizar mantención

**Si FOLOU = Dashboard/Analytics:**
- ✅ **FIT ALTO:** Necesidad explícita de visibilidad data, espejo Drive-Chatwoot

**Recomendación:** Evaluar fit específico cuando esté definido producto FOLOU

---

## 7. FRASES TEXTUALES CLAVE (QUOTES)

### Sobre la relación comercial
> **Giuseppe:** "De hecho, es un win-to-win porque lo que tú vas a implementar lo puedes vender a otras inmobiliarias y de hecho ya tu curva de aprendizaje va a ser más corta, sin duda, ¿no? Entonces, de eso se trata, ¿no? O sea, es de ambos lados."

> **Santiago (FIXU):** "Con Cumbres, nuestra visión [...] no es marginar como tal. O literalmente con ustedes empezamos y con ustedes queremos ayudarlos hasta que ustedes digan, miren, ¿sabes qué? Muchas gracias, los servicios acá nomás. Nos convertimos en sus partners."

### Sobre urgencia operativa
> **Giuseppe:** "La idea es, como te digo, Santiago, acortar los tiempos, las curvas de aprendizaje. Este mes es complicado, lo necesitamos ya urgente."

> **Giuseppe:** "Y ya los demás cambios que sean menores, que de repente se van a seguir dando, ya que sean un ajuste tuerca, pero no la tuerca en sí, ¿no? Entonces, la idea es ir cerrando esto lo más pronto posible."

### Sobre calidad de datos
> **Giuseppe:** "Acá hay 100 conversaciones, en mi drive debe haber 100 conversaciones. ConversaciÃ³n. Acá, con datos tanto, con datos tanto. Ok, hace match y se acabó."

> **Giuseppe:** "No hay que tener celdas vacías, al menos tener [...] Si no hay ningún proyecto, [...] poner ahí en esa celda otro lugar [...] ya de esa lista ya se pasa, no está completo."

### Sobre pricing
> **Santiago:** "No te preocupes con respecto a la cotización y a los precios porque definitivamente no son los mismos precios que hoy en día salimos a venderle a un nuevo cliente porque ya estamos con una oferta validada como tal."

### Sobre integración CRM
> **Giuseppe:** "Lo que queremos es, lo menos, lo menos, por así decirlo, que implique manualmente algo, es lo que nosotros queremos. Que todo esté sincronizado, que sea en respuestas rápidas."

> **Giuseppe:** "El tema es [...] poder llegar y poder sincronizar todo con Esperan y tener la mejor solución."

### Sobre proceso de decisión
> **Giuseppe:** "Yo creo que durante enero deberías tú ya demostrar que, oye, mira, si tú ya te has sincronizado con Espera a través de otro proveedor, juntarnos a PINEMES y decir, mira, ya esto es lo que hago con esta inmobiliaria, puedo hacerlo, el costo, sincerar costos, ¿no? [...] Entonces, en base a eso, yo creo que ahí podríamos ya nosotros poder tomar la decisión."

### Sobre alcance y límites
> **Santiago:** "Tenemos que ser responsables con los recursos de la empresa y salirnos de ese alcance como tal acordado de alguna u otra manera afecta a las horas de desarrollo."

### Sobre resultados
> **Santiago:** "53 citas. Con esa matriz que tú me logres pasar actualizada [...] esto podría aumentar hasta casi un 40% más."

---

## 8. RIESGOS

### TABLA DE RIESGOS

| # | Riesgo | Probabilidad | Impacto | Mitigación actual | Acciones recomendadas |
|---|--------|--------------|---------|-------------------|----------------------|
| R1 | **Integración Esperan falla técnicamente** | MEDIA | CRÍTICO | Ninguna (no iniciada) | POC técnico pre-venta Fase 2, validar API Esperan antes de cotizar |
| R2 | **Competidor entra con integración Esperan nativa** | MEDIA | ALTO | Relación partnership establecida | Acelerar Fase 2, crear switching costs (datos, entrenamientos) |
| R3 | **Cliente no ve ROI en enero** | BAJA | ALTO | Goodwill seguimientos 24h como proof | Definir KPIs éxito enero, tracking semanal, reportes automáticos |
| R4 | **Cambio organizacional (Giuseppe sale)** | BAJA | CRÍTICO | Relación con Leonel (backup?) | Documentar todo, involucrar más stakeholders |
| R5 | **Costos variables WhatsApp explotan** | MEDIA | MEDIO | Cliente consciente de modelo | Optimizar lógica seguimientos, evitar spam, simular costos enero |
| R6 | **Scope creep sin reprecio** | ALTA | MEDIO | Santiago pone límites explícitos | Formalizar change requests, pricing modular Fase 2 |
| R7 | **Esperan limita/cobra por API** | BAJA | MEDIO | Desconocido | Validar modelo negocio Esperan, tener plan B (CRM alternativo) |
| R8 | **Cumbres prioriza otros proyectos/reduce presupuesto** | MEDIA | ALTO | NO aparente | Demostrar ROI rápido, crear dependencia operativa |
| R9 | **Calidad entrenamiento MIA decae sin matriz actualizada** | ALTA | MEDIO | Cliente debe enviar FAQs | Proceso automatizado captura nuevas preguntas, training continuo |
| R10 | **Equipo FIXU sobrecarga con customizaciones Cumbres** | MEDIA | MEDIO | NO aparente | Estandarizar componentes, plataforma base reutilizable |

### Riesgos de churn

**Señales positivas (anti-churn):**
- ✅ Relación 6 meses, no es nuevo cliente
- ✅ Métricas positivas (53 citas, +40% proyectado)
- ✅ Cliente verbalizó "partners no proveedores"
- ✅ Pricing preferencial genera lock-in psicológico
- ✅ Customización profunda = switching costs altos

**Señales negativas (riesgo churn):**
- ⚠️ Fase 2 condicional a validación enero (no es automático)
- ⚠️ Mención implícita "otro proveedor con Esperan"
- ⚠️ Dependencia crítica en 1 persona (Giuseppe)

**Probabilidad churn 12 meses:** 15-25% (BAJA-MEDIA)

---

## 9. HIPÓTESIS ESTRATÉGICAS

### H1: Pricing Óptimo Fase 2
**Hipótesis:** Cliente aceptará $3,500-5,000 USD por Fase 2 (integración Esperan + seguimientos 24h + dashboard) + fee mensual $800-1,200

**Sustento:**
- No objetó concepto fee mensual Fase 1
- Entiende que Fase 2 es "ecosistema completo"
- Valoriza más funcionalidad que precio
- Pricing preferencial ya mencionado

**Validación:** Propuesta 5 enero, reacción en reunión

---

### H2: Esperan como Moat
**Hipótesis:** Integración profunda Esperan crea switching cost de 6-12 meses, convierte Cumbres en cliente sticky

**Sustento:**
- CRM es sistema core del negocio
- Migrar data/flujos es costoso
- FIXU aprende modelo negocio Cumbres vía integración

**Riesgo:** Si Esperan abre API públicamente, commoditiza integración

**Validación:** Investigar roadmap Esperan, nivel apertura API

---

### H3: Modelo Replicable
**Hipótesis:** 70% del desarrollo Cumbres es reutilizable para desarrolladoras similares (multi-proyecto, 4-8 zonas, CRM externo)

**Sustento:**
- Flujo conversacional base (calificación, agendamiento) es estándar
- Integración CRM via API es patrón repetible
- Dashboard data limpia es pain universal

**Implicación:** Acelerar time-to-market próximos clientes, reducir costo desarrollo, aumentar margen

**Validación:** Analizar overlap con otros clientes inmobiliarios (Galeón, Enacorp, Remax, etc.)

---

### H4: Dashboard = Trojan Horse para CRM Propio
**Hipótesis:** Si FIXU construye dashboard suficientemente bueno, Cumbres podría migrar de Esperan a CRM FIXU en 18-24 meses

**Sustento:**
- Cliente prioriza visibilidad sobre features CRM tradicionales
- Esperan aparentemente no tiene dashboard satisfactorio (sino usarían ese, no Drive)
- FIXU ya tiene data conversacional + agendamiento

**Riesgo:** Requiere inversión producto significativa, puede no ser core business FIXU

**Validación:** Entender features Esperan que Cumbres NO usa, gaps funcionales

---

### H5: Multi-Canal es Next Upsell (Post Fase 2)
**Hipótesis:** Una vez resuelto WhatsApp + Esperan, Cumbres pedirá Instagram/Facebook Messenger/Web Chat en Q2-Q3 2025

**Sustento:**
- Cliente mencionó "ecosistema se expande" 
- Desarrolladoras generan leads en múltiples canales
- FIXU puede reutilizar motor conversacional

**Ticket estimado:** $1,500-2,500 por canal adicional

**Validación:** Preguntar en enero sobre canales actuales adquisición leads

---

### H6: Modelo Partner > SaaS (para casos Cumbres)
**Hipótesis:** Para clientes con >$50K revenue potential anual, modelo partner custom es más rentable que SaaS estándar

**Sustento:**
- Pricing preferencial aún genera margen alto (inferido)
- Customización permite cobrar más que SaaS commodity
- Relación larga genera upsells continuos

**Implicación:** No forzar migración SaaS para top 20% clientes, mantener modelo híbrido

---

## 10. PREGUNTAS ABIERTAS

### Sobre el cliente

**Operación:**
1. ¿Cuál es el volumen total de leads/mes de Cumbres? (Solo sabemos 53 citas, no total leads)
2. ¿Cuántos asesores tienen? ¿Especializados por zona o polivalentes?
3. ¿Qué % de citas agendadas se convierten en visitas efectivas? ¿Ventas?
4. ¿Dennis es único usuario interno o hay más personas usando sistema?

**Financiero:**
5. ¿Cuál fue el pricing exacto Fase 1? (Necesario para proyectar Fase 2)
6. ¿Cuál es el budget total marketing/ventas de Cumbres? (Contextualizar % que representa FIXU)
7. ¿Tienen aprobación presupuestal para Fase 2 o requiere comité?

**Estratégico:**
8. ¿Cuál es el rol exacto de Leonel? ¿Es decisor final?
9. ¿Qué features de Esperan usan? ¿Qué NO usan que deberían?
10. ¿Tienen otros proyectos inmobiliarios en pipeline 2025?

---

### Sobre la competencia

**Benchmarking:**
11. ¿Qué proveedor mencionan con "integración Esperan"? ¿Es competencia directa?
12. ¿Qué herramientas usan competidores de Cumbres (otras desarrolladoras)? ¿Alguna tiene IA?
13. ¿Esperan tiene partners tecnológicos oficiales? ¿Cómo se posiciona FIXU vs ellos?

---

### Sobre FIXU internamente

**Producto:**
14. ¿Cuál es el costo real de desarrollo integración Esperan? ¿Vale la pena vs construir CRM propio?
15. ¿Qué % del código Cumbres es reutilizable para próximo cliente inmobiliario?
16. ¿Dashboard espejo Drive-Chatwoot es feature custom o puede ser producto estándar?

**Comercial:**
17. ¿Pricing preferencial Cumbres está documentado? ¿Cuánto tiempo mantenerlo?
18. ¿Cuál es el LTV proyectado de Cumbres si se mantienen 24 meses?
19. ¿Qué otros clientes inmobiliarios están en pipeline que puedan replicar modelo Cumbres?

**Operacional:**
20. ¿Quién en FIXU da soporte día a día a Cumbres? ¿Es escalable?
21. ¿Entrenamientos de MIA son manuales? ¿Hay roadmap para automatizar?

---

### Sobre próximos pasos

**Táctico:**
22. ¿Qué exactamente debe "demostrar" FIXU en enero para ganar Fase 2? (KPIs específicos)
23. ¿Propuesta 5 enero incluye pricing cerrado o sigue siendo rango?
24. ¿Integración Esperan requiere POC técnico previo o FIXU ya validó factibilidad?

**Estratégico:**
25. Si Cumbres dice NO a Fase 2, ¿cuál es el plan de retención? ¿Oferta ajustada? ¿Descuento?
26. ¿FIXU tiene capacidad de delivery para Fase 2 en Q1 2025 o hay restricciones equipo?
27. ¿Caso de éxito Cumbres se puede usar comercialmente? ¿Testimonial, case study, demo?

---

## CONCLUSIONES Y RECOMENDACIONES

### Top 3 Insights
1. **Cumbres es cliente ancla ideal:** Early adopter, tolerante a iteración, pain points claros, pricing flexible, relación win-win
2. **Integración Esperan es make-or-break:** No es nice-to-have, es MUST para Fase 2 y retención largo plazo
3. **Data limpia obsesión = oportunidad producto:** Dashboard espejo Drive-Chatwoot es feature vendible a otros clientes

### Top 3 Acciones Inmediatas
1. **PRE 5 ENERO:** Validar factibilidad técnica integración Esperan (API disponible, rate limits, costos), no cotizar sin confirmar
2. **DICIEMBRE:** Definir 3-5 KPIs éxito enero con Giuseppe, trackear semanalmente, generar reporte automático fin mes
3. **PROPUESTA 5 ENERO:** Pricing modular Fase 2 (base + add-ons), cliente elige qué features incluir, evita sticker shock

### Top 3 Riesgos a Monitorear
1. **Competencia con integración Esperan nativa:** Investigar mercado, acelerar timeline
2. **Scope creep sin reprecio:** Documentar todo cambio, firmar addendums
3. **Dependencia Giuseppe:** Involucrar más stakeholders, crear relación con Leonel/Dennis

---

**FIN DEL ANÁLISIS**

---

## ANEXO: METODOLOGÍA

**Fuentes analizadas:**
- Flujo_Conversacional_Cumbres.txt (56 min reunión, 3 nov 2024)
- Cumbres_Fase_2.txt (27 min reunión, 17 dic 2024)

**Técnicas aplicadas:**
- Análisis conversacional (identificación dolores, objeciones, señales compra)
- Pattern matching cross-cliente (comparación con Enacorp, Galeón, Remax)
- Extracción de quotes textuales verbatim
- Inferencia de métricas no explicitadas
- Categorización dolor/oportunidad/riesgo

**Limitaciones:**
- No hay acceso a contratos, facturas, propuestas escritas
- Volumen total leads/mes no especificado
- Pricing Fase 1 no revelado explícitamente
- Algunas conversaciones pueden existir fuera de estos documentos

**Separación hechos vs hipótesis:**
- ✅ **HECHO:** Información textual directa de transcripciones
- 🔹 **INFERENCIA:** Conclusión lógica de múltiples datos
- ❓ **HIPÓTESIS:** Especulación fundamentada, requiere validación
