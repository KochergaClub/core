import { API } from '~/common/api';

import { Event, ServerEvent, NewEvent, serverEventToEvent } from './types';

export interface Range {
  // YYYY-MM-DD format; not Date, because it needs to be serializable.
  start: string;
  end: string;
}

export const getEventsInRange = async (api: API, range: Range) => {
  return (await api.call(
    `events?from_date=${range.start}&to_date=${range.end}`,
    'GET'
  )) as ServerEvent[];
};

export const getEvent = async (api: API, uuid: string) => {
  return (await api.call(`events/${uuid}`, 'GET')) as ServerEvent;
};

export const searchEvents = async (
  api: API,
  { query }: { query: string }
): Promise<Event[]> => {
  const { results: serverEvents } = (await api.call(
    `events-paged?search=${query}`,
    'GET'
  )) as { results: ServerEvent[] };

  return serverEvents.map(serverEventToEvent);
};

// FIXME - EventPatch interface
export const patchEvent = async (
  api: API,
  event: Event,
  patch: any
): Promise<Event> => {
  const json = (await api.call(
    `event/${event.id}`,
    'PATCH',
    patch
  )) as ServerEvent;
  return serverEventToEvent(json);
};

export const deleteEvent = async (api: API, event: Event) => {
  await api.call(`event/${event.id}`, 'DELETE', undefined, {
    expectJSON: false,
  });
};

export const createEvent = async (
  api: API,
  params: NewEvent
): Promise<Event> => {
  const json = (await api.call('events', 'POST', params)) as ServerEvent;
  const event = serverEventToEvent(json);
  return event;
};
