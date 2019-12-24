import { useMemo, useCallback } from 'react';

import Picker from '~/components/Picker';

import {
  useWatchmenWatchmenListForPickerQuery,
  WatchmanForPickerFragment,
} from '../queries.generated';

interface Extra {
  color: string;
  text: string;
  dark?: boolean;
}

interface Props {
  extra?: Extra[];
  pickedExtra?: (text: string) => void;
  pickedWatchman: (watchman: WatchmanForPickerFragment) => void;
}

interface WatchmanItem {
  type: 'watchman';
  watchman: WatchmanForPickerFragment;
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
  const queryResults = useWatchmenWatchmenListForPickerQuery();

  const items = useMemo(() => {
    if (queryResults.loading) {
      return [];
    }
    if (!queryResults.data) {
      return []; // TODO - pass error
    }
    const { watchmen } = queryResults.data;

    const watchmanItems: WatchmanItem[] = watchmen
      .filter(w => w.priority <= 2)
      .sort((a, b) => a.priority - b.priority)
      .map(watchman => ({
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
  }, [queryResults, extra]);

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
        return item.watchman.member.short_name || 'Нет имени';
      case 'extra':
        return item.extra.text;
    }
  }, []);

  const item2color = useCallback((item: Item) => {
    switch (item.type) {
      case 'watchman':
        return item.watchman.member.color || 'white';
      case 'extra':
        return item.extra.color;
    }
  }, []);

  return (
    <Picker
      loading={queryResults.loading}
      item2text={item2text}
      item2color={item2color}
      items={items}
      picked={picked}
    />
  );
};

export default WatchmanPicker;
