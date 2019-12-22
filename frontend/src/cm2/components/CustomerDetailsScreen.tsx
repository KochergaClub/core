import { FaSpinner } from 'react-icons/fa';

import { Row, Label } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { Cm2CustomerPageQuery, useCm2CustomerPageQuery } from '../codegen';

import ApolloQueryResults from './ApolloQueryResults';
import OrderLink from './OrderLink';

interface Props {
  id: string;
}

const CustomerOrders: React.FC<{
  orders: Cm2CustomerPageQuery['cm2Customer']['orders'];
}> = ({ orders }) => {
  const nodes = orders.edges.map(edge => edge.node);

  if (!nodes.length) {
    return null;
  }

  return (
    <div>
      <h3>Заказы</h3>
      {nodes.map(node => (
        <div>
          <OrderLink order={node} /> / {node.start}
        </div>
      ))}
    </div>
  );
};

const CustomerDetailsScreen: React.FC<Props> = ({ id }) => {
  const queryResults = useCm2CustomerPageQuery({
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
