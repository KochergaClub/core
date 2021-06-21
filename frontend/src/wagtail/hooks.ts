import { useCallback, useContext } from 'react';

import { useApolloClient } from '@apollo/client';

import { WagtailPageContext } from '~/cms/contexts';
import { getEditingModeByTypename } from '~/cms/wagtail-utils';

import { WagtailBlockStructureDocument } from './components/queries.generated';
import { wagtailAdminPageEditLink } from './routes';
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

export const useEditWagtailPage = () => {
  const { state, dispatch } = useContext(WagtailPageContext);

  const act = useCallback(async () => {
    if (!dispatch || !state.page) {
      return; // shouldn't happen
    }
    const editingMode = getEditingModeByTypename(state.page.__typename);
    if (editingMode === 'wagtail') {
      window.open(wagtailAdminPageEditLink(state.page.id), '_blank');
    } else if (editingMode === 'wysiwyg') {
      dispatch({ type: 'EDIT' });
    } else {
      // shouldn't happen
    }
  }, [dispatch, state.page]);

  return act;
};
