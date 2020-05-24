import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import styled from 'styled-components';
import Router from 'next/router';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { EventApi } from '@fullcalendar/core';

import { PaddedBlock } from '~/components';
import { formatDate } from '~/common/utils';
import {
  PublicEventsForCalendarDocument,
  PublicEventsForCalendarQuery,
  PublicEventsForCalendarQueryVariables,
} from '../queries.generated';
import { publicEventRoute } from '../routes';

const Container = styled.div`
  .fc-event {
    font-size: 12px;
    cursor: pointer;
  }
`;

const PublicEventsCalendar = () => {
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
      return queryResults.data.publicEvents.nodes;
    },
    [apolloClient]
  );

  const navigate = useCallback(({ event }: { event: EventApi }) => {
    const route = publicEventRoute(event.extendedProps.event_id);
    Router.push(route.href, route.as).then(() => window.scrollTo(0, 0));
  }, []);

  return (
    <PaddedBlock width="max">
      <Container>
        <FullCalendar
          aspectRatio={1.8}
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
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
    </PaddedBlock>
  );
};

export default PublicEventsCalendar;
