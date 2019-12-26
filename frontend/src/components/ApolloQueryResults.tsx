import { ApolloError } from 'apollo-client';

import Spinner, { Size } from './Spinner';

interface Props<D> {
  loading: boolean;
  error?: ApolloError;
  data?: NonNullable<D>;
  size?: Size;
  children: ({
    data,
    loading,
  }: {
    data: NonNullable<D>;
    loading: boolean;
  }) => React.ReactElement | null;
}

function ApolloQueryResults<D>({
  loading,
  error,
  data,
  size,
  children,
}: Props<D>) {
  if (error) {
    return (
      <pre style={{ overflow: 'auto' }}>{JSON.stringify(error, null, 2)}</pre>
    ); // TODO - better design
  }

  if (!data) {
    if (loading) {
      return <Spinner size={size || 'div'} />;
    }

    throw new Error('No data and not loading');
  }

  return children({ data, loading });
}

export default ApolloQueryResults;
