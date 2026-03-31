/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#18181B',
        secondary: '#3F3F46',
        surface: '#FAFAFA',
        card: '#FFFFFF',
        accent: '#2563EB',
        'accent-green': '#059669',
        'accent-amber': '#D97706',
        'accent-rose': '#E11D48',
        border: '#E4E4E7',
        muted: '#71717A',
        'tag-bg': '#F4F4F5',
        'tag-text': '#3F3F46',
      },
      fontFamily: {
        heading: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
