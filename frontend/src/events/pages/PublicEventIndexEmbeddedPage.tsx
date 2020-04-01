import { withApollo, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import UpcomingEventsListBlock from '~/events/components/UpcomingEventsListBlock';

const PublicEventIndexPage: NextApolloPage = () => {
  return (
    <Page title="Расписание мероприятий - iframe" chrome="none" noVkWidget>
      <UpcomingEventsListBlock />
    </Page>
  );
};

export default withApollo(PublicEventIndexPage);
