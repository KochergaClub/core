import { FragmentDefinitionNode } from 'graphql';

import { gql, TypedDocumentNode } from '@apollo/client';

// TODO - dynamic() to reduce the bundle size for wagtail pages
import { KochergaApolloClient } from '~/apollo/types';
import { BlogIndexPage, BlogPostPage } from '~/blog/wagtail';
import { APIError } from '~/common/api';
import { dedupeFragments } from '~/common/dedupeFragments';
import { withFragments } from '~/common/utils';
import { FAQPage as FaqPage } from '~/faq/wagtail';
import { PresentationPage } from '~/presentations/wagtail';
import { ProjectIndexPage, ProjectPage } from '~/projects/wagtail';
import {
    NotebookIndexPage as RatioNotebookIndexPage, NotebookPage as RatioNotebookPage,
    PresentationIndexPage as RatioPresentationIndexPage, SectionIndexPage as RatioSectionIndexPage,
    SectionPage as RatioSectionPage
} from '~/ratio/wagtail';
import FreeFormPage from '~/wagtail/wagtail/FreeFormPage';

import { WagtailPagesDocument, WagtailPageTypeDocument } from '../queries.generated';

export type PageLocator = { path: string } | { preview_token: string };

const allPageComponents = {
  FreeFormPage,
  RatioSectionIndexPage,
  RatioSectionPage,
  RatioNotebookIndexPage,
  RatioNotebookPage,
  RatioPresentationIndexPage,
  PresentationPage,
  BlogPostPage,
  BlogIndexPage,
  ProjectPage,
  ProjectIndexPage,
  FaqPage,
};

export type WagtailPageComponentsMap = typeof allPageComponents;

type KnownWagtailPage = WagtailPageComponentsMap[keyof WagtailPageComponentsMap];

export type KnownWagtailPageFragment = Parameters<KnownWagtailPage>[0]['page'];

export type KnownWagtailPageTypename = KnownWagtailPageFragment['__typename'];

export const isKnownTypename = (
  typename: string
): typename is KnownWagtailPageTypename => {
  return allPageComponents.hasOwnProperty(typename);
};

export const getFragmentByTypename = <T extends KnownWagtailPageTypename>(
  typename: T
): WagtailPageComponentsMap[T]['fragment'] => {
  return allPageComponents[typename].fragment;
};

// FIXME - this signature is unhelpful, refactor everything
export const getComponentByTypename = <T extends KnownWagtailPageTypename>(
  typename: T
): React.FC<{ page: any }> => {
  return allPageComponents[typename];
};

interface LoadPageProps {
  apolloClient: KochergaApolloClient;
  locator: PageLocator;
}

// TODO - merge these types with LoadWagtailPageResult with generics
// TODO - add kind: 'not_found' instead of 404 exceptions?
interface OkTypenameResult {
  kind: 'ok';
  typename: string;
}

interface PrivateTypenameResult {
  kind: 'private';
}

type LoadTypenameResult = OkTypenameResult | PrivateTypenameResult;

const loadTypename = async (
  props: LoadPageProps
): Promise<LoadTypenameResult> => {
  const { data, errors } = await props.apolloClient.query({
    query: WagtailPageTypeDocument,
    variables: props.locator,
  });

  if (errors) {
    throw new APIError('GraphQL error', 500);
  }

  if (!data) {
    throw new APIError('No data (huh?)', 500);
  }

  const result = data.result;

  switch (result.__typename) {
    case 'WagtailPageContainer':
      const wagtailPage = result.page;
      if (!wagtailPage) {
        throw new APIError('Page not found', 404);
      }
      return { kind: 'ok', typename: wagtailPage.__typename };
    case 'WagtailPagePrivate':
      return { kind: 'private' };
    default:
      throw new APIError('Unexpected query result', 500);
  }
};

type GetPageResult<T extends KnownWagtailPageTypename> = {
  __typename: 'Query';
} & {
  result:
    | {
        __typename: 'WagtailPageContainer';
        page?: Parameters<WagtailPageComponentsMap[T]>[0]['page'];
      }
    | {
        __typename: 'WagtailPagePrivate';
        message: string;
      };
};

type GetPageVariables = {
  path?: string;
  preview_token?: string;
};

const buildGetPageDocument = <T extends KnownWagtailPageTypename>(
  typename: T
): TypedDocumentNode<GetPageResult<T>, GetPageVariables> => {
  // Specific wagtail pages should define `.fragment` property with FragmentDoc.
  // The fragment should be something like `fragment MyPage on MyPage`, usually in a queries.graphql file.

  const fragmentDoc = getFragmentByTypename(typename);
  const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .name.value;
  const objectName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .typeCondition.name.value;

  if (objectName !== typename) {
    throw new APIError(
      `Invalid fragment - typename is ${objectName}, should be ${typename}`,
      500
    );
  }

  // TODO - memoize?
  return dedupeFragments(
    withFragments(
      gql`
query Get${fragmentName}($path: String, $preview_token: String) {
  result: wagtailPageOrPrivate(path: $path, preview_token: $preview_token) {
    ... on WagtailPageContainer {
      page {
        ...${fragmentName}
      }
    }
    ... on WagtailPagePrivate {
      message
    }
  }
}`,
      [fragmentDoc]
    )
  );
};

export const wagtailPageUrls = async (apolloClient: KochergaApolloClient) => {
  const { data, errors } = await apolloClient.query({
    query: WagtailPagesDocument,
  });

  if (errors || !data) {
    throw new APIError('GraphQL error', 500);
  }

  return data.wagtailPages.map((p) => p.meta.url.replace(/^\//, ''));
};

interface OkWagtailPageResult {
  kind: 'ok';
  page: KnownWagtailPageFragment;
}

interface PrivateWagtailPageResult {
  kind: 'private';
}

type LoadWagtailPageResult = OkWagtailPageResult | PrivateWagtailPageResult;

export const loadWagtailPage = async ({
  apolloClient,
  locator,
}: LoadPageProps): Promise<LoadWagtailPageResult> => {
  const typenameOrPrivate = await loadTypename({
    apolloClient,
    locator,
  });

  if (typenameOrPrivate.kind === 'private') {
    return { kind: 'private' };
  }
  const typename = typenameOrPrivate.typename;

  if (!isKnownTypename(typename)) {
    throw new APIError('Unknown typename', 500);
  }
  const GetPageDocument = buildGetPageDocument(typename);

  const { data, errors } = await apolloClient.query({
    query: GetPageDocument,
    variables: locator,
    fetchPolicy: 'network-only',
  });

  if (errors) {
    throw new APIError('Error while querying for full wagtail page', 500);
  }

  if (!data) {
    throw new APIError('No data (huh?)', 500);
  }

  switch (data.result.__typename) {
    case 'WagtailPageContainer':
      const page = data.result.page;
      if (!page) {
        throw new APIError(
          'Wagtail page in GraphQL response is empty for some reason',
          500
        );
      }

      return { kind: 'ok', page };
    case 'WagtailPagePrivate':
      // shouldn't happen often since we just checked typename with loadTypename
      return { kind: 'private' };
    default:
      throw new APIError('Unexpected result from GetPage query', 500);
  }
};
