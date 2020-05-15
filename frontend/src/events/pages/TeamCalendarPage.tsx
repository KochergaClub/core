import styled from 'styled-components';

import { format } from 'date-fns-tz';
import { addDays, subDays, startOfWeek, endOfWeek } from 'date-fns';

import { withApollo } from '~/apollo';
import { NextPage } from '~/common/types';

import { Page } from '~/components';

import EventCalendar from '~/events/components/EventCalendar';

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
  range: { start: string; end: string };
}

const TeamCalendarPage: NextPage<Props> = ({ range }) => {
  return (
    <Page title="Календарь событий" menu="team" chrome="fullscreen">
      <OuterContainer>
        <Page.Title>Календарь событий</Page.Title>
        <Container>
          <EventCalendar range={range} />
        </Container>
      </OuterContainer>
    </Page>
  );
};

TeamCalendarPage.getInitialProps = async () => {
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

  return {
    range,
  };
};

export default withApollo(TeamCalendarPage);
