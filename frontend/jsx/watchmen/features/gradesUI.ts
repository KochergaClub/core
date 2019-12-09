import { PayloadAction, createSelector } from '@reduxjs/toolkit';

import { createExtendedSlice } from '~/redux/slices/utils';
import { State } from '~/redux/store';
import { apiThunk } from '~/redux/action-utils';

import { Watchman, Grade } from '../types';
import { patchWatchman } from '../api';

import { selectWatchmanById, loadWatchmen } from './watchmen';

type GradeUIState = {
  askingForWatchmanGrade?: number;
  pickingWatchmanGrade?: number;
};

const gradesUISlice = createExtendedSlice({
  name: 'watchmen/gradesUI',
  initialState: {} as GradeUIState,
  reducers: {
    askForWatchmanGrade: {
      prepare: (watchman: Watchman) => ({
        payload: watchman.id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.askingForWatchmanGrade = action.payload;
      },
    },
    pickingWatchmanGrade: {
      prepare: (grade: Grade) => ({
        payload: grade.id,
      }),
      reducer: (state, action: PayloadAction<number>) => {
        state.pickingWatchmanGrade = action.payload;
      },
    },
    stopAskingForWatchmanGrade: (state, _) => {
      state.askingForWatchmanGrade = undefined;
      state.pickingWatchmanGrade = undefined;
    },
  },
});

export const selectPickingWatchmanGrade = createSelector(
  gradesUISlice.selectors.self,
  gradesUI => gradesUI.pickingWatchmanGrade
);

export const {
  askForWatchmanGrade,
  pickingWatchmanGrade,
  stopAskingForWatchmanGrade,
} = gradesUISlice.actions;

export const pickWatchmanGrade = (watchman: Watchman, grade: Grade) =>
  apiThunk(async (api, dispatch) => {
    dispatch(pickingWatchmanGrade(grade));
    await patchWatchman(api, watchman, {
      grade_id: grade.id,
    });
    await dispatch(loadWatchmen());
    dispatch(stopAskingForWatchmanGrade());
  });

export const selectAskingForGradeWatchman = (
  state: State
): Watchman | undefined => {
  const id = state.watchmen.gradesUI.askingForWatchmanGrade;
  if (!id) {
    return;
  }
  return selectWatchmanById(state, id);
};

export default gradesUISlice;
