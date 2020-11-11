export const PREFIX = '/events/manage';

export const evenmanRootRoute = () => PREFIX;

export const evenmanEventRoute = (id: string) => `${PREFIX}/event/${id}`;

export const prototypeRoute = (id: string) =>
  `${PREFIX}/event-prototypes/${id}`;
