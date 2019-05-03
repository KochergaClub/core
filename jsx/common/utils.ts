import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const IS_SERVER = typeof window === 'undefined';

// Note that if we get locations in multiple timezones we could load the location timezone from the server.
export const timezone = 'Europe/Moscow';

export const formatDate = (date: Date, formatStr: string) =>
  format(date, formatStr, { locale: ru });
