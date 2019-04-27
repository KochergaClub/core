import React from 'react';
import { API } from '../utils';

interface GlobalContextShape {
  api: API;
}

const GlobalContext = React.createContext<GlobalContextShape>({
  api: new API('fake token'),
});

export default GlobalContext;
