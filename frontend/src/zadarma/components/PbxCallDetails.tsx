import { ApolloQueryResults } from '~/components';

import { useZadarmaPbxCallQuery } from '../queries.generated';

import Card from '~/components/Card';

import PbxCallCard from './PbxCallCard';

interface Props {
  id: string;
}

const PbxCallDetails: React.FC<Props> = ({ id }) => {
  const queryResults = useZadarmaPbxCallQuery({
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
