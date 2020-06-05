import { staticUrl } from '~/common/utils';

import ErrorPage from './ErrorPage';
import { withApollo } from '~/apollo';

const Error403 = () => (
  <ErrorPage
    title="Нет доступа"
    code={403}
    image={staticUrl('error-pages/403.jpg')}
  />
);

export default withApollo(Error403);
