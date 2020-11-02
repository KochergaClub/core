//colors are defined in Figma: https://www.figma.com/file/Owlt9VzPkmuj2egTQ8C0LKiH/Кочерга?node-id=173%3A86
export const highlight = '#ffffb3';

export const hues = {
  grey: 208,
  blue: 210,
  red: 0,
};

export const primary = {
  100: `hsl(${hues.blue}, 80%, 95%)`,
  300: `hsl(${hues.blue}, 55%, 80%)`,
  500: `hsl(${hues.blue}, 55%, 55%)`,
  700: `hsl(${hues.blue}, 55%, 35%)`,
  900: `hsl(${hues.blue}, 55%, 20%)`,
};

export const link = `hsl(${hues.blue}, 80%, 50%)`;

export const grey = {
  100: `hsl(${hues.blue}, 20%, 97%)`,
  200: `hsl(${hues.blue}, 12%, 92%)`,
  300: `hsl(${hues.blue}, 12%, 80%)`,
  400: `hsl(${hues.blue}, 12%, 70%)`,
  500: `hsl(${hues.blue}, 12%, 58%)`,
  600: `hsl(${hues.blue}, 12%, 43%)`,
  700: `hsl(${hues.blue}, 12%, 38%)`,
  800: `hsl(${hues.blue}, 12%, 33%)`,
  900: `hsl(${hues.blue}, 12%, 28%)`,
};

export const accent = {
  100: `hsl(${hues.red}, 100%, 90%)`,
  300: `hsl(${hues.red}, 100%, 80%)`,
  500: `hsl(${hues.red}, 100%, 74%)`,
  700: `hsl(${hues.red}, 100%, 70%)`,
  900: `hsl(${hues.red}, 60%, 60%)`,
};

export const good = {
  100: `hsl(108, 100%, 95%)`,
  300: `hsl(112, 48%, 62%)`,
  500: `hsl(113, 55%, 39%)`,
  700: `hsl(114, 73%, 23%)`,
  900: `hsl(116, 79%, 11%)`,
};
