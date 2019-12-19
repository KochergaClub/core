import { APIProps } from '~/common/api';
import { User } from '~/common/types';

import {
  API_CONFIGURE,
  API_CLEANUP_FOR_CLIENT,
  USER_LOADED,
  Action,
} from './actions';

interface State {
  api?: APIProps;
  user: User;
}

const initialState: State = {
  user: {
    is_authenticated: false,
    permissions: [],
  },
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case API_CONFIGURE:
      return {
        ...state,
        api: action.payload,
      };
    case API_CLEANUP_FOR_CLIENT:
      if (!state.api) {
        console.warn("Can't cleanup when api is not configured");
        return state;
      }
      return {
        ...state,
        api: {
          csrfToken: state.api.csrfToken,
        },
      };
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
