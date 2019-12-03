import { API } from '~/common/api';
import { Member as StaffMember } from '~/staff/types';

import { PbxCall } from './types';

export const getAllCalls = async (api: API): Promise<PbxCall[]> => {
  return await api.call('zadarma/pbx_call', 'GET');
};

export const getCall = async (api: API, id: string): Promise<PbxCall> => {
  return await api.call(`zadarma/pbx_call/${id}`, 'GET');
};
