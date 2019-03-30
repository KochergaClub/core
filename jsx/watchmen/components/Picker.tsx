import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { ScheduleContext } from '../contexts';
import { Shift, Watchman } from '../types';

import { nightColor } from '../constants';

const PickerContainer = styled.div`
  position: absolute;
  top: 2em;
  border: 1px solid #888;

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  user-select: none;

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

type PickedCb = (shift: Shift) => void;

interface Props {
  date: string;
  shift: string;
  picked: PickedCb;
}

interface ItemProps extends Props {
  watchman?: Watchman;
  is_night: boolean;
}

const PickerItem = ({ date, shift, watchman, is_night, picked }: ItemProps) => {
  let color = 'white';
  let text = '';
  if (is_night) {
    text = 'Ночь';
    color = nightColor;
  } else if (watchman) {
    text = watchman.short_name;
    color = watchman.color;
  }

  return (
    <PickerItemContainer
      style={{ backgroundColor: color }}
      onClick={() => picked({ date, shift, watchman, is_night })}
    >
      <div>{text}</div>
    </PickerItemContainer>
  );
};

const Picker = (props: Props) => {
  const { watchmen } = useContext(ScheduleContext);

  return (
    <PickerContainer>
      {watchmen.map(w => (
        <PickerItem
          key={w.short_name}
          watchman={w}
          is_night={false}
          {...props}
        />
      ))}
      <ThemeProvider theme={{ color: 'dark' }}>
        <PickerItem is_night={true} {...props} />
      </ThemeProvider>
    </PickerContainer>
  );
};

export default Picker;
