import { createContext, useReducer } from 'react';
import { Range as SlateRange } from 'slate';

type LockedSelection = {
  range: SlateRange;
  domRange: Range;
  mode: 'comment'; // TODO - 'link' mode?
};

// Auxiliary context for slate.js editor.
// For now we use it to lock/unlock current selection for comments overlay.

type LockSelectionAction = {
  type: 'LOCK_SELECTION';
  payload: LockedSelection;
};

type UnlockSelectionAction = {
  type: 'UNLOCK_SELECTION';
};

type Action = LockSelectionAction | UnlockSelectionAction;

type State = {
  lockedSelection?: LockedSelection;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOCK_SELECTION':
      return {
        ...state,
        lockedSelection: action.payload,
      };
    case 'UNLOCK_SELECTION':
      return {
        ...state,
        lockedSelection: undefined,
      };
  }
};

export const useRichEditorReducer = () => {
  return useReducer(reducer, {});
};

interface RichEditorContextShape {
  state: State;
  dispatch: (action: Action) => void;
}

export const RichEditorContext = createContext<RichEditorContextShape>({
  state: {},
  dispatch: () => {
    return;
  },
});
