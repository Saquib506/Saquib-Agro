export default function WeatherIcon({ icon, size = 48 }) {
  const props = { width: size, height: size, viewBox: '0 0 48 48', fill: 'none' };

  switch (icon) {
    case 'sun':
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="10" fill="#F4A833" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24" y1="6" x2="24" y2="11"
              stroke="#F4A833" strokeWidth="2.5" strokeLinecap="round"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </svg>
      );
    case 'sun-cloud':
      return (
        <svg {...props}>
          <circle cx="18" cy="18" r="8" fill="#F4A833" />
          <path d="M10 32a8 8 0 0 1 7-11.9A9 9 0 0 1 34 24a7 7 0 0 1-1 14H14a6 6 0 0 1-4-6z" fill="#EDEDED" stroke="#B9BEC4" strokeWidth="1.2" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...props}>
          <path d="M9 33a8 8 0 0 1 6.5-13 10 10 0 0 1 19 4.2A7.5 7.5 0 0 1 33 38H15a6 6 0 0 1-6-5z" fill="#D8DCE1" stroke="#9AA1AA" strokeWidth="1.2" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...props}>
          <path d="M11 20a7 7 0 0 1 6-9.6A8.5 8.5 0 0 1 33 14a6.5 6.5 0 0 1-1 13H15a5 5 0 0 1-4-7z" fill="#D8DCE1" stroke="#9AA1AA" strokeWidth="1.2" />
          {[24, 30, 36].map((y) => (
            <line key={y} x1="8" y1={y} x2="40" y2={y} stroke="#9AA1AA" strokeWidth="2" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...props}>
          <path d="M9 24a7 7 0 0 1 6-11A8.5 8.5 0 0 1 32 17a6.5 6.5 0 0 1 0 13H14a5 5 0 0 1-5-6z" fill="#C4CBD3" stroke="#8A929C" strokeWidth="1.2" />
          {[16, 24, 32].map((x) => (
            <line key={x} x1={x} y1="34" x2={x - 2} y2="40" stroke="#4CAF6D" strokeWidth="2.2" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'rain':
      return (
        <svg {...props}>
          <path d="M9 22a7 7 0 0 1 6-11A8.5 8.5 0 0 1 32 15a6.5 6.5 0 0 1 0 13H14a5 5 0 0 1-5-6z" fill="#AEB8C2" stroke="#78828C" strokeWidth="1.2" />
          {[13, 20, 27, 34].map((x) => (
            <line key={x} x1={x} y1="32" x2={x - 3} y2="41" stroke="#3D9459" strokeWidth="2.4" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'storm':
      return (
        <svg {...props}>
          <path d="M9 20a7 7 0 0 1 6-11A8.5 8.5 0 0 1 32 13a6.5 6.5 0 0 1 0 13H14a5 5 0 0 1-5-6z" fill="#9098A3" stroke="#5C636D" strokeWidth="1.2" />
          <polygon points="24,26 18,36 22,36 20,44 29,32 24,32" fill="#F4A833" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...props}>
          <path d="M9 22a7 7 0 0 1 6-11A8.5 8.5 0 0 1 32 15a6.5 6.5 0 0 1 0 13H14a5 5 0 0 1-5-6z" fill="#E4E8EC" stroke="#9AA1AA" strokeWidth="1.2" />
          {[15, 24, 33].map((x, i) => (
            <text key={x} x={x} y={i % 2 === 0 ? 38 : 42} fontSize="10" fill="#5FC17E" textAnchor="middle">❄</text>
          ))}
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="24" cy="24" r="10" fill="#F4A833" />
        </svg>
      );
  }
}