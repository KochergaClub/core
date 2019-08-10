import { APIProps } from '~/common/api';
import { API_CONFIGURE, API_CLEANUP_FOR_CLIENT, Action } from './actions';

interface State {
  api?: APIProps;
}

const initialState: State = {};

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
    default:
      return state;
  }
};

export default reducer;
