// Groups timezones by continent for easier selection
export function getTimezoneGroups() {
  const groups = {
    'Europe': [
      'Europe/London', 'Europe/Berlin', 'Europe/Paris', 'Europe/Madrid', 
      'Europe/Rome', 'Europe/Amsterdam', 'Europe/Stockholm', 'Europe/Moscow',
      'Europe/Athens', 'Europe/Prague', 'Europe/Warsaw', 'Europe/Vienna'
    ],
    'Asia': [
      'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Hong_Kong', 'Asia/Singapore',
      'Asia/Bangkok', 'Asia/Kolkata', 'Asia/Dubai', 'Asia/Seoul',
      'Asia/Taipei', 'Asia/Manila', 'Asia/Jakarta', 'Asia/Karachi'
    ],
    'Americas': [
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
      'America/Toronto', 'America/Vancouver', 'America/Mexico_City', 'America/Sao_Paulo',
      'America/Buenos_Aires', 'America/Lima', 'America/Bogota', 'America/Caracas'
    ],
    'Africa': [
      'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Lagos', 'Africa/Casablanca',
      'Africa/Nairobi', 'Africa/Addis_Ababa', 'Africa/Tunis', 'Africa/Algiers'
    ],
    'Oceania': [
      'Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth', 'Pacific/Auckland',
      'Pacific/Fiji', 'Pacific/Honolulu', 'Pacific/Tahiti', 'Pacific/Guam'
    ],
    'UTC': ['UTC']
  };
  
  return groups;
}

// Get all timezone options for a specific continent
export function getTimezonesForContinent(continent) {
  const groups = getTimezoneGroups();
  return groups[continent] || [];
}

// Get all available continents
export function getContinents() {
  return Object.keys(getTimezoneGroups());
}
