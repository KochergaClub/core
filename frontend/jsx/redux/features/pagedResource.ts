import { createSelector } from '@reduxjs/toolkit';
import { createValueSlice } from '~/redux/slices/value';
import { AsyncActionWeaklyTyped } from '~/redux/store';
import { selectAPI } from '~/core/selectors';
import { PagedAPIResponse } from '~/common/api';

interface Params {
  name: string;
  endpoint: string;
}

interface LoadedFeatureState<T> {
  items: T[];
  page: number;
  totalCount: number;
  loaded: true;
}

interface UnloadedFeatureState {
  loaded: false;
}

type FeatureState<T> = LoadedFeatureState<T> | UnloadedFeatureState;

const createPagedResourceFeature = <T>({ name, endpoint }: Params) => {
  const initialState: FeatureState<T> = {
    loaded: false,
  };

  const slice = createValueSlice<FeatureState<T>>({
    name,
    initialState,
  });

  const loadPage = (page: number): AsyncActionWeaklyTyped => async (
    dispatch,
    getState
  ) => {
    const api = selectAPI(getState());
    const response = (await api.call(endpoint, 'GET')) as PagedAPIResponse<T>;
    const items = response.results;

    dispatch(
      slice.actions.set({
        loaded: true,
        items,
        page,
        totalCount: response.count,
      })
    );
  };

  const selectItems = createSelector(slice.selectors.self, featureState =>
    featureState.loaded ? featureState.items : undefined
  );

  return {
    slice,
    selectors: {
      asList: selectItems,
    },
    thunks: {
      loadPage,
    },
  };
};

export default createPagedResourceFeature;
