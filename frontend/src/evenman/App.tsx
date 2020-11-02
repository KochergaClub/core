import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { staticUrl } from '~/common/utils';
import { Page } from '~/components';
import { WithNavSidebar } from '~/frontkit';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import EventScreen from './event/EventScreen';
import GlobalStyle from './GlobalStyle';
import ScheduleScreen from './schedule/ScheduleScreen';

interface Props {
  route: string;
  query: ParsedUrlQuery;
}

const tabs = [
  { title: 'Расписание', name: 'Schedule' },
  { title: 'События', name: 'Event' },
  {
    title: 'Прототипы событий',
    name: 'EventPrototype',
  },
];

const App: NextApolloPage<Props> = () => {
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
    if (route === '/team/evenman') {
      return 'Event';
    } else if (route === '/team/evenman/schedule') {
      return 'Schedule';
    } else if (route === '/team/evenman/event/[id]') {
      return 'Event';
    } else if (route === '/team/evenman/event-prototypes') {
      return 'EventPrototype';
    } else if (route === '/team/evenman/event-prototypes/[id]') {
      return 'EventPrototype';
    } else {
      return '';
    }
  };
  const selected = detectTab();

  const selectTab = (name: string) => {
    const name2path: Record<string, string> = {
      Schedule: '/team/evenman/schedule',
      Event: '/team/evenman',
      EventPrototype: '/team/evenman/event-prototypes',
    };
    const path = name2path[name];
    if (path) {
      router.push(path);
    }
  };

  return (
    <Page title="Event Manager" menu="team" chrome="fullscreen">
      <Head>
        <link rel="stylesheet" href={staticUrl('react-toggle/style.css')} />
        <link
          rel="stylesheet"
          href={staticUrl('react-datepicker/react-datepicker.min.css')}
        />
      </Head>
      <GlobalStyle />
      <WithNavSidebar
        tabs={tabs}
        header={{
          title: 'Event Manager',
          tabName: 'Event',
          href: '/team/evenman',
        }}
        selected={selected}
        selectTab={selectTab}
        renderTab={renderTab}
      />
    </Page>
  );
};

export default withApollo(withStaff(App));
