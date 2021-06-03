import { addDays, endOfWeek, startOfWeek, subDays } from 'date-fns';
import { format } from 'date-fns-tz';

import { withApollo, withStaff } from '~/apollo';
import { NextPage } from '~/common/types';
import { Page } from '~/components';
import EventCalendar from '~/events/components/EventCalendar';

interface Props {
  range: { start: string; end: string };
}

const TeamCalendarPage: NextPage<Props> = ({ range }) => {
  return (
    <Page title="Календарь событий" menu="team" chrome="fullscreen">
      <div className="flex flex-col h-full">
        <Page.Title>Календарь событий</Page.Title>
        <div className="flex-1 overflow-auto">
          <EventCalendar range={range} />
        </div>
      </div>
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

export default withApollo(withStaff(TeamCalendarPage));
