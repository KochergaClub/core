import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { WagtailPageContext } from '~/cms/contexts';
import { AsyncButton } from '~/components';

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

const serializeOneBlock = (block: AnyBlockFragment) => {
  throw new Error('Not implemented');
};

const serializeBlocks = (blocks: AnyBlockFragment[]) => {
  return blocks.map(serializeOneBlock);
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
    await saveMutation({
      variables: {
        input: {
          page_id,
          blocksJson: JSON.stringify(serializeBlocks(blocks)),
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
