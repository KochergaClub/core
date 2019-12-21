import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Row, Label } from '@kocherga/frontkit';

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
  id: number;
}

const CustomerDetailsScreen: React.FC<Props> = ({ id }) => {
  const { loading, error, data } = useQuery(GET_CUSTOMER, {
    variables: { id },
  });

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null; // FIXME
  }

  const customer = data.cm2Customer;

  if (!customer) {
    throw new Error('Customer is not loaded');
  }

  return (
    <div>
      <h2>
        {customer.first_name} {customer.last_name}
      </h2>
      <Row vCentered>
        <Label>Карта:</Label>
        <div>{customer.card_id}</div>
      </Row>
    </div>
  );
};

export default CustomerDetailsScreen;
