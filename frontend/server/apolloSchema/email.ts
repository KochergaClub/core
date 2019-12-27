import { Resolvers } from './gen-types';
import { TContext } from './types';

// endpoints
const CATEGORY = 'email/mailchimp_category';
const INTEREST = 'email/mailchimp_interest';
const CHANNEL = 'email/subscribe_channel';

const resolveInterestIds = async (
  parent: any,
  _: any,
  { dataSources }: TContext
) => {
  const ids = parent.interest_ids as string[];
  return ids.map(id =>
    dataSources.kochergaAPI
      .loader({
        resource: INTEREST,
      })
      .load(id)
  );
};

export const resolvers: Resolvers = {
  Query: {
    emailMailchimpCategoriesAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: CATEGORY,
      }),
    emailSubscribeChannelsAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: CHANNEL }),
  },
  EmailSubscribeChannel: {
    interests: resolveInterestIds,
  },
  EmailMailchimpCategory: {
    interests: resolveInterestIds,
  },
  Mutation: {
    emailSubscribeChannelDelete: async (_, { slug }, { dataSources }) => {
      await dataSources.kochergaAPI.destroy({
        resource: CHANNEL,
        id: slug,
      });
      return true;
    },
    emailSubscribeChannelCreate: async (_, { params }, { dataSources }) => {
      await dataSources.kochergaAPI.create({
        resource: CHANNEL,
        params,
      });
      return true;
    },
    emailSubscribeChannelAddEmail: async (
      _,
      { slug, email },
      { dataSources }
    ) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: CHANNEL,
        id: slug,
        action: 'subscribe',
        params: {
          email,
        },
      });
      return true;
    },
  },
};
