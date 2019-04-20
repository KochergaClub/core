import React from 'react';

interface GlobalContextShape {
  csrfToken: string;
}

const GlobalContext = React.createContext<GlobalContextShape>({
  csrfToken: '',
});

export default GlobalContext;
