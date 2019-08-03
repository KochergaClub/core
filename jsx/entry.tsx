import { hot } from 'react-hot-loader/root';

import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { API } from './common/api';
import { User } from './common/types';
import GlobalContext from './components/GlobalContext';
import store from '~/redux/store';

import { AnyScreen } from './common/types';

interface Props<T> {
  screen: AnyScreen<object, T>;
  csrfToken: string;
  user: User;
  innerProps: T;
}

const Entrypoint = function<T extends {}>(props: Props<T>) {
  const screen = props.screen;
  const { component: Component } = screen;

  const contextValue = {
    api: new API({ csrfToken: props.csrfToken }),
    user: props.user,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <ReduxProvider store={store}>
        <Component {...props.innerProps} />
      </ReduxProvider>
    </GlobalContext.Provider>
  );
};

const HotEntrypoint = hot(Entrypoint);

export default HotEntrypoint;
