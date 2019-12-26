import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const IS_SERVER = typeof window === 'undefined';

// Note that if we get locations in multiple timezones we could load the location timezone from the server.
export const timezone = 'Europe/Moscow';

export const formatDate = (date: Date, formatStr: string) =>
  format(date, formatStr, { locale: ru });

export const parseQueryString = (
  queryString: string
): { [k: string]: string } => {
  const params = new URLSearchParams(queryString);

  const result: { [k: string]: string } = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

export const buildQueryString = (params: { [s: string]: string | boolean }) => {
  const esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k] as string))
    .join('&');
};

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
