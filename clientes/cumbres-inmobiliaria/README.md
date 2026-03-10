{
  "name": "derivar_humano",
  "nodes": [
    {
      "parameters": {
        "workflowInputs": {
          "values": [
            {
              "name": "session_id"
            },
            {
              "name": "nombres"
            },
            {
              "name": "apellidos"
            },
            {
              "name": "numero_lead"
            },
            {
              "name": "asesor_asignado"
            },
            {
              "name": "id_chatwoot"
            },
            {
              "name": "proyecto"
            },
            {
              "name": "motivo_derivaciÃ³n"
            },
            {
              "name": "tipo_cliente"
            },
            {
              "name": "nombre_wp"
            },
            {
              "name": "DNI"
            },
            {
              "name": "conversation_id"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.executeWorkflowTrigger",
      "typeVersion": 1.1,
      "position": [
        -784,
        -48
      ],
      "id": "bfed8e6a-dd89-4b50-b683-4b870f769648",
      "name": "When Executed by Another Workflow"
    },
    {
      "parameters": {
        "operation": "get",
        "tableId": "asesores_cumbres",
        "filters": {
          "conditions": [
            {
              "keyName": "nombre",
              "keyValue": "={{ $json.asesor_asignado }}"
            }
          ]
        }
      },
      "id": "97dcac3f-d822-4b51-a99e-763b0fb7ed71",
      "name": "Informacion Asesor",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -128,
        -32
      ],
      "alwaysOutputData": true,
      "credentials": {
        "supabaseApi": {
          "id": "RXRdnxmJBoq8i2Pc",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://app-chatwoot.cumbres.space/api/v1/accounts/1/conversations/{{ $('When Executed by Another Workflow').item.json.id_chatwoot }}/custom_attributes",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "6xFD9JcofwnJJpW6s2DXKsVt"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"custom_attributes\": {\n    \"bot\": \"off\"\n  }\n}\n ",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        432,
        -48
      ],
      "id": "cc5da349-c1ff-49d3-a5ec-1aef8c2bec41",
      "name": "bot_off"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://app-chatwoot.cumbres.space//api/v1/accounts/1/conversations/{{ $('When Executed by Another Workflow').item.json.id_chatwoot }}/labels",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "api_access_token",
              "value": "6xFD9JcofwnJJpW6s2DXKsVt"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"labels\": [\n    \"saludo\",\n    \"registrado\",\n    \"solicito_atenciÃ³n\",\n    \"{{ \n      (() => {\n        const name = $('When Executed by Another Workflow').first().json.proyecto?.toLowerCase().trim();\n        const MAP = {\n          'villa monumental a': 'villa_monumental',\n          'villanova 5': 'villanova_5',\n          'andalucÃ­a': 'andalucia',\n          'andalucia': 'andalucia',\n          'villa del puerto 1': 'villa_del_puerto',\n          'villa del puerto': 'villa_del_puerto'\n        };\n        if (MAP[name]) return MAP[name];\n        return name\n          ?.normalize('NFD')\n          .replace(/[\\u0300-\\u036f]/g, '')\n          .replace(/\\s+/g, '_')\n          .replace(/[^a-z0-9_]/g, '')\n          .replace(/_a$/, '');\n      })() \n    }}\"\n  ]\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        240,
        -48
      ],
      "id": "204cf044-8344-4502-97e8-273168e5c943",
      "name": "solicito_atenciÃ³n"
    },
    {
      "parameters": {
        "operation": "update",
        "tableId": "cumbres_clientes",
        "filters": {
          "conditions": [
            {
              "keyName": "session_id",
              "condition": "eq",
              "keyValue": "={{ $('When Executed by Another Workflow').item.json.session_id }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "estado_cliente",
              "fieldValue": "solicito_atenciÃ³n"
            },
            {
              "fieldId": "proyect",
              "fieldValue": "={{ $('Cliente').item.json.proyect }}"
            }
          ]
        }
      },
      "id": "77aabd75-30e3-42b8-92cf-ac3ee19247e9",
      "name": "Actualizar Estado",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        64,
        -48
      ],
      "alwaysOutputData": true,
      "credentials": {
        "supabaseApi": {
          "id": "RXRdnxmJBoq8i2Pc",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "mode": "raw",
        "jsonOutput": "{\n  \"mensaje_agente\": \"âœ… Se ha derivado correctamente a su asesor! ðŸŽ‰ Le hemos notificado, Ã©l se pondrÃ¡ en contacto contigo para coordinar los detalles. Gracias por confiar en Cumbres ðŸ¡. Mi atenciÃ³n por el momento ha culminado, te deseo lo mejor enocontrando el hogar de tus sueÃ±os!\"\n}\n",
        "options": {}
      },
      "id": "74c8e670-cb61-4827-8070-f84c0201fd7c",
      "name": "Respuesta DerivaciÃ³n",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        800,
        -48
      ]
    },
    {
      "parameters": {
        "content": "## Derivar Humano\nEscala la conversaciÃ³n del bot al asesor humano cuando el cliente necesita atenciÃ³n personalizada o MIA no puede resolver su consulta.\n\nMIA se despide â†’ Asesor recibe alerta â†’ Asesor continÃºa manualmente",
        "height": 352,
        "width": 1760
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -832,
        -208
      ],
      "id": "d1f85201-7e04-4184-ad2f-37eea4c0b3d5",
      "name": "Sticky Note"
    },
    {
      "parameters": {
        "content": "## FLUJO COMPLETO:\n### 1. MIA detecta que debe derivar (pregunta compleja, horario no disponible, etc.)\n### 2. Llama a esta herramienta con datos del cliente y motivo\n### 3. Se busca la informaciÃ³n del asesor asignado\n### 4. Se actualiza el estado del lead a \"solicitÃ³_atenciÃ³n\"\n### 5. Se etiqueta la conversaciÃ³n en Chatwoot\n### 6. Se DESACTIVA el bot (bot_off) en esa conversaciÃ³n\n### 7. Se envÃ­a alerta al asesor por WhatsApp con datos del cliente\n### 8. MIA confirma la derivaciÃ³n y se despide del cliente",
        "height": 288,
        "width": 1312,
        "color": 7
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -656,
        176
      ],
      "id": "e0647dac-3a91-41cb-90a7-a34b58272f7f",
      "name": "Sticky Note1"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "=https://graph.facebook.com/v22.0/877665025420262/messages",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Content-Type",
              "value": "application/json"
            },
            {
              "name": "Authorization",
              "value": "Bearer EAARRtQp8ZACgBPuv9671unD9ZCdChR1SbP8yyEqEJHu1d9IIcnF4P1bm53CZCjH0RDS9I8aWGInSqJdWwYBmh6P4HjUhbQ3AuJy3bE4cw9qASlMGZCZBtMZBkgaBEVYxtrJsss2gqGdSX9ZB9PQmlFXwUMfzh8CGt05FntnSHnMqO5ZCeA4V9X0tfYYDw4zIpwZDZD"
            }
          ]
        },
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n  \"messaging_product\": \"whatsapp\",\n  \"to\": \"{{ $('Informacion Asesor').first().json.celular || $('Cliente').first().json.asesor_celular }}\",\n  \"type\": \"template\",\n  \"template\": {\n    \"name\": \"cumbres_alerta_asesor_atencion\",\n    \"language\": {\n      \"code\": \"es_PE\"\n    },\n    \"components\": [\n      {\n        \"type\": \"body\",\n        \"parameters\": [\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ($('Informacion Asesor').first().json.nombre || $('Cliente').first().json.asesor_asignado || '').trim() || 'No mencionÃ³' }}\"\n          },\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ($('Cliente').first().json.nombres || $('When Executed by Another Workflow').first().json.nombres || '').trim() || 'No mencionÃ³' }}\"\n          },\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ($('Cliente').first().json.dni_ce || $('When Executed by Another Workflow').first().json.DNI || $('When Executed by Another Workflow').first().json.dni_ce || '').toString().trim() || 'No mencionÃ³' }}\"\n          },\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ($('Cliente').first().json.numero || $('When Executed by Another Workflow').first().json.numero_lead || $('When Executed by Another Workflow').first().json.numero || '').toString().trim() || 'No mencionÃ³' }}\"\n          },\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ($('Cliente').first().json.proyect || $('Cliente').first().json.project || $('When Executed by Another Workflow').first().json.proyecto || $('When Executed by Another Workflow').first().json.project || '').toString().trim() || 'No mencionÃ³' }}\"\n          },\n          {\n            \"type\": \"text\",\n            \"text\": \"{{ ( ($('When Executed by Another Workflow').first().json['motivo_derivaciÃ³n'] || $('When Executed by Another Workflow').first().json.motivo_derivacion || $('When Executed by Another Workflow').first().json['motivo_derivacion'] || $('When Executed by Another Workflow').first().json.motivo_derivacion_text || '').toString().trim() ) || 'No mencionÃ³' }}\"\n          }\n        ]\n      }\n    ]\n  }\n}\n",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        608,
        -48
      ],
      "id": "c0488267-b034-423d-803f-1a244ab5dd16",
      "name": "derivar_asesor",
      "alwaysOutputData": true,
      "retryOnFail": true
    },
    {
      "parameters": {
        "operation": "get",
        "tableId": "cumbres_clientes",
        "filters": {
          "conditions": [
            {
              "keyName": "session_id",
              "keyValue": "={{ $json.numero_lead }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -592,
        -48
      ],
      "id": "164dc8ec-dd24-40ad-b5a6-a0e9e3610b73",
      "name": "Cliente",
      "credentials": {
        "supabaseApi": {
          "id": "RXRdnxmJBoq8i2Pc",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "83d32479-6462-403f-b7db-0f77dacac27b",
              "leftValue": "={{ $json.proyect }}",
              "rightValue": "Villa Verde 3",
              "operator": {
                "type": "string",
                "operation": "equals"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -384,
        -48
      ],
      "id": "30a0f8b2-64ec-48a6-a653-6aa63980daad",
      "name": "If"
    }
  ],
  "pinData": {
    "When Executed by Another Workflow": [
      {
        "json": {
          "session_id": "+393493916512",
          "numero_lead": "+393493916512",
          "id_chatwoot": "3010",
          "motivo_derivaciÃ³n": "Lead interesado solo en Arequipa; Villa Verde 3 estÃ¡ agotado y requiere atenciÃ³n de asesor especializado en Arequipa.",
          "tipo_cliente": "comprador",
          "nombre_wp": "Mayra Moscoso Revilla ðŸ™‰ðŸ™ˆðŸ™Š",
          "conversation_id": null
        }
      }
    ]
  },
  "connections": {
    "bot_off": {
      "main": [
        [
          {
            "node": "derivar_asesor",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "When Executed by Another Workflow": {
      "main": [
        [
          {
            "node": "Cliente",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Informacion Asesor": {
      "main": [
        [
          {
            "node": "Actualizar Estado",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "solicito_atenciÃ³n": {
      "main": [
        [
          {
            "node": "bot_off",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Actualizar Estado": {
      "main": [
        [
          {
            "node": "solicito_atenciÃ³n",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "derivar_asesor": {
      "main": [
        [
          {
            "node": "Respuesta DerivaciÃ³n",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Cliente": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [],
        [
          {
            "node": "Informacion Asesor",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "474076a1-fb5b-41ec-a64a-904ea0627aae",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "a1482c693993e2c65a8d1b24a48eaf225c151d7521bd59633885d334e8df5f40"
  },
  "id": "45xI16pRWX9g8dUK",
  "tags": []
}