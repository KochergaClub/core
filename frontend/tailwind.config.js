const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{ts,tsx}'],
  theme: {
    boxShadow: {
      card: '0 2px 5px rgba(0, 0, 0, 0.3)',
      floating: '0 4px 8px rgba(0, 0, 0, 0.4)',
      toast: '0 6px 12px rgba(0, 0, 0, 0.3)',
    },
    zIndex: {
      // this version is more compatible with tilda which uses large z-index values (e.g. `990` for its t582 block)
      '-10': '-10',
      0: '0',
      10: '1000',
      20: '2000',
      30: '3000',
      40: '4000',
      50: '5000',
    },
    extend: {
      screens: {
        print: { raw: 'print' },
      },
      minWidth: {
        64: '16rem',
        xs: '20rem', // used in Modal
        lg: '32rem',
      },
      minHeight: {
        80: '20rem',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
      transitionProperty: {
        width: 'width',
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
        link: `hsl(210, 80%, 50%)`,
      },
      accent: {
        100: `hsl(0, 100%, 90%)`,
        300: `hsl(0, 100%, 80%)`,
        500: `hsl(0, 100%, 74%)`,
        700: `hsl(0, 100%, 70%)`,
        900: `hsl(0, 60%, 60%)`,
      },
      green: {
        100: `hsl(108, 100%, 95%)`,
        300: `hsl(112, 48%, 62%)`,
        500: `hsl(113, 55%, 39%)`,
        700: `hsl(114, 73%, 23%)`,
        900: `hsl(116, 79%, 11%)`,
      },
      highlight: '#ffffb3', // matches frontkit highlight color
      'top-menu-highlight': {
        DEFAULT: 'hsl(120, 40%, 55%)',
        hover: 'hsl(120, 40%, 45%)',
      },
      'team-menu': '#417690',
      'alert-card': {
        border: 'hsl(40, 50%, 80%)',
        background: 'hsl(40, 50%, 90%)',
      },
    },
  },
  variants: {
    extend: {
      brightness: ['hover'], // used in image editor
    },
  },
  corePlugins: {
    preflight: false,
  },
};
