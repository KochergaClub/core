import { FragmentDefinitionNode } from 'graphql';
import { useContext } from 'react';

import { gql, useApolloClient } from '@apollo/client';
import { Row } from '@kocherga/frontkit';

import { WagtailPageContext } from '~/cms/contexts';
import { getComponentByTypename } from '~/cms/utils';
import { formatDate } from '~/common/utils';
import { ApolloQueryResults, AsyncButton, DropdownMenu } from '~/components';
import { Action } from '~/components/DropdownMenu';

import { useWagtailPageRevisionsQuery } from './queries.generated';

const PageRevisions: React.FC = () => {
  const {
    state: { page },
    dispatch: pageDispatch,
  } = useContext(WagtailPageContext);

  const apolloClient = useApolloClient();

  const pickRevision = async (revision_id: string) => {
    const typename = page.__typename;
    const component = getComponentByTypename(typename);
    if (!component) {
      throw new Error('Internal logic error');
    }
    const fragmentDoc = component.fragment;
    const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
      .name.value;

    // TODO - wagtailPageRevision query
    const query = gql`
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
      ${fragmentDoc}
    `;

    const pickResults = await apolloClient.query({
      query,
      variables: {
        page_id: page.id,
        revision_id,
      },
    });
    const revisionPage = pickResults.data?.result.meta.revision.as_page;
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

  // TODO - type
  const queryResults = useWagtailPageRevisionsQuery({
    variables: {
      page_id: page.id,
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
            {revisions.map((revision) => (
              <Action
                act={async () => {
                  await pickRevision(revision.id);
                }}
                key={revision.id}
              >
                {formatDate(new Date(revision.created_at), 'yyyy-MM-dd, HH:mm')}
              </Action>
            ))}
          </DropdownMenu>
        );
      }}
    </ApolloQueryResults>
  );
};

export default PageRevisions;
