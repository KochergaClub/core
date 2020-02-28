import { useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import { ParsedUrlQuery } from 'querystring';

import { Page } from '~/components';

import { selectUser } from '~/core/selectors';
import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';
import { APIError } from '~/common/api';
import { staticUrl } from '~/common/utils';

import GlobalStyle from './GlobalStyle';

import ErrorList from './ErrorList';

import { Sidebar } from './Sidebar';
import { WithSidebar } from './WithSidebar';

import { RootStore } from './stores/RootStore';

import { Context } from './common';

import EventPrototypeScreen from './event-prototype/EventPrototypeScreen';
import ScheduleScreen from './schedule/ScheduleScreen';
import EventScreen from './event/EventScreen';

import EventView from './views/EventView';

interface Props {
  route: string;
  query: ParsedUrlQuery;
}

const App: NextPage<Props> = observer(({ route, query }) => {
  const api = useAPI();
  const [store] = useState(() => new RootStore(api));

  let inner: JSX.Element | undefined;

  if (route === '/team/evenman') {
    store.setEventView({
      id: undefined,
      // FIXME // filter: queryObj(),
      filter: {},
    });
    inner = <EventScreen view={store.currentView as EventView} />;
  } else if (route === '/team/evenman/schedule') {
    inner = <ScheduleScreen />;
  } else if (route === '/team/evenman/event/[id]') {
    store.setEventView({
      id: query.id as string,
      filter: query,
    });
    inner = <EventScreen view={store.currentView as EventView} />;
  } else if (route === '/team/evenman/event-prototypes') {
    inner = <EventPrototypeScreen />;
  } else if (route === '/team/evenman/event-prototypes/[id]') {
    inner = (
      <EventPrototypeScreen selected_id={parseInt(query.id as string, 10)} />
    );
  } else {
    inner = <div>Unknown route {route}</div>;
  }

  return (
    <Page title="Event Manager" team chrome="fullscreen">
      <Context.Provider value={store}>
        <Head>
          <link rel="stylesheet" href={staticUrl('react-toggle/style.css')} />
          <link
            rel="stylesheet"
            href={staticUrl('react-dates/datepicker.css')}
          />
        </Head>
        <GlobalStyle />
        <ErrorList />
        <WithSidebar sidebar={<Sidebar />}>{inner}</WithSidebar>
      </Context.Provider>
    </Page>
  );
});

App.getInitialProps = async ({ store: { getState }, pathname, query }) => {
  const user = selectUser(getState());

  if (!user.email) {
    throw new APIError('You need to be logged in to see /team/evenman', 403);
  }

  return {
    route: pathname,
    query,
  };
};

export default App;
