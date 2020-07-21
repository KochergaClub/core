import { ApolloError } from '@apollo/client';

import Spinner, { Size } from '../Spinner';

import ErrorCard from './ErrorCard';

interface Props<D> {
  loading: boolean;
  renderLoading?: () => React.ReactElement | null;
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
  renderLoading,
  error,
  data,
  size,
  children,
}: Props<D>) {
  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!data) {
    if (loading) {
      return renderLoading ? renderLoading() : <Spinner size={size || 'div'} />;
    }

    throw new Error('No data and not loading');
  }

  return children({ data, loading });
}

export default ApolloQueryResults;
