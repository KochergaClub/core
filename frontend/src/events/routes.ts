interface Route {
  href: string;
  as: string;
}

export const publicEventRoute = (id: string): Route => ({
  href: `/events/[id]`,
  as: `/events/${id}`,
});
