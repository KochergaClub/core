import { AnyAction, Reducer } from 'redux';

export interface BagState<Item> {
  byId: { [k: string]: Item };
}

type ReplaceAllAction<Item> = {
  type: string;
  payload: Item[];
};

type AddAction<Item> = {
  type: string;
  payload: Item;
};

type AddItemsAction<Item> = {
  type: string;
  payload: Item[];
};

export interface BagSlice<Item> {
  reducer: Reducer<BagState<Item>>;
  actions: {
    replaceAll: (items: Item[]) => ReplaceAllAction<Item>;
    addItems: (items: Item[]) => AddItemsAction<Item>;
    add: (item: Item) => AddAction<Item>;
  };
  selectors: {
    selectById: (
      state: BagState<Item>,
      id: string | number
    ) => Item | undefined;
    selectByIdsList: (
      state: BagState<Item>,
      ids: (string | number)[]
    ) => Item[];
  };
  initialState: BagState<Item>;
}

export interface BagSliceProps<Item> {
  actionPrefix: string;
  getId?: (item: Item) => string;
}

export const createBagSlice = <Item>(
  props: BagSliceProps<Item>
): BagSlice<Item> => {
  type State = BagState<Item>;

  const getId = props.getId || ((item: Item) => (item as any)['id'] as string);

  const replaceAllActionType = props.actionPrefix + '_REPLACE_ALL';
  const addActionType = props.actionPrefix + '_ADD';
  const addItemsActionType = props.actionPrefix + '_ADD_ITEMS';

  const initialState: State = { byId: {} };

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
      };
    } else if (action.type === addActionType) {
      const item = (action as AddAction<Item>).payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [getId(item)]: item,
        },
      };
    } else if (action.type === addItemsActionType) {
      const payload = (action as ReplaceAllAction<Item>).payload;

      const newById: { [k: string]: Item } = {};
      for (const item of payload) {
        newById[getId(item)] = item;
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          ...newById,
        },
      };
    } else {
      return state;
    }
  };

  const replaceAll = (items: Item[]) => ({
    type: replaceAllActionType,
    payload: items,
  });

  const addItems = (items: Item[]) => ({
    type: addItemsActionType,
    payload: items,
  });

  const add = (item: Item) => ({
    type: addActionType,
    payload: item,
  });

  const actions: BagSlice<Item>['actions'] = { replaceAll, addItems, add };

  const selectById = (state: State, id: string | number): Item | undefined =>
    state.byId[id];

  const selectByIdsList = (state: State, ids: (string | number)[]): Item[] =>
    ids.map(id => state.byId[id]).filter(item => item !== undefined);

  return {
    reducer,
    actions,
    selectors: {
      selectById,
      selectByIdsList,
    },
    initialState,
  };
};
