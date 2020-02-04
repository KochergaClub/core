import { staticUrl } from '~/common/utils';

import ErrorPage from './ErrorPage';

const Error403 = () => (
  <ErrorPage
    title="Нет доступа"
    code={403}
    image={staticUrl('error-pages/403.jpg')}
  />
);

export default Error403;
