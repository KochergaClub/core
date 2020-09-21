import { useApolloClient } from '@apollo/client';

import { WagtailBlockStructureDocument } from './components/queries.generated';
import { AnyBlockFragment } from './types';
import { typenameToBackendBlockName } from './utils';

export const useBlockStructureLoader = () => {
  const apolloClient = useApolloClient();

  return async (typename: AnyBlockFragment['__typename']) => {
    const blockName = typenameToBackendBlockName(typename);
    const structureQueryResults = await apolloClient.query({
      query: WagtailBlockStructureDocument,
      variables: {
        name: blockName,
      },
      fetchPolicy: 'cache-first',
    });
    if (!structureQueryResults.data?.result) {
      throw new Error(`Couldn't load block structure for block ${blockName}`);
    }
    const structure = structureQueryResults.data.result;
    return structure;
  };
};
