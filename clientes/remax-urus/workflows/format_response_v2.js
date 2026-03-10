const rawProperty = $input.first().json;

// Si viene desde Google Sheets (headers en español), normalizar
function normalizeFromSheets(p) {
  if (!p) return p;

  if ('Tipo de Propiedad' in p || 'Precio Actual' in p) {
    return {
      office: p['Oficina'] ?? null,
      advisor: p['Asesor'] ?? null,
      phone: p['Celular'] ?? null,
      code: p['Codigo'] ?? null,

      status: p['Estado'] ?? null,
      status_date: p['Fecha Estado'] ?? null,

      property_type: p['Tipo de Propiedad'] ?? null,
      business_type: p['Tipo de Negocio'] ?? null,

      currency: p['Moneda'] ?? null,
      current_price: p['Precio Actual'] ?? null,
      price_per_m2: p['Precio m2'] ?? null,

      district: p['Distrito'] ?? null,
      province: p['Provincia'] ?? null,
      department: p['Departamento'] ?? null,
      address: p['Dirección'] ?? null,

      property_publication_date: p['Fecha Publicación Propiedad'] ?? null,

      urbania_url: p['URL Urbania'] ?? null,
      adondevivir_url: p['URL Adondevivir'] ?? null,
      la_encontre_url: p['URL La Encontre'] ?? null,
    };
  }

  return p;
}

const property = normalizeFromSheets(rawProperty);

// Helper simple para limpiar strings
function clean(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  return value;
}

// Detectar y formatear moneda
function formatCurrencySymbol(currency) {
  const c = clean(currency);
  if (!c) return '';
  if (c === '$') return 'US$';
  if (c === 'S/.' || c === 'S/' || c === 'S') return 'S/';
  return c;
}

// Formatear precio con moneda
function formatPrice(price, currency) {
  const n = Number(price);
  if (!n || isNaN(n) || n <= 0) return 'Consultar';

  const symbol = formatCurrencySymbol(currency);
  const formattedNumber = n.toLocaleString('es-PE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return symbol ? `${symbol} ${formattedNumber}` : formattedNumber;
}

// Formatear precio por m²
function formatPricePerM2(price, currency) {
  const n = Number(price);
  if (!n || isNaN(n) || n <= 0) return null;

  const symbol = formatCurrencySymbol(currency);
  const formattedNumber = n.toLocaleString('es-PE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return symbol ? `${symbol} ${formattedNumber} por m²` : `${formattedNumber} por m²`;
}

// Traducir / normalizar tipo de propiedad (acepta inglés o español)
function translatePropertyType(type) {
  const raw = clean(type);
  if (!raw) return 'Propiedad';

  const t = raw.toLowerCase();

  const map = {
    'house': 'Casa',
    'casa': 'Casa',
    'apartment': 'Departamento',
    'departamento': 'Departamento',
    'flat': 'Departamento',
    'office': 'Oficina',
    'oficina': 'Oficina',
    'land': 'Terreno',
    'terreno': 'Terreno',
    'commercial': 'Local comercial',
    'local': 'Local comercial',
    'local comercial': 'Local comercial',
    'warehouse': 'Almacén',
    'almacen': 'Almacén',
  };

  return map[t] || raw;
}

// Traducir / normalizar tipo de negocio (acepta inglés o español)
function translateBusinessType(type) {
  const raw = clean(type);
  if (!raw) return 'Venta';

  const t = raw.toLowerCase();

  const map = {
    'sale': 'Venta',
    'venta': 'Venta',
    'sell': 'Venta',
    'rent': 'Alquiler',
    'renta': 'Alquiler',
    'alquiler': 'Alquiler',
    'lease': 'Alquiler',
    'anticrese': 'Anticresis',
  };

  return map[t] || raw;
}

// Formatear fecha simple (usamos la que viene, pero si es ISO recortamos a YYYY-MM-DD)
function formatDate(dateStr) {
  const d = clean(dateStr);
  if (!d) return null;
  // Si viene con T, recortamos
  const onlyDate = d.split('T')[0];
  return onlyDate || d;
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

  // Nombres peruanos: Nombre(s) + ApellidoPaterno + ApellidoMaterno
  // Email = primer_nombre + apellido_paterno (penúltima palabra)
  const parts = advisor.trim().split(/\s+/);
  if (parts.length < 2) return null;

  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const firstName = normalize(parts[0]);
  // Apellido paterno = penúltima palabra (última = apellido materno)
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

// =========================
// Extraer y preparar campos
// =========================

const office = clean(property.office);
const advisor = clean(property.advisor);
const phone = clean(property.phone);
const code = clean(property.code);

const status = clean(property.status);
const statusDate = formatDate(property.status_date);

const propertyType = translatePropertyType(property.property_type);
const businessType = translateBusinessType(property.business_type);
const currency = property.currency;

const priceCurrentFormatted = formatPrice(property.current_price, currency);
const pricePerM2Formatted = formatPricePerM2(property.price_per_m2, currency);

const district = clean(property.district);
const province = clean(property.province);
const department = clean(property.department);
const address = clean(property.address);

const publicationDate = formatDate(property.property_publication_date);

// URLs públicas
const urbaniaUrl = clean(property.urbania_url);
const adondeVivirUrl = clean(property.adondevivir_url);
const laEncontreUrl = clean(property.la_encontre_url);

// ✅ NUEVO: Generar URL específica de la propiedad
const urlPropiedad = buildPropertyUrl(advisor, propertyType, businessType, district, province, department, code);

// Construir ubicación completa
let fullLocation = '';
if (district) fullLocation = district;
if (province && province.toLowerCase() !== district.toLowerCase()) {
  fullLocation += (fullLocation ? ', ' : '') + province;
}
if (
  department &&
  department.toLowerCase() !== province.toLowerCase() &&
  department.toLowerCase() !== district.toLowerCase()
) {
  fullLocation += (fullLocation ? ', ' : '') + department;
}

// =========================
// Construcción del mensaje (FILTRADO)
// =========================

const lines = [];

lines.push('PROPIEDAD SELECCIONADA\n');

if (code) lines.push(`- Código: ${code}`);
if (propertyType) lines.push(`- Tipo de propiedad: ${propertyType}`);
if (businessType) lines.push(`- Tipo de negocio: ${businessType}`);

if (priceCurrentFormatted) {
  lines.push(`- Precio actual: ${priceCurrentFormatted}`);
}

if (district) lines.push(`- Distrito: ${district}`);
if (address) lines.push(`- Dirección: ${address}`);

// ✅ NUEVO: Agregar link específico de la propiedad
if (urlPropiedad) lines.push(`- Link: ${urlPropiedad}`);

lines.push('----');

const message = lines.join('\n');

// =========================
// Retorno estructurado FILTRADO
// =========================

return {
  json: {
    formatted_message: message,

    property_data: {
      code,
      property_type: propertyType,
      business_type: businessType,
      currency: formatCurrencySymbol(currency),
      price_current: priceCurrentFormatted,
      price_current_numeric: Number(property.current_price) || null,
      district,
      address,
      url_propiedad: urlPropiedad, // ✅ NUEVO
    },

    // ✅ NUEVO: URL en root para fácil acceso
    url_propiedad: urlPropiedad,

    raw_property: property,
  },
};
