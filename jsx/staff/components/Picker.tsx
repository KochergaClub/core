import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { StaffContext } from '../contexts';

import { Member } from '../types';

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

type PickedMemberCb = (member: Member) => void;
type PickedExtraCb = (text: string) => void;

interface Props {
  extra?: {
    color: string;
    text: string;
    dark: boolean;
  }[];
  pickedExtra?: PickedExtraCb;
  pickedMember: PickedMemberCb;
}

interface ItemProps {
  member: Member;
  picked: PickedMemberCb;
}

const PickerItem = ({ member, picked }: ItemProps) => {
  const text = member.short_name || 'Нет имени';
  const color = member.color;

  return (
    <PickerItemContainer
      style={{ backgroundColor: color }}
      onClick={() => picked(member)}
    >
      <div>{text}</div>
    </PickerItemContainer>
  );
};

const Picker = (props: Props) => {
  const { members } = useContext(StaffContext);

  return (
    <PickerContainer>
      {members.map(m => (
        <PickerItem key={m.id} member={m} picked={props.pickedMember} />
      ))}
      {props.extra &&
        props.extra.map(e => (
          <ThemeProvider theme={{ color: e.dark ? 'dark' : 'light' }}>
            <PickerItemContainer
              style={{ backgroundColor: e.color }}
              onClick={() => props.pickedExtra && props.pickedExtra(e.text)}
            >
              <div>{e.text}</div>
            </PickerItemContainer>
          </ThemeProvider>
        ))}
    </PickerContainer>
  );
};

export default Picker;
