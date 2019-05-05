import { hot } from 'react-hot-loader/root';

import React from 'react';

import { API } from './common/api';
import GlobalContext from './components/GlobalContext';

import { AnyScreen } from './common/types';

interface Props<T> {
  screen: AnyScreen<any, T>;
  csrfToken: string;
  innerProps: T;
}

const Entrypoint = function<T>(props: Props<T>) {
  const screen = props.screen;
  const { component: Component } = screen;

  const contextValue = {
    api: new API({ csrfToken: props.csrfToken }),
    user: {
      /// FIXME - pass user to client in global var
      is_authenticated: false,
      permissions: [],
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <Component {...props.innerProps} />
    </GlobalContext.Provider>
  );
};

export default hot(Entrypoint);
