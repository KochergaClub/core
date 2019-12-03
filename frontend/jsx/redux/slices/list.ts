import { AnyAction, Reducer } from 'redux';

interface ListState<Item> {
  byId: { [k: string]: Item };
  ids: string[];
  viewingId?: string;
}

type ReplaceAllAction<Item> = {
  type: string;
  payload: Item[];
};

type SetAndViewAction<Item> = {
  type: string;
  payload: Item;
};

export interface ListSlice<Item> {
  reducer: Reducer<ListState<Item>>;
  actions: {
    replaceAll: (items: Item[]) => ReplaceAllAction<Item>;
    setAndView: (item: Item) => SetAndViewAction<Item>;
  };
  selectors: {
    selectAll: (state: ListState<Item>) => Item[];
    selectViewing: (state: ListState<Item>) => Item | undefined;
  };
  initialState: ListState<Item>;
}

export interface ListSliceProps<Item> {
  actionPrefix: string;
  getId?: (item: Item) => string;
}

export const createListSlice = <Item>(
  props: ListSliceProps<Item>
): ListSlice<Item> => {
  type State = ListState<Item>;

  const getId = props.getId || ((item: Item) => (item as any)['id'] as string);

  const replaceAllActionType = props.actionPrefix + '_REPLACE_ALL';
  const setAndViewActionType = props.actionPrefix + '_SET_AND_VIEW';

  const initialState: State = { byId: {}, ids: [], viewingId: undefined };

  const reducer = (state: State = initialState, action: AnyAction): State => {
    if (action.type === replaceAllActionType) {
      const byId: { [k: string]: Item } = {};
      const payload = (action as ReplaceAllAction<Item>).payload;
      for (const item of payload) {
        byId[getId(item)] = item;
      }
      return {
        ...state,
        byId,
        ids: payload.map(getId), // FIXME - double invocation of getId for each item
      };
    } else if (action.type === setAndViewActionType) {
      const payload = (action as SetAndViewAction<Item>).payload;
      const id = getId(payload);
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: payload,
        },
        viewingId: id,
      };
    } else {
      return state;
    }
  };

  const replaceAll = (items: Item[]) => ({
    type: replaceAllActionType,
    payload: items,
  });

  const setAndView = (item: Item) => ({
    type: setAndViewActionType,
    payload: item,
  });

  const actions: ListSlice<Item>['actions'] = { replaceAll, setAndView };

  // TODO - reselect
  const selectAll = (state: State): Item[] =>
    state.ids.map(id => state.byId[id]);

  const selectViewing = (state: State): Item | undefined =>
    state.viewingId ? state.byId[state.viewingId] : undefined;

  return {
    reducer,
    actions,
    selectors: {
      selectAll,
      selectViewing,
    },
    initialState,
  };
};
