import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { ScheduleContext } from '../contexts';
import { Watchman } from '../types';

import { nightColor } from '../constants';

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
  color: ${props => (props.theme.color === 'dark' ? 'white' : 'black')};

  > div {
    padding-left: 4px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
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
      <div>{watchman.short_name}</div>
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
      <ThemeProvider theme={{ color: 'dark' }}>
        <PickerItem
          watchman={{ short_name: 'Ночь', color: nightColor }}
          {...props}
        />
      </ThemeProvider>
    </PickerContainer>
  );
};

export default Picker;
