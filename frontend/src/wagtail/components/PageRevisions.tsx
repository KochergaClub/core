import { differenceInCalendarDays, formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FragmentDefinitionNode } from 'graphql';
import { useContext } from 'react';
import styled from 'styled-components';

import { gql, useApolloClient, useQuery } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import { getComponentByTypename } from '~/cms/wagtail-utils';
import { capitalize, formatDate, withFragments } from '~/common/utils';
import { ApolloQueryResults, DropdownMenu } from '~/components';
import { Action } from '~/components/DropdownMenu';

import { WagtailPageRevisionsDocument } from './queries.generated';

const ScrollableDropdownArea = styled.div`
  overflow-x: hidden; /* vertical scroll covers some part of area children, but we compensate for it with margin-right */
  overflow-y: auto;
  max-height: 80vh;
`;

const ActionWrapper = styled.div`
  margin-right: 10px;
`;

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
    const query = withFragments(
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
    );

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

  const queryResults = useQuery(WagtailPageRevisionsDocument, {
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
            <ScrollableDropdownArea>
              {revisions.map((revision) => (
                <Action
                  act={async () => {
                    await pickRevision(revision.id);
                  }}
                  key={revision.id}
                >
                  <ActionWrapper>
                    {formatRelativeWrapped(new Date(revision.created_at))}
                  </ActionWrapper>
                </Action>
              ))}
            </ScrollableDropdownArea>
          </DropdownMenu>
        );
      }}
    </ApolloQueryResults>
  );
};

export default PageRevisions;
