import FullCalendar from '@fullcalendar/react';
import { useApolloClient, useQuery } from '@apollo/client';
import { EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import '@fullcalendar/react'; // side effects! please be careful with auto-sorting imports
import { isPast, parseISO } from 'date-fns';
import Router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate } from '~/common/utils';
import { AlertCard, ApolloQueryResults, PaddedBlock } from '~/components';
import { A } from '~/frontkit';
import {
  EventsPublicGoogleCalendarDocument,
  PublicEventsForCalendarDocument,
} from '../../queries.generated';
import { publicEventRoute } from '../../routes';
import styles from './index.module.css';

const PublicEventsCalendar: React.FC = () => {
  const googleCalendarQueryResults = useQuery(
    EventsPublicGoogleCalendarDocument
  );

  const apolloClient = useApolloClient();

  const events = useCallback(
    async ({ start, end }: { start: Date; end: Date }) => {
      const queryResults = await apolloClient.query({
        query: PublicEventsForCalendarDocument,
        variables: {
          from: formatDate(start, 'yyyy-MM-dd'),
          to: formatDate(end, 'yyyy-MM-dd'),
        },
      });

      if (!queryResults.data) {
        throw new Error('Empty data');
      }
      const result = queryResults.data.publicEvents.nodes.map((event) => {
        const past = isPast(parseISO(event.start));
        const classNames = [];
        if (past) {
          classNames.push('fc-kocherga-past');
        }
        if (event.public_tags.includes('ratio')) {
          //// disabled for now: colors are ugly and semantics is unclear to end users
          // classNames.push('fc-kocherga-ratio');
        }

        return {
          ...event,
          event_id: event.id, // id attr is special in FullCalendar and can't be used from externalProps
          classNames,
        };
      });
      return result;
    },
    [apolloClient]
  );

  const navigate = useCallback(({ event }: EventClickArg) => {
    const url = publicEventRoute(event.extendedProps.event_id); // don't try to use .id here!
    if (window.location !== window.parent.location) {
      // we're in iframe
      window.open(url, '_parent');
      return;
    }
    Router.push(url).then(() => window.scrollTo(0, 0));
  }, []);

  const [calendarView, setCalendarView] = useState('dayGridTwoWeeks');
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    if (typeof window !== 'object') {
      return;
    }

    const updateWidth = () => {
      const width = window.innerWidth;
      setCalendarView(width < 800 ? 'listWeek' : 'dayGridTwoWeeks');
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    if (!calendarRef.current) {
      return;
    }
    calendarRef.current.getApi().changeView(calendarView);
  }, [calendarView]);

  return (
    <PaddedBlock width="max">
      <div className={styles.calendar}>
        <FullCalendar
          ref={calendarRef}
          height="auto"
          initialView={calendarView}
          views={{
            dayGridTwoWeeks: {
              type: 'dayGrid',
              duration: { weeks: 2 },
            },
          }}
          titleFormat={{ year: 'numeric', month: 'long', day: 'numeric' }}
          plugins={[dayGridPlugin, listPlugin]}
          fixedWeekCount={false}
          locale={ruLocale}
          events={events}
          eventTimeFormat={{
            hour: '2-digit',
            minute: '2-digit',
            omitZeroMinute: false,
          }}
          eventClick={navigate}
        />
      </div>
      <ApolloQueryResults {...googleCalendarQueryResults}>
        {({ data: { eventsPublicGoogleCalendar: gCalendar } }) => {
          if (!gCalendar) {
            return null;
          }
          return (
            <AlertCard>
              Хотите видеть события Кочерги в своём календаре? Тогда подпишитесь
              на наш <A href={gCalendar.url}>Google-календарь</A>.
            </AlertCard>
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default PublicEventsCalendar;
