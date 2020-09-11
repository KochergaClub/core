import { FragmentDefinitionNode } from 'graphql';
import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import { gql, useApolloClient, useQuery } from '@apollo/client';
import { A, Button, Row } from '@kocherga/frontkit';

import { WagtailPageContext } from '~/cms/contexts';
import { getComponentByTypename } from '~/cms/utils';
import { useNotification } from '~/common/hooks';
import { ApolloQueryResults, AsyncButton, AsyncButtonWithConfirm } from '~/components';

import { useBlockStructureLoader } from '../hooks';
import { wagtailAdminPageEditLink } from '../routes';
import { AnyBlockFragment } from '../types';
import { blockToParams, typenameToBackendBlockName } from '../utils';
import { EditBlocksContext } from './EditWagtailBlocks';
import {
    useWagtailPageRevisionsQuery, WagtailStreamFieldValidationErrorFragment,
    WagtailStreamFieldValidationErrorFragmentDoc
} from './queries.generated';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  overflow-y: auto;
  border-top: 2px solid red;
  background-color: white;
  padding: 20px;
  z-index: 50;
`;

interface Props {
  blocks: AnyBlockFragment[];
}

const useBlocksSerializer = () => {
  const structureLoader = useBlockStructureLoader();

  return async (blocks: AnyBlockFragment[]) => {
    const result = [];
    for (const block of blocks) {
      const structure = await structureLoader(block.__typename);
      const blockName = typenameToBackendBlockName(block.__typename);
      const value = blockToParams(structure, block);
      result.push({ type: blockName, value });
    }
    return result;
  };
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
    <div>
      <ApolloQueryResults {...queryResults}>
        {({ data: { result } }) => {
          if (!result) {
            throw new Error('Page not found');
          }
          const { revisions } = result.meta;
          return (
            <Row wrap>
              {revisions.map((revision) => (
                <div key={revision.id}>
                  <AsyncButton
                    size="small"
                    act={async () => {
                      await pickRevision(revision.id);
                    }}
                  >
                    {revision.id}
                  </AsyncButton>
                </div>
              ))}
            </Row>
          );
        }}
      </ApolloQueryResults>
    </div>
  );
};

const EditControls: React.FC<Props> = ({ blocks }) => {
  const {
    state: { page },
    dispatch: pageDispatch,
  } = useContext(WagtailPageContext);

  // TODO - replace on save
  // page can be overriden by <PageRevisions />, so we keep another instance of page around for when we stop editing
  const [savedPage, setSavedPage] = useState(page);

  const { dispatch: editDispatch } = useContext(EditBlocksContext);

  const apolloClient = useApolloClient();

  const notify = useNotification();

  const serializeBlocks = useBlocksSerializer();

  const save = useCallback(async () => {
    if (!page) {
      return; // shouldn't happen unless we forgot to wrap this component in WagtailPageContext
    }

    const typename = page.__typename;
    const component = getComponentByTypename(typename);
    if (!component) {
      throw new Error('Internal logic error');
    }
    const fragmentDoc = component.fragment;
    const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
      .name.value;

    const mutation = gql`
      mutation WagtailSave${fragmentName}($input: WagtailEditPageBodyBlocksInput!) {
        result: wagtailEditPageBodyBlocks(input: $input) {
          page {
            ...${fragmentName}
          }
          validation_error {
            ...WagtailStreamFieldValidationError
          }
        }
      }
      ${fragmentDoc}
      ${WagtailStreamFieldValidationErrorFragmentDoc}
    `;

    const blocksJson = JSON.stringify(await serializeBlocks(blocks), null, 2);
    const mutationResults = await apolloClient.mutate({
      mutation,
      variables: {
        input: {
          page_id: page.id,
          blocksJson,
          publish: true,
        },
      },
    });

    if (mutationResults.data?.error) {
      notify({
        text: 'Не удалось сохранить страницу',
        type: 'Error',
      });
      return;
    }

    if (mutationResults.data?.result.validation_error) {
      const validation_error = mutationResults.data?.result
        .validation_error as WagtailStreamFieldValidationErrorFragment;
      editDispatch({
        type: 'SET_VALIDATION_ERROR',
        payload: validation_error,
      });

      let errorText = 'Failed to save.';
      if (validation_error.block_errors.length) {
        errorText +=
          ' Errors in blocks ' +
          validation_error.block_errors.map((e) => e.block_id + 1).join(', ');
      }
      if (validation_error.non_block_error) {
        errorText += ' Error: ' + validation_error.non_block_error;
      }
      notify({
        text: errorText,
        type: 'Error',
      });
    } else {
      setSavedPage(mutationResults.data?.result.page);
    }
  }, [apolloClient, blocks, page, notify, editDispatch, serializeBlocks]);

  const stopEditing = useCallback(async () => {
    if (!pageDispatch) {
      return; // shouldn't happen
    }
    pageDispatch({ type: 'SET_PAGE', payload: savedPage });
    pageDispatch({ type: 'STOP_EDITING' });
  }, [savedPage, pageDispatch]);

  return (
    <Container>
      <Row spaced vCentered>
        <A href={wagtailAdminPageEditLink(page.id)}>Редактировать в Wagtail</A>
        <PageRevisions />
        <Row>
          <AsyncButtonWithConfirm
            act={stopEditing}
            headerText="Вы уверены?"
            confirmText="Несохранённые изменения будут потеряны."
          >
            Прекратить редактирование
          </AsyncButtonWithConfirm>
          <AsyncButton act={save} kind="primary">
            Сохранить
          </AsyncButton>
        </Row>
      </Row>
    </Container>
  );
};

export default EditControls;
