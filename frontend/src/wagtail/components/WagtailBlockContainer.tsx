import { useCallback, useContext, useState } from 'react';
import { GoGear } from 'react-icons/go';
import styled from 'styled-components';

import { colors, Modal } from '@kocherga/frontkit';

import { AnyBlockFragment } from './WagtailBlocks';
import { WagtailPreviewContext } from '~/cms/contexts';

const PreviewContainer = styled.div`
  position: relative;
  box-sizing: border-box;

  > .preview-block-controls {
    display: none;
  }

  &:hover {
    outline: 1px dashed ${colors.grey[500]};
    > .preview-block-controls {
      display: block;
    }
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;

  > * {
    color: ${colors.grey[500]};

    &:hover {
      color: ${colors.grey[800]};
    }
  }
`;

interface Props {
  block: AnyBlockFragment;
}

const Dump: React.FC<Props> = ({ block }) => {
  const { __typename, id, ...rest } = block;
  return <pre>{JSON.stringify(rest, null, 2)}</pre>;
};

const Controls: React.FC<Props> = ({ block }) => {
  const [dumping, setDumping] = useState(false);

  const dump = useCallback(() => {
    setDumping(true);
  }, []);

  const undump = useCallback(() => {
    setDumping(false);
  }, []);

  return (
    <ControlsContainer className="preview-block-controls">
      <GoGear onClick={dump} />
      {dumping && (
        <Modal>
          <Modal.Header toggle={undump}>
            {block.__typename} <small>{block.id}</small>
          </Modal.Header>
          <Modal.Body>
            <Dump block={block} />
          </Modal.Body>
        </Modal>
      )}
    </ControlsContainer>
  );
};

const WagtailBlockContainer: React.FC<Props> = ({ block, children }) => {
  const { preview } = useContext(WagtailPreviewContext);

  if (!preview) {
    // TODO - wrap in <div> for parity with preview mode?
    return <>{children}</>;
  }

  return (
    <PreviewContainer>
      <Controls block={block}>controls</Controls>
      {children}
    </PreviewContainer>
  );
};

export default WagtailBlockContainer;
