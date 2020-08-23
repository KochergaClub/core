import { FieldNode, FragmentDefinitionNode } from 'graphql';
import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { WagtailPageContext } from '~/cms/contexts';
import { AsyncButton } from '~/components';

import { allBlockComponents, isKnownBlock } from '../blocks';
import { AnyBlockFragment } from '../types';
import { useWagtailSavePageMutation } from './queries.generated';

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  border: 1px solid red;
  background-color: white;
  padding: 20px;
`;

interface Props {
  blocks: AnyBlockFragment[];
}

// TODO - compare value with block's shape
const valueToBackendValue = (value: any) => {
  if (typeof value === 'object') {
    if (value instanceof Array) {
      return value.map(valueToBackendValue);
    }

    if (value.__typename === 'WagtailImageRendition') {
      // TODO
      // throw new Error("Don't know how to convert images yet");
      return null;
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

  const [saveMutation] = useWagtailSavePageMutation();

  const save = useCallback(async () => {
    if (!page_id) {
      return; // shouldn't happen
    }

    const blocksJson = JSON.stringify(serializeBlocks(blocks), null, 2);
    window.alert(blocksJson);
    await saveMutation({
      variables: {
        input: {
          page_id,
          blocksJson,
          publish: false,
        },
      },
    });
  }, [saveMutation, page_id]);

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
