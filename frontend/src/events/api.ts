import { API } from '~/common/api';

import { ServerEvent } from './types';

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
