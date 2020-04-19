interface Route {
  href: string;
  as: string;
}

export const rootRoute = (): Route => ({
  href: '/team/evenman',
  as: '/team/evenman',
});

export const eventRoute = (id: string): Route => ({
  href: '/team/evenman/event/[id]',
  as: `/team/evenman/event/${id}`,
});

export const prototypeRoute = (id: string): Route => ({
  href: '/team/evenman/event-prototypes/[id]',
  as: `/team/evenman/event-prototypes/${id}`,
});
