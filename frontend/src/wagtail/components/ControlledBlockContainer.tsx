import styled from 'styled-components';

import { colors } from '~/frontkit';

import { AnyBlockFragment } from '../types';

const Container = styled.div`
  position: relative;
  box-sizing: border-box;

  > .controls {
    display: none;
  }

  &:hover {
    z-index: 10; /* outline on top of neighbor blocks */
    outline: 1px dashed ${colors.grey[500]};
    > .controls {
      display: block;
    }
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
`;

interface Props {
  block: AnyBlockFragment;
  position?: number;
  total?: number;
  controls: React.ElementType<{
    block: AnyBlockFragment;
    position?: number;
    total?: number;
  }>;
}

const ControlledBlockContainer: React.FC<Props> = ({
  block,
  position,
  total,
  controls,
  children,
}) => {
  const Controls = controls;
  return (
    <Container>
      <ControlsContainer className="controls">
        <Controls block={block} position={position} total={total} />
      </ControlsContainer>
      {children}
    </Container>
  );
};

export default ControlledBlockContainer;
