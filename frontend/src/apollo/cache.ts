import { InMemoryCache } from '@apollo/client';

import introspectionResult from './introspection-result.generated';

class KochergaApolloCache extends InMemoryCache {
  constructor() {
    super({
      typePolicies: {
        // please don't use keyFields, they are too fragile can cause a page crash
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
