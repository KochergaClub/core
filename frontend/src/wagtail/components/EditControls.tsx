import { FieldNode, FragmentDefinitionNode } from 'graphql';
import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { WagtailPageContext } from '~/cms/contexts';
import { useNotification } from '~/common/hooks';
import { AsyncButton } from '~/components';

import { allBlockComponents, isKnownBlock } from '../blocks';
import { AnyBlockFragment } from '../types';
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

// TODO - compare value with block's shape
const valueToBackendValue = (value: any): any => {
  if (typeof value === 'object') {
    if (value instanceof Array) {
      return value.map(valueToBackendValue);
    }

    if (value.__typename === 'WagtailImageRendition') {
      // TODO
      const originalImageId = value?.original_image?.id;
      if (!originalImageId) {
        throw new Error(
          "No original image ID, can't save image. " + JSON.stringify(value)
        );
      }
      return originalImageId;
    }

    return Object.fromEntries(
      Object.keys(value)
        .filter((key) => key !== '__typename')
        .map((key) => {
          return [key, valueToBackendValue(value[key])];
        })
    );
  } else {
    return value;
  }
};

const serializeBlockValue = (block: AnyBlockFragment) => {
  const typename = block.__typename;
  if (!isKnownBlock(block)) {
    throw new Error(`Unknown block ${typename}`);
  }

  const blockComponent = allBlockComponents[block.__typename];
  const fieldSelections = (blockComponent.fragment
    .definitions[0] as FragmentDefinitionNode).selectionSet.selections.filter(
    (s) => s.kind === 'Field'
  ) as FieldNode[];

  const valueSelection = fieldSelections.find(
    (selection) => selection.name.value === 'value'
  );
  if (!valueSelection) {
    // That's probably ok, some blocks don't have values (but we should check the block's shape just to be
    // safe).
    return null;
  }

  const valueKey = valueSelection.alias?.value || 'value';

  const value = (block as any)[valueKey];
  return valueToBackendValue(value);
};

const typenameToBackendBlockName = (typename: string) => {
  const parts = Array.from(typename.matchAll(/([A-Z][a-z]*)/g)).map(
    (match) => match[0]
  );
  if (parts[parts.length - 1] !== 'Block') {
    throw new Error(`Invalid typename ${typename}, should end with ...Block`);
  }

  return parts
    .slice(0, -1)
    .map((p) => p.toLowerCase())
    .join('_');
};

const serializeBlocks = (blocks: AnyBlockFragment[]) => {
  return blocks.map((block) => {
    const value = serializeBlockValue(block);
    return { type: typenameToBackendBlockName(block.__typename), value };
  });
};

const EditControls: React.FC<Props> = ({ blocks }) => {
  const {
    state: { page_id },
  } = useContext(WagtailPageContext);

  const { dispatch: editDispatch } = useContext(EditBlocksContext);

  const notify = useNotification();

  const [saveMutation] = useWagtailSavePageMutation();

  const save = useCallback(async () => {
    if (!page_id) {
      return; // shouldn't happen
    }

    const blocksJson = JSON.stringify(serializeBlocks(blocks), null, 2);
    // window.alert(blocksJson);
    const mutationResults = await saveMutation({
      variables: {
        input: {
          page_id,
          blocksJson,
          publish: false,
        },
      },
    });
    if (mutationResults.data?.result.validation_error) {
      const { validation_error } = mutationResults.data?.result;
      editDispatch({
        type: 'SET_VALIDATION_ERROR',
        payload: validation_error,
      });
      notify({
        text:
          'Failed to save. Errors in blocks ' +
          validation_error.block_errors.map((e) => e.block_id + 1).join(', '),
        type: 'Error',
      });
    }

    // if (mutationResults.data?.result.page.body) {
    //   editDispatch({
    //     type: 'REPLACE_BLOCKS',
    //     payload: mutationResults.data?.page.body,
    //   });
    // }
  }, [saveMutation, blocks, page_id, notify, editDispatch]);

  if (!page_id) {
    throw new Error('No page_id in WagtailPageContext');
  }

  return (
    <Container>
      <AsyncButton act={save}>Сохранить</AsyncButton>
    </Container>
  );
};

export default EditControls;
