export function getTimezones() {
  if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
    try {
      const zones = Intl.supportedValuesOf('timeZone');
      return Array.isArray(zones) && zones.length ? zones : fallback();
    } catch {
      return fallback();
    }
  }
  return fallback();
}

function fallback() {
  return [
    'UTC',
    'Europe/London',
    'Europe/Berlin',
    'Europe/Paris',
    'Europe/Madrid',
    'Europe/Rome',
    'Europe/Moscow',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Singapore',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland',
    'America/St_Johns',
    'America/Halifax',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'America/Sao_Paulo',
    'America/Mexico_City',
    'America/Bogota',
    'America/Lima',
    'America/Caracas'
  ];
}


