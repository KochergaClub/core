import { Reducer } from 'redux';

// Useless for now, but we might wrap all singleton resources in an object for some reason,
// e.g. to track the loading state.
type State<Item> = Item | null;

export interface Slice<Item> {
  reducer: Reducer<State<Item>>;
  actions: {
    replace: (item: Item) => ReplaceAction<Item>;
  };
  selectors: {
    selectData: (state: State<Item>) => Item | null;
  };
  initialState: State<Item>;
}

type ReplaceAction<Item> = {
  type: string;
  payload: Item;
};

interface Props {
  actionPrefix: string;
}

export const createSingletonResourceSlice = <Item>(
  props: Props
): Slice<Item> => {
  const replaceActionType = props.actionPrefix + '_REPLACE';

  const initialState = null;

  const reducer: Reducer<State<Item>> = (state = initialState, action) => {
    if (action.type === replaceActionType) {
      return action.payload;
    }
    return state;
  };

  return {
    reducer,
    initialState,
    actions: {
      replace: (data: Item) => ({
        type: replaceActionType,
        payload: data,
      }),
    },
    selectors: {
      selectData: x => x,
    },
  };
};
