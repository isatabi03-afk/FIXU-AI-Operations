// format_response1 (acepta items ya unificados o rows de Google Sheets)

// Máximo de propiedades a incluir en el mensaje
const MAX_PROPERTIES = 5;

// Tomamos todos los items de entrada
const allItems = $input.all();

// Nos quedamos solo con las primeras N propiedades
const items = allItems.slice(0, MAX_PROPERTIES);

// Helper para limpiar valores
function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  return value;
}

function normalizeText(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function parseBoolish(value) {
  if (typeof value === 'boolean') return value;
  const s = normalizeText(value);
  if (!s) return null;
  if (['true', '1', 'si', 'sí', 'yes', 'y'].includes(s)) return true;
  if (['false', '0', 'no', 'n'].includes(s)) return false;
  return null;
}

// Normaliza si viene "crudo" desde Sheets
function toUnifiedProperty(p) {
  if (!p || typeof p !== 'object') return p;

  const looksSupabase =
    'business_type' in p || 'current_price' in p || 'visible_on_web' in p || 'district' in p;
  if (looksSupabase) return p;

  const looksSheets =
    'Codigo' in p || 'Tipo de Negocio' in p || 'Visible en la Web' in p || 'Precio Actual' in p;
  if (!looksSheets) return p;

  const exclus = normalizeText(p['Exclusividad']);
  let exclusivity = null;
  if (exclus.includes('exclus')) exclusivity = true;
  else if (exclus.includes('compart')) exclusivity = false;

  return {
    _source: 'sheets',
    row_number: p.row_number ?? null,
    office: p['Oficina'] ?? null,
    advisor: p['Asesor'] ?? null,
    phone: p['Celular'] ?? null,
    code: p['Codigo'] ?? null,

    status: p['Estado'] ?? null,
    status_date: p['Fecha Estado'] ?? null,

    property_type: p['Tipo de Propiedad'] ?? null,
    business_type: p['Tipo de Negocio'] ?? null,

    views: p['Vistas'] ?? null,
    visits: p['Visitas'] ?? null,
    exclusivity,

    currency: p['Moneda'] ?? null,
    current_price: p['Precio Actual'] ?? null,
    price_per_m2: p['Precio m2'] ?? null,

    district: p['Distrito'] ?? null,
    province: p['Provincia'] ?? null,
    department: p['Departamento'] ?? null,
    address: p['Dirección'] ?? null,

    property_publication_date: p['Fecha Publicación Propiedad'] ?? null,
    last_price_change_date: p['Fecha ultimo Cambio'] ?? null,

    urbania_url: p['URL Urbania'] ?? null,
    adondevivir_url: p['URL Adondevivir'] ?? null,
    la_encontre_url: p['URL La Encontre'] ?? null,

    visible_on_web: parseBoolish(p['Visible en la Web']),
  };
}

// Helper para agregar una línea solo si hay valor
function addLine(lines, label, value) {
  const v = clean(value);
  if (v !== '') lines.push(`- ${label}: ${v}`);
}

// Helper para formatear precios
function formatPrice(value) {
  const num = Number(value);
  if (isNaN(num) || num <= 0) return '';
  return num.toLocaleString('es-PE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

// Helper para mapear moneda a algo más claro (opcional)
function formatCurrency(currency) {
  const c = clean(currency);
  if (!c) return '';
  if (c === '$') return 'US$';
  if (c === 'S/.' || c === 'S/') return 'Soles (S/.)';
  return c;
}

// Helper para formatear fecha simple
function formatDate(dateStr) {
  const d = clean(dateStr);
  if (!d) return '';
  return String(d).split('T')[0];
}

// ✅ NUEVO: Slugificar texto para URL
function slugify(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim();
}

// ✅ NUEVO: Construir URL específica de propiedad en remax.pe (landing URUS con formulario)
function buildPropertyUrl(advisor, propertyType, businessType, district, province, department, code) {
  if (!advisor || !code) return null;

  const parts = advisor.trim().split(/\s+/);
  if (parts.length < 2) return null;

  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const firstName = normalize(parts[0]);
  const lastNameIndex = Math.max(1, parts.length - 2);
  const lastName = normalize(parts[lastNameIndex]);
  const email = `${firstName}${lastName}@remaxurus.pe`;

  const slugTipo = slugify(propertyType);
  const slugNegocio = slugify(businessType);
  const slugDistrito = slugify(district);
  const slugProv = slugify(province);
  const slugDepto = slugify(department);

  return `https://www.remax.pe/v1/user/${email}/propiedad-${slugTipo}-en-${slugNegocio}-${slugDistrito}-${slugProv}-${slugDepto}-${code}/`;
}

// ✅ NUEVO: Traducir tipo de propiedad para URL
function translatePropertyType(type) {
  const t = clean(type).toLowerCase();
  const map = {
    'house': 'Casa', 'casa': 'Casa',
    'apartment': 'Departamento', 'departamento': 'Departamento', 'flat': 'Departamento',
    'office': 'Oficina', 'oficina': 'Oficina',
    'land': 'Terreno', 'terreno': 'Terreno',
    'commercial': 'Local comercial', 'local': 'Local comercial', 'local comercial': 'Local comercial',
    'warehouse': 'Almacén', 'almacen': 'Almacén',
  };
  return map[t] || type;
}

// ✅ NUEVO: Traducir tipo de negocio para URL
function translateBusinessType(type) {
  const t = clean(type).toLowerCase();
  const map = {
    'sale': 'Venta', 'venta': 'Venta', 'sell': 'Venta',
    'rent': 'Alquiler', 'renta': 'Alquiler', 'alquiler': 'Alquiler', 'lease': 'Alquiler',
    'anticrese': 'Anticresis',
  };
  return map[t] || type;
}

let counter = 1;
const blocks = [];

for (const item of items) {
  const p = toUnifiedProperty(item.json);

  const lines = [];
  lines.push(`PROPIEDAD ${counter}`);
  lines.push('');

  addLine(lines, 'Código', p.code);
  addLine(lines, 'Tipo de propiedad', p.property_type);
  addLine(lines, 'Tipo de negocio', p.business_type);

  const currency = p.currency === '$'
    ? 'US$'
    : (p.currency === 'S/.' || p.currency === 'S/') ? 'S/' : '';

  const currentPrice = formatPrice(p.current_price);
  if (currentPrice) {
    const labelPrice = currency ? `${currency} ${currentPrice}` : currentPrice;
    addLine(lines, 'Precio actual', labelPrice);
  }

  addLine(lines, 'Distrito', p.district);
  addLine(lines, 'Dirección', p.address);

  // ✅ NUEVO: Agregar URL específica por propiedad
  const propType = translatePropertyType(p.property_type);
  const busType = translateBusinessType(p.business_type);
  const urlPropiedad = buildPropertyUrl(
    clean(p.advisor), propType, busType,
    clean(p.district), clean(p.province), clean(p.department),
    clean(p.code)
  );
  if (urlPropiedad) addLine(lines, 'Link', urlPropiedad);

  lines.push('----');
  lines.push('');

  blocks.push(lines.join('\n'));
  counter++;
}

const formatted = blocks.join('\n');

return [
  {
    json: {
      formatted_properties: formatted,
      total_properties_found: allItems.length,
      total_properties_sent: items.length,
    },
  },
];
