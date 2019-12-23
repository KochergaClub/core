import { useCallback } from 'react';

import { ApolloQueryResults } from '~/components';
import {
  PagedApolloCollection,
  CustomCardListView,
} from '~/components/collections';

import PbxCallCard from './PbxCallCard';

import {
  CommonZadarmaPbxCallFragment,
  useZadarmaPbxCallsQuery,
} from '../queries.generated';

const PbxCallCollection: React.FC = () => {
  const queryResults = useZadarmaPbxCallsQuery();

  const renderItem = useCallback(
    (pbxCall: CommonZadarmaPbxCallFragment) => (
      <PbxCallCard pbx_call={pbxCall} />
    ),
    []
  );

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { pbxCalls } }) => (
        <PagedApolloCollection
          connection={pbxCalls}
          names={{
            plural: 'звонки',
            genitive: 'звонок',
          }}
          fetchPage={async page => {
            await queryResults.refetch({ page });
          }}
          view={props => (
            <CustomCardListView {...props} renderItem={renderItem} />
          )}
        />
      )}
    </ApolloQueryResults>
  );
};

export default PbxCallCollection;
