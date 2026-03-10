# Skill: /service-delivery — Proceso estándar de entrega de solución

## Trigger
Cuando se dice `/service-delivery [cliente]` o al iniciar implementación de un nuevo cliente.

## Objetivo
Guiar el proceso completo de entrega de una solución FIXU AI, desde la evaluación técnica hasta la verificación post-deploy. Asegurar consistencia y calidad en cada entrega.

## Pasos

### 1. Evaluar composición técnica
Determinar qué componentes aplican para este cliente:

| Componente | Servicio | Obligatorio? |
|-----------|---------|-------------|
| Orquestación | n8n (self-hosted) | Sí |
| Gestión de conversaciones | Chatwoot | Sí |
| Canal principal | Meta WhatsApp Business API | Sí |
| LLM | OpenAI API | Sí |
| Base de datos | Supabase o Baserow | Sí (elegir uno) |
| Agendamiento | Cal.com | Opcional |
| Validación crediticia | Sentinel / Infocorp | Solo inmobiliario |
| Sync de datos | Google Sheets → DB | Según fuente del cliente |

### 2. Checklist pre-implementación

**Infraestructura:**
- [ ] Servidor n8n provisionado y accesible
- [ ] Chatwoot configurado con cuenta del cliente
- [ ] WhatsApp Business API conectada a Chatwoot
- [ ] Base de datos creada (tablas de leads y recursos del negocio)
- [ ] API keys de OpenAI configuradas
- [ ] Dominio/DNS del n8n del cliente resuelto

**Datos del negocio:**
- [ ] Catálogo de productos/propiedades/servicios importado a DB
- [ ] FAQs recopiladas y cargadas
- [ ] Datos de contacto del equipo humano (para derivaciones)
- [ ] Templates de WhatsApp aprobados en Meta Business Manager

**Documentación:**
- [ ] Discovery completado (transcripciones en `discovery/`)
- [ ] README del cliente creado siguiendo formato gold standard
- [ ] Flujo conversacional mapeado y aprobado por el cliente
- [ ] Prompt del agente versionado en `prompts/`

### 3. Configuración paso a paso

#### 3.1 — Prompt del agente
1. Usar template base: `templates/master-prompt-inmobiliaria.md` o `templates/master-prompt-atencion-cliente.md`
2. Personalizar placeholders con datos del cliente
3. Revisar con `/prompt-engineering-patterns` para asegurar calidad
4. Guardar como `prompts/Prompt_[Agente]_v1_00.txt` y `prompts/current_prompt_live.txt`

#### 3.2 — Workflows n8n
Workflows mínimos para cualquier solución:
1. **Agente principal** — Recibe mensaje de Chatwoot, procesa con LLM, responde
2. **buscar_[recurso]** — Consulta DB del negocio (propiedades, productos, servicios)
3. **registrar_lead** — Guarda datos del lead en DB
4. **derivar_humano** — Escala a persona real + notificación vía template WhatsApp
5. **FAQ** — Consulta base de conocimiento

**Referencia:** Ver `clientes/remax-urus/workflows/` para patrones probados.

#### 3.3 — Templates WhatsApp
Crear y aprobar en Meta Business Manager:
1. Template de derivación por DNI/validación
2. Template de derivación por quejas
3. Template genérico de derivación (fallback)
4. Template de notificación al equipo humano

### 4. Testing
**Conversaciones de prueba (mínimo 10 escenarios):**
- [ ] Saludo inicial → respuesta correcta
- [ ] Búsqueda por ID de producto/propiedad
- [ ] Búsqueda por criterios (zona, precio, tipo)
- [ ] Sin resultados → presenta alternativas
- [ ] Validación financiera (si aplica: contado vs crédito)
- [ ] Entrega de DNI → derivación correcta
- [ ] Resistencia a dar datos → manejo de fricción
- [ ] Queja → derivación automática
- [ ] Pregunta FAQ → respuesta correcta
- [ ] Mensaje fuera de scope → manejo adecuado

**Verificar en cada prueba:**
- El agente sigue la secuencia de PASOS
- No alucina datos
- Los links son reales (de la herramienta, no inventados)
- La derivación llega al equipo humano (verificar en WhatsApp)
- El lead se registra correctamente en la DB

### 5. Go-live checklist
- [ ] Todas las pruebas pasaron
- [ ] Cliente aprobó tono y flujo conversacional
- [ ] Templates de WhatsApp aprobados por Meta
- [ ] Workflow de derivación verificado end-to-end
- [ ] Equipo humano del cliente sabe cómo recibir derivaciones
- [ ] Monitoreo Chatwoot configurado (para supervisión post-launch)
- [ ] Backup local de todos los workflows (JSON en `workflows/`)

### 6. Documentación de entrega
Al finalizar, el directorio del cliente debe contener:

```
clientes/[cliente]/
├── README.md              Arquitectura completa (seguir formato remax-urus)
├── discovery/             Transcripciones de reuniones
├── prompts/
│   ├── current_prompt_live.txt    Prompt activo
│   └── Prompt_[Agente]_v1_00.txt  Primera versión
├── workflows/
│   ├── [workflow_backup].json     Backups de n8n
│   └── [deploy_scripts].js        Scripts de deploy (si aplica)
├── data/                  Exports de datos
└── reportes/              Feedback y reportes
```

## Patrón de referencia
- **Gold standard de README:** `clientes/remax-urus/README.md` (366 líneas, cubre actores, arquitectura, flujos, decisiones, historia, modelo comercial)
- **Herramientas más avanzadas:** `clientes/alejandro-loayza/tools/` (4 specs JSON de herramientas)
- **Arquitectura más detallada:** `clientes/cumbres-inmobiliaria/arquitectura/Arquitectura_Fase2_Cumbres_v3.md`

## Reglas
- SIEMPRE crear README del cliente antes de implementar
- SIEMPRE documentar decisiones técnicas con razonamiento (ver tabla de decisiones en remax-urus README)
- SIEMPRE versionar prompts antes de modificar
- No avanzar a go-live sin aprobación explícita del cliente
- Usar patrones existentes de clientes anteriores — no reinventar
- Backup de todo workflow antes de modificar (JSON local)
