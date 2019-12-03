import { createListSlice, ListSlice, ListSliceProps } from './list';

import { AsyncAction } from '../store';
import { createLoadAction } from '../action-utils';

interface ResourceSliceProps<Item> extends ListSliceProps<Item> {
  url: string;
}

interface ResourceSlice<Item> extends ListSlice<Item> {
  actions: ListSlice<Item>['actions'] & {
    loadAll: () => AsyncAction;
    loadAndView: (id: string) => AsyncAction;
  };
}

export const createResourceSlice = <Item>(
  props: ResourceSliceProps<Item>
): ResourceSlice<Item> => {
  const listSlice = createListSlice<Item>({
    actionPrefix: props.actionPrefix,
    getId: props.getId,
  });

  const loadAll = createLoadAction(props.url, listSlice.actions.replaceAll);
  const loadAndView = (id: string) =>
    createLoadAction(`${props.url}/${id}`, listSlice.actions.setAndView)();

  return {
    ...listSlice,
    actions: {
      ...listSlice.actions,
      loadAll,
      loadAndView,
    },
  };
};
