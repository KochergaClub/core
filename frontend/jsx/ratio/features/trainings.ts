import { createPagedResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Training, CreateTrainingParams } from '../types';

import { trainingBagFeature } from './trainingBag';

const feature = createPagedResourceFeature<Training>({
  name: 'ratio/trainings',
  bag: trainingBagFeature,
  query: { page_size: '10' },
  enhancers: [],
  enhance: items => items,
});

export const { asList: selectTrainings } = feature.selectors;

export const {
  loadPage: loadTrainings,
  reload: reloadTrainings,
} = feature.thunks;

export const addTraining = (values: CreateTrainingParams) =>
  apiThunk(async (api, dispatch) => {
    await api.call('ratio/training', 'POST', values);
    await dispatch(reloadTrainings());
  });

export const trainingsFeature = feature;

export default feature.slice;
