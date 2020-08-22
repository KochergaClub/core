import React from 'react';

interface EditAction {
  type: 'EDIT';
}

type Action = EditAction;

interface PageShape {
  page_id?: string;
  preview?: boolean;
  editing?: boolean;
}

const reducer = (state: PageShape, action: Action): PageShape => {
  switch (action.type) {
    case 'EDIT':
      if (state.preview || !state.page_id) {
        throw new Error(
          "Can't edit preview pages, check the flag in component before dispatching"
        );
      }
      return {
        ...state,
        editing: true,
      };
  }
};

export const useWagtailPageReducer = (initialState: PageShape) => {
  return React.useReducer(reducer, initialState);
};

interface WagtailPageContextShape {
  state: PageShape;
  dispatch?: (action: Action) => void;
}

export const WagtailPageContext = React.createContext<WagtailPageContextShape>({
  state: {},
});
