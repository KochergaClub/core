import { Draft } from 'immer';
import {
  AnyAction,
  Reducer,
  createSelector,
  PayloadAction,
} from '@reduxjs/toolkit';
import { createExtendedSlice } from '~/redux/slices/utils';
import { AsyncActionWeaklyTyped } from '~/redux/store';
import { selectAPI } from '~/core/selectors';
import { PagedAPIResponse } from '~/common/api';
import { buildQueryString } from '~/common/utils';

/*
  Design decisions:
  - single resourceBag feature should always be enough
  - so resourceBag should know nothing about "current page" or "current item in view"
  - OTOH, resourceBag should be able to know everything there is to know about REST API - e.g., if it's paged, how to create new objects, etc.
  - (TODO: this feature should be called simply "resource")
*/

export type AnyItem = { id: number };

interface Params {
  name: string;
  endpoint: string;
  paged?: boolean;
}

interface FeatureState<I extends AnyItem> {
  byId: { [k: number]: I };
}

const createResourceBagSlice = <T extends AnyItem>({
  name,
}: {
  name: string;
}) => {
  const initialState: FeatureState<T> = {
    byId: {},
  };

  return createExtendedSlice({
    name,
    initialState,
    reducers: {
      add(state, action: PayloadAction<T>) {
        state.byId[action.payload.id] = action.payload as Draft<T>;
      },
      addMultiple(state, action: PayloadAction<T[]>) {
        for (const item of action.payload) {
          state.byId[item.id] = item as Draft<T>;
        }
      },
      replace(state, action: PayloadAction<T[]>) {
        state.byId = {}; // clear
        for (const item of action.payload) {
          state.byId[item.id] = item as Draft<T>;
        }
      },
    },
  });
};

interface LoadPageResult {
  ids: number[];
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface ResourceBagFeature<T extends AnyItem> {
  // TODO - figure out the correct slice type
  // Unfortunately, we can't use ReturnType<typeof createResourceBagSlice>, since it's generic and TypeScript doesn't support typeof for generics.
  // More details: https://stackoverflow.com/questions/50321419/typescript-returntype-of-generic-function,
  // https://stackoverflow.com/questions/50005595/getting-the-return-type-of-a-function-which-uses-generics
  slice: {
    actions: {
      add: (item: T) => PayloadAction<any>; // FIXME - PayloadAction<T> doesn't work here for some reason
      replace: (item: T[]) => PayloadAction<any>; // FIXME - PayloadAction<T> doesn't work here for some reason
    };
    reducer: Reducer<FeatureState<T>, AnyAction>;
  };
  selectors: {
    byId: (state: any) => (id: number) => T;
  };
  thunks: {
    loadAll: () => AsyncActionWeaklyTyped<number[]>;
    loadPage: (
      page_id: number,
      query?: { [k: string]: string }
    ) => AsyncActionWeaklyTyped<LoadPageResult>;
    loadByIds: (ids: number[]) => AsyncActionWeaklyTyped;
  };
}

const createResourceBagFeature = <T extends AnyItem>({
  name,
  endpoint,
  paged,
}: Params): ResourceBagFeature<T> => {
  const slice = createResourceBagSlice<T>({ name });

  const loadAll = (): AsyncActionWeaklyTyped<number[]> => async (
    dispatch,
    getState
  ) => {
    const api = selectAPI(getState());
    let items: T[] = [];
    if (paged) {
      throw new Error('Not implemented');
    } else {
      items = (await api.call(endpoint, 'GET')) as T[];
    }
    dispatch(slice.actions.replace(items));
    return items.map(item => item.id);
  };

  const loadPage = (
    page_id: number,
    query: { [k: string]: string } = {}
  ): AsyncActionWeaklyTyped<LoadPageResult> => async (dispatch, getState) => {
    const api = selectAPI(getState());
    if (!paged) {
      throw new Error('Resource is not paged');
    }

    const qs = { ...query, page: String(page_id) };

    const response = (await api.call(
      `${endpoint}?${buildQueryString(qs)}`,
      'GET'
    )) as PagedAPIResponse<T>;
    const items = response.results;

    dispatch(slice.actions.addMultiple(items));
    return {
      ids: items.map(item => item.id),
      totalCount: response.count,
      hasNext: Boolean(response.next),
      hasPrevious: Boolean(response.previous),
    };
  };

  const loadByIds = (ids: number[]): AsyncActionWeaklyTyped => async (
    dispatch,
    getState
  ) => {
    const api = selectAPI(getState());

    // TODO - bulk (for endpoints which support it)

    const items: T[] = [];
    for (const id of ids) {
      const item = (await api.call(`${endpoint}/${id}`, 'GET')) as T;
      items.push(item);
    }

    dispatch(slice.actions.addMultiple(items));
  };

  return {
    slice,
    selectors: {
      byId: createSelector(slice.selectors.self, state => {
        return (id: number) => state.byId[id];
      }),
    },
    thunks: {
      loadPage,
      loadAll,
      loadByIds,
    },
  };
};

export default createResourceBagFeature;
