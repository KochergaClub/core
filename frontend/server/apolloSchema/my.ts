/*
import { Resolvers } from './gen-types';

// endpoints
const ME = 'me';
const MEMBERSHIP = 'cm/me';
const ORDERS = 'cm/me/orders';
const TICKETS = 'my/tickets';
const EMAIL_SUBSCRIPTION = 'my/email';

export const resolvers: Resolvers = {
  Query: {
    my: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.retrieveSingleton({ resource: ME }),
  },
  My: {
    membership: async (_, __, { dataSources }) => {
      try {
        const response = await dataSources.kochergaAPI.retrieveSingleton({
          resource: MEMBERSHIP,
        });
        return response;
      } catch (e) {
        if (e?.extensions?.response?.status === 404) {
          return null;
        }
        throw e;
      }
    },
    tickets: async (_, __, { dataSources }) => {
      return await dataSources.kochergaAPI.list({
        resource: TICKETS,
      });
    },
    email_subscription: async (_, __, { dataSources }) => {
      return await dataSources.kochergaAPI.retrieveSingleton({
        resource: EMAIL_SUBSCRIPTION,
      });
    },
  },
  MyMembership: {
    orders: async (_, __, { dataSources }) => {
      return await dataSources.kochergaAPI.list({
        resource: ORDERS,
      });
    },
  },
  Mutation: {
    myEmailResubscribe: async (_, __, { dataSources }) => {
      await dataSources.kochergaAPI.postResourceAction({
        resource: EMAIL_SUBSCRIPTION,
        action: 'resubscribe',
      });
      return true;
    },
    myEmailUnsubscribe: async (_, __, { dataSources }) => {
      await dataSources.kochergaAPI.postResourceAction({
        resource: EMAIL_SUBSCRIPTION,
        action: 'unsubscribe',
      });
      return true;
    },
    myEmailSubscribeToInterest: async (_, { interest_id }, { dataSources }) => {
      const currentStatus = await dataSources.kochergaAPI.retrieveSingleton({
        resource: EMAIL_SUBSCRIPTION,
      });
      if (!currentStatus.interests) {
        return null; // no interests -> probably unsubscribed status
      }

      const interest_ids = (currentStatus.interests as {
        subscribed: boolean;
        id: string;
      }[])
        .filter(interest => interest.subscribed || interest.id === interest_id)
        .map(interest => interest.id);

      await dataSources.kochergaAPI.postResourceAction({
        resource: EMAIL_SUBSCRIPTION,
        action: 'update_interests',
        params: {
          interest_ids,
        },
      });
      return true;
    },
    myEmailUnsubscribeFromInterest: async (
      _,
      { interest_id },
      { dataSources }
    ) => {
      const currentStatus = await dataSources.kochergaAPI.retrieveSingleton({
        resource: EMAIL_SUBSCRIPTION,
      });
      if (!currentStatus.interests) {
        return null; // no interests -> probably unsubscribed status
      }

      const interest_ids = (currentStatus.interests as {
        subscribed: boolean;
        id: string;
      }[])
        .filter(interest => interest.subscribed && interest.id !== interest_id)
        .map(interest => interest.id);

      await dataSources.kochergaAPI.postResourceAction({
        resource: EMAIL_SUBSCRIPTION,
        action: 'update_interests',
        params: {
          interest_ids,
        },
      });
      return true;
    },
    myPrivacyModeSet: async (_, { mode }, { dataSources }) => {
      await dataSources.kochergaAPI.postResourceAction({
        resource: MEMBERSHIP,
        action: 'set-privacy-mode',
        params: {
          privacy_mode: mode,
        },
      });
      return true;
    },
    myTicketDelete: async (_, { event_id }, { dataSources }) => {
      await dataSources.kochergaAPI.destroySingleton({
        resource: `events/${event_id}/tickets/my`,
      });
      return true;
    },
  },
};

*/
