import { formats } from 'react-big-calendar/lib/localizers/date-fns';
import { DateLocalizer } from 'react-big-calendar/lib/localizer';
import * as dates from 'react-big-calendar/lib/utils/dates';

import { format as _format, startOfWeek, getDay } from 'date-fns';
import { ru } from 'date-fns/locale';

const weekRangeFormat = (
  { start, end }: { start: Date; end: Date },
  culture: string,
  local: any
) =>
  `${local.format(start, 'LLLL dd', culture)} – ${local.format(
    end,
    dates.eq(start, end, 'month') ? 'dd' : 'LLLL dd',
    culture
  )}`;

// heavily patched formats for dateFnsLocalizer (TODO - submit PR to upstream)
const patchedFormats = {
  ...formats,
  dayFormat: 'dd eeeeee',
  weekdayFormat: 'eeeeee',
  monthHeaderFormat: 'LLLL yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  agendaDateFormat: 'cccccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
};

console.log(formats);
console.log(patchedFormats);

export const localizer = new DateLocalizer({
  formats: patchedFormats,
  firstOfWeek() {
    return getDay(startOfWeek(new Date(), { locale: ru }));
  },

  format(value: any, formatString: string) {
    return _format(new Date(value), formatString, {
      locale: ru,
    });
  },
});
