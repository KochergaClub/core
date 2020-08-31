import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { WagtailPageContext } from '~/cms/contexts';
import { useNotification } from '~/common/hooks';
import { AsyncButton } from '~/components';

import { useBlockStructureLoader } from '../hooks';
import { AnyBlockFragment, StructureFragment } from '../types';
import { getBlockValueKey, typenameToBackendBlockName } from '../utils';
import { EditBlocksContext } from './EditWagtailBlocks';
import {
    StructureL0Fragment, StructureL1Fragment, StructureL2Fragment, StructureL3Fragment,
    useWagtailSavePageMutation
} from './queries.generated';

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

// via https://github.com/microsoft/TypeScript/issues/1897
type JsonSimple = string | number | boolean;
type JsonObject = {
  [x: string]: JsonSimple | JsonObject | JsonArray;
};
interface JsonArray extends Array<JsonSimple | JsonObject | JsonArray> {}

type Json = JsonSimple | JsonObject | JsonArray;

// TODO - compare value with block's shape
const valueToBackendValue = (
  structure:
    | StructureL0Fragment
    | StructureL1Fragment
    | StructureL2Fragment
    | StructureL3Fragment,
  value: any
): Json => {
  switch (structure.__typename) {
    case 'WagtailStructBlockStructure':
      if (!('child_blocks' in structure)) {
        throw new Error('Structure is incomplete (too deeply nested?)');
      }
      if (typeof value !== 'object') {
        throw new Error(`Expected object, got ${value}`);
      }
      if (value instanceof Array) {
        throw new Error(`Expected non-array object, got array`);
      }
      // TODO - validate that there are no extra fields in value

      const result: Json = {};
      for (const child_block of structure.child_blocks) {
        const child_value = value[child_block.name]; // TODO - consider aliases
        result[child_block.name] = valueToBackendValue(
          child_block.definition,
          child_value
        );
      }
      return result;
    case 'WagtailListBlockStructure':
      if (!('child_block' in structure)) {
        throw new Error('Structure is incomplete (too deeply nested?)');
      }
      if (!(value instanceof Array)) {
        throw new Error(`Expected array, got ${JSON.stringify(value)}`);
      }
      return value.map((subvalue) =>
        valueToBackendValue(structure.child_block, subvalue)
      );
    case 'WagtailBooleanBlockStructure':
      if (typeof value !== 'boolean') {
        throw new Error(`Expected boolean, got ${value}`);
      }
      return value;
    case 'WagtailCharBlockStructure':
    case 'WagtailURLBlockStructure':
    case 'WagtailRichTextBlockStructure':
      if (typeof value !== 'string') {
        throw new Error(`Expected string, got ${value}`);
      }
      return value;
    case 'WagtailImageBlockStructure':
      if (value.__typename !== 'WagtailImageRendition') {
        throw new Error(`Expected ImageRendition value, got ${value}`);
      }
      // TODO
      const originalImageId = value?.original_image?.id;
      if (!originalImageId) {
        throw new Error(
          "No original image ID, can't save image. " + JSON.stringify(value)
        );
      }
      return originalImageId;
    default:
      throw new Error(`Unknown type in structure: ${structure.__typename}`);
  }
};

const serializeBlockValue = (
  structure: StructureFragment,
  block: AnyBlockFragment
) => {
  const valueKey = getBlockValueKey(block);

  if (valueKey === undefined) {
    return null;
  }
  const value = (block as any)[valueKey];
  return valueToBackendValue(structure, value);
};

const useBlocksSerializer = () => {
  const structureLoader = useBlockStructureLoader();

  return async (blocks: AnyBlockFragment[]) => {
    const result = [];
    for (const block of blocks) {
      const structure = await structureLoader(block);
      const blockName = typenameToBackendBlockName(block.__typename);
      const value = serializeBlockValue(structure, block);
      result.push({ type: blockName, value });
    }
    return result;
  };
};

const EditControls: React.FC<Props> = ({ blocks }) => {
  const {
    state: { page_id },
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
      <AsyncButton act={save}>Сохранить</AsyncButton>
    </Container>
  );
};

export default EditControls;
