# Investigación: Scraping remax.pe para fotos en WhatsApp

## Problema
ANTHU 2.0 envía links de propiedades pero no puede enviar fotos directamente en WhatsApp. El usuario tiene que salir de WhatsApp para verlas. Esto reduce engagement y conversión.

## Objetivo
Obtener las URLs de las imágenes de cada propiedad desde remax.pe para enviarlas como mensaje de imagen en WhatsApp vía Meta API.

## Lo que ya sabemos

### URL pattern de las propiedades
```
https://www.remax.pe/v1/user/{email}/propiedad-{tipo}-en-{negocio}-{distrito}-{prov}-{depto}-{codigo}/
```
- Email: `{primer_nombre}{apellido_paterno}@remaxurus.pe`
- Esta URL ya se genera dinámicamente en `format_response_v2.js` y `format_response1_v2.js`

### Bloqueo detectado
- `curl` directo a remax.pe devuelve **403 Forbidden**
- El sitio requiere JavaScript rendering (probablemente React/Next.js)
- Las imágenes se cargan dinámicamente via JS

### Flujo ideal (si funciona el scraping)
1. `buscar_propiedades` devuelve datos + `url_propiedad`
2. Nuevo step: scraper recibe `url_propiedad` → extrae URLs de imágenes
3. ANTHU envía la primera imagen como media message vía Meta WhatsApp API
4. Luego envía el texto con datos + link

### Meta WhatsApp API para imágenes
```json
POST /v17.0/{phone_number_id}/messages
{
  "messaging_product": "whatsapp",
  "to": "{lead_phone}",
  "type": "image",
  "image": {
    "link": "https://url-publica-de-la-imagen.jpg",
    "caption": "Propiedad ABC1234 en Miraflores - S/ 350,000"
  }
}
```
- La imagen DEBE ser URL pública accesible (no base64)
- Si remax.pe bloquea hotlinking → necesitamos cachear la imagen

## Opciones técnicas a investigar

### Opción A: Headless browser (Puppeteer/Playwright)
- **Self-hosted** en el servidor de n8n de URUS
- Puppeteer navega a la URL, espera render, extrae `<img>` sources
- Costo: $0 (usa infraestructura existente)
- Riesgo: consume recursos del servidor, puede ser lento

### Opción B: Servicio de scraping externo
- **ScrapingBee**, **Browserless.io**, **ZenRows**
- API REST: envías URL, devuelve HTML renderizado
- Costo: $50-100/mes según volumen
- Ventaja: no consume recursos del servidor URUS

### Opción C: n8n node nativo
- n8n tiene nodos de HTTP Request con opción de headless browser?
- Investigar si existe algún community node para scraping con JS rendering

### Opción D: Remax.pe API interna
- Inspeccionar Network tab del browser al cargar una propiedad
- Probablemente remax.pe tiene una API interna (REST/GraphQL) que devuelve los datos incluyendo image URLs
- Si existe → se puede llamar directamente sin scraping
- **ESTA ES LA OPCIÓN IDEAL** — hay que investigarla primero

### Opción E: Google Sheets/Baserow como fuente de imágenes
- RE/MAX URUS ya sube propiedades a Google Sheets
- ¿Las fotos están en algún campo de Sheets o en Google Drive?
- Si sí → no necesitamos scraping en absoluto

## Preguntas a resolver

1. **¿remax.pe tiene API interna?** Inspeccionar network requests al cargar una propiedad
2. **¿Las imágenes están en CDN público?** Si sí, ¿se pueden hotlinkear o bloquean referer?
3. **¿Google Sheets de URUS tiene URLs de fotos?** Preguntar a Gonzalo/Jimena
4. **¿Cuántas propiedades activas tiene URUS?** Para estimar volumen de scraping
5. **¿El servidor de n8n aguanta Puppeteer?** RAM/CPU disponibles
6. **¿Meta acepta cualquier URL de imagen o requiere HTTPS + headers específicos?**

## Infraestructura existente relevante
- n8n URUS: `https://n8n.remaxurus.online`
- Chatwoot: `https://chatwoot.remaxurus.online`
- Baserow: base de datos de propiedades (sync desde Google Sheets)
- Meta WhatsApp Business API: ya configurada y funcionando
- Workflow `buscar_propiedades` (ID: `9VM9bmjWa5lJ43vJ`): ya genera `url_propiedad`
