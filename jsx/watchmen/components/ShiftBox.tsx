import React, { useRef, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';

import useOnClickOutside from 'use-onclickoutside';

import { colors } from '@kocherga/frontkit';

import { nightColor } from '../constants';
import { ScheduleContext } from '../contexts';
import { Shift } from '../types';
import { useAPI } from '../../common/hooks';
import Picker from './Picker';

const Container = styled.div<{ editing: boolean }>`
  position: relative;
  cursor: ${props => (props.editing ? 'pointer' : 'auto')};
`;

const Box = styled.div`
  height: 2em;
  line-height: 2em;
  text-align: center;
  border: 1px solid white;
`;

const EmptyBox = styled(Box)`
  background-color: ${colors.grey[100]};
`;

const NightBoxContainer = styled(Box)`
  background-color: ${nightColor};
  color: white;
`;

const NightBox = () => <NightBoxContainer>Ночь</NightBoxContainer>;

const WatchmanLink = styled.a`
  color: black;
  text-decoration: none;
`;

const InnerShiftBox = ({
  shift,
  editing,
}: {
  shift: Shift;
  editing: boolean;
}) => {
  if (shift.is_night) {
    return <NightBox />;
  }
  if (!shift.watchman) {
    return <EmptyBox />;
  }

  let content = <>{shift.watchman.short_name}</>;
  if (!editing) {
    content = (
      <WatchmanLink href={`/team/staff/${shift.watchman.id}`}>
        {content}
      </WatchmanLink>
    );
  }

  return <Box style={{ backgroundColor: shift.watchman.color }}>{content}</Box>;
};

const ShiftBox = ({ shift }: { shift: Shift }) => {
  const { editing, setShift } = useContext(ScheduleContext);
  const [expanded, setExpanded] = useState(false);
  const api = useAPI();

  const flipExpand = useCallback(
    () => {
      setExpanded(!expanded);
    },
    [expanded, editing]
  );

  const unexpand = useCallback(
    () => {
      setExpanded(false);
    },
    [expanded, editing]
  );

  const ref = useRef(null);
  useOnClickOutside(ref, unexpand);

  const pick = useCallback(async (shift: Shift) => {
    const { date, shift: shiftType, watchman, is_night } = shift;

    await api.call(`watchmen/schedule/${date}/${shiftType}`, 'PUT', {
      watchman: watchman ? watchman.short_name : '',
      is_night: is_night ? 1 : 0,
    });

    setShift(shift);
    unexpand();
  }, []);

  return (
    <Container ref={ref} editing={editing}>
      <div onClick={editing ? flipExpand : undefined}>
        <InnerShiftBox shift={shift} editing={editing} />
      </div>
      {expanded && (
        <Picker date={shift.date} shift={shift.shift} picked={pick} />
      )}
    </Container>
  );
};

export default ShiftBox;
