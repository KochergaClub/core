import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { FaSpinner } from 'react-icons/fa';

import { Row, Label } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import ApolloQueryResults from './ApolloQueryResults';

import { Customer } from '../types';

const GET_CUSTOMER = gql`
  query Cm2Customer($id: ID!) {
    cm2Customer(id: $id) {
      id
      first_name
      last_name
      card_id
    }
  }
`;

interface Props {
  id: string;
}

const CustomerDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery<{ cm2Customer: Customer }, { id: string }>(
    GET_CUSTOMER,
    {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    }
  );

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
