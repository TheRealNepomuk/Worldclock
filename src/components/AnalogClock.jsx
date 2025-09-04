import { useEffect, useMemo, useState } from 'react';

function getTimeInfoForZone(date, timeZone) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  const parts = fmt.formatToParts(date);
  const map = Object.fromEntries(parts.map(p => [p.type, p.value]));
  const hours = parseInt(map.hour, 10);
  const minutes = parseInt(map.minute, 10);
  const seconds = parseInt(map.second, 10);
  
  // Get timezone offset for display
  const offsetFmt = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    timeZoneName: 'longOffset'
  });
  const offsetParts = offsetFmt.formatToParts(date);
  const offsetPart = offsetParts.find(part => part.type === 'timeZoneName');
  const offset = offsetPart ? offsetPart.value : '';
  
  return { hours, minutes, seconds, offset };
}

export default function AnalogClock({ timeZone, label }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { hours, minutes, seconds, offset } = useMemo(() => getTimeInfoForZone(now, timeZone), [now, timeZone]);

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.42;

  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="clock">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label || timeZone}>
        <defs>
          <filter id="clockShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        <circle cx={cx} cy={cy} r={radius + 8} fill="white" stroke="#e5e7eb" strokeWidth="2" filter="url(#clockShadow)" />
        <circle cx={cx} cy={cy} r="2" fill="#111827" />

        {ticks.map(i => {
          const angle = (i / 60) * Math.PI * 2;
          const isHour = i % 5 === 0;
          const inner = radius - (isHour ? 12 : 6);
          const outer = radius;
          const x1 = cx + inner * Math.sin(angle);
          const y1 = cy - inner * Math.cos(angle);
          const x2 = cx + outer * Math.sin(angle);
          const y2 = cy - outer * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isHour ? '#111827' : '#9ca3af'}
              strokeWidth={isHour ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        <g transform={`rotate(${hourAngle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - radius * 0.55} stroke="#111827" strokeWidth="4" strokeLinecap="round" />
        </g>

        <g transform={`rotate(${minuteAngle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy} x2={cx} y2={cy - radius * 0.75} stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g transform={`rotate(${secondAngle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy + 12} x2={cx} y2={cy - radius * 0.80} stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        </g>

        <circle cx={cx} cy={cy} r="4" fill="#111827" />
      </svg>

      <div className="clock-label">
        <span className="clock-time">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}.{String(seconds).padStart(2, '0')} {offset}
        </span>
      </div>
    </div>
  );
}


