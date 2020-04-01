import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import CmApp from '../components/CmApp';
import ClosedOrdersScreen from '../components/ClosedOrdersScreen';

const ClosedOrdersPage: NextApolloPage = () => (
  <CmApp htmlTitle="Закрытые заказы">
    <ClosedOrdersScreen />
  </CmApp>
);

export default withApollo(withStaff(ClosedOrdersPage));
