import * as React from 'react';

interface Action {
  type: 'SET_FIELD';
  payload: {
    name: string;
    value: string;
  };
}

export type TemplateState = { [key: string]: string };

type TemplateContextShape = (a: Action) => void;

export const TemplateContext = React.createContext<TemplateContextShape>(
  () => null
);

export const reducer = (
  state: TemplateState,
  action: Action
): TemplateState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
