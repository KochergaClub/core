import { useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import Page from '~/components/Page';

import { NextPage } from '~/common/types';
import { useAPI } from '~/common/hooks';

import GlobalStyle from './GlobalStyle';

import ErrorList from './ErrorList';
import Main from './Main';

import SignInScreen from './sign-in/SignInScreen';
import SignInView from './views/SignInView';

import { RootStore } from './stores/RootStore';

import { Context } from './common';

interface Props {
  route: string;
}

const App: NextPage<Props> = observer(({ route }) => {
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
  } else {
    // TODO
    // '/event/:id': (id: string) => {
    //   store.setEventView({
    //     id,
    //     filter: queryObj(),
    //   });
    // },
    // '/event-prototypes/:id': (id: string) => {
    //   store.setEventPrototypeView({ id: parseInt(id, 10) });
    // },
    /*
      }).configure({
        notfound: () => store.switchView('Event'), // FIXME
        html5history: true,
      });
    */
  }

  const renderInsides = () => {
    if (store.currentView.name === 'SignIn') {
      return <SignInScreen view={store.currentView as SignInView} />;
    }

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

App.getInitialProps = async ({ pathname }) => {
  return {
    route: pathname,
  };
};

export default App;
