const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      zIndex: {
        '-10': '-10',
      },
      minWidth: {
        // used in Modal
        xs: '20rem',
        lg: '32rem',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.coolGray,
      white: colors.white,
      black: colors.black,
      // matches primary color from frontkit colors config
      primary: {
        100: `hsl(210, 80%, 95%)`,
        300: `hsl(210, 55%, 80%)`,
        500: `hsl(210, 55%, 55%)`,
        700: `hsl(210, 55%, 35%)`,
        900: `hsl(210, 55%, 20%)`,
      },
      accent: {
        100: `hsl(0, 100%, 90%)`,
        300: `hsl(0, 100%, 80%)`,
        500: `hsl(0, 100%, 74%)`,
        700: `hsl(0, 100%, 70%)`,
        900: `hsl(0, 60%, 60%)`,
      },
      highlight: '#ffffb3', // matches frontkit highlight color
      'top-menu-highlight': {
        DEFAULT: 'hsl(120, 40%, 55%)',
        hover: 'hsl(120, 40%, 45%)',
      },
      'team-menu': '#417690',
    },
  },
  corePlugins: {
    preflight: false,
  },
};
