import { useCallback } from 'react';
import styled from 'styled-components';

import { colors, Row } from '~/frontkit';

const ItemContainer = styled.a<{ active: boolean }>`
  text-decoration: none;
  color: hsl(${colors.hues.blue}, 80%, 50%); // FIXME - replace with colors.link
  border-bottom: ${(props) =>
    props.active ? `1px dashed ${colors.grey[600]}` : 'none'};
`;

const Item = ({
  active,
  action,
  children,
}: {
  active: boolean;
  action: () => void;
  children: React.ReactNode;
}) => {
  const cb = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      action();
    },
    [action]
  );
  return (
    <ItemContainer active={active} href="#" onClick={cb}>
      {children}
    </ItemContainer>
  );
};

interface Props {
  value: boolean;
  set: (v: boolean) => void;
}

const EditingSwitch: React.FC<Props> = ({ value, set }) => {
  return (
    <Row>
      <Item active={!value} action={() => set(false)}>
        смотреть
      </Item>
      <Item active={value} action={() => set(true)}>
        редактировать
      </Item>
    </Row>
  );
};

export default EditingSwitch;
