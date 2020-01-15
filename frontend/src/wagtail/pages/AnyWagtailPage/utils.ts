import gql from 'graphql-tag';

import { KochergaApolloClient } from '~/apollo/types';

import { APIError } from '~/common/api';

// TODO - async load or other trick to reduce the bundle size for wagtail pages
import * as RatioPages from '~/ratio/wagtail';
import * as BlogPages from '~/blog/wagtail';
import * as ProjectsPages from '~/projects/wagtail';
import * as FAQPages from '~/faq/wagtail';

import FreeFormPage from '../../wagtail/FreeFormPage';

import { NextWagtailPage } from '../../types';

import {
  WagtailPageTypeQuery,
  WagtailPageTypeDocument,
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
    case 'RatioNotebookPage':
      return RatioPages.NotebookPage;

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
  // We assume that specific wagtail page component defines the fragment with name identical to GraphQL type.
  // For example, if ProjectIndexPage should define `fragment ProjectIndexPage on ProjectIndexPage` in its queries.graphql file.
  // (FIXME - actualy, I believe we don't need that assumption anymore, though it's still a good convention)

  const fragmentDoc = props.component.fragment;
  const fragmentName = fragmentDoc.definitions[0].name.value;
  const objectName = fragmentDoc.definitions[0].typeCondition.name.value;

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
