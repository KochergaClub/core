import { staticUrl } from '~/common/utils';

import ErrorPage from './ErrorPage';
import { withApollo } from '~/apollo';

const Error500 = () => (
  <ErrorPage
    title="Ошибка"
    code={500}
    image={staticUrl('error-pages/500.jpg')}
  />
);

export default withApollo(Error500);
