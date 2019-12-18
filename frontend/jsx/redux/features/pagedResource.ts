import { createSelector } from '@reduxjs/toolkit';
import { createValueSlice } from '~/redux/slices/value';
import { AsyncActionWeaklyTyped } from '~/redux/store';

import { AnyItem, ResourceBagFeature } from './resourceBag';

interface Params<T extends AnyItem> {
  name: string;
  query?: { [k: string]: string };
  bag: ResourceBagFeature<T>;
}

interface LoadedFeatureState {
  ids: number[];
  page: number;
  totalCount: number;
  loaded: true;
}

interface UnloadedFeatureState {
  loaded: false;
}

type FeatureState = LoadedFeatureState | UnloadedFeatureState;

const createPagedResourceFeature = <T extends AnyItem>({
  name,
  bag,
  query,
}: Params<T>) => {
  const initialState: FeatureState = {
    loaded: false,
  };

  const slice = createValueSlice<FeatureState>({
    name,
    initialState,
  });

  const loadPage = (
    page_id: number
  ): AsyncActionWeaklyTyped => async dispatch => {
    const { ids, totalCount } = await dispatch(
      bag.thunks.loadPage(page_id, query || {})
    );

    dispatch(
      slice.actions.set({
        loaded: true,
        ids,
        totalCount,
        page: page_id,
      })
    );
  };

  const selectItems = createSelector(
    [slice.selectors.self, bag.selectors.byId],
    (featureState: FeatureState, byId) => {
      if (!featureState.loaded) {
        return [];
      }
      return featureState.ids.map(id => byId(id));
    }
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
