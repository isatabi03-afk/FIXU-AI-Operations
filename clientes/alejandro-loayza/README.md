{
  "name": "meal_logger_tool",
  "nodes": [
    {
      "parameters": {
        "workflowInputs": {
          "values": [
            {
              "name": "phone"
            },
            {
              "name": "patient_dni"
            },
            {
              "name": "current_plan"
            },
            {
              "name": "meal_analysis"
            },
            {
              "name": "user_text"
            },
            {
              "name": "context_date"
            },
            {
              "name": "timezone"
            },
            {
              "name": "conversation_id"
            },
            {
              "name": "image_analysis_json"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.executeWorkflowTrigger",
      "typeVersion": 1.1,
      "position": [
        -2080,
        176
      ],
      "id": "8300c48a-2aec-4de0-ae84-56da4ac6d850",
      "name": "When Executed by Another Workflow"
    },
    {
      "parameters": {
        "jsCode": "// validate_inputs.js\n\nfunction safeParseJson(maybeValue, fallback = null) {\n  if (!maybeValue) return fallback;\n  if (typeof maybeValue === 'object') return maybeValue;\n  try {\n    return JSON.parse(maybeValue);\n  } catch (e) {\n    return fallback;\n  }\n}\n\nreturn items.map((item) => {\n  const input = item.json;\n  \n  // Parse inputs\n  const mealAnalysis = safeParseJson(input.meal_analysis);\n  const currentPlan = safeParseJson(input.current_plan);\n  \n  // ValidaciÃ³n crÃ­tica\n  if (!mealAnalysis) {\n    throw new Error(\"meal_analysis no es JSON vÃ¡lido\");\n  }\n  \n  // Verificar que la acciÃ³n sea LOG_MEAL\n  const action = mealAnalysis?.accion_recomendada?.accion || \n                 mealAnalysis?.recommended_action?.action || \n                 mealAnalysis?.action || \n                 \"\";\n  \n  if (action !== \"LOG_MEAL\") {\n    return {\n      json: {\n        should_skip: true,\n        skip_reason: `AcciÃ³n no es LOG_MEAL. AcciÃ³n recibida: ${action}`,\n        response: \"No se registrÃ³ la comida porque no cumple los criterios de validaciÃ³n.\"\n      }\n    };\n  }\n  \n  // Extraer targets del plan\n  const targets = currentPlan?.targets || {};\n  const kcalTarget = targets.kcal || 0;\n  const proteinTarget = targets.protein_g || 0;\n  const carbsTarget = targets.carbs_g || 0;\n  const fatTarget = targets.fat_g || 0;\n  \n  // Extraer macros de la comida analizada\n  const trackerData = mealAnalysis?.datos_para_tracker || \n                       mealAnalysis?.tracker_data || {};\n  \n  const mealKcal = parseFloat(trackerData.kcal) || 0;\n  const mealProtein = parseFloat(trackerData.proteina_g || trackerData.protein_g) || 0;\n  const mealCarbs = parseFloat(trackerData.carbohidratos_g || trackerData.carbs_g) || 0;\n  const mealFat = parseFloat(trackerData.grasas_g || trackerData.fat_g) || 0;\n  \n  // Detectar meal_time\n  const detectedMeal = mealAnalysis?.resumen_para_rommy?.comida_detectada || \n                       mealAnalysis?.summary?.detected_meal ||\n                       \"unknown\";\n  \n  return {\n    json: {\n      ...input,\n      should_skip: false,\n      \n      // Datos validados\n      meal_analysis_parsed: mealAnalysis,\n      current_plan_parsed: currentPlan,\n      \n      // Targets\n      targets: {\n        kcal: kcalTarget,\n        protein_g: proteinTarget,\n        carbs_g: carbsTarget,\n        fat_g: fatTarget\n      },\n      \n      // Nueva comida a registrar\n      new_meal: {\n        meal_time: detectedMeal,\n        kcal: mealKcal,\n        protein_g: mealProtein,\n        carbs_g: mealCarbs,\n        fat_g: mealFat\n      }\n    }\n  };\n});"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1872,
        176
      ],
      "id": "3826d85d-8777-4138-a82a-753caf35e323",
      "name": "validate_inputs"
    },
    {
      "parameters": {
        "operation": "get",
        "tableId": "daily_tracker",
        "filters": {
          "conditions": [
            {
              "keyName": "phone",
              "keyValue": "={{ $json.phone }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -1440,
        48
      ],
      "id": "c19802d2-b3f0-4cb2-bb41-3f283eb57839",
      "name": "get_daily_tracker",
      "alwaysOutputData": true,
      "credentials": {
        "supabaseApi": {
          "id": "4i5ZPTohzab8RTGH",
          "name": "Supabase Self-hosted"
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
              "id": "de62438f-7df1-440a-99ba-c575c8ef1e61",
              "leftValue": "={{ $json.should_skip }}",
              "rightValue": "",
              "operator": {
                "type": "boolean",
                "operation": "false",
                "singleValue": true
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
        -1664,
        176
      ],
      "id": "f415d211-f1d9-4108-aeaa-fbe87f0bad55",
      "name": "should_skip?"
    },
    {
      "parameters": {
        "jsCode": "const trackerRecords = $input.all().flatMap(item => item.json.data || []);\nconst validatedData = $('validate_inputs').first().json;\n\n// Sumar lo ya registrado en el dÃ­a\nlet totalKcal = 0;\nlet totalProtein = 0;\nlet totalCarbs = 0;\nlet totalFat = 0;\n\nfor (const record of trackerRecords) {\n  totalKcal += parseFloat(record.kcal) || 0;\n  totalProtein += parseFloat(record.protein_g) || 0;\n  totalCarbs += parseFloat(record.carbs_g) || 0;\n  totalFat += parseFloat(record.fat_g) || 0;\n}\n\n// Agregar la nueva comida\nconst newMeal = validatedData.new_meal;\ntotalKcal += newMeal.kcal;\ntotalProtein += newMeal.protein_g;\ntotalCarbs += newMeal.carbs_g;\ntotalFat += newMeal.fat_g;\n\n// Calcular restante\nconst targets = validatedData.targets;\nconst remaining = {\n  kcal: Math.max(0, targets.kcal - totalKcal),\n  protein_g: Math.max(0, targets.protein_g - totalProtein),\n  carbs_g: Math.max(0, targets.carbs_g - totalCarbs),\n  fat_g: Math.max(0, targets.fat_g - totalFat)\n};\n\n// Calcular porcentaje consumido\nconst percentConsumed = {\n  kcal: targets.kcal > 0 ? Math.round((totalKcal / targets.kcal) * 100) : 0,\n  protein: targets.protein_g > 0 ? Math.round((totalProtein / targets.protein_g) * 100) : 0,\n  carbs: targets.carbs_g > 0 ? Math.round((totalCarbs / targets.carbs_g) * 100) : 0,\n  fat: targets.fat_g > 0 ? Math.round((totalFat / targets.fat_g) * 100) : 0\n};\n\nreturn [{\n  json: {\n    ...validatedData,\n    \n    // Totales acumulados (incluyendo nueva comida)\n    total_consumed: {\n      kcal: Math.round(totalKcal),\n      protein_g: Math.round(totalProtein),\n      carbs_g: Math.round(totalCarbs),\n      fat_g: Math.round(totalFat)\n    },\n    \n    // Restante del dÃ­a\n    remaining,\n    \n    // Porcentajes\n    percent_consumed: percentConsumed,\n    \n    // Metadata\n    meals_today: trackerRecords.length + 1, // +1 por la nueva\n    previous_meals: trackerRecords.map(r => ({\n      meal_time: r.meal_time,\n      kcal: r.kcal,\n      description: r.meal_description\n    }))\n  }\n}];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1232,
        48
      ],
      "id": "b777bbc3-de9a-4cf6-bb45-3fe036ee51a8",
      "name": "calculate_totals"
    },
    {
      "parameters": {
        "operation": "update",
        "tableId": "daily_tracker",
        "filters": {
          "conditions": [
            {
              "keyName": "phone",
              "condition": "eq",
              "keyValue": "={{ $('validate_inputs').first().json.phone }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "patient_dni",
              "fieldValue": "={{ $('validate_inputs').first().json.patient_dni }}"
            },
            {
              "fieldId": "tracker_date",
              "fieldValue": "={{ DateTime.fromISO($now.toISO(), { zone: \"utc\" }).toLocal().toFormat(\"yyyy-MM-dd:HH:mm:ss\") }}"
            },
            {
              "fieldId": "meal_time",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.meal_time }}"
            },
            {
              "fieldId": "meal_description",
              "fieldValue": "={{ $json.meal_description }}"
            },
            {
              "fieldId": "kcal",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.kcal }}"
            },
            {
              "fieldId": "protein_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.protein_g }}"
            },
            {
              "fieldId": "carbs_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.carbs_g }}"
            },
            {
              "fieldId": "fat_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.fat_g }}"
            },
            {
              "fieldId": "conversation_id",
              "fieldValue": "={{ $('validate_inputs').first().json.conversation_id }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        0,
        0
      ],
      "id": "50ca024d-a62a-4cb8-a71a-a280811ceba3",
      "name": "save_data",
      "credentials": {
        "supabaseApi": {
          "id": "4i5ZPTohzab8RTGH",
          "name": "Supabase Self-hosted"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// format_response.js\n\nconst formattedData = $('format_ai_response').first().json;\nconst calculatedData = $('calculate_totals').first().json;\n\nconst response = {\n  status: \"success\",\n  message: formattedData.summary_for_patient,\n  \n  // Data para uso interno de Rommy (si necesita contexto)\n  tracker_summary: {\n    meal_registered: {\n      meal_time: calculatedData.new_meal.meal_time,\n      description: formattedData.meal_description,\n      macros: calculatedData.new_meal\n    },\n    \n    daily_totals: {\n      consumed: calculatedData.total_consumed,\n      remaining: calculatedData.remaining,\n      percent_consumed: calculatedData.percent_consumed\n    },\n    \n    meals_count: calculatedData.meals_today\n  }\n};\n\nreturn [{ json: response }];"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -464,
        48
      ],
      "id": "c8e18ce6-5673-485d-9b96-633e15aeedae",
      "name": "format_response"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "d65c4c20-54ab-4601-ac41-d86f5db9ca7a",
              "name": "skip_response",
              "value": "={{ $json.skip_reason }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -1456,
        272
      ],
      "id": "d8b156b2-13cf-4dea-9124-b163674b1b28",
      "name": "response"
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
              "id": "73ebd30d-f49b-4bd4-834e-44ade36b2be2",
              "leftValue": "={{ $('get_daily_tracker').first().json }}",
              "rightValue": "",
              "operator": {
                "type": "object",
                "operation": "notEmpty",
                "singleValue": true
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
        -272,
        48
      ],
      "id": "19d5ab58-dfc4-40ca-b64c-02c2ce11634d",
      "name": "exists_user?"
    },
    {
      "parameters": {
        "tableId": "daily_tracker",
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "patient_dni",
              "fieldValue": "={{ $('validate_inputs').first().json.patient_dni }}"
            },
            {
              "fieldId": "tracker_date",
              "fieldValue": "={{ DateTime.fromISO($now.toISO(), { zone: \"utc\" }).toLocal().toFormat(\"yyyy-MM-dd:HH:mm:ss\") }}"
            },
            {
              "fieldId": "meal_time",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.meal_time }}"
            },
            {
              "fieldId": "meal_description",
              "fieldValue": "={{ $('format_ai_response').first().json.meal_description }}"
            },
            {
              "fieldId": "kcal",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.kcal }}"
            },
            {
              "fieldId": "protein_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.protein_g }}"
            },
            {
              "fieldId": "carbs_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.carbs_g }}"
            },
            {
              "fieldId": "fat_g",
              "fieldValue": "={{ $('validate_inputs').first().json.new_meal.fat_g }}"
            },
            {
              "fieldId": "conversation_id",
              "fieldValue": "={{ $('validate_inputs').first().json.conversation_id }}"
            },
            {
              "fieldId": "phone",
              "fieldValue": "={{ $('validate_inputs').first().json.phone }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        0,
        176
      ],
      "id": "9ac3415e-78ca-44c6-8cc2-f3ff7d7733ca",
      "name": "register_data",
      "credentials": {
        "supabaseApi": {
          "id": "4i5ZPTohzab8RTGH",
          "name": "Supabase Self-hosted"
        }
      }
    },
    {
      "parameters": {
        "modelId": {
          "__rl": true,
          "value": "gpt-5-mini",
          "mode": "list",
          "cachedResultName": "GPT-5-MINI"
        },
        "responses": {
          "values": [
            {
              "content": "=## COMIDA A REGISTRAR\n\nTexto del paciente: {{ $json.user_text }}\n\nComida analizada:\n{{ JSON.stringify($json.meal_analysis_parsed?.resumen_para_rommy || {}) }}\n\nMacros de esta comida:\n- Kcal: {{ $json.new_meal.kcal }}\n- ProteÃ­nas: {{ $json.new_meal.protein_g }}g\n- Carbohidratos: {{ $json.new_meal.carbs_g }}g\n- Grasas: {{ $json.new_meal.fat_g }}g\n\n## ESTADO DEL DÃA\n\nTotal consumido (incluyendo esta comida):\n- Kcal: {{ $json.total_consumed.kcal }} / {{ $json.targets.kcal }}\n- ProteÃ­nas: {{ $json.total_consumed.protein_g }}g / {{ $json.targets.protein_g }}g\n- Carbohidratos: {{ $json.total_consumed.carbs_g }}g / {{ $json.targets.carbs_g }}g\n- Grasas: {{ $json.total_consumed.fat_g }}g / {{ $json.targets.fat_g }}g\n\nRestante:\n- Kcal: {{ $json.remaining.kcal }}\n- ProteÃ­nas: {{ $json.remaining.protein_g }}g\n- Carbohidratos: {{ $json.remaining.carbs_g }}g\n- Grasas: {{ $json.remaining.fat_g }}g\n\nComidas previas hoy: {{ $json.meals_today - 1 }}"
            },
            {
              "role": "system",
              "content": "=# ROL\n\nEres un asistente que formatea entradas de tracker nutricional de forma humanizada y clara.\n\n# TAREA\n\nGenerar DOS textos:\n1. `meal_description`: DescripciÃ³n humanizada de la comida para registrar en BD (mÃ¡x 150 caracteres)\n2. `summary_for_patient`: Resumen del dÃ­a para mostrar al paciente (incluye totales y restante)\n\n# INPUT\n\nRecibirÃ¡s:\n- Comida analizada (ingredientes, porciones)\n- Texto original del paciente\n- Totales consumidos del dÃ­a\n- Targets del plan\n- Restante del dÃ­a\n\n# FORMATO DE SALIDA (JSON)\n\n{\n  \"meal_description\": \"DescripciÃ³n breve y natural de la comida registrada\",\n  \"summary_for_patient\": \"Resumen completo para el paciente con totales y restante\"\n}\n\n# REGLAS\n\n- `meal_description` mÃ¡ximo 150 caracteres, debe ser claro y especÃ­fico\n- `summary_for_patient` debe incluir:\n  * ConfirmaciÃ³n de registro\n  * Total consumido del dÃ­a\n  * Restante hasta completar targets\n  * Tono motivacional y empÃ¡tico\n- NO uses markdown, solo texto plano\n- SÃ© conciso y directo"
            }
          ]
        },
        "builtInTools": {},
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.openAi",
      "typeVersion": 2,
      "position": [
        -1056,
        48
      ],
      "id": "d9e5c862-69f7-4c6f-987d-e584853892f2",
      "name": "format_tracker_entry",
      "credentials": {
        "openAiApi": {
          "id": "LIjLWhC0Dh7UhHwu",
          "name": "OPEN AI Fixu Test"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// n8n Code node (JavaScript) â€” parse_ai_json_from_text\n// Objetivo: tomar la response estilo OpenAI (output[0].content[0].text)\n// y devolver cada campo del JSON embebido como propiedades separadas.\n//\n// Output esperado (ejemplo):\n// {\n//   meal_description: \"...\",\n//   summary_for_patient: \"...\",\n//   _raw_text: \"...\",\n//   _raw_json_text: \"{...}\",\n//   _parse_ok: true\n// }\n\nfunction normalizeNewlines(s) {\n  return (s ?? \"\").toString().replace(/\\r\\n/g, \"\\n\").replace(/\\r/g, \"\\n\");\n}\n\nfunction stripCodeFences(text) {\n  const t = normalizeNewlines(text).trim();\n  const m = t.match(/^```(?:json)?\\s*\\n([\\s\\S]*?)\\n```$/i);\n  return m ? m[1].trim() : t;\n}\n\n/**\n * Extrae texto del output tÃ­pico (OpenAI / LLM chain / etc.)\n */\nfunction extractAnalyzerText(input) {\n  const candidates = [\n    input?.output?.[0]?.content?.[0]?.text,\n    input?.output?.[0]?.text,\n    input?.content?.[0]?.text,\n    input?.text,\n    input?.message,\n  ];\n\n  for (const c of candidates) {\n    if (typeof c === \"string\" && c.trim()) return c;\n  }\n\n  if (Array.isArray(input?.output)) {\n    for (const out of input.output) {\n      const t = out?.content?.[0]?.text;\n      if (typeof t === \"string\" && t.trim()) return t;\n    }\n  }\n\n  return \"\";\n}\n\n/**\n * Extrae primer JSON substring (obj/array) desde texto con basura alrededor.\n * Balanceo bÃ¡sico respetando strings.\n */\nfunction extractFirstJsonSubstring(raw) {\n  const s = stripCodeFences(raw);\n  if (!s) return null;\n\n  const starts = [];\n  for (let i = 0; i < s.length; i++) {\n    const c = s[i];\n    if (c === \"{\" || c === \"[\") starts.push(i);\n  }\n  if (!starts.length) return null;\n\n  const tryFrom = (startIdx) => {\n    const open = s[startIdx];\n    const close = open === \"{\" ? \"}\" : \"]\";\n    let depth = 0;\n    let inStr = false;\n    let esc = false;\n\n    for (let i = startIdx; i < s.length; i++) {\n      const ch = s[i];\n\n      if (inStr) {\n        if (esc) esc = false;\n        else if (ch === \"\\\\\") esc = true;\n        else if (ch === \"\\\"\") inStr = false;\n        continue;\n      }\n\n      if (ch === \"\\\"\") {\n        inStr = true;\n        continue;\n      }\n\n      if (ch === open) depth++;\n      if (ch === close) depth--;\n\n      if (depth === 0) return s.slice(startIdx, i + 1).trim();\n    }\n    return null;\n  };\n\n  for (const idx of starts) {\n    const candidate = tryFrom(idx);\n    if (!candidate) continue;\n    if (\n      (candidate.startsWith(\"{\") && candidate.endsWith(\"}\")) ||\n      (candidate.startsWith(\"[\") && candidate.endsWith(\"]\"))\n    ) return candidate;\n  }\n  return null;\n}\n\nfunction tryParseJsonLoose(text) {\n  const t = stripCodeFences(text).trim();\n  if (!t) return { ok: false, value: null, jsonText: null };\n\n  // intento directo si parece JSON\n  const looksJson =\n    (t.startsWith(\"{\") && t.endsWith(\"}\")) || (t.startsWith(\"[\") && t.endsWith(\"]\"));\n\n  if (looksJson) {\n    try {\n      return { ok: true, value: JSON.parse(t), jsonText: t };\n    } catch (_) {}\n  }\n\n  // intento substring\n  const sub = extractFirstJsonSubstring(t);\n  if (sub) {\n    try {\n      return { ok: true, value: JSON.parse(sub), jsonText: sub };\n    } catch (_) {}\n  }\n\n  return { ok: false, value: null, jsonText: null };\n}\n\nreturn items.map((item) => {\n  const input = item.json || {};\n\n  const rawText = extractAnalyzerText(input);\n  const parsed = tryParseJsonLoose(rawText);\n\n  // salida base SIEMPRE\n  const out = {\n    _parse_ok: parsed.ok,\n    _raw_text: rawText || \"\",\n    _raw_json_text: parsed.jsonText || \"\",\n  };\n\n  if (parsed.ok) {\n    // Si el JSON es objeto: mergea sus keys directo al root.\n    // Si es array: lo expone como \"data\".\n    if (parsed.value && typeof parsed.value === \"object\" && !Array.isArray(parsed.value)) {\n      Object.assign(out, parsed.value);\n    } else {\n      out.data = parsed.value;\n    }\n  } else {\n    out._error = \"No se pudo parsear JSON desde el campo text.\";\n  }\n\n  return { json: out };\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -704,
        48
      ],
      "id": "69b26695-c14e-45a3-b291-63fad3fe5245",
      "name": "format_ai_response"
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "a269e874-6150-4f7d-b521-267ee93d1a02",
              "name": "output",
              "value": "={{ $('format_response').first().json.message }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        272,
        48
      ],
      "id": "fff7c9f7-821b-46dc-9043-e64bcab103f6",
      "name": "response1"
    }
  ],
  "pinData": {
    "When Executed by Another Workflow": [
      {
        "json": {
          "phone": "+5493516123456",
          "patient_dni": "28999111",
          "conversation_id": "136",
          "current_plan": {
            "status": "OK",
            "patient": {
              "full_name": "Carmen Rodriguez",
              "consultation_date": "2025-12-02",
              "next_session_date": "2026-01-05",
              "age_years": 39,
              "height_m": 1.52,
              "weight_kg": 57,
              "objective": "Salud"
            },
            "plan_meta": {
              "pdf_title": "Plan de alimentaciÃ³n de Carmen Rodriguez",
              "pdf_author": "Nicolas Borda Silva",
              "pdf_creator": "Canva",
              "pdf_producer": "Canva",
              "creation_date_raw": "D:20251205212338+00'00'",
              "mod_date_raw": "D:20251205212335+00'00'",
              "language": "es-419",
              "pages": null
            },
            "targets": {
              "kcal": 1737,
              "protein_g": 103,
              "carbs_g": 204,
              "fat_g": 58
            },
            "schedule": {
              "weekday": [
                {
                  "meal_name": "Desayuno",
                  "time": "10:00 AM",
                  "kcal": 325,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 2,
                      "options": [
                        {
                          "item": "pan de molde",
                          "amount": "1 tjd (25g)",
                          "notes": null
                        },
                        {
                          "item": "pan (centeno, francÃ©s, yema, etc.)",
                          "amount": "Â½ und (30g)",
                          "notes": null
                        },
                        {
                          "item": "rapidita",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "avena cruda",
                          "amount": "3 cdas (20g)",
                          "notes": null
                        },
                        {
                          "item": "avena, quinua o maca bebible",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "granola",
                          "amount": "Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "cereales sin azÃºcares",
                          "amount": "Â½ tz",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas/LÃ¡cteos",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "huevo",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "atÃºn",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "pollo deshilachado",
                          "amount": "3 cdas llenas (30g)",
                          "notes": null
                        },
                        {
                          "item": "queso",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "jamÃ³n",
                          "amount": "2 tajadas",
                          "notes": null
                        },
                        {
                          "item": "hot dog",
                          "amount": "Â½",
                          "notes": null
                        },
                        {
                          "item": "leche descremada",
                          "amount": "1 tz (250ml)",
                          "notes": null
                        },
                        {
                          "item": "yogurt bebible light",
                          "amount": "1 vaso (200ml)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas",
                      "pick_n": 2,
                      "options": [
                        {
                          "item": "aceite",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "mantequilla",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": null
                        },
                        {
                          "item": "aceitunas negras",
                          "amount": "8 und",
                          "notes": null
                        },
                        {
                          "item": "mayonesa light",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "queso crema light",
                          "amount": "1 cda",
                          "notes": null
                        }
                      ]
                    }
                  ],
                  "alternatives": []
                },
                {
                  "meal_name": "Media maÃ±ana",
                  "time": "12:00 PM",
                  "kcal": 60,
                  "rules": [
                    "Elige 1 porciÃ³n"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Frutas",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "mango",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "melÃ³n",
                          "amount": "1 Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "plÃ¡tano pequeÃ±o",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "fresas",
                          "amount": "1 Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "arÃ¡ndanos",
                          "amount": "Â¾ tz",
                          "notes": null
                        },
                        {
                          "item": "papaya",
                          "amount": "1 tz",
                          "notes": null
                        },
                        {
                          "item": "piÃ±a",
                          "amount": "Â¾ tz",
                          "notes": null
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "Si omitimos la media maÃ±ana, puedes pedir 1 street food pequeÃ±o"
                  ]
                },
                {
                  "meal_name": "Almuerzo",
                  "time": "1:00 PM",
                  "kcal": 585,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 3,
                      "options": [
                        {
                          "item": "arroz blanco",
                          "amount": "â…“ tz (70 g)",
                          "notes": null
                        },
                        {
                          "item": "papa o camote",
                          "amount": "Â½ unidad (90g)",
                          "notes": null
                        },
                        {
                          "item": "choclo en grano",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "menestras o guiso criollo",
                          "amount": "Â½ tz (120g)",
                          "notes": null
                        },
                        {
                          "item": "pasta",
                          "amount": "Â½ tz (45g)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas",
                      "pick_n": 5,
                      "options": [
                        {
                          "item": "Carne de res",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pollo o Pavo",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pescado o atÃºn escurrido",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "Suprema de Pollo o Milanesa Avinka",
                          "amount": "1/3 (45 g)",
                          "notes": null
                        },
                        {
                          "item": "dedo de pollo de Avinka",
                          "amount": "1",
                          "notes": null
                        },
                        {
                          "item": "nugget de pollo Avinka",
                          "amount": "1",
                          "notes": null
                        },
                        {
                          "item": "pop corn Chicken Avinka",
                          "amount": "25 g",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas/Salsas",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": "o 8 aceitunas"
                        },
                        {
                          "item": "aceite de oliva",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "crema de ajÃ­, ocopa o huanca",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "salsa para pasta",
                          "amount": "3 cdas",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Verduras",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "Lechuga, tomate, pepino, cebolla blanca, zanahoria, brÃ³coli, espÃ¡rrago, col morada, arugula, pimiento, rabanito, espinaca, etc",
                          "amount": "1 taza",
                          "notes": "A tu gusto"
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "Si omitimos la media maÃ±ana, puedes pedir 1 street food pequeÃ±o"
                  ]
                },
                {
                  "meal_name": "Media tarde",
                  "time": "5:00 PM",
                  "kcal": 210,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "pan de molde",
                          "amount": "1 tjd (25g)",
                          "notes": null
                        },
                        {
                          "item": "pan (centeno, francÃ©s, yema, etc.)",
                          "amount": "Â½ und",
                          "notes": null
                        },
                        {
                          "item": "rapidita",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "avena cruda",
                          "amount": "3 cdas (20g)",
                          "notes": null
                        },
                        {
                          "item": "avena, quinua o maca bebible",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "granola",
                          "amount": "Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "cereales sin azÃºcares",
                          "amount": "Â½ tz",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas/LÃ¡cteos",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "huevo",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "atÃºn",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "pollo deshilachado",
                          "amount": "3 cdas llenas (30g)",
                          "notes": null
                        },
                        {
                          "item": "queso",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "jamÃ³n",
                          "amount": "2 tajadas",
                          "notes": null
                        },
                        {
                          "item": "hot dog",
                          "amount": "Â½",
                          "notes": null
                        },
                        {
                          "item": "leche descremada",
                          "amount": "1 tz (250ml)",
                          "notes": null
                        },
                        {
                          "item": "yogurt bebible light",
                          "amount": "1 vaso (200ml)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "aceite",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "mantequilla",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": null
                        },
                        {
                          "item": "aceitunas negras",
                          "amount": "8 und",
                          "notes": null
                        },
                        {
                          "item": "mayonesa light",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "queso crema light",
                          "amount": "1 cda",
                          "notes": null
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "1 Sabrosura"
                  ]
                },
                {
                  "meal_name": "Cena",
                  "time": "8:00 PM",
                  "kcal": 575,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 3,
                      "options": [
                        {
                          "item": "arroz blanco",
                          "amount": "â…“ tz (70 g)",
                          "notes": null
                        },
                        {
                          "item": "papa o camote",
                          "amount": "Â½ unidad (90g)",
                          "notes": null
                        },
                        {
                          "item": "choclo en grano",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "menestras o guiso criollo",
                          "amount": "Â½ tz (120g)",
                          "notes": null
                        },
                        {
                          "item": "pasta",
                          "amount": "Â½ tz (45g)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas",
                      "pick_n": 4,
                      "options": [
                        {
                          "item": "Carne de res",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pollo o Pavo",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pescado o atÃºn escurrido",
                          "amount": "30 g",
                          "notes": null
                        },
                        {
                          "item": "Suprema de Pollo o Milanesa Avinka",
                          "amount": "1/3 (45 g)",
                          "notes": null
                        },
                        {
                          "item": "dedo de pollo de Avinka",
                          "amount": "1",
                          "notes": null
                        },
                        {
                          "item": "nugget de pollo Avinka",
                          "amount": "1",
                          "notes": null
                        },
                        {
                          "item": "pop corn Chicken Avinka",
                          "amount": "25",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas/Salsas",
                      "pick_n": 2,
                      "options": [
                        {
                          "item": "aceite",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "mantequilla",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": null
                        },
                        {
                          "item": "aceitunas negras",
                          "amount": "8 und",
                          "notes": null
                        },
                        {
                          "item": "mayonesa light",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "queso crema light",
                          "amount": "1 cda",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Verduras",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "Lechuga, tomate, pepino, cebolla blanca, zanahoria, brÃ³coli, espÃ¡rrago, col morada, arugula, pimiento, rabanito, espinaca, etc",
                          "amount": "1 taza",
                          "notes": "A tu gusto"
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "Si omitimos 1 porciÃ³n de carbohidrato del desayuno, podemos comer 1 street food pequeÃ±o"
                  ]
                }
              ],
              "weekend": [
                {
                  "meal_name": "Media maÃ±ana",
                  "time": "11:00 AM",
                  "kcal": 60,
                  "rules": [
                    "Elige 1 porciÃ³n"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Frutas/Jugo",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "jugo",
                          "amount": "Â½ vaso",
                          "notes": null
                        },
                        {
                          "item": "mango",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "melÃ³n",
                          "amount": "1 Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "plÃ¡tano pequeÃ±o",
                          "amount": "1 und",
                          "notes": null
                        },
                        {
                          "item": "fresas",
                          "amount": "1 Â¼ tz",
                          "notes": null
                        },
                        {
                          "item": "arÃ¡ndanos",
                          "amount": "Â¾ tz",
                          "notes": null
                        },
                        {
                          "item": "papaya",
                          "amount": "1 tz",
                          "notes": null
                        },
                        {
                          "item": "piÃ±a",
                          "amount": "Â¾ tz",
                          "notes": null
                        }
                      ]
                    }
                  ],
                  "alternatives": []
                },
                {
                  "meal_name": "Almuerzo",
                  "time": "1:00 PM",
                  "kcal": 850,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 4,
                      "options": [
                        {
                          "item": "arroz blanco",
                          "amount": "â…“ tz (70 g)",
                          "notes": null
                        },
                        {
                          "item": "papa o camote",
                          "amount": "Â½ unidad (90g)",
                          "notes": null
                        },
                        {
                          "item": "choclo en grano",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "menestras o guiso criollo",
                          "amount": "Â½ tz (120g)",
                          "notes": null
                        },
                        {
                          "item": "pasta",
                          "amount": "Â½ tz (45g)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas",
                      "pick_n": 6,
                      "options": [
                        {
                          "item": "Carne de res",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pollo o Pavo",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pescado o atÃºn escurrido",
                          "amount": "30 g",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas/Salsas",
                      "pick_n": 3,
                      "options": [
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": "o 8 aceitunas"
                        },
                        {
                          "item": "aceite de oliva",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "crema de ajÃ­, ocopa o huanca",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "salsa para pasta",
                          "amount": "3 cdas",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Verduras",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "Lechuga, tomate, pepino, cebolla blanca, zanahoria, brÃ³coli, espÃ¡rrago, col morada, arugula, pimiento, rabanito, espinaca, etc",
                          "amount": "1 taza",
                          "notes": "A tu gusto"
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "1 Street Food Mediano o 1 street food pequeÃ±o + 1 Sabrosura"
                  ]
                },
                {
                  "meal_name": "Cena",
                  "time": "8:00 PM",
                  "kcal": 850,
                  "rules": [
                    "Suma las porciones de cada cuadro para cada comida",
                    "Puedes repetir porciones en cada cuadro"
                  ],
                  "portion_groups": [
                    {
                      "group_name": "Carbohidratos",
                      "pick_n": 4,
                      "options": [
                        {
                          "item": "arroz blanco",
                          "amount": "â…“ tz (70 g)",
                          "notes": null
                        },
                        {
                          "item": "papa o camote",
                          "amount": "Â½ unidad (90g)",
                          "notes": null
                        },
                        {
                          "item": "choclo en grano",
                          "amount": "Â½ tz",
                          "notes": null
                        },
                        {
                          "item": "menestras o guiso criollo",
                          "amount": "Â½ tz (120g)",
                          "notes": null
                        },
                        {
                          "item": "pasta",
                          "amount": "Â½ tz (45g)",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "ProteÃ­nas",
                      "pick_n": 6,
                      "options": [
                        {
                          "item": "Carne de res",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pollo o Pavo",
                          "amount": "25 g",
                          "notes": null
                        },
                        {
                          "item": "Pescado o atÃºn escurrido",
                          "amount": "30 g",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Grasas/Salsas",
                      "pick_n": 3,
                      "options": [
                        {
                          "item": "palta",
                          "amount": "Â¼ (30g)",
                          "notes": "o 8 aceitunas"
                        },
                        {
                          "item": "aceite de oliva",
                          "amount": "1 cdta",
                          "notes": null
                        },
                        {
                          "item": "crema de ajÃ­, ocopa o huanca",
                          "amount": "1 cda",
                          "notes": null
                        },
                        {
                          "item": "salsa para pasta",
                          "amount": "3 cdas",
                          "notes": null
                        }
                      ]
                    },
                    {
                      "group_name": "Verduras",
                      "pick_n": 1,
                      "options": [
                        {
                          "item": "Lechuga, tomate, pepino, cebolla blanca, zanahoria, brÃ³coli, espÃ¡rrago, col morada, arugula, pimiento, rabanito, espinaca, etc",
                          "amount": "1 taza",
                          "notes": "A tu gusto"
                        }
                      ]
                    }
                  ],
                  "alternatives": [
                    "1 Street Food Mediano o 1 street food pequeÃ±o + 1 Sabrosura"
                  ]
                }
              ]
            },
            "extras": {
              "training_additional": {
                "kcal": 145,
                "when": "Los dÃ­as que entrenas",
                "options": [
                  "1 Gatorade + 6 almendras",
                  "1 porciÃ³n de fruta + 1 cda de mantequilla de manÃ­ o 12 almendras",
                  "1 barra de cereal Siete Dragones + 6 almendras",
                  "1 Vakimu Pro personal + 6 almendras",
                  "1 porciÃ³n de carbohidrato + 1 porciÃ³n de proteÃ­na"
                ]
              },
              "sabrosuras": {
                "kcal": 210,
                "items": [
                  "1 chocolate individual de tu preferencia",
                  "1 paquete personal de tu galleta preferida",
                  "1 helado individual de tu preferencia",
                  "1 bolsa personal de inka chips o papas lays (30g)",
                  "1 porciÃ³n de keke (60g)",
                  "1 oniguiri de Oxxo",
                  "40g de turrÃ³n"
                ]
              },
              "postres": {
                "kcal": 400,
                "items": [
                  "120g torta de chocolate",
                  "cheesecake pequeÃ±o (tamaÃ±o de la palma de la mano)",
                  "keke starbucks",
                  "pie de limon o manzana",
                  "picarones con miel x 2"
                ]
              },
              "mini_sabrosura": {
                "kcal": 100,
                "items": [
                  "5 ole ole",
                  "1 cucua personal (18g)",
                  "2 frunas (16g)",
                  "1 snicker pequeÃ±o (21.5g)",
                  "1 hershey pequeÃ±o (20g)",
                  "1 Milky La Iberica pequeÃ±o (20g)",
                  "1 doÃ±a pepa (23g)"
                ]
              },
              "street_food": [
                {
                  "size": "PEQUENA",
                  "kcal_limit": 650,
                  "items": [
                    "Yopo: 5 chicken tenders",
                    "Yopo: 12 chicken nuggets",
                    "Bembos: Cheese burger mediana",
                    "Bembos: Hamburguesa clÃ¡sica mediana",
                    "KFC: 8 hot wings",
                    "KFC: Twister mediano",
                    "KFC: 1 pieza crispy parte pecho",
                    "Popeyes: 6 nuggets de pollo",
                    "Popeyes: 1 porciÃ³n de chicharrÃ³n pop",
                    "Popeyes: Crunchi roll",
                    "Papa Johnâ€™s y Little Caesars: 2 slices de pepperoni / hawaiiana / vegetariana / americana",
                    "Papa Johnâ€™s: 7 mini cheesesticks",
                    "Papa Johnâ€™s: 5 rolls de pepperoni",
                    "Fridays: Caesar Salad",
                    "Fridays: Buffalo Wings",
                    "Fridays: Bbq chicken wrap",
                    "La lucha: Pan con lechÃ³n + papas nativas Jr (o sin papas)",
                    "La lucha: SÃ¡nguche de pavo a la leÃ±a + papas nativas Jr.",
                    "Tabla de 10 makis sin salsa extra",
                    "Mc Donalds: Big Mac",
                    "Mc Donalds: Cuarto de Libra",
                    "Mc Donalds: Doble hamburguesa con queso + 6 Mc Nuggets",
                    "Burger King: Whopper Grande",
                    "Burger King: Whopper Junior + papas medianas",
                    "China Wok: 1 porciÃ³n personal de arroz chaufa de pollo"
                  ]
                },
                {
                  "size": "MEDIANA",
                  "kcal_limit": 850,
                  "items": [
                    "3 slices pequeÃ±os de pizza",
                    "1 shawarma",
                    "Duo marino: Ceviche de pescado + chicharrÃ³n de pescado o arroz con mariscos",
                    "Parrilla: 250g de res o pollo + Â½ tz de papas doradas + ensalada",
                    "Â¼ de pollo a la brasa + Â½ porciÃ³n de papas fritas + 1-2 cdas de cremas",
                    "Yopo: Tex mex bowl",
                    "Yopo: 6 Chicken Nuggets + papas fritas",
                    "Popeyes: Tradi Roll",
                    "Fridays: Alitas BBQ",
                    "Fridays: Cheese Burger",
                    "Fridays: signature burger",
                    "Oakberry: mediano con toppings (mantequilla de manÃ­, plÃ¡tano, fresa y arÃ¡ndanos)",
                    "China wok: 1 porciÃ³n de pollo Chi Jau kay / Ti Pa Kay",
                    "China wok: 6 unidades de wantan frito",
                    "China Wok: TallarÃ­n TaypÃ¡",
                    "Mc Donalds: Hamburguesa Doble queso + 10 nuggets",
                    "Mc Donalds: Hamburguesa Doble queso + Mc Flurry",
                    "Bembos: Hamburguesa cheese mediana + papas fritas medianas",
                    "Bembos: Hamburguesa cheese mediana + 6 nuggets",
                    "Bembos: Hamburguesa a lo pobre mediana",
                    "8 makis con salsa",
                    "La Lucha: SÃ¡nguche de chicharrÃ³n",
                    "La Lucha: SÃ¡nguche de pollo deluxe"
                  ]
                },
                {
                  "size": "GRANDE",
                  "kcal_limit": 1200,
                  "items": [
                    "Yopo: Wrapper ChingÃ³n",
                    "Yopo: Wrapper original",
                    "Yopo: Wrapper trufado",
                    "Yopo: BBQ wrapper + 6 nuggets",
                    "Yopo: BBQ bowl",
                    "Bembos: Hamburguesa a lo pobre mediana + papas fritas medianas",
                    "Bembos: Hamburguesa parrillera mediana + papas fritas medianas",
                    "Papa Johnâ€™s: 3 slices de Americana",
                    "Papa Johnâ€™s: 3 slices de All the Meats",
                    "Pizza Hut: 3 slices de Vegetariana",
                    "Pizza Hut: 5 slices de Americana",
                    "Pizza Hut: 5 slices de Pepperoni",
                    "Pizza Hut: 5 slices de Suprema"
                  ]
                }
              ]
            },
            "recommendations": [
              "Sigue el plan de lunes a domingo para alcanzar los objetivos trazados.",
              "EnvÃ­ame fotos de tus comidas a Whatsapp para poder acompaÃ±arte, darte feedback y orientarte mejor durante esta etapa.",
              "Cualquier bebida sin azÃºcar estÃ¡ permitida",
              "Consume mÃ­nimo 2.5L de lÃ­quido al dÃ­a",
              "Usa Stevia con yacÃ³n (en pote) y aceite en aerosol",
              "Prefiere preparaciones: a la plancha, al horno, al vapor, salteados",
              "Evita las frituras"
            ],
            "constraints": {
              "allowed_beverages": [
                "Cualquier bebida sin azÃºcar"
              ],
              "avoid": [
                "Evita las frituras"
              ],
              "cooking_methods_prefer": [
                "a la plancha",
                "al horno",
                "al vapor",
                "salteados"
              ],
              "other": [
                "Consume mÃ­nimo 2.5L de lÃ­quido al dÃ­a",
                "Usa Stevia con yacÃ³n (en pote) y aceite en aerosol"
              ]
            },
            "raw_highlights": {
              "key_lines": [
                "Nombre: Carmen Rodriguez DÃ­a de consulta: 02/12/2025",
                "Peso Altura Edad Objetivo",
                "57 kg 1.52 m 39 aÃ±os Salud",
                "Resumen del plan alimenticio",
                "CalorÃ­as",
                "Macronutrientes",
                "Proteinas Carbohidratos Grasas",
                "1737 kcal 103 g 204 g 58 g",
                "SesiÃ³n #1",
                "PRÃ“XIMA SESIÃ“N: 05/01/2026",
                "Desayuno â° 10:00 AM (325 kcal)",
                "Media maÃ±ana â° 12:00 PM (60 kcal)",
                "Almuerzo â° 1:00 PM (585 kcal)",
                "Media tarde â° 5:00 PM (210 kcal)",
                "Cena â° 8:00 PM (575 kcal)",
                "Adicional + 145 kcal",
                "FINES DE SEMANA",
                "Media maÃ±ana â° 11:00 AM (60 kcal)",
                "Almuerzo â° 1:00 PM (850 kcal)",
                "Cena â° 8:00 PM (850 kcal)",
                "RECOMENDACIONES",
                "SABROSURAS (210 kcal)",
                "POSTRES (400 kcal)",
                "MINI SABROSURA (100 kcal)",
                "STREET FOOD (hasta 650 kcal)",
                "STREET FOOD (hasta 850 kcal)",
                "STREET FOOD (hasta 1200 kcal)"
              ],
              "detected_sections": [
                "Datos generales",
                "Resumen del plan alimenticio",
                "Comidas dÃ­a de semana",
                "Comidas fin de semana",
                "Adicional entrenamiento",
                "Sabrosuras",
                "Postres",
                "Mini sabrosura",
                "Street food",
                "Recomendaciones",
                "Importante recordar"
              ]
            },
            "warnings": [
              "No se especifican pÃ¡ginas del PDF.",
              "Algunos Ã­tems de street food pueden variar en kcal segÃºn preparaciÃ³n real.",
              "No se detectan datos de sumatoria de pliegues, % grasa o mÃºsculo, perÃ­metro de cintura."
            ]
          },
          "meal_analysis": "{\"rommy_status\":{\"estado\":\"OK\",\"motivo\":\"Comida reportada se alinea con el plan y cantidades aproximadas.\"},\"accion_recomendada\":{\"accion\":\"LOG_MEAL\",\"loguear_comida\":true,\"sumar_al_tracker\":false,\"motivo\":\"Falta detalle exacto de gramos para sumar al tracker.\"},\"detected_meal\":{\"meal\":\"almuerzo\",\"confidence\":0.95},\"items_detectados\":[{\"name\":\"arroz blanco\",\"portion\":\"plato chico (~1/3 taza)\",\"confidence\":0.86},{\"name\":\"pollo a la plancha\",\"portion\":\"~125g (estimado)\",\"confidence\":0.81},{\"name\":\"ensalada (lechuga/tomate)\",\"portion\":\"~1 taza\",\"confidence\":0.72},{\"name\":\"aceite de oliva\",\"portion\":\"1 cdta\",\"confidence\":0.7}],\"tracker\":{\"kcal\":null,\"protein_g\":null,\"carbs_g\":null,\"fat_g\":null,\"estimable\":false,\"faltantes\":[\"gramos exactos de arroz\",\"gramos exactos de pollo\",\"detalle exacto de ensalada\"]},\"preguntas_pendientes\":[\"Â¿Aproximadamente cuÃ¡ntos gramos de pollo y arroz usaste?\",\"Â¿La ensalada fue solo lechuga y tomate o tenÃ­a algo mÃ¡s?\",\"Â¿Quedaste satisfecha o sentiste hambre despuÃ©s?\"],\"flags\":{\"needs_escalation\":false,\"medical_risk\":false},\"source\":{\"has_photo\":true,\"image_analysis_json\":{\"type\":\"meal_photo\",\"items\":[{\"name\":\"arroz blanco\",\"confidence\":0.86},{\"name\":\"pollo a la plancha\",\"confidence\":0.81},{\"name\":\"ensalada (lechuga/tomate)\",\"confidence\":0.72}],\"portion_estimate\":\"plato chico\",\"notes\":\"Plato con arroz, pollo y ensalada.\"}}}",
          "user_text": "Romy, almorcÃ© reciÃ©n: un plato chico de arroz blanco, pollo a la plancha y ensalada. Le puse una cucharadita de aceite de oliva. Â¿Voy bien?"
        }
      }
    ]
  },
  "connections": {
    "When Executed by Another Workflow": {
      "main": [
        [
          {
            "node": "validate_inputs",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "validate_inputs": {
      "main": [
        [
          {
            "node": "should_skip?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "should_skip?": {
      "main": [
        [
          {
            "node": "get_daily_tracker",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "get_daily_tracker": {
      "main": [
        [
          {
            "node": "calculate_totals",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "calculate_totals": {
      "main": [
        [
          {
            "node": "format_tracker_entry",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "save_data": {
      "main": [
        [
          {
            "node": "response1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "exists_user?": {
      "main": [
        [
          {
            "node": "save_data",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "register_data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "register_data": {
      "main": [
        [
          {
            "node": "response1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "format_response": {
      "main": [
        [
          {
            "node": "exists_user?",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "format_tracker_entry": {
      "main": [
        [
          {
            "node": "format_ai_response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "format_ai_response": {
      "main": [
        [
          {
            "node": "format_response",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1",
    "binaryMode": "separate",
    "availableInMCP": false,
    "timeSavedMode": "fixed",
    "saveDataSuccessExecution": "all",
    "callerPolicy": "workflowsFromSameOwner"
  },
  "versionId": "d8249105-4d58-44e5-9897-a0dfb5d75a73",
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "a908134184433ebf07981b9f471fec283d5d7b629e6d329989a1aaf055db9736"
  },
  "id": "OE-M1_O7rShQe0f_80bJN",
  "tags": []
}