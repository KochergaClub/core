import React, { useCallback, useContext, useMemo } from 'react';

import BasicPicker from '~/components/Picker';

import { StaffContext } from '../contexts';

import { Member } from '../types';

// import { ThemeProvider } from 'styled-components';
//          <ThemeProvider theme={{ color: e.dark ? 'dark' : 'light' }}>
//            <PickerItemContainer
//              style={{ backgroundColor: e.color }}
//              onClick={() => props.pickedExtra && props.pickedExtra(e.text)}
//            >
//              <div>{e.text}</div>
//            </PickerItemContainer>
//          </ThemeProvider>

interface Extra {
  color: string;
  text: string;
  dark?: boolean;
}

interface Props {
  extra?: Extra[];
  pickedExtra?: (text: string) => void;
  pickedMember: (member: Member) => void;
}

interface MemberItem {
  type: 'member';
  member: Member;
}

interface ExtraItem {
  type: 'extra';
  extra: Extra;
}

type Item = MemberItem | ExtraItem;

export default function Picker(props: Props) {
  const { members } = useContext(StaffContext);

  const items = useMemo(
    () => {
      const memberItems: Item[] = members.map(
        member => ({ type: 'member', member } as MemberItem)
      );
      const extraItems: Item[] = props.extra
        ? props.extra.map(
            extra =>
              ({
                type: 'extra',
                extra,
              } as ExtraItem)
          )
        : [];
      return memberItems.concat(extraItems);
    },
    [members, props.extra]
  );

  const picked = useCallback(
    (item: Item) => {
      switch (item.type) {
        case 'member':
          return props.pickedMember(item.member);
        case 'extra':
          if (!props.pickedExtra) {
            throw new Error("Can't pick extra option without pickedExtra");
          }
          return props.pickedExtra(item.extra.text);
      }
    },
    [props.pickedMember, props.pickedExtra]
  );

  const item2text = useCallback((item: Item) => {
    switch (item.type) {
      case 'member':
        return item.member.short_name || 'Нет имени';
      case 'extra':
        return item.extra.text;
    }
  }, []);

  const item2color = useCallback((item: Item) => {
    switch (item.type) {
      case 'member':
        return item.member.color;
      case 'extra':
        return item.extra.color;
    }
  }, []);

  return (
    <BasicPicker
      item2text={item2text}
      item2color={item2color}
      items={items}
      picked={picked}
    />
  );
}
