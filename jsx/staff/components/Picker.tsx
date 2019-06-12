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

export default function Picker({ extra, pickedMember, pickedExtra }: Props) {
  const { members } = useContext(StaffContext);

  const items = useMemo(() => {
    const memberItems: MemberItem[] = members.map(member => ({
      type: 'member' as const,
      member,
    }));
    const extraItems: ExtraItem[] = extra
      ? extra.map(value => ({
          type: 'extra' as const,
          extra: value,
        }))
      : [];

    return [...memberItems, ...extraItems];
  }, [members, extra]);

  const picked = useCallback(
    (item: Item) => {
      switch (item.type) {
        case 'member':
          return pickedMember(item.member);
        case 'extra':
          if (!pickedExtra) {
            throw new Error("Can't pick extra option without pickedExtra");
          }
          return pickedExtra(item.extra.text);
      }
    },
    [pickedMember, pickedExtra]
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
