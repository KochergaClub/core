import { FieldNode, FragmentDefinitionNode } from 'graphql';
import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { useApolloClient } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import { useNotification } from '~/common/hooks';
import { AsyncButton } from '~/components';

import { allBlockComponents, isKnownBlock } from '../blocks';
import { AnyBlockFragment } from '../types';
import { EditBlocksContext } from './EditWagtailBlocks';
import {
    StructureL1Fragment, StructureL2Fragment, StructureL3Fragment, useWagtailSavePageMutation,
    WagtailBlockStructureDocument, WagtailBlockStructureQuery
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

type StructureFragment = WagtailBlockStructureQuery['result'];

// TODO - compare value with block's shape
const valueToBackendValue = (
  structure: StructureL1Fragment | StructureL2Fragment | StructureL3Fragment,
  value: any
): any => {
  // window.alert(
  //   JSON.stringify(structure, null, 2) + '\n\n' + JSON.stringify(value, null, 2)
  // );
  switch (structure.__typename) {
    case 'WagtailStructBlockStructure':
      if (!structure.child_blocks) {
        throw new Error('Structure is incomplete (too deeply nested?)');
      }
      if (typeof value !== 'object') {
        throw new Error(`Expected object, got ${value}`);
      }
      if (value instanceof Array) {
        throw new Error(`Expected non-array object, got array`);
      }
      // TODO - validate that there are no extra fields in value

      const result: any = {};
      for (const child_block of structure.child_blocks) {
        const child_value = value[child_block.name]; // TODO - consider aliases
        result[child_block.name] = valueToBackendValue(
          child_block.definition,
          child_value
        );
      }
      return result;
    case 'WagtailListBlockStructure':
      if (!structure.child_block) {
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
  return valueToBackendValue(structure, value);
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

const useBlocksSerializer = () => {
  const apolloClient = useApolloClient();
  return async (blocks: AnyBlockFragment[]) => {
    const result = [];
    for (const block of blocks) {
      const blockName = typenameToBackendBlockName(block.__typename);
      const structureQueryResults = await apolloClient.query<
        WagtailBlockStructureQuery
      >({
        query: WagtailBlockStructureDocument,
        variables: {
          name: blockName,
        },
        fetchPolicy: 'cache-first',
      });
      if (!structureQueryResults.data?.result) {
        throw new Error(`Couldn't load block structure for block ${blockName}`);
      }
      const structure = structureQueryResults.data.result;
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
    window.alert(blocksJson);
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
