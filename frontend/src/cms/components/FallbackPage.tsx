import { Spinner } from '~/components';
import { useEffect } from 'react';

import { parseQueryString, buildQueryString } from '~/common/utils';

const FallbackPage: React.FC = () => {
  useEffect(() => {
    if (
      window.location.href.includes('?ssr=1') ||
      window.location.href.includes('&ssr=1')
    ) {
      return; // huh? shouldn't happen since ssr=1 is processed by our custom server, but let's avoid infinite loop
    }

    window.location.replace(
      window.location.pathname +
        '?' +
        buildQueryString({
          ...parseQueryString(window.location.search),
          ssr: '1',
        })
    );
  }, []);
  return <Spinner size="block" />;
};

export default FallbackPage;
