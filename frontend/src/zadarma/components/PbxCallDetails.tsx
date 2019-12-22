import { ApolloQueryResults } from '~/components';

import { useZadarmaPbxCallQuery } from '../codegen';

import Card from '~/components/Card';

import PbxCallCard from './PbxCallCard';

interface Props {
  pbx_call_id: string;
}

const PbxCallDetails: React.FC<Props> = ({ pbx_call_id }) => {
  const queryResults = useZadarmaPbxCallQuery({ variables: { pbx_call_id } });

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
