/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F3161',
          light: '#2A4280',
          dark: '#15234A',
          50: '#E8ECF5',
          100: '#D1D9EB',
          200: '#A3B3D7',
          300: '#758DC3',
          400: '#4767AF',
          500: '#1F3161',
          600: '#19284E',
          700: '#131E3A',
          800: '#0C1427',
          900: '#060A13',
        },
        secondary: {
          DEFAULT: '#C62127',
          light: '#E02A31',
          dark: '#A81B20',
          50: '#FCE8E9',
          100: '#F9D1D3',
          200: '#F3A3A7',
          300: '#ED757B',
          400: '#E7474F',
          500: '#C62127',
          600: '#A81B20',
          700: '#8A161A',
          800: '#6C1114',
          900: '#4E0C0E',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}