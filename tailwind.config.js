/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        light: {
          bg: '#FFFFFF',
          card: '#F3F4F6',
          text: '#1F2937',
          'text-secondary': '#6B7280',
          primary: '#4F46E5',
          'primary-hover': '#4338CA',
          border: '#E5E7EB',
        },
        // Dark mode colors
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          'card-hover': '#334155',
          text: '#F1F5F9',
          'text-secondary': '#94A3B8',
          primary: '#818CF8',
          'primary-hover': '#6366F1',
          border: '#334155',
        },
        // Brand colors
        brand: {
          primary: '#4F46E5',
          'primary-light': '#818CF8',
          'primary-dark': '#3730A3',
          accent: '#10B981',
          'accent-light': '#34D399',
          'accent-dark': '#059669',
          secondary: '#8B5CF6',
          'secondary-light': '#A78BFA',
          'secondary-dark': '#7C3AED',
        },
        // Performance indicators
        performance: {
          excellent: '#10B981',
          good: '#3B82F6',
          warning: '#F59E0B',
          critical: '#EF4444',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-performance': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-tech': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        'gradient-glow': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'gradient-heatmap': 'linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)',
        'grid-pattern': 'linear-gradient(rgba(79, 70, 229, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 70, 229, 0.03) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
        'dots': '20px 20px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 70, 229, 0.4)',
        'glow-accent': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-lg': '0 0 30px rgba(79, 70, 229, 0.5)',
        'glow-xl': '0 0 40px rgba(79, 70, 229, 0.6)',
        'inner-glow': 'inset 0 0 20px rgba(79, 70, 229, 0.2)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-text': {
          '0%, 100%': { textShadow: '0 0 10px currentColor, 0 0 20px currentColor' },
          '50%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        scanline: 'scanline 8s linear infinite',
        'shimmer-text': 'shimmer-text 3s linear infinite',
        'glow-text': 'glow-text 2s ease-in-out infinite',
      },
      fontFamily: {
        'mono': ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      blur: {
        'xs': '2px',
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      },
    },
  },
  plugins: [],
}