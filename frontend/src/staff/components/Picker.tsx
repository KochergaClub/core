import { useCallback, useMemo } from 'react';

import { Picker as BasicPicker } from '~/components/Picker';

import { StaffMemberForPickerFragment as Member } from '../queries.generated';

interface Extra {
  color: string;
  text: string;
  dark?: boolean;
}

interface Props {
  loading?: boolean;
  members: Member[];
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

export function Picker({
  loading,
  members,
  extra,
  pickedMember,
  pickedExtra,
}: Props) {
  const items = useMemo(() => {
    const memberItems: MemberItem[] = members.map((member) => ({
      type: 'member' as const,
      member,
    }));
    const extraItems: ExtraItem[] = extra
      ? extra.map((value) => ({
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
        return item.member.color || 'white';
      case 'extra':
        return item.extra.color;
    }
  }, []);

  return (
    <BasicPicker
      loading={loading}
      item2text={item2text}
      item2color={item2color}
      items={items}
      picked={picked}
    />
  );
}
