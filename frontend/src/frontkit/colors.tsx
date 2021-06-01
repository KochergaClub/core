//colors are defined in Figma: https://www.figma.com/file/Owlt9VzPkmuj2egTQ8C0LKiH/Кочерга?node-id=173%3A86
export const highlight = '#ffffb3';

export const hues = {
  grey: 208,
  blue: 210,
  red: 0,
};

// matches primary color from tailwind config
export const primary = {
  100: `hsl(${hues.blue}, 80%, 95%)`,
  300: `hsl(${hues.blue}, 55%, 80%)`,
  500: `hsl(${hues.blue}, 55%, 55%)`,
  700: `hsl(${hues.blue}, 55%, 35%)`,
  900: `hsl(${hues.blue}, 55%, 20%)`,
};

// matches primary.link in tailwind config
export const link = `hsl(${hues.blue}, 80%, 50%)`;

// matches tailwind coolGray
export const grey = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',
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
