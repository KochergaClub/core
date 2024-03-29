export const PREFIX = '/events/manage';

export const evenmanRootRoute = () => PREFIX;

export const evenmanEventRoute = (id: string) => `${PREFIX}/event/${id}`;

export const prototypeRoute = (id: string) =>
  `${PREFIX}/event-prototypes/${id}`;

export const leadsRoute = () => `${PREFIX}/leads`;
export const leadDetailsRoute = (id: string) => `${PREFIX}/leads/${id}`;

export const initiativesRoute = () => `${PREFIX}/initiatives`;
export const initiativeDetailsRoute = (id: string) =>
  `${PREFIX}/initiatives/${id}`;
