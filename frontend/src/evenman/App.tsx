import { useRouter } from 'next/router';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import EventScreen from './event/EventScreen';
import { LeadDetailsScreen } from './lead/LeadDetailsScreen';
import { LeadScreen } from './lead/LeadScreen';
import { PREFIX } from './routes';
import ScheduleScreen from './schedule/ScheduleScreen';

const tabs = [
  { title: 'Расписание', name: 'Schedule' },
  { title: 'События', name: 'Event' },
  {
    title: 'Прототипы событий',
    name: 'EventPrototype',
  },
  {
    title: 'Люди',
    name: 'Lead',
  },
];

const EvenmanApp: NextApolloPage = () => {
  const router = useRouter();

  const renderTab = (name: string) => {
    switch (name) {
      case 'Event':
        const event_id = router.query.id as string;
        return <EventScreen selected_id={event_id} />;
      case 'Schedule':
        return <ScheduleScreen />;
      case 'EventPrototype':
        const selected_id = router.query.id
          ? String(router.query.id)
          : undefined;
        return <EventPrototypeScreen selected_id={selected_id} />;
      case 'Lead':
        return <LeadScreen />;
      case 'LeadDetails':
        return <LeadDetailsScreen id={String(router.query.id)} />;
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
    } else if (route === `${PREFIX}/leads`) {
      return 'Lead';
    } else if (route === `${PREFIX}/leads/[id]`) {
      return 'LeadDetails';
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
      Lead: `${PREFIX}/leads`,
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  return (
    <Page title="Event Manager" chrome="fullscreen">
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

EvenmanApp.getInitialProps = async (ctx) => {
  const { apolloClient } = ctx;

  await requireAuth(apolloClient, { permissions: ['events.manage'] });

  return {};
};

export default withApollo(EvenmanApp);
