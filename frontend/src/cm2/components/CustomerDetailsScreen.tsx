import { FaSpinner } from 'react-icons/fa';

import { Row, Label } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { useCm2CustomerQuery } from '../codegen';

import ApolloQueryResults from './ApolloQueryResults';

interface Props {
  id: string;
}

const CustomerDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useCm2CustomerQuery({
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <PaddedBlock width="max">
      <ApolloQueryResults {...queryResults}>
        {({ data: { cm2Customer: customer }, loading }) => (
          <div>
            <h2>
              {customer.first_name} {customer.last_name}
              {loading ? <FaSpinner /> : null}
            </h2>
            <Row vCentered>
              <Label>Карта:</Label>
              <div>{customer.card_id}</div>
            </Row>
          </div>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};

export default CustomerDetailsScreen;
