/**
 * Guudle — canonical Tailwind config (same on every page).
 * Teal, cyan and aqua names map to Dark Navy so older utilities stay on-brand.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#002080',
          50: '#F7F9FC',
          100: '#E8EDF3',
          200: '#C5D0DE',
          300: '#8AA0B8',
          400: '#4E6A8A',
          500: '#142D4E',
          600: '#002080',
          700: '#002080',
          800: '#071629',
          900: '#071629',
        },
        teal: {
          50: '#F7F9FC',
          100: '#E8EDF3',
          200: '#C5D0DE',
          300: '#8AA0B8',
          400: '#4E6A8A',
          500: '#002080',
          600: '#142D4E',
          700: '#002080',
          800: '#071629',
          900: '#071629',
        },
        'deep-blue': '#071629',
        'royal-blue': '#002080',
        cyan: {
          DEFAULT: '#002080',
          50: '#F7F9FC',
          100: '#E8EDF3',
          200: '#C5D0DE',
          300: '#8AA0B8',
          400: '#4E6A8A',
          500: '#002080',
          600: '#142D4E',
          700: '#002080',
          800: '#071629',
          900: '#071629',
        },
        aqua: {
          DEFAULT: '#002080',
          light: '#F7F9FC',
          dark: '#071629',
          hover: '#142D4E',
          accent: '#002080',
          start: '#002080',
          end: '#142D4E',
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
