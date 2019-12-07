import { createSelector } from '@reduxjs/toolkit';
import { createValueSlice } from '~/redux/slices/value';
import { AsyncActionWeaklyTyped } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

interface Params {
  name: string;
  endpoint: string;
}

const createResourceFeature = <T extends {}>({ name, endpoint }: Params) => {
  const slice = createValueSlice({
    name,
    initialState: { value: null } as { value: T | null },
  });

  const load = (id: string): AsyncActionWeaklyTyped => async (
    dispatch,
    getState
  ) => {
    const api = selectAPI(getState());
    const item = (await api.call(endpoint + '/' + id, 'GET')) as T;
    dispatch(slice.actions.set({ value: item }));
  };

  const select = createSelector(slice.selectors.self, self => self.value);

  return {
    slice,
    selectors: {
      select,
    },
    thunks: {
      load,
    },
  };
};

export default createResourceFeature;
