import {
  TEMPLATE_REPLACE_ALL,
  TEMPLATE_SET_AND_VIEW,
  ActionTypes,
} from './actions';

import { ImageTemplate } from './types';

interface State {
  templates: ImageTemplate[];
  viewingTemplate?: ImageTemplate;
}

const reducer = (state: State = { templates: [] }, action: ActionTypes) => {
  switch (action.type) {
    case TEMPLATE_REPLACE_ALL:
      return {
        ...state,
        templates: action.payload,
      };
    case TEMPLATE_SET_AND_VIEW:
      return {
        ...state,
        viewingTemplate: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
