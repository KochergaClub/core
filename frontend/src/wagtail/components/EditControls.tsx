import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { A, Button, Row } from '@kocherga/frontkit';

import { WagtailPageContext } from '~/cms/contexts';
import { useNotification } from '~/common/hooks';
import { AsyncButton, AsyncButtonWithConfirm } from '~/components';

import { useBlockStructureLoader } from '../hooks';
import { wagtailAdminPageEditLink } from '../routes';
import { AnyBlockFragment } from '../types';
import { blockToParams, typenameToBackendBlockName } from '../utils';
import { EditBlocksContext } from './EditWagtailBlocks';
import { useWagtailSavePageMutation } from './queries.generated';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
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

const EditControls: React.FC<Props> = ({ blocks }) => {
  const {
    state: { page_id },
    dispatch: pageDispatch,
  } = useContext(WagtailPageContext);

  const { dispatch: editDispatch } = useContext(EditBlocksContext);

  const notify = useNotification();

  const [saveMutation] = useWagtailSavePageMutation();

  const serializeBlocks = useBlocksSerializer();

  const save = useCallback(async () => {
    if (!page_id) {
      return; // shouldn't happen
    }

    const blocksJson = JSON.stringify(await serializeBlocks(blocks), null, 2);
    const mutationResults = await saveMutation({
      variables: {
        input: {
          page_id,
          blocksJson,
          publish: true,
        },
      },
    });
    if (mutationResults.data?.result.validation_error) {
      const { validation_error } = mutationResults.data?.result;
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
    }

    // if (mutationResults.data?.result.page.body) {
    //   editDispatch({
    //     type: 'REPLACE_BLOCKS',
    //     payload: mutationResults.data?.page.body,
    //   });
    // }
  }, [saveMutation, blocks, page_id, notify, editDispatch, serializeBlocks]);

  if (!page_id) {
    throw new Error('No page_id in WagtailPageContext');
  }

  return (
    <Container>
      <Row spaced vCentered>
        <A href={wagtailAdminPageEditLink(page_id)}>Редактировать в Wagtail</A>
        <Row>
          <AsyncButtonWithConfirm
            act={async () => {
              pageDispatch && pageDispatch({ type: 'STOP_EDITING' });
            }}
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
