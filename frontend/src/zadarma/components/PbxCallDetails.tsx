import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import Card from '~/components/Card';

import { ZadarmaPbxCallDocument } from '../queries.generated';
import PbxCallCard from './PbxCallCard';

interface Props {
  id: string;
}

const PbxCallDetails: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(ZadarmaPbxCallDocument, {
    variables: { pbx_call_id: id },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { pbxCall } }) => (
        <Card>
          <PbxCallCard pbx_call={pbxCall} />
        </Card>
      )}
    </ApolloQueryResults>
  );
};

export default PbxCallDetails;
