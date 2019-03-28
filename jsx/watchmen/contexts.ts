import React from 'react';

export const ScheduleContext = React.createContext({
  csrfToken: '',
  editable: false,
  watchmen: [],
});
