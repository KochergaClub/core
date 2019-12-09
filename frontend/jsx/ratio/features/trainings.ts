import { createResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Training, CreateTrainingParams } from '../types';

const feature = createResourceFeature<Training>({
  name: 'ratio/trainings',
  endpoint: 'ratio/training',
});

export const loadTrainings = feature.thunks.load;

export const addTraining = (values: CreateTrainingParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('ratio/training', 'POST', values);
    await dispatch(loadTrainings());
  });

export const selectTrainings = feature.selectors.asList;

export default feature.slice;
