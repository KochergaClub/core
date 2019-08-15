import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Watchman } from '../types';

import { selectWatchmen } from '../selectors';
import BasicPicker from '~/components/Picker';

interface Extra {
  color: string;
  text: string;
  dark?: boolean;
}

interface Props {
  extra?: Extra[];
  pickedExtra?: (text: string) => void;
  pickedWatchman: (watchman: Watchman) => void;
}

interface WatchmanItem {
  type: 'watchman';
  watchman: Watchman;
}

interface ExtraItem {
  type: 'extra';
  extra: Extra;
}

type Item = WatchmanItem | ExtraItem;

const WatchmanPicker: React.FC<Props> = ({
  extra,
  pickedExtra,
  pickedWatchman,
}) => {
  const watchmen = useSelector(selectWatchmen) as Watchman[];

  const items = useMemo(() => {
    const watchmanItems: WatchmanItem[] = watchmen.map(watchman => ({
      type: 'watchman' as const,
      watchman,
    }));
    const extraItems: ExtraItem[] = extra
      ? extra.map(value => ({
          type: 'extra' as const,
          extra: value,
        }))
      : [];

    return [...watchmanItems, ...extraItems];
  }, [watchmen, extra]);

  const picked = useCallback(
    (item: Item) => {
      switch (item.type) {
        case 'watchman':
          return pickedWatchman(item.watchman);
        case 'extra':
          if (!pickedExtra) {
            throw new Error("Can't pick extra option without pickedExtra");
          }
          return pickedExtra(item.extra.text);
      }
    },
    [pickedWatchman, pickedExtra]
  );

  const item2text = useCallback((item: Item) => {
    switch (item.type) {
      case 'watchman':
        return item.watchman.short_name || 'Нет имени';
      case 'extra':
        return item.extra.text;
    }
  }, []);

  const item2color = useCallback((item: Item) => {
    switch (item.type) {
      case 'watchman':
        return item.watchman.color;
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
};

export default WatchmanPicker;
