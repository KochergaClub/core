import { Spinner } from '~/components';
import { useEffect } from 'react';

const FallbackPage: React.FC = () => {
  useEffect(() => {
    if (window.location.href.includes('?ssr=1')) {
      return; // huh? shouldn't happen since ssr=1 is processed by our custom server, but let's avoid infinite loop
    }
    window.location.href = `${window.location.href}?ssr=1`;
  }, []);
  return <Spinner size="block" />;
};

export default FallbackPage;
