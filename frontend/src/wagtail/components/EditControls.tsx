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

  // TODO - traverse value and rewrite images etc., check that all types are comprehensible
  return (block as any)[valueKey];
};

const serializeBlocks = (blocks: AnyBlockFragment[]) => {
  return blocks.map((block) => {
    const value = serializeBlockValue(block);
    return [block.__typename, value]; // FIXME - rewrite __typename to backend type
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
    // not ready yet
    // await saveMutation({
    //   variables: {
    //     input: {
    //       page_id,
    //       blocksJson,
    //       publish: false,
    //     },
    //   },
    // });
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
