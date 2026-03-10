# FIXU AI — Base de Conocimiento Operativo

Repositorio central de SOPs, workflows, prompts, skills y templates de **FIXU AI**, agencia especializada en soluciones de IA conversacional para atención al cliente.

---

## Estructura del repositorio

```
├── clientes/                  Documentación por cliente activo
│   ├── remax-urus/            RE/MAX URUS — ANTHU 2.0 (WhatsApp, inmobiliario)
│   ├── cumbres-inmobiliaria/  Cumbres — MIA (WhatsApp, desarrolladora inmobiliaria)
│   └── alejandro-loayza/      Alejandro Loayza — RomyBot (nutrición)
├── interno/                   Documentación interna de FIXU AI
│   ├── estrategia/            ICP, scoring, posicionamiento, pipeline
│   ├── discovery-calls/       Transcripciones de discovery con prospects
│   ├── procesos/              SOPs internos (onboarding, delivery)
│   └── comercial/             Propuestas, reportes, cotizaciones
├── claude-skills/             Skills ejecutables con Claude Code (/skill)
├── templates/                 Master prompts reutilizables
├── CLAUDE.md                  Instrucciones para Claude Code
└── README.md                  Este archivo
```

---

## Clientes activos

| Cliente | Producto | Canal | Stack principal |
|---------|----------|-------|-----------------|
| [RE/MAX URUS](clientes/remax-urus/README.md) | ANTHU 2.0 | WhatsApp | n8n + Chatwoot + Baserow + OpenAI |
| [Cumbres Inmobiliaria](clientes/cumbres-inmobiliaria/README.md) | MIA | WhatsApp | n8n + Chatwoot + Supabase + OpenAI |
| [Alejandro Loayza](clientes/alejandro-loayza/README.md) | RomyBot | WhatsApp | n8n + Chatwoot + OpenAI |

---

## Stack transversal

Todas las soluciones comparten esta base tecnológica:

- **Orquestación:** n8n (self-hosted por cliente)
- **Gestión de conversaciones:** Chatwoot
- **Canal:** Meta WhatsApp Business API
- **LLM:** OpenAI API
- **Base de datos:** Supabase o Baserow (según cliente)
- **Agendamiento:** Cal.com (en implementación)

---

## Skills de Claude Code

Skills ejecutables con `/skill-name` desde Claude Code:

| Skill | Trigger | Descripción |
|-------|---------|-------------|
| [iterate-from-conversations](claude-skills/iterate-from-conversations.md) | `/iterate-from-conversations` | Optimizar agente desde conversaciones reales |
| [service-delivery](claude-skills/service-delivery.md) | `/service-delivery` | Proceso estándar de entrega de solución |
| [prompt-engineering-patterns](claude-skills/prompt-engineering-patterns.md) | `/prompt-engineering-patterns` | Patrones probados de ingeniería de prompts |

---

## Templates

| Template | Descripción |
|----------|-------------|
| [Master Prompt Inmobiliaria](templates/master-prompt-inmobiliaria.md) | Esqueleto reutilizable para agentes IA inmobiliarios |
| [Master Prompt Atención al Cliente](templates/master-prompt-atencion-cliente.md) | Esqueleto universal para agentes IA de atención al cliente |

---

## Cómo agregar un nuevo cliente

1. Crear carpeta en `clientes/` con nombre en kebab-case: `clientes/nuevo-cliente/`
2. Crear `README.md` siguiendo el formato de [remax-urus](clientes/remax-urus/README.md) (gold standard)
3. Organizar archivos en subdirectorios semánticos:
   - `discovery/` — Transcripciones de reuniones
   - `prompts/` — Versiones del prompt del agente
   - `workflows/` — JSONs de n8n y scripts de deploy
   - `data/` — Exports de datos (CSV, XLSX)
   - `reportes/` — PDFs y documentos ejecutivos
   - `tools/` — Especificaciones de herramientas (JSON)
4. Documentar la arquitectura completa en el README antes de implementar

---

*Repositorio privado de FIXU AI — No compartir fuera del equipo.*
