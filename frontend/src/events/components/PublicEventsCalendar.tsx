import { useCallback, useState, useEffect, useRef } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import styled from 'styled-components';
import Router from 'next/router';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';
import { EventApi } from '@fullcalendar/core';

import { isPast } from 'date-fns';

import { colors, A } from '@kocherga/frontkit';

import { PaddedBlock, AlertCard, ApolloQueryResults } from '~/components';
import { formatDate } from '~/common/utils';
import {
  PublicEventsForCalendarDocument,
  PublicEventsForCalendarQuery,
  PublicEventsForCalendarQueryVariables,
  useEventsPublicGoogleCalendarQuery,
} from '../queries.generated';
import { publicEventRoute } from '../routes';

const Container = styled.div`
  .fc-event {
    font-size: 12px;
    cursor: pointer;
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
      return queryResults.data.publicEvents.nodes.map(event => {
        const past = isPast(new Date(event.start));
        return {
          ...event,
          backgroundColor: past ? colors.primary[300] : colors.primary[500],
          borderColor: past ? colors.primary[300] : colors.primary[500],
        };
      });
    },
    [apolloClient]
  );

  const navigate = useCallback(({ event }: { event: EventApi }) => {
    const route = publicEventRoute(event.extendedProps.event_id);
    Router.push(route.href, route.as).then(() => window.scrollTo(0, 0));
  }, []);

  const [calendarView, setCalendarView] = useState('dayGridTwoWeeks');
  const calendarRef = useRef(null);

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
    // just setting defaultView prop is not enough, at least on fullcalendar v4
    (calendarRef.current as any).getApi().changeView(calendarView);
  }, [calendarView]);

  return (
    <PaddedBlock width="max">
      <Container>
        <FullCalendar
          ref={calendarRef}
          height="auto"
          defaultView={calendarView}
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
              на наш
              <A href={gCalendar.url}>Google-календарь</A>.
            </AlertCard>
          );
        }}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default PublicEventsCalendar;
