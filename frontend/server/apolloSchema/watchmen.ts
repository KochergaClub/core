import { Resolvers } from './gen-types';

import { MEMBER as STAFF_MEMBER } from './staff';

// endpoints
const WATCHMAN = 'watchmen/watchmen';
const GRADE = 'watchmen/grades';
const SHIFT = 'watchmen/schedule';

export const resolvers: Resolvers = {
  Query: {
    watchmenWatchmenAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: WATCHMAN }),
    watchmenGradesAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: GRADE }),
    watchmenShifts: (_, { from_date, to_date }, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: SHIFT,
        query: { from_date, to_date },
      }),
  },
  WatchmenWatchman: {
    member: async (parent, _, { dataSources }) => {
      const member_id = (parent as any).member_id as string | undefined;
      if (!member_id) {
        throw new Error('Expected member_id');
      }
      return await dataSources.kochergaAPI
        .loader({ resource: STAFF_MEMBER })
        .load(member_id);
    },
    grade: async (parent, _, { dataSources }) => {
      const grade_id = (parent as any).grade_id as string | undefined;
      if (!grade_id) {
        return null;
      }
      return await dataSources.kochergaAPI.retrieve({
        resource: GRADE,
        id: grade_id,
      });
    },
  },
  WatchmenShift: {
    watchman: async (parent, _, { dataSources }) => {
      const watchman_id = (parent as any).watchman_id as string | undefined;
      if (!watchman_id) {
        return null;
      }
      return await dataSources.kochergaAPI
        .loader({ resource: WATCHMAN })
        .load(watchman_id);
    },
  },
  Mutation: {
    watchmenSetWatchmanPriority: async (_, { params }, { dataSources }) => {
      const { watchman_id, priority } = params;
      await dataSources.kochergaAPI.update({
        resource: WATCHMAN,
        id: watchman_id,
        patch: {
          priority,
        },
      });
      return true;
    },
    watchmenSetWatchmanGrade: async (_, { params }, { dataSources }) => {
      const { watchman_id, grade_id } = params;
      await dataSources.kochergaAPI.update({
        resource: WATCHMAN,
        id: watchman_id,
        patch: {
          grade_id,
        },
      });
      return true;
    },
    watchmenCreateWatchman: async (_, { params }, { dataSources }) => {
      await dataSources.kochergaAPI.postResourceAction({
        resource: STAFF_MEMBER,
        action: 'add_watchman',
        params,
      });
      return true;
    },
    watchmenUpdateShift: async (_, { params }, { dataSources }) => {
      return await dataSources.kochergaAPI.update({
        resource: SHIFT,
        id: `${params.date}/${params.shift}`,
        patch: {
          watchman_id: params.watchman_id,
          is_night: params.is_night,
        },
      });
    },
  },
};
