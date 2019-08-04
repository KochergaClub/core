import React from 'react';

import { API } from '~/common/api';
import { GlobalContextShape } from '~/common/types';
import { configureStore } from '~/redux/store';

const GlobalContext = React.createContext<GlobalContextShape>({
  api: new API({ csrfToken: 'fake token' }),
  user: {
    is_authenticated: false,
    permissions: [],
  },
  store: configureStore(),
});

export default GlobalContext;
