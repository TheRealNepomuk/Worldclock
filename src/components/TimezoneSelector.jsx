import { useState, useEffect } from 'react';
import { getContinents, getTimezonesForContinent } from '../utils/timezoneGroups';

export default function TimezoneSelector({ value, onChange }) {
  const continents = getContinents();
  
  // Find current continent and city from value
  const getCurrentSelections = () => {
    if (!value) return { continent: '', city: '' };
    
    for (const continent of continents) {
      const cities = getTimezonesForContinent(continent);
      if (cities.includes(value)) {
        return { continent, city: value };
      }
    }
    return { continent: '', city: '' };
  };

  const { continent: currentContinent, city: currentCity } = getCurrentSelections();
  
  const [selectedContinent, setSelectedContinent] = useState(currentContinent);
  const [selectedCity, setSelectedCity] = useState(currentCity);
  
  // Get cities for selected continent
  const availableCities = selectedContinent ? getTimezonesForContinent(selectedContinent) : [];

  // Handle continent change
  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setSelectedCity('');
    onChange(null); // Clear selection when continent changes
  };

  // Handle city change
  const handleCityChange = (city) => {
    setSelectedCity(city);
    onChange(city || null);
  };

  // Update local state when value prop changes
  useEffect(() => {
    const { continent, city } = getCurrentSelections();
    setSelectedContinent(continent);
    setSelectedCity(city);
  }, [value]);

  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <select
        value={selectedContinent}
        onChange={(e) => handleContinentChange(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">Choose continent...</option>
        {continents.map(continent => (
          <option key={continent} value={continent}>{continent}</option>
        ))}
      </select>
      
      <select
        value={selectedCity}
        onChange={(e) => handleCityChange(e.target.value)}
        disabled={!selectedContinent}
        style={{ 
          padding: '8px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          opacity: selectedContinent ? 1 : 0.5
        }}
      >
        <option value="">Choose city...</option>
        {availableCities.map(city => {
          const cityName = city.includes('/') ? city.split('/')[1].replace('_', ' ') : city;
          return (
            <option key={city} value={city}>{cityName}</option>
          );
        })}
      </select>
    </div>
  );
}
