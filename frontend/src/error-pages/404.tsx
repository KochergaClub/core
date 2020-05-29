import { staticUrl } from '~/common/utils';

import ErrorPage from './ErrorPage';
import { withApollo } from '~/apollo';

const Error404 = () => (
  <ErrorPage
    title="Страница не найдена"
    code={404}
    image={staticUrl('error-pages/404.jpg')}
  />
);

export default withApollo(Error404);
