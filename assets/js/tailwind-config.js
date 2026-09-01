/**
 * Guudle — canonical Tailwind config (same on every page).
 * Teal/cyan names map to #10A5F5 brand cyan.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#37474F',
          50: '#F5F7FA',
          100: '#ECEFF1',
          200: '#CFD8DC',
          300: '#B0BEC5',
          400: '#90A4AE',
          500: '#78909C',
          600: '#546E7A',
          700: '#455A64',
          800: '#37474F',
          900: '#2E3440',
        },
        teal: {
          50: '#E6F4FE',
          100: '#CCF2FF',
          200: '#99E5FF',
          300: '#66D8FF',
          400: '#3DB8F7',
          500: '#10A5F5',
          600: '#0E96E8',
          700: '#0E96E8',
          800: '#0A7BC4',
          900: '#008FB3',
        },
        'deep-blue': '#455A64',
        'royal-blue': '#10A5F5',
        cyan: {
          DEFAULT: '#10A5F5',
          50: '#E6F4FE',
          100: '#CCF2FF',
          200: '#99E5FF',
          300: '#66D8FF',
          400: '#3DB8F7',
          500: '#10A5F5',
          600: '#0E96E8',
          700: '#0E96E8',
          800: '#0A7BC4',
          900: '#008FB3',
        },
        aqua: {
          DEFAULT: '#10A5F5',
          light: '#E6F4FE',
          dark: '#0E96E8',
          hover: '#0E96E8',
          accent: '#10A5F5',
          start: '#3DB8F7',
          end: '#0A7BC4',
        },
        'light-gray': '#F5F7FA',
        slate: {
          50: '#F5F7FA',
          100: '#ECEFF1',
          200: '#CFD8DC',
          300: '#B0BEC5',
          400: '#90A4AE',
          500: '#78909C',
          600: '#546E7A',
          700: '#455A64',
          800: '#37474F',
          900: '#2E3440',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
};
