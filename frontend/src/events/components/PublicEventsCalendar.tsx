import { isPast, parseISO } from 'date-fns';
import Router from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useApolloClient } from '@apollo/client';
import { EventClickArg } from '@fullcalendar/core';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { A, colors, deviceMediaQueries } from '@kocherga/frontkit';

import { formatDate } from '~/common/utils';
import { AlertCard, ApolloQueryResults, PaddedBlock } from '~/components';

import {
    PublicEventsForCalendarDocument, PublicEventsForCalendarQuery,
    PublicEventsForCalendarQueryVariables, useEventsPublicGoogleCalendarQuery
} from '../queries.generated';
import { publicEventRoute } from '../routes';

const Container = styled.div`
  &&& {
    .fc-event {
      font-size: 12px;
      cursor: pointer;
      background-color: ${colors.primary[500]};
      padding: 0 1px;
      color: white;
    }
    .fc-event-time {
      font-weight: bold;
    }
    .fc-event-title {
      font-weight: normal;
    }

    .fc-kocherga-ratio {
      background-color: ${colors.accent[500]};
    }
    .fc-kocherga-past {
      background-color: ${colors.primary[300]};
    }
    .fc-kocherga-past.fc-kocherga-ratio {
      background-color: ${colors.accent[300]};
    }

    .fc-daygrid-event-dot {
      display: none;
    }
    .fc-list-event-dot {
      display: none;
    }

    .fc-toolbar-title {
      font-size: 1.2em;
    }

    ${deviceMediaQueries.mobile(`
    .fc-toolbar {
      flex-direction: column;
    }
    `)}
  }
`;

const PublicEventsCalendar = () => {
  const googleCalendarQueryResults = useEventsPublicGoogleCalendarQuery();

  const apolloClient = useApolloClient();

  const events = useCallback(
    async ({ start, end }: { start: Date; end: Date }) => {
      const queryResults = await apolloClient.query<
        PublicEventsForCalendarQuery,
        PublicEventsForCalendarQueryVariables
      >({
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
          classNames.push('fc-kocherga-ratio');
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
    const route = publicEventRoute(event.extendedProps.event_id); // don't try to use .id here!
    if (window.location !== window.parent.location) {
      // we're in iframe
      window.open(route.as, '_parent');
      return;
    }
    Router.push(route.href, route.as).then(() => window.scrollTo(0, 0));
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
      <Container>
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
      </Container>
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
