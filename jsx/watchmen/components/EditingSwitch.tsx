import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { Row } from '@kocherga/frontkit';

import { ScheduleContext } from '../contexts';

const ItemContainer = styled.a<{ active: boolean }>`
  text-decoration: none;
  border-bottom: ${props => (props.active ? '1px dashed #888' : 'none')};
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
    [active, action]
  );
  return (
    <ItemContainer active={active} href="#" onClick={cb}>
      {children}
    </ItemContainer>
  );
};

const EditingSwitch = () => {
  const { editing, setEditing } = useContext(ScheduleContext);
  return (
    <Row>
      <Item active={!editing} action={() => setEditing(false)}>
        смотреть
      </Item>
      <Item active={editing} action={() => setEditing(true)}>
        редактировать
      </Item>
    </Row>
  );
};

export default EditingSwitch;
