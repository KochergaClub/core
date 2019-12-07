import { Selector } from 'reselect';
import {
  createSlice,
  Slice,
  CaseReducer,
  PayloadAction,
  PrepareAction,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

import { State as GlobalState } from '~/redux/store';

// FIXME - type definitions from @reduxjs/toolkit which are not exported had to be copy-pasted here.

type PayloadActions<Types extends keyof any = string> = Record<
  Types,
  PayloadAction
>;

type CaseReducerWithPrepare<State, Action extends PayloadAction> = {
  reducer: CaseReducer<State, Action>;
  prepare: PrepareAction<Action['payload']>;
};

type NoInfer<T> = [T][T extends any ? 0 : never];
type SliceCaseReducersCheck<S, ACR> = {
  [P in keyof ACR]: ACR[P] extends {
    reducer(
      s: S,
      action?: {
        payload: infer O;
      }
    ): any;
  }
    ? {
        prepare(
          ...a: never[]
        ): {
          payload: O;
        };
      }
    : {};
};

type RestrictCaseReducerDefinitionsToMatchReducerAndPrepare<
  S,
  CR extends SliceCaseReducerDefinitions<S, any>
> = {
  reducers: SliceCaseReducersCheck<S, NoInfer<CR>>;
};

type SliceCaseReducerDefinitions<State, PA extends PayloadActions> = {
  [ActionType in keyof PA]:
    | CaseReducer<State, PA[ActionType]>
    | CaseReducerWithPrepare<State, PA[ActionType]>;
};

type ExtraOptions = {
  thunks?: any; // FIXME
};

type ExtraSlice<State> = {
  thunks?: any; // FIXME
  selectors: {
    self: Selector<any, State>;
  };
};

export function createExtendedSlice<
  State,
  CaseReducers extends SliceCaseReducerDefinitions<State, any>
>(
  options: CreateSliceOptions<State, CaseReducers> &
    RestrictCaseReducerDefinitionsToMatchReducerAndPrepare<
      State,
      CaseReducers
    > &
    ExtraOptions
): Slice<State, CaseReducers> & ExtraSlice<State> {
  const slice = createSlice(options);

  const nameParts = slice.name.split('/');

  // Can't type it stricter because it causes recursive type issues:
  // state -> slice -> selector -> state -> ...
  // So we can't mention GlobalState type here.
  const selfSelector = (state: any) => {
    let result = state;
    for (const part of nameParts) {
      result = (result as any)[part];
    }
    return (result as any) as ReturnType<typeof slice.reducer>;
  };

  return {
    ...slice,
    thunks: options.thunks,
    selectors: {
      self: selfSelector,
    },
  };
}
