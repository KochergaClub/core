import gql from 'graphql-tag';

import { withApollo } from '~/apollo/client';
import { NextApolloPage, KochergaApolloClient } from '~/apollo/types';

import { APIError } from '~/common/api';

import FreeFormPage from '~/wagtail/wagtail/FreeFormPage';

// TODO - async load or other trick to reduce the bundle size for wagtail pages
import * as RatioPages from '~/ratio/wagtail';
import * as BlogPages from '~/blog/wagtail';
import * as ProjectsPages from '~/projects/wagtail';
import * as FAQPages from '~/faq/wagtail';

import { NextWagtailPage } from '../types';

import {
  WagtailPageTypeQuery,
  WagtailPageTypeDocument,
} from '../queries.generated';

function typename2component(typename: string): NextWagtailPage<any> | null {
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
}

interface ProxyProps {
  typename: string;
  path: string;
  page: any;
}

const ProxyWagtailPage: NextApolloPage<ProxyProps> = ({ typename, page }) => {
  const Component = typename2component(typename);

  if (!Component) {
    return <div>oops</div>;
  }

  return <Component page={page} />;
};

const path2typename = async (
  path: string,
  apolloClient: KochergaApolloClient
) => {
  const { data, errors } = await apolloClient.query<WagtailPageTypeQuery>({
    query: WagtailPageTypeDocument,
    variables: { path },
  });

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

ProxyWagtailPage.getInitialProps = async context => {
  const { apolloClient } = context;

  if (!context.asPath) {
    throw new Error('asPath is empty');
  }

  const path = context.asPath.split('?')[0];

  const typename = await path2typename(path, apolloClient);
  const component = typename2component(typename);

  if (!component) {
    throw new APIError('Unknown typename', 500);
  }

  // we assume that specific wagtail page component defines the fragment with name identical to GraphQL type.
  // For example, if ProjectIndexPage should define `fragment ProjectIndexPage on ProjectIndexPage` in its queries.graphql file.

  const fragmentDoc = component.fragment;
  const fragmentName = fragmentDoc.definitions[0].name.value;
  const objectName = fragmentDoc.definitions[0].typeCondition.name.value;

  if (objectName !== typename) {
    throw new APIError(
      `Invalid fragment - typename is ${objectName}, should be ${typename}`,
      500
    );
  }

  // TODO - global cache for typename -> query?
  const query = gql`
query Get${fragmentName}($path: String!) {
  wagtailPage(path: $path) {
    ...${fragmentName}
  }
}
${fragmentDoc}
  `;

  console.log(query);

  const { data, errors } = await apolloClient.query({
    query,
    variables: { path },
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

  return { typename, path, page };
};

export default withApollo(ProxyWagtailPage);
