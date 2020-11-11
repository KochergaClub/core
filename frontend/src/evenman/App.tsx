import { useRouter } from 'next/router';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import EventScreen from './event/EventScreen';
import GlobalStyle from './GlobalStyle';
import { PREFIX } from './routes';
import ScheduleScreen from './schedule/ScheduleScreen';

const tabs = [
  { title: 'Расписание', name: 'Schedule' },
  { title: 'События', name: 'Event' },
  {
    title: 'Прототипы событий',
    name: 'EventPrototype',
  },
];

const App: NextApolloPage = () => {
  const router = useRouter();

  const renderTab = (name: string) => {
    switch (name) {
      case 'Event':
        const event_id = router.query.id as string;
        return <EventScreen selected_id={event_id} />;
      case 'Schedule':
        return <ScheduleScreen />;
      case 'EventPrototype':
        const prototype_id = parseInt(router.query.id as string, 10);
        return <EventPrototypeScreen selected_id={prototype_id} />;
      default:
        return <div>Unknown route {name}</div>;
    }
  };

  const detectTab = () => {
    const route = router.pathname;
    if (route === PREFIX) {
      return 'Event';
    } else if (route === `${PREFIX}/schedule`) {
      return 'Schedule';
    } else if (route === `${PREFIX}/event/[id]`) {
      return 'Event';
    } else if (route === `${PREFIX}/event-prototypes`) {
      return 'EventPrototype';
    } else if (route === `${PREFIX}/event-prototypes/[id]`) {
      return 'EventPrototype';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      Schedule: `${PREFIX}/schedule`,
      Event: PREFIX,
      EventPrototype: `${PREFIX}/event-prototypes`,
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  return (
    <Page title="Event Manager" chrome="fullscreen">
      <GlobalStyle />
      <WithNavSidebar
        tabs={tabs}
        header={{
          title: 'Event Manager',
          tabName: 'Event',
          href: PREFIX,
        }}
        selected={selected}
        selectTab={selectTab}
        renderTab={renderTab}
      />
    </Page>
  );
};

App.getInitialProps = async (ctx) => {
  const { apolloClient } = ctx;

  await requireAuth(apolloClient, { permissions: ['events.manage'] });

  return {};
};

export default withApollo(App);
