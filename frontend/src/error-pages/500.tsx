import { staticUrl } from '~/common/utils';

import ErrorPage from './ErrorPage';

const Error500 = () => (
  <ErrorPage
    title="Ошибка"
    code={500}
    image={staticUrl('error-pages/500.jpg')}
  />
);

export default Error500;
