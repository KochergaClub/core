import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { staticUrl } from '~/common/utils';
import { Page } from '~/components';
import { WithSidebar } from '~/frontkit';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import EventScreen from './event/EventScreen';
import GlobalStyle from './GlobalStyle';
import ScheduleScreen from './schedule/ScheduleScreen';
import Sidebar from './Sidebar';

interface Props {
  route: string;
  query: ParsedUrlQuery;
}

const App: NextApolloPage<Props> = ({ route, query }) => {
  let inner: JSX.Element | undefined;
  let tab = '';

  if (route === '/team/evenman') {
    inner = <EventScreen />;
    tab = 'Event';
  } else if (route === '/team/evenman/schedule') {
    inner = <ScheduleScreen />;
    tab = 'Schedule';
  } else if (route === '/team/evenman/event/[id]') {
    inner = <EventScreen selected_id={query.id as string} />;
    tab = 'Event';
  } else if (route === '/team/evenman/event-prototypes') {
    inner = <EventPrototypeScreen />;
    tab = 'EventPrototype';
  } else if (route === '/team/evenman/event-prototypes/[id]') {
    inner = (
      <EventPrototypeScreen selected_id={parseInt(query.id as string, 10)} />
    );
    tab = 'EventPrototype';
  } else {
    inner = <div>Unknown route {route}</div>;
  }

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
      <WithSidebar sidebar={<Sidebar selected={tab} />}>{inner}</WithSidebar>
    </Page>
  );
};

App.getInitialProps = async ({ pathname, query }) => {
  return {
    route: pathname,
    query,
  };
};

export default withApollo(withStaff(App));
