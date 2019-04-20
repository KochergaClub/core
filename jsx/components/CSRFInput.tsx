import React, { useContext } from 'react';

import GlobalContext from '../components/GlobalContext';

export default () => {
  const csrfToken = useContext(GlobalContext).csrfToken;

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />;
};
