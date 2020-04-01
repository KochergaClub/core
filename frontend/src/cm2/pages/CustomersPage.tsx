import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import CmApp from '../components/CmApp';
import CustomersScreen from '../components/CustomersScreen';

const CustomersPage: NextApolloPage = () => (
  <CmApp htmlTitle="Клиенты">
    <CustomersScreen />
  </CmApp>
);

export default withApollo(withStaff(CustomersPage));
