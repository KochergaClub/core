export type BreakpointName = 'tablet' | 'laptop' | 'desktop';
export type DeviceName = 'mobile' | 'tablet' | 'laptop' | 'desktop';

export const breakpoints: { [k in BreakpointName]: number } = {
  tablet: 640,
  laptop: 960,
  desktop: 1200,
}

const buildQuery = (min: BreakpointName | undefined, max: BreakpointName | undefined, style: string) => (
  '@media ' +
    (min ? `(min-width: ${breakpoints[min]}px)` : '')
    + (min && max ? ' and ' : '')
    + (max ? `(max-width: ${breakpoints[max] - 1}px)` : '')
    + ` {
    ${style}
  }`
);

export const deviceMediaQueries: {[k in DeviceName]: (style: string) => string } = {
  mobile: style => buildQuery(undefined, 'tablet', style),
  tablet: style => buildQuery('tablet', 'laptop', style),
  laptop: style => buildQuery('laptop', 'desktop', style),
  desktop: style => buildQuery('desktop', undefined, style),
};
