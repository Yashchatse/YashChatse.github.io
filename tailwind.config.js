/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4056A1',
        secondary: '#F13C20',
        'muted-bg': '#fdfdfd',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 8px 20px rgba(0,0,0,0.1)',
      },
      backgroundImage: {
        hero: "url('/image/wallpaperflare-cropped.jpg')",
      },
    },
  },
  plugins: [],
}

