import { useCallback, useState } from 'react';
import { GoGear } from 'react-icons/go';
import styled from 'styled-components';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { Button, colors, ControlsFooter, Modal, Row } from '~/frontkit';

import { AnyBlockFragment } from '../types';
import ControlledBlockContainer from './ControlledBlockContainer';

// is this necessary?
const ControlsContainer = styled.div`
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
      <Modal.Header close={close}>
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

const PreviewBlockWrapper: React.FC<Props> = ({ block, children }) => {
  // TODO - extract preview-specific stuff into dynamically loaded component, to reduce JS bundle size?
  return (
    <ControlledBlockContainer controls={Controls} block={block}>
      {children}
    </ControlledBlockContainer>
  );
};

export default PreviewBlockWrapper;
