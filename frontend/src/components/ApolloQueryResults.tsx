import { ApolloError } from 'apollo-client';

import { FaSpinner } from 'react-icons/fa';

const BigSpinner = () => (
  <h1>
    <FaSpinner />
  </h1>
);

interface Props<D> {
  loading: boolean;
  error?: ApolloError;
  data?: NonNullable<D>;
  children: ({
    data,
    loading,
  }: {
    data: NonNullable<D>;
    loading: boolean;
  }) => React.ReactElement | null;
}

function ApolloQueryResults<D>({ loading, error, data, children }: Props<D>) {
  if (error) {
    return (
      <pre style={{ overflow: 'auto' }}>{JSON.stringify(error, null, 2)}</pre>
    ); // TODO - better design
  }

  if (!data) {
    if (loading) {
      return <BigSpinner />;
    }

    throw new Error('No data and not loading');
  }

  return children({ data, loading });
}

export default ApolloQueryResults;
