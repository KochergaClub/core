import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';

import { PaddedBlock } from '~/components';
import { formatDate } from '~/common/utils';
import {
  PublicEventsForCalendarDocument,
  PublicEventsForCalendarQuery,
  PublicEventsForCalendarQueryVariables,
} from '../queries.generated';
import styled from 'styled-components';

const Container = styled.div`
  .fc-event {
    font-size: 12px;
  }
`;

const PublicEventsCalendar = () => {
  const apolloClient = useApolloClient();

  const events = useCallback(
    async ({ start, end }: { start: Date; end: Date }) => {
      console.log({ start, end });
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

  return (
    <PaddedBlock>
      <Container>
        <FullCalendar
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
        />
      </Container>
    </PaddedBlock>
  );
};

export default PublicEventsCalendar;
