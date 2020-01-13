import { NextPage } from '~/common/types';
import { Page } from '~/components';

import EventsListBlock from '~/events/components/EventsListBlock';

const PublicEventIndexPage: NextPage = () => {
  return (
    <Page title="Расписание мероприятий - iframe" chrome="none" noVkWidget>
      <EventsListBlock />
    </Page>
  );
};

export default PublicEventIndexPage;
