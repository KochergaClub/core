import { render } from '~/test/utils';

import Page from './index';

it('renders without crashing', async () => {
  const { findByText } = render(<Page title="test">test</Page>);
  await findByText('test');
});
