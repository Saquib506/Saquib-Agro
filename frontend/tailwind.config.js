/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#0F3D2E', 50: '#E8F0EC', 100: '#C8DDD1', 400: '#2F6B4F', 600: '#164A37', 900: '#0A2A20' },
        leaf: { DEFAULT: '#4CAF6D', 50: '#EEF8F0', 100: '#D4EEDA', 400: '#5FC17E', 600: '#3D9459', 700: '#2F7644' },
        sun: { DEFAULT: '#F4A833', 100: '#FDEDCF', 400: '#F7BB5C', 600: '#D98E15' },
        soil: { DEFAULT: '#8B5E34', 100: '#EBDFCF', 400: '#A67A4E', 600: '#6E4826' },
        cream: { DEFAULT: '#FBF7EE', 100: '#FFFFFF', 200: '#F3EDDD' },
        ink: { DEFAULT: '#1C1917', 600: '#443F3A' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'field-lines': "repeating-linear-gradient(180deg, rgba(15,61,46,0.04) 0px, rgba(15,61,46,0.04) 2px, transparent 2px, transparent 28px)",
      },
    },
  },
  plugins: [],
}
