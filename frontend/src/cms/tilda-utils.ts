import { KochergaApolloClient } from '~/apollo/types';
import { APIError } from '~/common/api';

import { TildaPageDocument, TildaPageQuery, TildaPagesDocument } from './queries.generated';

interface LoadTildaPageProps {
  apolloClient: KochergaApolloClient;
  path: string;
}

export const tildaPageUrls = async (apolloClient: KochergaApolloClient) => {
  const { data, errors } = await apolloClient.query({
    query: TildaPagesDocument,
  });

  if (errors || !data) {
    throw new APIError('GraphQL error', 500);
  }

  return data.tildaPages.map((p) => p.path);
};

export const loadTildaPage = async (
  props: LoadTildaPageProps
): Promise<TildaPageQuery['tildaPage']> => {
  let path = props.path;
  if (path.startsWith('/')) {
    path = path.substr(1);
  }

  const { data, errors } = await props.apolloClient.query({
    query: TildaPageDocument,
    variables: { path },
  });

  if (errors) {
    throw new APIError('GraphQL error', 500);
  }

  if (!data) {
    throw new APIError('No data (huh?)', 500);
  }

  if (!data.tildaPage) {
    // that's ok, we'll try wagtail
    return;
  }

  return data.tildaPage;
};
