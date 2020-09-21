import { FaSpinner } from 'react-icons/fa';

import { useQuery } from '@apollo/client';
import { Label, Row } from '@kocherga/frontkit';

import { ApolloQueryResults, PaddedBlock } from '~/components';

import { Cm2CustomerPageDocument, Cm2CustomerPageQuery } from '../queries.generated';
import OrderLink from './OrderLink';

interface Props {
  id: string;
}

const CustomerOrders: React.FC<{
  orders: Cm2CustomerPageQuery['cm2Customer']['orders'];
}> = ({ orders }) => {
  const nodes = orders.edges.map((edge) => edge.node);

  if (!nodes.length) {
    return null;
  }

  return (
    <div>
      <h3>Заказы</h3>
      {nodes.map((order) => (
        <div key={order.id}>
          <OrderLink order={order} /> / {order.start}
        </div>
      ))}
    </div>
  );
};

const CustomerDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useQuery(Cm2CustomerPageDocument, {
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
      {queryResults.data && (
        <CustomerOrders orders={queryResults.data.cm2Customer.orders} />
      )}
    </PaddedBlock>
  );
};

export default CustomerDetailsScreen;
