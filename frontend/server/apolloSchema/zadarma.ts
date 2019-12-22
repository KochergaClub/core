import { Resolvers } from './gen-types';

import { MEMBER as STAFF_MEMBER } from './staff';

// endpoints
const PBX_CALL = 'zadarma/pbx_call-paged';

export const resolvers: Resolvers = {
  Query: {
    zadarmaPbxCalls: (_, { page, page_size }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: PBX_CALL,
        page,
        page_size,
      }),
    zadarmaPbxCall: (_, { pbx_call_id }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({
        resource: PBX_CALL,
        id: pbx_call_id,
      }),
  },
  Mutation: {
    zadarmaSetMemberForPbxCall: async (
      _,
      { pbx_call_id, member_id },
      { dataSources }
    ) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: PBX_CALL,
        id: pbx_call_id,
        params: {
          id: member_id,
        },
        action: 'set_staff_member',
      });
      return true;
    },
  },
  ZadarmaData: {
    staff_member: async (parent, _, { dataSources }) => {
      if (!parent.staff_member) {
        return null;
      }
      return await dataSources.kochergaAPI.retrieve({
        resource: STAFF_MEMBER,
        id: parent.staff_member.id,
      });
    },
  },
};
