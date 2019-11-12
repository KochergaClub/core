import { useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import Page from '~/components/Page';

import { selectUser } from '~/core/selectors';
import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';
import { APIError } from '~/common/api';

import GlobalStyle from './GlobalStyle';

import ErrorList from './ErrorList';
import Main from './Main';

import { RootStore } from './stores/RootStore';

import { Context } from './common';
import { ParsedUrlQuery } from 'querystring';

interface Props {
  route: string;
  query: ParsedUrlQuery;
}

const App: NextPage<Props> = observer(({ route, query }) => {
  const api = useAPI();
  const [store] = useState(() => new RootStore(api));

  if (route === '/team/evenman') {
    store.setEventView({
      id: undefined,
      // FIXME // filter: queryObj(),
      filter: {},
    });
  } else if (route === '/team/evenman/event-prototypes') {
    store.setEventPrototypeView({ id: undefined });
  } else if (route === '/team/evenman/schedule') {
    store.setScheduleView();
  } else if (route === '/team/evenman/event-prototypes/[id]') {
    store.setEventPrototypeView({ id: parseInt(query.id as string, 10) });
  } else if (route === '/team/evenman/event/[id]') {
    store.setEventView({
      id: query.id as string,
      filter: query,
    });
  } else {
    /*
      }).configure({
        notfound: () => store.switchView('Event'), // FIXME
        html5history: true,
      });
    */
  }

  const renderInsides = () => {
    return <Main />;
  };

  return (
    <Page title="Event Manager" team noFooter>
      <Context.Provider value={store}>
        <Head>
          <link rel="stylesheet" href="/static/react-toggle/style.css" />
          <link rel="stylesheet" href="/static/react-dates/datepicker.css" />
        </Head>
        <div>
          <GlobalStyle />
          <ErrorList />
          {renderInsides()}
        </div>
      </Context.Provider>
    </Page>
  );
});

App.getInitialProps = async ({ store: { getState }, pathname, query }) => {
  const user = selectUser(getState());

  if (!user.email) {
    throw new APIError('You need to be logged in to see /my', 403);
  }

  return {
    route: pathname,
    query,
  };
};

export default App;
