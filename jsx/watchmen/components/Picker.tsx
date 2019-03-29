import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';

import { ScheduleContext } from '../contexts';
import { Watchman } from '../types';

const PickerContainer = styled.div`
  position: absolute;
  top: 2em;
  border: 1px solid #aaa;
  box-shadow: 4px 2px 2px #ccc;

  margin-left: 4px;
  width: 100%;
  z-index: 10;
  background-color: white;
`;

const PickerItemContainer = styled.div`
  cursor: pointer;
  padding-left: 4px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid black;
  }
`;

interface Props {
  date: string;
  shift: string;
  picked: (
    {
      date,
      shift,
      watchman,
    }: { date: string; shift: string; watchman: Watchman }
  ) => void;
}

interface ItemProps extends Props {
  watchman: Watchman;
}

const PickerItem = ({ watchman, date, shift, picked }: ItemProps) => {
  return (
    <PickerItemContainer
      style={{ backgroundColor: watchman.color }}
      onClick={() => picked({ date, shift, watchman })}
    >
      {watchman.short_name}
    </PickerItemContainer>
  );
};

const Picker = (props: Props) => {
  const { watchmen } = useContext(ScheduleContext);
  return (
    <PickerContainer>
      {watchmen.map(w => (
        <PickerItem key={w.short_name} watchman={w} {...props} />
      ))}
    </PickerContainer>
  );
};

export default Picker;
