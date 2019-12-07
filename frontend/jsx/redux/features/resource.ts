import { createValueSlice } from '~/redux/slices/value';
import { AsyncActionWeaklyTyped } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

interface Params {
  name: string;
  endpoint: string;
}

const createResourceFeature = <T>({ name, endpoint }: Params) => {
  const slice = createValueSlice({
    name,
    initialState: [] as T[],
  });

  const load = (): AsyncActionWeaklyTyped => async (dispatch, getState) => {
    const api = selectAPI(getState());
    const grades = (await api.call(endpoint, 'GET')) as T[];
    dispatch(slice.actions.set(grades));
  };

  return {
    slice,
    selectors: {
      asList: slice.selectors.self,
    },
    thunks: {
      load,
    },
  };
};

export default createResourceFeature;
