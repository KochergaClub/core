import { useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { ParsedUrlQuery } from 'querystring';

import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import { useAPI } from '~/common/hooks';
import { staticUrl } from '~/common/utils';

import GlobalStyle from './GlobalStyle';

import { Sidebar } from './Sidebar';
import { WithSidebar } from './WithSidebar';

import { RootStore } from './stores/RootStore';

import { Context } from './common';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import ScheduleScreen from './schedule/ScheduleScreen';
import EventScreen from './event/EventScreen';

interface Props {
  route: string;
  query: ParsedUrlQuery;
}

const App: NextApolloPage<Props> = observer(({ route, query }) => {
  const api = useAPI();
  const [store] = useState(() => new RootStore(api));

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
      <Context.Provider value={store}>
        <Head>
          <link rel="stylesheet" href={staticUrl('react-toggle/style.css')} />
          <link
            rel="stylesheet"
            href={staticUrl('react-dates/datepicker.css')}
          />
        </Head>
        <GlobalStyle />
        <WithSidebar sidebar={<Sidebar selected={tab} />}>{inner}</WithSidebar>
      </Context.Provider>
    </Page>
  );
});

App.getInitialProps = async ({ pathname, query }) => {
  return {
    route: pathname,
    query,
  };
};

export default withApollo(withStaff(App));
