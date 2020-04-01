import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import CmApp from '../components/CmApp';
import OpenOrdersScreen from '../components/OpenOrdersScreen';

const IndexPage: NextApolloPage = () => (
  <CmApp htmlTitle="Открытые заказы">
    <OpenOrdersScreen />
  </CmApp>
);

export default withApollo(withStaff(IndexPage));
