import React, { useCallback } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';

import { colors, Row } from '@kocherga/frontkit';

import { State } from '~/redux/store';

import {
  selectEditing,
  setEditing as setEditingAction,
} from '../features/editing';

const ItemContainer = styled.a<{ active: boolean }>`
  text-decoration: none;
  color: hsl(${colors.hues.blue}, 80%, 50%); // FIXME - replace with colors.link
  border-bottom: ${props =>
    props.active ? `1px dashed ${colors.grey[700]}` : 'none'};
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
  editing: boolean;
  setEditing: (v: boolean) => void;
}

const EditingSwitch: React.FC<Props> = ({ editing, setEditing }) => {
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

const mapStateToProps = (state: State) => ({ editing: selectEditing(state) });

export default connect(mapStateToProps, { setEditing: setEditingAction })(
  EditingSwitch
);
