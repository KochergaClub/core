import { format, parseISO, addMinutes } from 'date-fns';
import { A, Column } from '@kocherga/frontkit';
import { PaddedBlock } from '~/components';
import { buildQueryString } from '~/common/utils';
import { CommonProps } from './types';

import { publicEventRoute } from '../../routes';

const EventToCalendar: React.FC<CommonProps> = ({ event }) => {
  // https://stackoverflow.com/questions/10488831/link-to-add-to-google-calendar/21653600#21653600
  const buildLink = () => {
    const details = `Подробности: ${process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE}${
      publicEventRoute(event.id).as
    }`;

    const googleDateFormat = "yyyyMMdd'T'HHmmss'Z'";
    const toGoogleDate = (src: string) => {
      const offset = new Date().getTimezoneOffset();
      return format(addMinutes(parseISO(src), offset), googleDateFormat);
    };
    const dates = toGoogleDate(event.start) + '/' + toGoogleDate(event.end);

    return `https://calendar.google.com/calendar/r/eventedit?${buildQueryString(
      {
        text: event.title,
        dates,
        details,
      }
    )}`;
  };

  return (
    <PaddedBlock>
      <Column centered>
        <A href={buildLink()} target="_blank">
          Добавить в Google-календарь
        </A>
      </Column>
    </PaddedBlock>
  );
};

export default EventToCalendar;
