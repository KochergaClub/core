import React, { useRef, useContext, useState, useCallback } from 'react';
import styled from 'styled-components';

import useOnClickOutside from 'use-onclickoutside';

import { ScheduleContext } from '../contexts';
import { Shift } from '../types';
import Picker from './Picker';

import { nightColor } from '../constants';

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
  background-color: #f0f0f0;
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
  shift?: Shift;
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

const ShiftBox = ({ shift }: { shift?: Shift }) => {
  const { editing } = useContext(ScheduleContext);
  const [expanded, setExpanded] = useState(false);

  const { csrfToken } = useContext(ScheduleContext);

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

  const pick = useCallback(({ date, shift, watchman, is_night }: Shift) => {
    const formData = new FormData();
    formData.append('shift', shift);
    formData.append('date', date);
    formData.append('watchman', watchman ? watchman.short_name : '');
    if (is_night) {
      formData.append('is_night', '1');
    }
    formData.append('csrfmiddlewaretoken', csrfToken);

    fetch('/team/watchmen/action/set_watchman_for_shift', {
      method: 'POST',
      body: formData,
    }).then(() => {
      window.location.reload(); // TODO - update in-memory store instead
    }); // TODO - do something on errors
  }, []);

  return (
    <Container ref={ref} editing={editing}>
      <div onClick={editing && flipExpand}>
        <InnerShiftBox shift={shift} editing={editing} />
      </div>
      {expanded && (
        <Picker date={shift.date} shift={shift.shift} picked={pick} />
      )}
    </Container>
  );
};

export default ShiftBox;
