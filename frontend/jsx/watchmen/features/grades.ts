import { createValueSlice } from '~/redux/slices/value';
import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';
import { API } from '~/common/api';

import { Grade } from '../types';

const gradesSlice = createValueSlice({
  name: 'watchmen/grades',
  initialState: [] as Grade[],
});

export default gradesSlice;

export const selectGrades = gradesSlice.selectors.self;

const getGrades = async (api: API) => {
  return (await api.call('watchmen/grades', 'GET')) as Grade[];
};

export const loadGrades = (): AsyncAction => async (dispatch, getState) => {
  const api = selectAPI(getState());
  const grades = await getGrades(api);
  dispatch(gradesSlice.actions.set(grades));
};
