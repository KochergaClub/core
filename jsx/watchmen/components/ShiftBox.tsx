import React, { useRef, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';

import useOnClickOutside from 'use-onclickoutside';

import { ScheduleContext } from '../contexts';
import { ScheduleItem, Watchman } from '../types';
import Picker from './Picker';

import { nightColor } from '../constants';

const Container = styled.div<{ editable: boolean }>`
  position: relative;
  cursor: ${props => (props.editable ? 'pointer' : 'auto')};
`;

const Box = styled.div`
  height: 2em;
  line-height: 2em;
  vertical-align: center;
  text-align: center;
  border: 1px solid white;
`;

const EmptyBox = styled(Box)`
  background-color: #f0f0f0;
`;

const NightBoxContainer = styled(Box)`
  background-color: ${nightColor};
  color: white;
`;

const NightBox = () => <NightBoxContainer>Ночь</NightBoxContainer>;

const InnerShiftBox = ({ item }: { item?: ScheduleItem }) => {
  if (!item.watchman) {
    return <EmptyBox />;
  }
  if (item.watchman === 'Ночь') {
    return <NightBox />;
  }
  return <Box style={{ backgroundColor: item.color }}>{item.watchman}</Box>;
};

const ShiftBox = ({ item }: { item?: ScheduleItem }) => {
  const { editable } = useContext(ScheduleContext);
  const [expanded, setExpanded] = useState(false);

  const { csrfToken } = useContext(ScheduleContext);

  const flipExpand = useCallback(
    () => {
      setExpanded(!expanded);
    },
    [expanded, editable]
  );

  const unexpand = useCallback(
    () => {
      setExpanded(false);
    },
    [expanded, editable]
  );

  const ref = useRef(null);
  useOnClickOutside(ref, unexpand);

  const pick = useCallback(
    ({
      date,
      shift,
      watchman,
    }: {
      date: string;
      shift: string;
      watchman: Watchman;
    }) => {
      const formData = new FormData();
      formData.append('shift', shift);
      formData.append('date', date);
      formData.append('watchman', watchman.short_name);
      formData.append('csrfmiddlewaretoken', csrfToken);

      fetch('/team/watchmen/action/set_watchman_for_shift', {
        method: 'POST',
        body: formData,
      }).then(() => {
        window.location.reload(); // TODO - update in-memory store instead
      }); // TODO - do something on errors
    },
    []
  );

  return (
    <Container ref={ref} editable={editable}>
      <div onClick={editable && flipExpand}>
        <InnerShiftBox item={item} />
      </div>
      {expanded && <Picker date={item.date} shift={item.shift} picked={pick} />}
    </Container>
  );
};

export default ShiftBox;
