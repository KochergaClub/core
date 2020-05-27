import { KochergaApolloClient } from '~/apollo/types';

import { APIError } from '~/common/api';

import { TildaPageQuery, TildaPageDocument } from './queries.generated';

interface LoadTildaPageProps {
  apolloClient: KochergaApolloClient;
  path: string;
}

export const loadTildaPage = async (
  props: LoadTildaPageProps
): Promise<string | undefined> => {
  let path = props.path;
  if (path.startsWith('/')) {
    path = path.substr(1);
  }

  const { data, errors } = await props.apolloClient.query<TildaPageQuery>({
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

  const htmlUrl = data.tildaPage.html_url;

  const response = await fetch(htmlUrl);
  const body = await response.text();

  return body;
};
