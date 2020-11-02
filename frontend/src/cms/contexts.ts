import React from 'react';

import { KnownWagtailPageFragment } from './wagtail-utils';

type PageType = KnownWagtailPageFragment;

interface EditAction {
  type: 'EDIT';
}

interface StopEditingAction {
  type: 'STOP_EDITING';
}

// this action is used for switching between page revisions when editing
interface SetPageAction {
  type: 'SET_PAGE';
  payload: PageType; // new page
}

// this action is used for navigation; it resets preview and editing modes
interface NavigateAction {
  type: 'NAVIGATE';
  payload: PageType; // new page
}

type Action = EditAction | StopEditingAction | SetPageAction | NavigateAction;

interface PageShape {
  page?: PageType;
  preview?: boolean;
  editing?: boolean;
}

const reducer = (state: PageShape, action: Action): PageShape => {
  switch (action.type) {
    case 'EDIT':
      if (state.preview || !state.page?.id) {
        throw new Error(
          "Can't edit preview pages, check the flag in component before dispatching"
        );
      }
      return {
        ...state,
        editing: true,
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: action.payload,
      };
    case 'NAVIGATE':
      return {
        ...state,
        page: action.payload,
        preview: false,
        editing: false,
      };
    case 'STOP_EDITING':
      return {
        ...state,
        editing: false,
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
