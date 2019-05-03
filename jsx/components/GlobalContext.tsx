import React from 'react';

import { API } from '../common/api';
import { GlobalContextShape } from '../common/types';

const GlobalContext = React.createContext<GlobalContextShape>({
  api: new API({ csrfToken: 'fake token' }),
  user: {
    is_authenticated: false,
    permissions: [],
  },
});

export default GlobalContext;
