import { FragmentDefinitionNode } from 'graphql';
import gql from 'graphql-tag';

import { KochergaApolloClient } from '~/apollo/types';
import * as BlogPages from '~/blog/wagtail';
import { APIError } from '~/common/api';
import * as FAQPages from '~/faq/wagtail';
import * as PresentationPages from '~/presentations/wagtail';
import * as ProjectsPages from '~/projects/wagtail';
// TODO - async load or other trick to reduce the bundle size for wagtail pages
import * as RatioPages from '~/ratio/wagtail';
import { NextWagtailPage } from '~/wagtail/types';
import FreeFormPage from '~/wagtail/wagtail/FreeFormPage';

import {
    WagtailPagesDocument, WagtailPagesQuery, WagtailPageTypeDocument, WagtailPageTypeQuery
} from './queries.generated';

export type PageLocator = { path: string } | { preview_token: string };

export const getComponentByTypename = (
  typename: string
): NextWagtailPage<any> | null => {
  switch (typename) {
    case 'FreeFormPage':
      return FreeFormPage;

    case 'RatioSectionIndexPage':
      return RatioPages.SectionIndexPage;
    case 'RatioSectionPage':
      return RatioPages.SectionPage;
    case 'RatioNotebookIndexPage':
      return RatioPages.NotebookIndexPage;
    case 'RatioNotebookPage':
      return RatioPages.NotebookPage;
    case 'RatioPresentationIndexPage':
      return RatioPages.PresentationIndexPage;

    case 'PresentationPage':
      return PresentationPages.PresentationPage;

    case 'BlogPostPage':
      return BlogPages.BlogPostPage;
    case 'BlogIndexPage':
      return BlogPages.BlogIndexPage;

    case 'ProjectPage':
      return ProjectsPages.ProjectPage;
    case 'ProjectIndexPage':
      return ProjectsPages.ProjectIndexPage;

    case 'FaqPage':
      return FAQPages.FAQPage;
    default:
      return null;
  }
};

interface LoadTypenameProps {
  apolloClient: KochergaApolloClient;
  locator: PageLocator;
}

export const loadTypename = async (
  props: LoadTypenameProps
): Promise<string> => {
  const { data, errors } = await props.apolloClient.query<WagtailPageTypeQuery>(
    {
      query: WagtailPageTypeDocument,
      variables: props.locator,
    }
  );

  if (errors) {
    throw new APIError('GraphQL error', 500);
  }

  if (!data) {
    throw new APIError('No data (huh?)', 500);
  }

  const wagtailPage = data.wagtailPage;

  if (!wagtailPage) {
    throw new APIError('Page not found', 404);
  }

  return wagtailPage.__typename;
};

interface LoadPageProps {
  apolloClient: KochergaApolloClient;
  component: NextWagtailPage<any>;
  typename: string;
  locator: PageLocator;
}

export const loadPageForComponent = async (
  props: LoadPageProps
): Promise<any> => {
  // Specific wagtail pages should define `.fragment` property with FragmentDoc.
  // The fragment should be something like `fragment MyPage on MyPage`, usually in a queries.graphql file.

  const fragmentDoc = props.component.fragment;
  const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .name.value;
  const objectName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .typeCondition.name.value;

  if (objectName !== props.typename) {
    throw new APIError(
      `Invalid fragment - typename is ${objectName}, should be ${props.typename}`,
      500
    );
  }

  // TODO - global cache for typename -> query?
  const query = gql`
query Get${fragmentName}($path: String, $preview_token: String) {
  wagtailPage(path: $path, preview_token: $preview_token) {
    ...${fragmentName}
  }
}
${fragmentDoc}
  `;

  const { data, errors } = await props.apolloClient.query({
    query,
    variables: props.locator,
    fetchPolicy: 'network-only',
  });

  if (errors) {
    throw new APIError('Error while querying for full wagtail page', 500);
  }

  const page = data?.wagtailPage;

  if (!page) {
    throw new APIError(
      'Wagtail page in GraphQL response is empty for some reason',
      500
    );
  }

  return page;
};

export const wagtailPageUrls = async (apolloClient: KochergaApolloClient) => {
  const { data, errors } = await apolloClient.query<WagtailPagesQuery>({
    query: WagtailPagesDocument,
  });

  if (errors || !data) {
    throw new APIError('GraphQL error', 500);
  }

  return data.wagtailPages.map((p) => p.meta.url.replace(/^\//, ''));
};

export const normalizeSsrPath = (path: string) => {
  // TODO - this is sloppy, this code assumes both that page could have `?ssr=1` param and /ssr prefix, because rewrite in nextjsEntrypoint is not perfect.
  return path.replace(/^\/ssr\/?/, '').replace(/\?.*/, '');
};

export const loadWagtailPage = async ({
  locator,
  apolloClient,
}: {
  locator: PageLocator;
  apolloClient: KochergaApolloClient;
}) => {
  const typename = await loadTypename({
    apolloClient,
    locator,
  });
  const component = getComponentByTypename(typename);

  if (!component) {
    throw new APIError('Unknown typename', 500);
  }

  const page = await loadPageForComponent({
    component,
    typename,
    apolloClient,
    locator,
  });

  return {
    typename,
    page,
  };
};
