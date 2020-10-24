import * as React from 'react';

import { GlobalStyle } from '../src/frontkit';

export const decorators = [
  (Story) => (
    // StrictMode won't be necessary after 6.1 gets released (see https://github.com/storybookjs/storybook/issues/12734)
    <React.StrictMode>
      <GlobalStyle />
      {/* not <Story />, see https://github.com/storybookjs/storybook/issues/12255#issuecomment-697956943, this is important e.g. for <Burger /> animation */}
      {Story()}
    </React.StrictMode>
  ),
];
