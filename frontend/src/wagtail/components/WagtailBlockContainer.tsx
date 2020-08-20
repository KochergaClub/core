import { useCallback, useContext, useState } from 'react';
import { GoGear } from 'react-icons/go';
import styled from 'styled-components';

import { Button, colors, ControlsFooter, Modal, Row } from '@kocherga/frontkit';

import { WagtailPreviewContext } from '~/cms/contexts';
import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';

import { AnyBlockFragment } from './WagtailBlocks';

const PreviewContainer = styled.div`
  position: relative;
  box-sizing: border-box;

  > .preview-block-controls {
    display: none;
  }

  &:hover {
    z-index: 10; /* outline on top of neighbor blocks */
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

type DumpProps = Props & {
  close: () => void;
};

const Dump: React.FC<DumpProps> = ({ block, close }) => {
  const { __typename, id, ...rest } = block;

  const hotkeys = useCommonHotkeys({ onEscape: close });
  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header toggle={close}>
        {__typename} <small>{id}</small>
      </Modal.Header>
      <Modal.Body {...hotkeys} ref={focus}>
        <pre>{JSON.stringify(rest, null, 2)}</pre>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close}>Закрыть</Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
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
      <Button size="small" onClick={dump}>
        <Row vCentered>
          <GoGear />
          <span>Параметры</span>
        </Row>
      </Button>
      {dumping && <Dump block={block} close={undump} />}
    </ControlsContainer>
  );
};

const WagtailBlockContainer: React.FC<Props> = ({ block, children }) => {
  const { preview } = useContext(WagtailPreviewContext);

  if (!preview) {
    // TODO - wrap in <div> for parity with preview mode?
    return <>{children}</>;
  }

  // TODO - extract preview-specific stuff into dynamically loaded component, to reduce JS bundle size?
  return (
    <PreviewContainer>
      <Controls block={block}>controls</Controls>
      {children}
    </PreviewContainer>
  );
};

export default WagtailBlockContainer;
