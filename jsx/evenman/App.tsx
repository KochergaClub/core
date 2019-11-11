import { useState } from 'react';
import Head from 'next/head';
import { observer } from 'mobx-react-lite';

import {
  GlobalStyle as FrontkitGlobalStyle,
  GlobalFonts,
} from '@kocherga/frontkit';
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

const App: React.FC<Props> = observer(({ route }) => {
  const [store] = useState(() => new RootStore());

  // startRouter(this.state.store);

  if (route === '/team/evenman') {
    store.setEventView({
      id: undefined,
      // filter: queryObj(),
      filter: {},
    });
  } else {
    // TODO
    /*
    '/event/:id': (id: string) => {
      store.setEventView({
        id,
        filter: queryObj(),
      });
    },
    '/event-prototypes/:id': (id: string) => {
      store.setEventPrototypeView({ id: parseInt(id, 10) });
    },
    '/event-prototypes': () => {
      store.setEventPrototypeView({ id: undefined });
    },
    '/schedule': () => {
      store.setScheduleView();
    },
    '/templater': () => {
      store.setTemplaterView();
    },
    */
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
    <Context.Provider value={store}>
      <GlobalFonts />
      <Head>
        <link rel="stylesheet" href="/static/react-toggle/style.css" />
        <link rel="stylesheet" href="/static/react-dates/datepicker.css" />
      </Head>
      <div>
        <FrontkitGlobalStyle />
        <GlobalStyle />
        <ErrorList />
        {renderInsides()}
      </div>
    </Context.Provider>
  );
});

export default App;
