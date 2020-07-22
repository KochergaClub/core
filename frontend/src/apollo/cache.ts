import { InMemoryCache } from '@apollo/client';

import introspectionResult from './introspection-result.generated';

class KochergaApolloCache extends InMemoryCache {
  constructor() {
    super({
      typePolicies: {
        WatchmenShift: {
          keyFields: ['date', 'shift'],
        },
        AuthCurrentUser: {
          keyFields: ['email'],
        },
        EventsPublicEvent: {
          keyFields: ['event_id'], // TODO - migrate to `id` field which is now returned by backend
        },
        Query: {
          fields: {
            my: {
              merge(existing, incoming, { mergeObjects }) {
                return mergeObjects(existing, incoming);
              },
            },
          },
        },
      },
      possibleTypes: introspectionResult.possibleTypes,
    });
  }
}

export default KochergaApolloCache;
