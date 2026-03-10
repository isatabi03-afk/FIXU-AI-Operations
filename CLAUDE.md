# FIXU AI Operations — Instrucciones para Claude Code

## Tipo de proyecto
Base de conocimiento operativo de una agencia de IA conversacional. NO es un codebase — es documentación, SOPs, prompts, workflows y templates.

## Idioma
Todo el contenido debe estar en **español**. Comunicación con el usuario en español.

## Skills disponibles
- `/iterate-from-conversations` — Optimizar agente desde conversaciones reales (Chatwoot → análisis → ajustes quirúrgicos)
- `/service-delivery` — Proceso de entrega de solución a nuevo cliente
- `/prompt-engineering-patterns` — Patrones de ingeniería de prompts probados en producción

## Estructura
- `clientes/` — Un directorio por cliente con subdirectorios semánticos (discovery, prompts, workflows, data, reportes)
- `interno/` — Estrategia, procesos y documentación interna de FIXU AI
- `claude-skills/` — Skills ejecutables
- `templates/` — Master prompts reutilizables

## Reglas

1. **No exponer credenciales en outputs.** Los archivos contienen API keys, tokens y hostnames reales. Nunca incluirlos en respuestas al usuario ni en commits de repos públicos.
2. **Referenciar patrones existentes.** Antes de proponer algo nuevo, revisar cómo se resolvió en clientes existentes (especialmente remax-urus y cumbres-inmobiliaria).
3. **Cambios quirúrgicos, no reestructuración.** Los prompts y workflows están en producción con miles de leads/mes. Solo modificar lo estrictamente necesario.
4. **Documentar decisiones.** Cada cambio significativo debe quedar registrado en el README del cliente con razonamiento.
5. **Versionar prompts.** Siempre guardar versión anterior antes de modificar. Formato: `Prompt_[Agente]_[version].txt`.

## MCPs disponibles
- **n8n Urus:** `mcp__claude_ai_n8n_Urus__*` — Workflows de RE/MAX URUS
- **n8n Cumbres:** `mcp__claude_ai_n8n__*` — Workflows de Cumbres Inmobiliaria
- **n8n Alejandro:** `mcp__claude_ai_n8n_Alejandro__*` — Workflows de Alejandro Loayza
- **Notion:** `mcp__claude_ai_Notion__*` — Workspace de FIXU AI (pendiente reconexión a corporativo)

## Archivos clave por cliente

### RE/MAX URUS (el más maduro)
- `clientes/remax-urus/README.md` — Arquitectura completa (366 líneas)
- `clientes/remax-urus/prompts/current_prompt_live.txt` — Prompt activo v5.00
- `clientes/remax-urus/workflows/` — Scripts de deploy y backups de n8n

### Cumbres Inmobiliaria
- `clientes/cumbres-inmobiliaria/README.md` — Overview del proyecto
- `clientes/cumbres-inmobiliaria/arquitectura/Arquitectura_Fase2_Cumbres_v3.md` — Arquitectura técnica

### Alejandro Loayza
- `clientes/alejandro-loayza/README.md` — Overview del proyecto
- `clientes/alejandro-loayza/tools/` — Especificaciones de herramientas del agente
