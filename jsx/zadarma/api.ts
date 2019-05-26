import { API } from '~/common/api';
import { Member as StaffMember } from '~/staff/types';

import { PbxCall } from './types';

export const getAllCalls = async (api: API): Promise<PbxCall[]> => {
  return await api.call('zadarma/pbx_call', 'GET');
};

export const getStaffMembers = async (api: API): Promise<StaffMember[]> => {
  const staffMembers = (await api.call('staff/member', 'GET')) as StaffMember[];
  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );

  return watchmen.concat(otherStaff);
};

export const getCall = async (api: API, id: string): Promise<PbxCall> => {
  return await api.call(`zadarma/pbx_call/${id}`, 'GET');
};
