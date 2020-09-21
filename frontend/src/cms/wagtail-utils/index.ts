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

export const getComponentByTypename = <T extends KnownWagtailPageTypename>(
  typename: T
): WagtailPageComponentsMap[T] => {
  return allPageComponents[typename];
};

interface LoadTypenameProps {
  apolloClient: KochergaApolloClient;
  locator: PageLocator;
}

export const loadTypename = async (
  props: LoadTypenameProps
): Promise<string> => {
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

  const wagtailPage = data.wagtailPage;

  if (!wagtailPage) {
    throw new APIError('Page not found', 404);
  }

  return wagtailPage.__typename;
};

type GetPageResult<T extends KnownWagtailPageTypename> = {
  __typename: 'Query';
} & {
  wagtailPage?: Parameters<WagtailPageComponentsMap[T]>[0]['page'];
};

type GetPageVariables = {
  path?: string;
  preview_token?: string;
};

const buildGetPageDocument = <T extends KnownWagtailPageTypename>(
  typename: T
): TypedDocumentNode<GetPageResult<T>, GetPageVariables> => {
  const component = getComponentByTypename(typename);
  // Specific wagtail pages should define `.fragment` property with FragmentDoc.
  // The fragment should be something like `fragment MyPage on MyPage`, usually in a queries.graphql file.

  const fragmentDoc = component.fragment;
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
  wagtailPage(path: $path, preview_token: $preview_token) {
    ...${fragmentName}
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

export const loadWagtailPage = async ({
  locator,
  apolloClient,
}: {
  locator: PageLocator;
  apolloClient: KochergaApolloClient;
}): Promise<KnownWagtailPageFragment> => {
  const typename = await loadTypename({
    apolloClient,
    locator,
  });

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

  const page = data?.wagtailPage;

  if (!page) {
    throw new APIError(
      'Wagtail page in GraphQL response is empty for some reason',
      500
    );
  }

  return page;
};
