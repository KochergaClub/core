import { Action } from 'redux';
import { createSelector } from '@reduxjs/toolkit';
import { Selector } from 'reselect';
import { ThunkDispatch } from 'redux-thunk';
import { createValueSlice } from '~/redux/slices/value';
import { AsyncActionWeaklyTyped } from '~/redux/store';

import { AnyItem, ResourceBagFeature } from './resourceBag';

interface Params<T extends AnyItem, E = T> {
  name: string;
  query?: { [k: string]: string };
  bag: ResourceBagFeature<T>;
  loadRelated?: (
    items: T[],
    dispatch: ThunkDispatch<any, undefined, Action>,
    getState: () => any
  ) => Promise<void>;
  enhancers: Selector<any, any>[];
  enhance: (items: T[], ...rest: any[]) => E[];
}

interface LoadedFeatureState {
  ids: number[];
  page: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
  loaded: true;
}

interface UnloadedFeatureState {
  loaded: false;
}

type FeatureState = LoadedFeatureState | UnloadedFeatureState;

export interface PagedResourceFeature<T extends AnyItem, E = T> {
  slice: {};
  selectors: {
    asList: (state: any) => E[];
    pager: (
      state: any
    ) => { page: number; hasPrevious: boolean; hasNext: boolean } | null;
  };
  thunks: {
    loadPage: (page: number) => AsyncActionWeaklyTyped;
    reload: () => AsyncActionWeaklyTyped;
  };
}

const createPagedResourceFeature = <T extends AnyItem, E = T>({
  name,
  bag,
  query,
  enhancers,
  enhance,
  loadRelated,
}: Params<T, E>) => {
  const initialState: FeatureState = {
    loaded: false,
  };

  const slice = createValueSlice<FeatureState>({
    name,
    initialState,
  });

  const selectItems = createSelector(
    [slice.selectors.self, bag.selectors.byId, ...enhancers],
    (featureState: FeatureState, byId, ...enhancerValues) => {
      if (!featureState.loaded) {
        return [];
      }
      const items = featureState.ids.map(id => byId(id));
      return enhance(items, ...enhancerValues);
    }
  );

  const selectPager = createSelector(slice.selectors.self, state =>
    state.loaded
      ? {
          page: state.page,
          hasNext: state.hasNext,
          hasPrevious: state.hasPrevious,
        }
      : null
  );

  const loadPage = (page_id: number): AsyncActionWeaklyTyped => async (
    dispatch,
    getState
  ) => {
    const { ids, totalCount, hasNext, hasPrevious } = await dispatch(
      bag.thunks.loadPage(page_id, query || {})
    );

    if (loadRelated) {
      const byId = bag.selectors.byId(getState());
      await loadRelated(
        ids.map(id => byId(id)),
        dispatch,
        getState
      );
    }

    dispatch(
      slice.actions.set({
        loaded: true,
        ids,
        totalCount,
        hasNext,
        hasPrevious,
        page: page_id,
      })
    );
  };

  const reload = (): AsyncActionWeaklyTyped => async (dispatch, getState) => {
    const pager = selectPager(getState());
    if (!pager) {
      return;
    }
    await dispatch(loadPage(pager.page));
  };

  return {
    slice,
    selectors: {
      asList: selectItems,
      pager: selectPager,
    },
    thunks: {
      loadPage,
      reload,
    },
  };
};

export default createPagedResourceFeature;
