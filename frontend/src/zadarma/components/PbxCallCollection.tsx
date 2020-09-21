import { useCallback } from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { CustomCardListView, PagedApolloCollection } from '~/components/collections';

import { CommonZadarmaPbxCallFragment, ZadarmaPbxCallsDocument } from '../queries.generated';
import PbxCallCard from './PbxCallCard';

const PbxCallCollection: React.FC = () => {
  const queryResults = useQuery(ZadarmaPbxCallsDocument, {
    fetchPolicy: 'network-only',
    variables: {
      first: 20,
    },
  });

  const renderItem = useCallback(
    (pbxCall: CommonZadarmaPbxCallFragment) => (
      <PbxCallCard pbx_call={pbxCall} />
    ),
    []
  );

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { pbxCalls } }) => (
        <PagedApolloCollection
          connection={pbxCalls}
          names={{
            plural: 'звонки',
            genitive: 'звонок',
          }}
          fetchPage={queryResults.refetch}
          view={props => (
            <CustomCardListView {...props} renderItem={renderItem} />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default PbxCallCollection;
