import { FragmentDefinitionNode } from 'graphql';
import React, { useCallback, useContext, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

import { gql, TypedDocumentNode, useApolloClient } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import {
    getFragmentByTypename, KnownWagtailPageFragment, KnownWagtailPageTypename
} from '~/cms/wagtail-utils';
import { dedupeFragments } from '~/common/dedupeFragments';
import { withFragments } from '~/common/utils';
import { AsyncButtonWithConfirm } from '~/components';
import { A, AsyncButton, Button, ControlsFooter, Modal, Row, useNotification } from '~/frontkit';

import { useBlockStructureLoader } from '../hooks';
import { wagtailAdminPageEditLink } from '../routes';
import { AnyBlockFragment } from '../types';
import { blockToParams, typenameToBackendBlockName } from '../utils';
import { EditBlocksContext } from './EditWagtailBlocks';
import { PageRevisions } from './PageRevisions';
import {
    WagtailStreamFieldValidationErrorFragment, WagtailStreamFieldValidationErrorFragmentDoc
} from './queries.generated';

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

type SaveResult = { __typename: 'Mutation' } & {
  result?: {
    page?: KnownWagtailPageFragment;
    validation_error?: WagtailStreamFieldValidationErrorFragment;
  };
};

type SaveVariables = {
  input: {
    page_id: string;
    blocksJson: string;
    publish: boolean;
  };
};

// TODO - it'd be nice to have generic over typename, though it's not really useful here
const buildSaveDocument = (
  typename: KnownWagtailPageTypename
): TypedDocumentNode<SaveResult, SaveVariables> => {
  const fragmentDoc = getFragmentByTypename(typename);
  const fragmentName = (fragmentDoc.definitions[0] as FragmentDefinitionNode)
    .name.value;

  return dedupeFragments(
    withFragments(
      gql`
    mutation WagtailSave${fragmentName}($input: WagtailEditPageBodyBlocksInput!) {
      result: wagtailEditPageBodyBlocks(input: $input) {
        page {
          ...${fragmentName}
        }
        validation_error {
          ...WagtailStreamFieldValidationError
        }
      }
    }`,
      [fragmentDoc, WagtailStreamFieldValidationErrorFragmentDoc]
    )
  );
};

const SaveButton: React.FC<{
  stopEditing: () => void;
  save: () => Promise<void>;
}> = ({ stopEditing, save }) => {
  const [justSaved, setJustSaved] = useState(false);

  const pickContinueEditing = () => {
    setJustSaved(false);
  };

  const pickStopEditing = () => {
    setJustSaved(false);
    stopEditing();
  };

  const saveAndAsk = async () => {
    await save();
    setJustSaved(true);
  };

  return (
    <>
      <AsyncButton act={saveAndAsk} kind="primary">
        Сохранить
      </AsyncButton>
      {justSaved ? (
        <Modal>
          <Modal.Header close={() => setJustSaved(false)}>
            Страница сохранена
          </Modal.Header>
          <Modal.Footer>
            <ControlsFooter>
              <Button onClick={pickContinueEditing}>
                Продолжить редактирование
              </Button>
              <Button onClick={pickStopEditing}>
                Прекратить редактирование
              </Button>
            </ControlsFooter>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export const EditControls: React.FC<Props> = ({ blocks }) => {
  const {
    state: { page },
    dispatch: pageDispatch,
  } = useContext(WagtailPageContext);

  // page can be overriden by <PageRevisions />, so we keep another instance of page around for when we stop editing
  const [savedPage, setSavedPage] = useState(page);

  const stopEditing = useCallback(async () => {
    if (!pageDispatch || !savedPage) {
      return; // shouldn't happen if WagtailPageContext is configured properly
    }
    pageDispatch({ type: 'SET_PAGE', payload: savedPage });
    pageDispatch({ type: 'STOP_EDITING' });
  }, [savedPage, pageDispatch]);

  const { dispatch: editDispatch } = useContext(EditBlocksContext);

  const apolloClient = useApolloClient();
  const notify = useNotification();
  const serializeBlocks = useBlocksSerializer();

  const save = useCallback(async () => {
    if (!page) {
      return; // shouldn't happen unless we forgot to wrap this component in WagtailPageContext
    }

    const typename = page.__typename;
    const SaveDocument = buildSaveDocument(typename);

    const blocksJson = JSON.stringify(await serializeBlocks(blocks), null, 2);
    const mutationResults = await apolloClient.mutate({
      mutation: SaveDocument,
      variables: {
        input: {
          page_id: page.id,
          blocksJson,
          publish: true,
        },
      },
    });

    if (mutationResults.errors || !mutationResults.data?.result) {
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
      return;
    }

    const savedPage = mutationResults.data?.result.page;
    if (!savedPage) {
      notify({
        text: 'No page in save results',
        type: 'Error',
      });
      return;
    }
    editDispatch({
      type: 'CLEAR_VALIDATION_ERROR',
    });
    setSavedPage(savedPage);
  }, [apolloClient, blocks, page, notify, editDispatch, serializeBlocks]);

  if (!page) {
    throw new Error('WagtailPageContext is not configured');
  }

  return (
    <div className="fixed bottom-0 w-full border-t-2 border-accent-700 bg-white p-5 z-30">
      <div className="flex flex-col space-y-2 md:space-y-0 md:justify-between md:flex-row">
        <A href={wagtailAdminPageEditLink(page.id)} target="_blank">
          <small>
            <Row vCentered>
              <span>Редактировать в Wagtail</span>
              <FaExternalLinkAlt />
            </Row>
          </small>
        </A>
        <div className="flex flex-col space-y-1 items-start md:space-x-2 md:space-y-0 md:flex-row md:items-center">
          <PageRevisions />
          <AsyncButtonWithConfirm
            act={stopEditing}
            headerText="Вы уверены?"
            confirmText="Несохранённые изменения будут потеряны."
          >
            Прекратить редактирование
          </AsyncButtonWithConfirm>
          <SaveButton stopEditing={stopEditing} save={save} />
        </div>
      </div>
    </div>
  );
};
