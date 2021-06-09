import { Data, GroupedItem, Histogram } from './types';

export const data2histogram = (data: Data): Histogram => {
  const value2count: { [key: string]: number } = {};
  let empty = 0;
  data.values.forEach((value) => {
    if (value.value === null) {
      empty = value.count;
      return;
    } else {
      value2count[value.value] = value.count;
    }
  });

  const extractInt = (str: string) => {
    const match = str.match(/\d+/g);
    if (!match) {
      return 0;
    }
    return parseInt(match.slice(-1)[0]);
  };

  const sorters: { [k in Data['sort']]: (a: string, b: string) => number } = {
    top: (a, b) => value2count[b] - value2count[a],
    numerical: (a, b) => parseInt(a) - parseInt(b),
    lexical: (a, b) => (a < b ? 1 : -1),
    last_int: (a, b) => extractInt(a) - extractInt(b),
    choices: (a, b) => {
      if (data.choices) {
        const aIndex = data.choices.indexOf(a);
        const bIndex = data.choices.indexOf(b);
        console.log(a, b, aIndex, bIndex);
        if (aIndex >= 0 && bIndex < 0) {
          return -1;
        }
        if (bIndex >= 0 && aIndex < 0) {
          return 1;
        }
        if (aIndex >= 0 && bIndex >= 0) {
          return aIndex < bIndex ? -1 : 1;
        }
      }
      return value2count[b] - value2count[a];
    },
  };

  const sortedItems = Object.keys(value2count).sort((a, b) => {
    if (data.custom_sort) {
      const a_i = data.custom_sort.indexOf(a);
      const b_i = data.custom_sort.indexOf(b);
      if (a_i >= 0 && b_i >= 0) {
        return a_i - b_i;
      } else if (a_i < 0 && b_i >= 0) {
        return 1;
      } else if (a_i >= 0 && b_i < 0) {
        return -1;
      }
    }
    return sorters[data.sort](a, b);
  });

  const histogram: Histogram = {
    values: sortedItems.map((item, i) => {
      return {
        count: value2count[item],
        name: item,
        id: i.toString(),
      };
    }),
    empty: {
      count: empty,
      name: 'Не указано',
      id: 'empty',
      special: 'empty',
    },
    data: data,
  };
  return histogram;
};

export const collapseTail = (
  histogram: Histogram,
  limit: number
): Histogram => {
  const collapsedHistogram = { ...histogram };

  if (histogram.values.length > limit) {
    // collapse tail into "other"
    const tail = histogram.values.slice(limit);
    const collapsed: GroupedItem = {
      id: 'tail',
      special: 'tail',
      name: 'Прочее',
      count: tail.map((item) => item.count).reduce((prev, cur) => prev + cur),
    };

    collapsedHistogram.values = histogram.values.slice(0, limit);
    collapsedHistogram.tail = collapsed;
  }
  return collapsedHistogram;
};

export const histogram2items = (histogram: Histogram): GroupedItem[] => {
  const items = [...histogram.values, histogram.empty];
  if (histogram.tail) {
    items.push(histogram.tail);
  }
  return items;
};
