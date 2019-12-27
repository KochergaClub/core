import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { WatchmenShift } from './gen-types';

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
    });
  }
}

export default KochergaApolloCache;
