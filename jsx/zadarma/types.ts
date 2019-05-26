import { ShortStaffMember as StaffMember } from '~/staff/types';

export interface Call {
  ts: string;
  call_id: string;
  sip: string;
  pbx_call_id: string;
  call_type: string;
  disposition: string;
  destination: string;
  clid: string;
  is_recorded: number;
  watchman?: string;
  record?: string;
}

export interface PbxCallData {
  staff_member?: StaffMember;
}

export interface PbxCall {
  pbx_call_id: string;
  ts: string;
  calls: Call[];
  data?: PbxCallData;
}
