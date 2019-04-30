import React from 'react';
import { API } from '../common/api';

interface GlobalContextShape {
  api: API;
}

const GlobalContext = React.createContext<GlobalContextShape>({
  api: new API('fake token'),
});

export default GlobalContext;
