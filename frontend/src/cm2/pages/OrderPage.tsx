import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import CmApp from '../components/CmApp';
import OrderDetailsScreen from '../components/OrderDetailsScreen';

interface Props {
  id: string;
}

const OrderPage: NextApolloPage<Props> = ({ id }) => (
  <CmApp htmlTitle="Заказ #{id}">
    <OrderDetailsScreen id={id} />
  </CmApp>
);

OrderPage.getInitialProps = async ({ query }) => {
  const id = query.id as string;
  return { id };
};

export default withApollo(withStaff(OrderPage));
