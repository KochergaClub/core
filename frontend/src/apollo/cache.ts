import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory';

import { WatchmenShift } from './types.generated';
import introspectionResult from './introspection-result.generated';

class KochergaApolloCache extends InMemoryCache {
  constructor() {
    super({
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'WatchmenShift':
            const watchmenShift = object as WatchmenShift;
            return (
              'WatchmenShift:' + watchmenShift.date + '/' + watchmenShift.shift
            );
          default:
            return defaultDataIdFromObject(object);
        }
      },
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: introspectionResult,
      }),
    });
  }
}

export default KochergaApolloCache;
