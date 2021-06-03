import { useCallback, useState } from 'react';
import { GoGear } from 'react-icons/go';

import { useCommonHotkeys, useFocusOnFirstModalRender, useHover } from '~/common/hooks';
import { Button, ControlsFooter, Modal, Row } from '~/frontkit';

import { AnyBlockFragment } from '../types';
import { BlockWithControls } from './BlockWithControls';

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

const Controls: React.FC<Props & { showControls: boolean }> = ({
  block,
  showControls,
}) => {
  const [dumping, setDumping] = useState(false);

  const dump = useCallback(() => {
    setDumping(true);
  }, []);

  const undump = useCallback(() => {
    setDumping(false);
  }, []);

  return (
    <div>
      {showControls ? (
        <Button size="small" onClick={dump}>
          <Row vCentered>
            <GoGear />
            <span>Параметры</span>
          </Row>
        </Button>
      ) : null}
      {dumping && <Dump block={block} close={undump} />}
    </div>
  );
};

export const PreviewBlockWrapper: React.FC<Props> = ({ block, children }) => {
  const [hoverRef, isHovered] = useHover();
  // TODO - extract preview-specific stuff into dynamically loaded component, to reduce JS bundle size?
  return (
    <div ref={hoverRef}>
      <BlockWithControls
        renderControls={() => (
          <Controls block={block} showControls={isHovered} />
        )}
      >
        {children}
      </BlockWithControls>
    </div>
  );
};
