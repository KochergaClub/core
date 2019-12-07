import { createValueSlice } from '~/redux/slices/value';
import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { Grade } from '../types';
import { getGrades } from '../api';

const gradesSlice = createValueSlice({
  name: 'watchmen/grades',
  initialState: [] as Grade[],
});

export default gradesSlice;

export const selectGrades = gradesSlice.selectors.self;

export const loadGrades = (): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());
  const grades = await getGrades(api);
  dispatch(gradesSlice.actions.set(grades));
};
