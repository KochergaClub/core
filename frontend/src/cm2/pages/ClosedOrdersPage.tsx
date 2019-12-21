import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import CmApp from '../components/CmApp';
import ClosedOrdersScreen from '../components/ClosedOrdersScreen';

const ClosedOrdersPage: NextPage = () => (
  <CmApp htmlTitle="Закрытые заказы">
    <ClosedOrdersScreen />
  </CmApp>
);

export default withApollo(ClosedOrdersPage);
