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
      highlight: '#ffffb3', // matches frontkit highlight color
    },
  },
  corePlugins: {
    preflight: false,
  },
};
