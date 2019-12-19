import { API } from '~/common/api';
import { BOVStatType } from './types';

export const fetchBovStats = async (api: API) => {
  return (await api.call('analytics/bov_stats', 'GET')) as BOVStatType[];
};
