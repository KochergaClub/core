import clsx from 'clsx';
import { differenceInCalendarDays, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FragmentDefinitionNode } from 'graphql';
import { useContext } from 'react';
import { FaHistory } from 'react-icons/fa';

import { gql, TypedDocumentNode, useApolloClient, useQuery } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import {
    getFragmentByTypename, KnownWagtailPageFragment, KnownWagtailPageTypename
} from '~/cms/wagtail-utils';
import { dedupeFragments } from '~/common/dedupeFragments';
import { capitalize, formatDate, withFragments } from '~/common/utils';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { Action } from '~/components/DropdownMenu';

import { WagtailPageRevisionsDocument } from './queries.generated';

const formatRelativeWrapped = (date: Date) => {
  const now = new Date();
  const diff = differenceInCalendarDays(date, now);
  return diff < -6
    ? formatDate(date, 'yyyy-MM-dd HH:mm')
    : capitalize(
        formatRelative(date, now, {
          locale: ru,
          weekStartsOn: 1,
        })
      );
};

type PageRevisionResult = {
  __typename: 'Query';
} & {
  result?: {
    __typename: 'WagtailPage';
    id: string;
    meta: {
      revision: {
        id: string;
        created_at: string;
        as_page: KnownWagtailPageFragment;
      };
    };
  };
};

type PageRevisionVariables = {
  page_id: string;
  revision_id: string;
};

const buildWagtailPageRevisionDocument = (
  typename: KnownWagtailPageTypename
): TypedDocumentNode<PageRevisionResult, PageRevisionVariables> => {
  const fragmentDoc = getFragmentByTypename(typename);
  const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .name.value;

  // TODO - wagtailPageRevision query
  return dedupeFragments(
    withFragments(
      gql`
      query WagtailPageRevisions($page_id: ID!, $revision_id: ID!) {
        result: wagtailPage(page_id: $page_id) {
          id
          meta {
            revision(id: $revision_id) {
              id
              created_at
              as_page {
                ...${fragmentName}
              }
            }
          }
        }
      }
      `,
      [fragmentDoc]
    )
  );
};

export const PageRevisions: React.FC = () => {
  const {
    state: { page },
    dispatch: pageDispatch,
  } = useContext(WagtailPageContext);

  const apolloClient = useApolloClient();

  const pickRevision = async (revision_id: string) => {
    if (!page) {
      throw new Error('WagtailPageContext is not set');
    }
    const typename = page.__typename;
    const WagtailPageRevisionDocument = buildWagtailPageRevisionDocument(
      typename
    );

    const pickResults = await apolloClient.query({
      query: WagtailPageRevisionDocument,
      variables: {
        page_id: page.id,
        revision_id,
      },
    });
    const revisionPage = pickResults.data?.result?.meta.revision.as_page;
    if (!revisionPage) {
      throw new Error('Failed to fetch revision');
    }

    if (!pageDispatch) {
      return;
    }
    pageDispatch({
      type: 'SET_PAGE',
      payload: revisionPage,
    });
  };

  const queryResults = useQuery(WagtailPageRevisionsDocument, {
    variables: {
      page_id: page ? page.id : 'invalid WagtailPageContext',
    },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { result } }) => {
        if (!result) {
          throw new Error('Page not found');
        }
        const { revisions } = result.meta;
        return (
          <DropdownMenu title="История" placement="top">
            <div
              className={clsx(
                'overflow-x-hidden' /* vertical scroll covers some part of area children, but we compensate for it with margin-right */,
                'overflow-y-auto',
                'max-h-80'
              )}
            >
              {revisions.map((revision) => (
                <Action
                  act={async () => {
                    await pickRevision(revision.id);
                  }}
                  key={revision.id}
                  title={formatRelativeWrapped(new Date(revision.created_at))}
                  icon={FaHistory}
                />
              ))}
            </div>
          </DropdownMenu>
        );
      }}
    </ApolloQueryResults>
  );
};
