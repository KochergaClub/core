import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import { Page } from '~/components';

import UpcomingEventsListBlock from '~/events/components/UpcomingEventsListBlock';

const PublicEventIndexPage: NextPage = () => {
  return (
    <Page title="Расписание мероприятий - iframe" chrome="none" noVkWidget>
      <UpcomingEventsListBlock />
    </Page>
  );
};

export default withApollo(PublicEventIndexPage);
