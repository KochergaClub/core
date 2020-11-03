import { addMinutes, format, parseISO } from 'date-fns';

import { buildQueryString } from '~/common/utils';
import { PaddedBlock } from '~/components';
import { A, Column } from '~/frontkit';

import { publicEventRoute } from '../../routes';
import { CommonProps } from './types';

const GOOGLE_DATE_FORMAT = "yyyyMMdd'T'HHmmss'Z'";

const toGoogleDate = (src: Date) => {
  const offset = new Date().getTimezoneOffset();
  return format(addMinutes(src, offset), GOOGLE_DATE_FORMAT);
};

const toIcsDate = toGoogleDate; // google and ics date formats are identical

const EventToCalendar: React.FC<CommonProps> = ({ event }) => {
  // https://stackoverflow.com/questions/10488831/link-to-add-to-google-calendar/21653600#21653600
  const buildLink = () => {
    const details = `Подробности: ${
      process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE
    }${publicEventRoute(event.id)}`;
    const dates =
      toGoogleDate(parseISO(event.start)) +
      '/' +
      toGoogleDate(parseISO(event.end));

    return `https://calendar.google.com/calendar/r/eventedit?${buildQueryString(
      {
        text: event.title,
        dates,
        details,
      }
    )}`;
  };

  const download = (filename: string, text: string) => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/calendar;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  const downloadIcs = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const ics = `BEGIN:VCALENDAR
PRODID:-//Kocherga//NONSGML Event Calendar//RU
VERSION:2.0
METHOD:PUBLISH
BEGIN:VEVENT
UID:${event.id}@events.kocherga-club.ru
DTSTART:${toIcsDate(parseISO(event.start))}
DTEND:${toIcsDate(parseISO(event.end))}
DTSTAMP:${toIcsDate(new Date())}
SUMMARY:${event.title}
DESCRIPTION:${event.summary}
URL:${window.location.href}
END:VEVENT
END:VCALENDAR`;
    download('hello.ics', ics);
  };

  return (
    <PaddedBlock>
      <Column centered>
        <A href={buildLink()} target="_blank">
          Добавить в Google-календарь
        </A>
        <A href="#" onClick={downloadIcs}>
          Скачать .ics (iCalendar)
        </A>
      </Column>
    </PaddedBlock>
  );
};

export default EventToCalendar;
