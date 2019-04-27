import React, { useContext } from 'react';

import GlobalContext from '../components/GlobalContext';

export default () => {
  const csrfToken = useContext(GlobalContext).api.csrfToken;

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />;
};
