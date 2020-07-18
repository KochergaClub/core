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
          case 'AuthCurrentUser':
            // current user is a singleton but doesn't contain a real ID since we don't want to leak integer ids from the database
            return 'AuthCurrentUser:me';
          case 'EventsPublicEvent':
            return (object as any).event_id; // TODO - migrate to `id` field which is now returned by backend
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
