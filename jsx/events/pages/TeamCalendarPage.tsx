import styled from 'styled-components';

import { format } from 'date-fns-tz';
import { addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import EventCalendar from '~/events/components/EventCalendar';

import { ServerEvent } from '~/events/types';

import { getEventsInRange } from '~/events/api';

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
`;

const Container = styled.div`
  flex: 1;
  overflow: auto;
`;

interface Props {
  events: ServerEvent[];
  range: { start: string; end: string };
  children?: React.ReactNode;
}

const TeamCalendarPage: NextPage<Props> = ({ events, range }) => {
  return (
    <Page title="Календарь событий" team chrome="fullscreen">
      <OuterContainer>
        <Page.Title>Календарь событий</Page.Title>
        <Container>
          <EventCalendar events={events} range={range} />
        </Container>
      </OuterContainer>
    </Page>
  );
};

TeamCalendarPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const range = {
    start: format(
      subDays(startOfWeek(new Date(), { weekStartsOn: 1 }), 1),
      'yyyy-MM-dd'
    ),
    end: format(
      addDays(endOfWeek(new Date(), { weekStartsOn: 1 }), 1),
      'yyyy-MM-dd'
    ),
  };

  const events = await getEventsInRange(api, range);

  return {
    events,
    range,
  };
};

export default TeamCalendarPage;
