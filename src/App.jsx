import { useState } from 'react'
import './App.css'
import AnalogClock from './components/AnalogClock'
import TimezoneSelector from './components/TimezoneSelector'

function App() {
  // Array of 6 time zones - one for each clock slot
  const [timeZones, setTimeZones] = useState(['UTC', null, null, null, null, null])

  // Function to update a specific clock slot
  const updateTimeZone = (index, newTimeZone) => {
    setTimeZones(prev => {
      const updated = [...prev] // Copy the array
      updated[index] = newTimeZone // Update the specific slot
      return updated
    })
  }

  return (
    <div style={{ padding: 24, margin: 24 }}>
      <h1>World Clock - 6 Time Zones</h1>
      <p>Choose up to 6 different time zones to display</p>
      
      {/* Grid container for 6 clocks */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {timeZones.map((timeZone, index) => (
          <div key={index} style={{ 
            border: '1px solid #ccc', 
            padding: '16px', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3>Clock {index + 1}</h3>
            
            {/* Two-dropdown system for this specific clock */}
            <div style={{ marginBottom: '16px' }}>
              <TimezoneSelector
                value={timeZone}
                onChange={(newTimeZone) => updateTimeZone(index, newTimeZone)}
              />
            </div>

            {/* Show clock only if a time zone is selected */}
            {timeZone ? (
              <AnalogClock timeZone={timeZone} label={timeZone} />
            ) : (
              <div style={{ 
                height: '220px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#666'
              }}>
                Select a time zone
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
